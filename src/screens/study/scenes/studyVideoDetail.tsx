import { colors } from '@KwSrc/utils';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import KwCommentInput from '@KwSrc/components/commentInput';
import { useMutation, useQuery } from '@apollo/client';
import KwComment from '@KwSrc/components/comment';
import { KwAds } from '@KwSrc/components/ads';
import { ToastService } from '@KwSrc/services';
import KwHearder from '@KwSrc/components/header';
import { KwDetailVideoCard } from '@KwSrc/components/card/detailVideoCard';
import { StudyStackParamList, StudyStackRouteList } from '../route/contants';
import { QUERY_VIDEO_COMMENT_RELAY_PAGINATION } from '../graphql/queries';
import {
  QueryVideoCommentRelayPagination,
  QueryVideoCommentRelayPaginationVariables,
  QueryVideoCommentRelayPagination_videoCommentRelayPagination,
} from '../graphql/__generated__/QueryVideoCommentRelayPagination';
import {
  MUTATION_ADD_VIDEO_COMMENT,
  MUTATION_VIEW_COUNT,
} from '../graphql/mutation';
import {
  MutationAddVideoComment,
  MutationAddVideoCommentVariables,
} from '../graphql/__generated__/MutationAddVideoComment';
import {
  MutationViewCount,
  MutationViewCountVariables,
} from '../graphql/__generated__/MutationViewCount';

const StudyVideoDetailScreen: FunctionComponent<
  StudyVideoDetailScreenProps
> = ({ route }) => {
  const { title, description, media, studyId } = route.params;

  const [fetchingComments, setFetchingComments] = useState(false);
  const [loading, setLoading] = useState(false);

  const queryVideoPostCommentPagination = useQuery<
    QueryVideoCommentRelayPagination,
    QueryVideoCommentRelayPaginationVariables
  >(QUERY_VIDEO_COMMENT_RELAY_PAGINATION, {
    variables: {
      filter: { videoId: studyId },
    },
    fetchPolicy: 'network-only',
  });

  const [videoCommentPagination, setVideoCommentPagination] = useState<
    | QueryVideoCommentRelayPagination_videoCommentRelayPagination
    | null
    | undefined
  >(queryVideoPostCommentPagination.data?.videoCommentRelayPagination);

  useEffect(() => {
    setVideoCommentPagination(
      queryVideoPostCommentPagination.data?.videoCommentRelayPagination,
    );
  }, [queryVideoPostCommentPagination.data]);

  const [addComment] = useMutation<
    MutationAddVideoComment,
    MutationAddVideoCommentVariables
  >(MUTATION_ADD_VIDEO_COMMENT, {
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
  const [videoCountView] = useMutation<
    MutationViewCount,
    MutationViewCountVariables
  >(MUTATION_VIEW_COUNT);

  useEffect(() => {
    videoCountView({
      variables: {
        videoId: studyId,
      },
    });
  }, [0]);

  const fetchMore = useCallback(() => {
    if (videoCommentPagination?.pageInfo.hasNextPage) {
      setFetchingComments(true);

      queryVideoPostCommentPagination.fetchMore({
        query: QUERY_VIDEO_COMMENT_RELAY_PAGINATION,
        variables: {
          filter: { videoId: studyId },
          cursor: videoCommentPagination.pageInfo.endCursor,
        },
      });
    }
  }, [
    videoCommentPagination?.pageInfo,
    studyId,
    queryVideoPostCommentPagination,
  ]);

  const onRefresh = useCallback(() => {
    queryVideoPostCommentPagination.refetch();
  }, [queryVideoPostCommentPagination]);

  const sendComment = (message: string) => {
    const forumComment: any = {
      videoId: studyId,
      content: message,
    };

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

  const renderItem: ListRenderItem<any> = useCallback(
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
    if (fetchingComments && videoCommentPagination?.pageInfo.hasNextPage) {
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
      <Text style={styles.noCommentText}>No Comment for this video</Text>
      <KwAds />
    </View>
  );

  const renderHeader = () => (
    <>
      <KwHearder back title={title} avatar="https://via.placeholder.com/150" />
      <View style={styles.containerDetail}>
        <KwDetailVideoCard
          description={description}
          title={title}
          media={media}
        />

        <View style={styles.marginComment}>
          <Text style={styles.textComment}>
            {/* {queryVideoPostById.data?.videoById?.commentCount || ''}{' '} */}
            Comments
          </Text>
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.container_one}>
      <FlatList
        initialNumToRender={5}
        data={videoCommentPagination?.edges || []}
        refreshing={queryVideoPostCommentPagination.loading}
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
          showbtn={false}
          onSendComment={(message, files, document) => {
            setLoading(true);
            sendComment(message);
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

interface StudyVideoDetailScreenProps {
  route: RouteProp<
    StudyStackParamList,
    typeof StudyStackRouteList.StudyVideoDetails
  >;
  navigation: StackNavigationProp<
    StudyStackParamList,
    typeof StudyStackRouteList.StudyVideoDetails
  >;
}

export default StudyVideoDetailScreen;
