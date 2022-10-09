import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { colors } from '@KwSrc/utils';
import { StackNavigationProp } from '@react-navigation/stack';
// import i18n from '@KwSrc/config/i18n/i18n';
import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import KwHearder from '@KwSrc/components/header';
import KwCommentInput from '@KwSrc/components/commentInput';
import KwComment from '@KwSrc/components/comment';
import { KwDetailCard } from '@KwSrc/components/card/detailCard';
import { RouteProp } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import ToastService from '@KwSrc/services/toast/toast.service';
import { CreateOneForumCommentInput } from '@KwSrc/globalTypes';
import { ReactNativeFile } from 'apollo-upload-client';
import { Asset } from 'react-native-image-picker';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { useSelector } from 'react-redux';
import { selectAuth } from '@KwSrc/store/reducers/users';
// import { RootStackRouteList } from '@KwSrc/navigation/constants.navigation';
import { KwAds } from '@KwSrc/components/ads';
import { ForumStackParamList, ForumStackRouteList } from '../constants';
import {
  QUERY_FORUM_POST_BY_ID,
  QUERY_FORUM_POST_COMMENT_RELAY_PAGINATION,
} from '../graphql/queries';
import {
  QueryForumPostById,
  QueryForumPostByIdVariables,
} from '../graphql/__generated__/QueryForumPostById';
import {
  QueryForumPostCommentRelayPagination,
  QueryForumPostCommentRelayPaginationVariables,
  QueryForumPostCommentRelayPagination_forumCommentPaginationRelay,
  QueryForumPostCommentRelayPagination_forumCommentPaginationRelay_edges,
} from '../graphql/__generated__/QueryForumPostCommentRelayPagination';
import {
  MutationAddForumComment,
  MutationAddForumCommentVariables,
} from '../graphql/__generated__/MutationAddForumComment';
import { MUTATION_ADD_FORUM_POST_COMMENT } from '../graphql/mutation';

const ForumDetailScreen: FunctionComponent<ForumPostDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { postId, title } = route.params;

  const auth = useSelector(selectAuth);

  const queryForumPostById = useQuery<
    QueryForumPostById,
    QueryForumPostByIdVariables
  >(QUERY_FORUM_POST_BY_ID, { variables: { id: postId } });

  const [fetchingComments, setFetchingComments] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryForumPostCommentPagination = useQuery<
    QueryForumPostCommentRelayPagination,
    QueryForumPostCommentRelayPaginationVariables
  >(QUERY_FORUM_POST_COMMENT_RELAY_PAGINATION, {
    variables: {
      filter: { postId },
    },
    fetchPolicy: 'network-only',
  });

  const [forumPostCommentPagination, setForumPostCommentPagination] = useState<
    | QueryForumPostCommentRelayPagination_forumCommentPaginationRelay
    | null
    | undefined
  >(queryForumPostCommentPagination.data?.forumCommentPaginationRelay);

  useEffect(() => {
    setForumPostCommentPagination(
      queryForumPostCommentPagination.data?.forumCommentPaginationRelay,
    );
  }, [queryForumPostCommentPagination.data]);

  const [addComment] = useMutation<
    MutationAddForumComment,
    MutationAddForumCommentVariables
  >(MUTATION_ADD_FORUM_POST_COMMENT, {
    onCompleted() {
      ToastService.showToast({
        message: 'Comment',
        description: 'Comment has been addded',
        type: 'success',
      });
      onRefresh();
      setLoading(false);
      setFetchingComments(false);
    },
    onError(error) {
      console.log(error);
    },
  });

  const fetchMore = useCallback(() => {
    if (forumPostCommentPagination?.pageInfo.hasNextPage) {
      setFetchingComments(true);

      queryForumPostCommentPagination.fetchMore({
        query: QUERY_FORUM_POST_COMMENT_RELAY_PAGINATION,
        variables: {
          filter: { postId },
          cursor: forumPostCommentPagination.pageInfo.endCursor,
        },
      });
    }
  }, [
    forumPostCommentPagination?.pageInfo,
    postId,
    queryForumPostCommentPagination,
  ]);

  const onRefresh = useCallback(() => {
    queryForumPostById.refetch();
    queryForumPostCommentPagination.refetch();
  }, [queryForumPostById, queryForumPostCommentPagination]);

  const sendComment = (
    message: string,
    files: Asset[],
    document?: DocumentPickerResponse,
  ) => {
    const forumComment: CreateOneForumCommentInput = {
      postId,
      content: message,
    };

    let file: ReactNativeFile | undefined;

    if (files.length > 0 && files[0].uri) {
      file = new ReactNativeFile({
        uri: files[0].uri,
        name: files[0].fileName,
        type: files[0].type,
      });

      forumComment.image = file;
    }

    if (document && document.uri) {
      file = new ReactNativeFile({
        uri: document.uri,
        name: document.name,
        type: document.type!,
      });

      forumComment.document = file;
    }

    if (!forumComment.image && !forumComment.content) {
      setLoading(false);
      ToastService.showToast({
        message: 'Comment',
        description: 'Add sommething before comment',
        type: 'danger',
      });

      return;
    }

    addComment({
      variables: {
        comment: forumComment,
      },
    });
  };

  const renderItem: ListRenderItem<QueryForumPostCommentRelayPagination_forumCommentPaginationRelay_edges> =
    useCallback(
      ({ item, index }) =>
        index % 3 === 0 ? (
          <View>
            <View style={styles.comments}>
              <KwComment comment={item.node} />
            </View>
            <KwAds type="notes" />
          </View>
        ) : (
          <View style={styles.comments}>
            <KwComment comment={item.node} />
          </View>
        ),
      [],
    );

  const renderFooter = () => {
    if (fetchingComments && forumPostCommentPagination?.pageInfo.hasNextPage) {
      return (
        <View style={{ paddingBottom: 60, paddingTop: 20 }}>
          <ActivityIndicator size="large" color={colors.app.primary} />
        </View>
      );
    }
    return <View style={{ paddingBottom: 60 }} />;
  };

  const renderEmpty = () => (
    <View style={styles.noCommentBox}>
      <Text style={styles.noCommentText}>No Comment for this post</Text>
      <KwAds />
    </View>
  );

  const renderHeader = () => (
    <>
      <KwHearder back title={title} avatar="https://via.placeholder.com/150" />
      <View style={styles.containerDetail}>
        {queryForumPostById?.data?.forumPostById ? (
          <KwDetailCard
            post={queryForumPostById!.data!.forumPostById}
            onPressCard={() => {}}
          />
        ) : null}

        <View style={styles.marginComment}>
          <Text style={styles.textComment}>
            {queryForumPostById.data?.forumPostById?.commentCount || ''} Answers
          </Text>
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.container_one}>
      <FlatList
        initialNumToRender={5}
        data={forumPostCommentPagination?.edges || []}
        refreshing={queryForumPostCommentPagination.loading}
        renderItem={renderItem}
        onEndReached={fetchMore}
        onRefresh={onRefresh}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        ListHeaderComponent={renderHeader}
        keyExtractor={(it) => `${it.node?._id}`}
      />
      <View style={{ marginTop: 60 }}>
        <KwCommentInput
          isLoading={loading}
          onSendComment={(message, files, document) => {
            if (auth?.user) {
              setLoading(true);
              sendComment(message, files, document);
            } else {
              Alert.alert(
                "Can't ask question",
                'You you must be login to be able ask a question',
                [
                  {
                    text: 'Not now',
                    style: 'cancel',
                  },
                  {
                    text: 'Login',
                    onPress: () => {
                      navigation.navigate('login');
                    },
                  },
                ],
              );
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container_one: {
    flex: 1,
    backgroundColor: colors.app.backgrounfGray,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  comments: {
    margin: 5,
    borderColor: colors.app.white,
  },
  containerDetail: { paddingHorizontal: 5 },
  noCommentBox: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCommentText: {
    fontSize: 16,
    color: colors.app.black,
  },
  textComment: { margin: 5, color: colors.app.black, fontSize: 16 },
  marginComment: {
    marginVertical: 10,
  },
});

export default ForumDetailScreen;

interface ForumPostDetailScreenProps {
  route: RouteProp<ForumStackParamList, typeof ForumStackRouteList.ForumDetail>;

  navigation: StackNavigationProp<
    ForumStackParamList,
    typeof ForumStackRouteList.ForumDetail
  >;
}
