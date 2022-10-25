/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
import { useApolloClient, useMutation } from '@apollo/client';
import { MUTATION_VOTE_QUESTION } from '@KwSrc/screens/forum/graphql/mutation';
import {
  FragmentForumPostBase,
  FragmentForumPostBase_vote,
} from '@KwSrc/screens/forum/graphql/__generated__/FragmentForumPostBase';
import {
  MutationVoteQuestion,
  MutationVoteQuestionVariables,
} from '@KwSrc/screens/forum/graphql/__generated__/MutationVoteQuestion';
import { fontsizes } from '@KwSrc/utils';
import { colors } from '@KwSrc/utils/colors';
import { shareContent } from '@KwSrc/utils/share';
import { calculateVote, PostVoteType } from '@KwSrc/utils/vote';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import KwIcon from '../Icon';

const shareMessage = (post: FragmentForumPostBase) => {
  const url = `https://www.kawlo.com//quizz/posts/${post._id}`;

  shareContent({
    title: String(post!.title),
    message: 'can you answer this question?',
    url,
  });
};

const PostCardBottomArea: FunctionComponent<IPostCardBottomArea> = ({
  post,
  onPress,
}) => {
  const { cache } = useApolloClient();
  const [mode, setMode] = useState<'up-voting' | 'down-voting' | undefined>();

  const [voteQuestion, mutationVoteQuestion] = useMutation<
    MutationVoteQuestion,
    MutationVoteQuestionVariables
  >(MUTATION_VOTE_QUESTION, {
    optimisticResponse: (variables) => ({
      forumPostVote: {
        __typename: 'ForumPostVote',
        _id: String(post?.vote?._id) || post._id,
        vote: calculateVote(
          (post.vote?.vote || 0) as PostVoteType,
          variables.isUp,
        ).newVote,
      },
    }),
  });
  const updateCache = useCallback(
    (
      postBase: FragmentForumPostBase,
      vote: FragmentForumPostBase_vote,
      isUp: boolean,
    ) => {
      const update = calculateVote(
        (postBase.vote?.vote || 0) as PostVoteType,
        isUp,
      );

      cache.modify({
        id: cache.identify({
          id: postBase._id,
          __typename: postBase.__typename,
        }),
        fields: {
          vote: () => vote,
          upVotes: (prev: number) => update.dif.u + prev,
          downVotes: (prev: number) => update.dif.d + prev,
        },
      });
    },
    [cache],
  );

  useEffect(() => {
    if (mode === 'up-voting') {
      if (mutationVoteQuestion?.data && !mutationVoteQuestion.error) {
        // if not optimistic
        if (!mutationVoteQuestion?.loading) {
          setMode(undefined);
        }
        updateCache(post, mutationVoteQuestion.data.forumPostVote!, true);
      }
    }

    if (mode === 'down-voting') {
      if (mutationVoteQuestion?.data && !mutationVoteQuestion.error) {
        // if not optimistic
        if (!mutationVoteQuestion?.loading) {
          setMode(undefined);
        }
        updateCache(post, mutationVoteQuestion?.data.forumPostVote!, false);
      }
    }
  }, [mode, mutationVoteQuestion, post, updateCache]);

  return (
    <View style={styles.cardFooter}>
      <View style={styles.actionIcons}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setMode('up-voting');
              return voteQuestion({
                variables: { isUp: true, postId: post._id },
              });
            }}
          >
            <KwIcon
              name="arrowUp"
              width="32"
              height="35"
              fill={
                post.vote?.vote === 1 ? colors.app.primary : colors.app.black
              }
              stroke={
                post.vote?.vote === 1 ? colors.app.primary : colors.app.black
              }
              strokeWidth={0.2}
              viewBox="0 0 25 30"
            />
          </TouchableOpacity>
          <Text style={styles.number}>
            {post.upVotes! - post.downVotes! > 0
              ? post.upVotes! - post.downVotes!
              : 0}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setMode('down-voting');
              return voteQuestion({
                variables: { isUp: false, postId: post._id },
              });
            }}
          >
            <KwIcon
              name="arrowDown"
              width="32"
              height="35"
              fill={
                post.vote?.vote === -1 ? colors.app.primary : colors.app.black
              }
              stroke={
                post.vote?.vote === -1 ? colors.app.primary : colors.app.black
              }
              viewBox="0 0 25 30"
              strokeWidth={0.2}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.row, styles.marginLeft]}
          onPress={onPress}
        >
          <KwIcon
            name="comment"
            fill="black"
            stroke={colors.app.black}
            width="32"
            height="35"
            viewBox="0 0 30 30"
          />
          <Text style={styles.number}>{post.commentCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.row, styles.marginLeft]}
          onPress={() => {
            shareMessage(post);
          }}
        >
          <KwIcon
            name="share"
            fill="none"
            stroke={colors.app.black}
            width="32"
            height="35"
            viewBox="0 0 30 30"
          />
        </TouchableOpacity>
      </View>
      <KwIcon
        style={styles.mark}
        name="pin"
        fill={post.pinned ? colors.app.primary : 'none'}
        stroke={post.pinned ? colors.app.primary : 'none'}
        width="32"
        height="35"
        viewBox="0 0 30 30"
      />
    </View>
  );
};

interface IPostCardBottomArea {
  post: FragmentForumPostBase;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: colors.app.white,
    elevation: 1,
    minHeight: 200,
    borderRadius: 14,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 5,
    shadowColor: colors.app.black,
    marginBottom: 20,
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: 14,
    marginVertical: 10,
    fontWeight: '400',
    fontFamily: fontsizes.FONTS.robotoBody4.fontFamily,
    lineHeight: 20,
  },
  cardContent: {
    paddingTop: 0,
  },

  imageContent: {
    marginTop: 10,
  },
  cardImage: {
    // height: 200,
    minHeight: 200,
    width: '100%',
    borderRadius: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  number: {
    fontSize: 15,
    color: colors.app.black,
    position: 'relative',
    left: -10,
    top: -2,
  },
  mark: {
    position: 'relative',
    right: 0,
  },
  more: {
    position: 'relative',
    right: -12,
  },
  markIcon: {
    height: 14,
    width: 14,
  },
  marginLeft: {
    marginLeft: 10,
  },
  timeSmall: {
    fontSize: 10,
    color: colors.app.primary,
    fontFamily: fontsizes.FONTS.robotoBody4.fontFamily,
  },
  nameSmall: {
    fontSize: 14,
    fontFamily: fontsizes.FONTS.robotoBody3.fontFamily,
    color: colors.app.black,
    fontWeight: 'bold',
  },
  horizontalStroke: {
    height: 1,
    backgroundColor: colors.app.borderColor,
    marginTop: 10,
    marginBottom: 20,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  marginBottomSmall: {
    marginBottom: 20,
  },

  seeMore: {
    paddingHorizontal: 15,
    color: colors.text.primary,
  },
  videoPoster: {
    top: 0,
    minHeight: 200,
    width: '100%',
    borderRadius: 14,
  },
  play: {
    position: 'absolute',
    marginVertical: 80,
    alignSelf: 'center',
  },
});

export { PostCardBottomArea };
