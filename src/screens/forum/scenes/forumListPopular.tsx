import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import i18n from '@KwSrc/config/i18n/i18n';
import { KwCard } from '@KwSrc/components/card';
import { colors } from '@KwSrc/utils';
import { StackScreenProps } from '@react-navigation/stack';

import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import KwIcon from '@KwSrc/components/Icon';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { selectAuth } from '@KwSrc/store/reducers/users';
import { ForumStackRouteList } from '../constants';
import {
  QueryForumPostPopular,
  QueryForumPostPopular_forumPostPopular,
} from '../graphql/__generated__/QueryForumPostPopular';
import { QUERY_POST_POPULAR_PAGINATION } from '../graphql/queries';
import { FragmentForumPostBase } from '../graphql/__generated__/FragmentForumPostBase';

const ForumListPopularScreen: FunctionComponent<StackScreenProps<any>> = ({
  navigation,
}) => {
  const auth = useSelector(selectAuth);

  const [fetchingPopularPost, setFetchingPopularPost] = useState(false);

  const queryPopularPostPagination = useQuery<QueryForumPostPopular>(
    QUERY_POST_POPULAR_PAGINATION,
    {
      variables: { page: 1 },
      fetchPolicy: 'network-only',
    },
  );

  const [popularPostPagination, setPopularPostPagination] = useState<
    QueryForumPostPopular_forumPostPopular | undefined | null
  >(queryPopularPostPagination.data?.forumPostPopular);

  useEffect(() => {
    setPopularPostPagination(queryPopularPostPagination.data?.forumPostPopular);
  }, [queryPopularPostPagination.data]);

  const fetchMorePopularPost = useCallback(() => {
    if (
      !fetchingPopularPost &&
      !queryPopularPostPagination.loading &&
      popularPostPagination?.pageInfo.hasNextPage
    ) {
      setFetchingPopularPost(true);

      queryPopularPostPagination
        .fetchMore({
          query: QUERY_POST_POPULAR_PAGINATION,
          variables: {
            page: popularPostPagination!.pageInfo.currentPage + 1,
          },
        })
        .then((res) => {
          if (res.data?.forumPostPopular?.items !== null) {
            res.data.forumPostPopular!.items = [
              ...(popularPostPagination.items || []),
              ...(res.data?.forumPostPopular?.items || []),
            ];
            setPopularPostPagination(res.data.forumPostPopular);
          } else {
            setPopularPostPagination(res.data.forumPostPopular);
          }
          setFetchingPopularPost(false);
        });
    }
  }, [fetchingPopularPost, queryPopularPostPagination, popularPostPagination]);

  const renderItem: ListRenderItem<FragmentForumPostBase> = useCallback(
    ({ item }) => (
      <KwCard
        post={item}
        onPressCard={() => {
          navigation.navigate(ForumStackRouteList.ForumDetail, {
            postId: item._id,
            title: item.title,
          });
        }}
      />
    ),
    [navigation],
  );

  const renderFooter = () => {
    if (fetchingPopularPost && popularPostPagination?.pageInfo.hasNextPage) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.app.primary} />
        </View>
      );
    }
    return <View />;
  };

  const renderEmpty = () => <View />;

  return (
    <View style={styles.container_one}>
      <FlatList
        initialNumToRender={5}
        keyExtractor={(it) => `${it?._id}`}
        data={popularPostPagination?.items || []}
        refreshing={queryPopularPostPagination.loading}
        onEndReached={fetchMorePopularPost}
        onRefresh={() => queryPopularPostPagination.refetch()}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (auth?.user) {
            navigation.navigate(ForumStackRouteList.ForumAddQuestion);
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
      >
        <KwIcon
          name="postFloat"
          width="70"
          height="70"
          viewBox="0 0 60 60"
          fill="none"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container_one: {
    flex: 1,
    backgroundColor: colors.app.backgrounfGray,

    paddingHorizontal: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flex: 1,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ForumListPopularScreen;
