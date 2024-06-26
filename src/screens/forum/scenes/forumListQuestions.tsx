import React, { FunctionComponent, useCallback, useState } from 'react';
// import i18n from '@KwSrc/config/i18n/i18n';
import { KwCard } from '@KwSrc/components/card';
import { colors } from '@KwSrc/utils';
// import { StackScreenProps } from '@react-navigation/stack';

import {
  StyleSheet,
  View,
  ListRenderItem,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
  Text,
} from 'react-native';
import KwIcon from '@KwSrc/components/Icon';
import { useSelector } from 'react-redux';
// import { selectAppSettings } from '@KwSrc/store/reducers/app';
import { selectAuth } from '@KwSrc/store/reducers/users';
import { useQuery } from '@apollo/client';
import { FlatList } from 'react-native-gesture-handler';
import { ForumStackRouteList } from '../constants';
import {
  QueryForumPostPaginationRelay,
  QueryForumPostPaginationRelayVariables,
  QueryForumPostPaginationRelay_forumPostPaginationRelay_edges,
} from '../graphql/__generated__/QueryForumPostPaginationRelay';
import { QUERY_FORUM_POST_RELAY_PAGINATION } from '../graphql/queries';

const { height } = Dimensions.get('window');

const ForumListQuestionsScreen: FunctionComponent<any> = ({ navigation }) => {
  const auth = useSelector(selectAuth);
  const [fetching, setFetching] = useState(false);

  const queryPostPagination = useQuery<
    QueryForumPostPaginationRelay,
    QueryForumPostPaginationRelayVariables
  >(QUERY_FORUM_POST_RELAY_PAGINATION, { fetchPolicy: 'network-only' });

  const fetchMore = useCallback(() => {
    if (
      queryPostPagination.data?.forumPostPaginationRelay?.pageInfo
        .hasNextPage &&
      !queryPostPagination.loading
    ) {
      setFetching(true);
      queryPostPagination.fetchMore({
        query: QUERY_FORUM_POST_RELAY_PAGINATION,
        variables: {
          after:
            queryPostPagination.data?.forumPostPaginationRelay?.pageInfo
              ?.endCursor,
        },
      });
    }
  }, [queryPostPagination]);

  const renderItem: ListRenderItem<QueryForumPostPaginationRelay_forumPostPaginationRelay_edges> =
    useCallback(
      ({ item }) => (
        <KwCard
          post={item.node}
          onPressCard={() => {
            navigation.navigate(ForumStackRouteList.ForumDetail, {
              postId: item.node._id,
              title: item.node.title,
            });
          }}
        />
      ),
      [navigation],
    );

  // const renderItem: ListRenderItem<
  //   QueryForumPostPaginationRelay_forumPostPaginationRelay_edges
  // > = ({ item }) => (
  //   <KwCard
  //     post={item.node}
  //     onPressCard={() => {
  //       navigation.navigate(ForumStackRouteList.ForumDetail, {
  //         postId: item.node._id,
  //       });
  //     }}
  //   />
  // );

  const renderFooter = () => {
    if (
      fetching &&
      queryPostPagination.data?.forumPostPaginationRelay?.pageInfo?.hasNextPage
    ) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.app.primary} />
        </View>
      );
    }
    return <View />;
  };

  const renderEmpty = () =>
    queryPostPagination.loading ? (
      <View />
    ) : (
      <View style={styles.container}>
        <Text style={styles.itemTitle2}>
          No post for the moment, come back later 😋.
        </Text>
      </View>
    );

  if (queryPostPagination.loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.app.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container_one}>
      <FlatList
        initialNumToRender={5}
        keyExtractor={(it) => `${it.node?._id}`}
        data={queryPostPagination.data?.forumPostPaginationRelay?.edges || []}
        refreshing={queryPostPagination.loading}
        onEndReached={fetchMore}
        onRefresh={() => queryPostPagination.refetch()}
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
        {/* <KwIcon
          name="postFloat"
          width="70"
          height="70"
          viewBox="0 0 60 60"
          fill="none"
          stroke="lime"
        /> */}
        <Text style={{ fontSize: 30, color: 'white' }}>+</Text>
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
  container: {
    flex: 1,
    backgroundColor: colors.app.backgrounfGray,
    paddingHorizontal: 10,
    justifyContent: 'center',
    marginTop: 10,
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
    right: 10,
    height: 60,
    width: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: (height * 2) / 19,
    backgroundColor: colors.app.primaryOrange,
    borderRadius: 60,
  },
  itemTitle2: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 10,
    textTransform: 'capitalize',
    fontFamily: 'Roboto-Bold',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default ForumListQuestionsScreen;
