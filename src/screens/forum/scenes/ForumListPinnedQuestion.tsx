import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
// import i18n from '@KwSrc/config/i18n/i18n';
import { KwCard } from '@KwSrc/components/card';
import { colors } from '@KwSrc/utils';
import { StackScreenProps } from '@react-navigation/stack';

import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import KwIcon from '@KwSrc/components/Icon';
import { useQuery } from '@apollo/client';
import { selectAuth } from '@KwSrc/store/reducers/users';
import { useSelector } from 'react-redux';
import { ForumStackRouteList } from '../constants';
import { QUERY_FORUM_POST_MANY } from '../graphql/queries';
import {
  QueryForumPostMany,
  QueryForumPostManyVariables,
  QueryForumPostMany_forumPostMany,
} from '../graphql/__generated__/QueryForumPostMany';
import { FragmentForumPostBase } from '../graphql/__generated__/FragmentForumPostBase';

const ForumListPinnedQuestionScreen: FunctionComponent<
  StackScreenProps<any>
> = ({ navigation }) => {
  const auth = useSelector(selectAuth);

  const queryPinnedPostPagination = useQuery<
    QueryForumPostMany,
    QueryForumPostManyVariables
  >(QUERY_FORUM_POST_MANY, {
    variables: { filter: { pinned: true } },
    fetchPolicy: 'network-only',
  });

  const [pinnedPost, setPinnedPost] = useState<
    QueryForumPostMany_forumPostMany[] | undefined | null
  >(queryPinnedPostPagination.data?.forumPostMany);

  useEffect(() => {
    setPinnedPost(queryPinnedPostPagination.data?.forumPostMany);
  }, [queryPinnedPostPagination.data]);

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

  const renderFooter = () => <View />;

  const renderEmpty = () => <View />;

  if (queryPinnedPostPagination.loading) {
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
        keyExtractor={(it) => `${it?._id}`}
        data={pinnedPost || []}
        refreshing={queryPinnedPostPagination.loading}
        onRefresh={() => queryPinnedPostPagination.refetch()}
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
  container: {
    flex: 1,
    backgroundColor: colors.app.backgrounfGray,
    paddingHorizontal: 10,
    justifyContent: 'center',
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

export default ForumListPinnedQuestionScreen;
