import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  LayoutChangeEvent,
  ListRenderItem,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { selectAuth } from '@KwSrc/store/reducers/users';
import KwHearder from '@KwSrc/components/header';

import { useQuery } from '@apollo/client';
import ImageModal from 'react-native-image-modal';

import moment from 'moment';
import { useSelector } from 'react-redux';
import { KwLinearGradient } from '@KwSrc/components/linearGradient';
import { colors } from '@KwSrc/utils';
import KwTabs from '@KwSrc/components/tab';
import { FragmentForumPostBase } from '@KwSrc/screens/forum/graphql/__generated__/FragmentForumPostBase';
import { KwCard } from '@KwSrc/components/card';
import { ForumStackRouteList } from '@KwSrc/screens/forum/constants';
import KwComment from '@KwSrc/components/comment';
import { KwAds } from '@KwSrc/components/ads';
import {
  QueryUsersInformation,
  QueryUsersInformationVariables,
} from '../graphql/__generated__/QueryUsersInformation';
import {
  QueryForumPostManyUser,
  QueryForumPostManyUserVariables,
} from '../graphql/__generated__/QueryForumPostManyUser';
import {
  QueryForumCommentMany,
  QueryForumCommentManyVariables,
  QueryForumCommentMany_forumCommentMany,
} from '../graphql/__generated__/QueryForumCommentMany';
import {
  QUERY_FORUM_COMMENT_MANY,
  QUERY_FORUM_POST_MANY,
  QUERY_USERS_INFO,
} from '../graphql/queries';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileScreen = ({ route, navigation }: any) => {
  const auth = useSelector(selectAuth);
  const [imageWidth, setImageWidth] = useState<number>(0);
  // console.log('routeparams', route.params);

  const queryUser = useQuery<
    QueryUsersInformation,
    QueryUsersInformationVariables
  >(QUERY_USERS_INFO, {
    variables: {
      userId: route.params.userId || auth.user?.uid,
    },
  });

  const queryUserComments = useQuery<
    QueryForumCommentMany,
    QueryForumCommentManyVariables
  >(QUERY_FORUM_COMMENT_MANY, {
    variables: {
      userId: route.params.userId || auth.user?.uid,
    },
    fetchPolicy: 'network-only',
  });
  const queryUserPost = useQuery<
    QueryForumPostManyUser,
    QueryForumPostManyUserVariables
  >(QUERY_FORUM_POST_MANY, {
    variables: {
      userId: route.params.userId || auth.user?.uid,
    },
    fetchPolicy: 'network-only',
  });

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

  const renderEmpty = () =>
    queryUserPost.loading ? (
      <ActivityIndicator size="large" color={colors.app.primary} />
    ) : (
      <View style={{ flex: 1 }}>
        <Text>You have not made any post.</Text>
      </View>
    );

  const renderCommentEmpty = () =>
    queryUserComments.loading ? (
      <ActivityIndicator size="large" color={colors.app.primary} />
    ) : (
      <View style={{ flex: 1 }}>
        <Text>You have not made any comment.</Text>
      </View>
    );

  const renderItemComment: ListRenderItem<QueryForumCommentMany_forumCommentMany> =
    useCallback(
      ({ item, index }) =>
        index % 3 === 0 ? (
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(ForumStackRouteList.ForumDetail, {
                  postId: item._id,
                  title: 'post comment',
                });
              }}
              style={styles.comments}
            >
              <KwComment comment={item} />
            </TouchableOpacity>
            <KwAds type="notes" />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ForumStackRouteList.ForumDetail, {
                postId: item._id,
                title: 'post comment',
              });
            }}
            style={styles.comments}
          >
            <KwComment comment={item} />
          </TouchableOpacity>
        ),
      [navigation],
    );

  const listTab = [
    {
      index: 0,
      label: 'POSTS',
      content: (
        <View style={styles.fatlist}>
          <View>
            <FlatList
              data={queryUserPost.data?.forumPostMany || []}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
              ListEmptyComponent={renderCommentEmpty}
            />
          </View>
        </View>
      ),
    },
    {
      index: 1,
      label: 'Comments',
      content: (
        <View style={styles.fatlist}>
          <View>
            <FlatList
              data={queryUserComments.data?.forumCommentMany || []}
              keyExtractor={(item) => item._id}
              renderItem={renderItemComment}
              ListEmptyComponent={renderEmpty}
            />
          </View>
        </View>
      ),
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <KwHearder back title={route.params.title || auth.user?.username} />

      <KwLinearGradient colors={['#FFFFFF', '#D7DDEF', '#D7DEEF']}>
        <View
          style={styles.header}
          onLayout={(event: LayoutChangeEvent) => {
            setImageWidth(event.nativeEvent.layout.width);
          }}
        >
          <View style={styles.avaterMargin}>
            <ImageModal
              isTranslucent={false}
              swipeToDismiss={false}
              resizeMode="cover"
              imageBackgroundColor="#fff"
              style={{
                width: 80,
                height: 80,
                borderRadius: 80,
                borderWidth: 1,
                borderColor: colors.app.white,
              }}
              source={{
                uri:
                  String(queryUser.data?.userById?.avatar?.url) ||
                  'https://via.placeholder.com/150',
              }}
            />
          </View>

          <View style={styles.avaterMarginLeft}>
            <View style={styles.avaterMaignBottm}>
              <Text style={styles.name}>
                {queryUser.data?.userById?.name || 'Kawlo user'}
              </Text>

              <View style={styles.line} />
            </View>

            <View style={styles.bottomText}>
              <View style={styles.textMargin}>
                <Text style={styles.points}>Answers</Text>
                <Text style={styles.textPoints}>
                  {queryUser.data?.userById?.metrics?.answers}
                </Text>
              </View>
              <View style={styles.textMargin}>
                <Text style={styles.points}>Questions</Text>
                <Text style={styles.textPoints}>
                  {queryUser.data?.userById?.metrics?.questions}
                </Text>
              </View>
              <View style={styles.textMargin}>
                <Text style={styles.points}>Joined</Text>
                <Text style={styles.textPoints}>
                  {moment(queryUser.data?.userById?.createdAt).format(
                    'MM-DD-YYYY',
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.listTab}>
          <KwTabs tabs={listTab} />
        </View>
      </KwLinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 320,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 5,
  },
  button: {},
  icon: { width: 35, height: 35, opacity: 0.8 },
  background: {
    backgroundColor: '#eeeff1',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
  },
  drawer: {
    width: 20,
    height: 20,
    marginLeft: 0,
    marginRight: 0,
  },
  listTab: {
    marginTop: 40,
  },
  input: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  marginSmallLeft: {
    marginLeft: 10,
  },
  marginHorizontal: {
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comments: {
    margin: 5,
    borderColor: colors.app.white,
  },
  header: {
    paddingVertical: 10,
    backgroundColor: colors.app.white,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignSelf: 'center',

    marginTop: 5,
    paddingTop: 25,
    paddingBottom: 30,
    width: '100%',
  },
  avaterMargin: {
    marginHorizontal: 10,
  },
  avaterMarginLeft: {
    marginLeft: 10,
  },
  avaterMaignBottm: {
    marginBottom: 5,
    marginLeft: 10,
  },
  name: {
    fontFamily: 'Muli-ExtraBold',
    color: '#3C6F95',
    fontSize: 15,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  line: {
    height: 2,
    width: '90%',
    marginVertical: 15,
    backgroundColor: '#F2F2F2',
  },
  bottomText: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textMargin: { marginHorizontal: 10 },
  points: {
    fontSize: 12,
    alignSelf: 'center',

    fontFamily: 'Muli-Light',
  },
  textPoints: {
    textAlign: 'center',
    fontFamily: 'Muli-ExtraBold',
    fontSize: 12,
  },
  headerTop: {
    marginHorizontal: 5,
  },
  marginHome: { flex: 1, marginLeft: -10, marginTop: 10 },
  fatlist: { marginVertical: 10 },
});
export default ProfileScreen;
