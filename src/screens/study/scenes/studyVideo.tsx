import { KwButton } from '@KwSrc/components/button';
import PrHeader from '@KwSrc/components/header';
import KwIcon from '@KwSrc/components/Icon';
import { KwListItemVideo } from '@KwSrc/components/listItem/listItemVideo';
import { colors } from '@KwSrc/utils';
import moment from 'moment';
import i18n from '@KwSrc/config/i18n/i18n';
import React, { FunctionComponent, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ListRenderItem,
  FlatList,
  Text,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { QUERY_CORRECTION_LEVEL_BY_ID } from '@KwSrc/screens/answers/graphql/queries';
import { useQuery } from '@apollo/client';
import {
  QueryCorrectionLevelById,
  QueryCorrectionLevelByIdVariables,
  QueryCorrectionLevelById_correctionCategoryById_children,
} from '@KwSrc/screens/answers/graphql/__generated__/QueryCorrectionLevelById';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { AuthSignInAction } from '@KwSrc/store/actions';
import { selectAuth } from '@KwSrc/store/reducers/users';
import { QUERY_TOP_VIDEOS } from '../graphql/queries';
import { StudyStackParamList, StudyStackRouteList } from '../route/contants';
import {
  QueryTopVideo,
  QueryTopVideoVariables,
} from '../graphql/__generated__/QueryTopVideo';

const StudyVideoScreen: FunctionComponent<StudyVideoScreenProps> = ({
  navigation,
}) => {
  const auth = useSelector(selectAuth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth?.refreshToken) {
      axios({
        url: '/auth/refresh-access-token',
        method: 'GET',

        headers: {
          'X-Auth': `${auth?.refreshToken}`,
        },
      }).then((res) => {
        dispatch(AuthSignInAction(res.data));
      });
    }
  }, [auth?.refreshToken, dispatch]);

  const queryCategory = useQuery<
    QueryCorrectionLevelById,
    QueryCorrectionLevelByIdVariables
  >(QUERY_CORRECTION_LEVEL_BY_ID, {
    variables: {
      levelId: '63409173d6bc2d01600d11ab',
    },
    fetchPolicy: 'network-only',
  });

  const oneWeekAggeMyDayTransform = moment()
    .subtract(30, 'days')
    .calendar()
    .split('/');
  const reelOneWeekAgo = oneWeekAggeMyDayTransform[2]
    .concat('-', oneWeekAggeMyDayTransform[0])
    .concat('-', oneWeekAggeMyDayTransform[1]);

  const queryTrending = useQuery<QueryTopVideo, QueryTopVideoVariables>(
    QUERY_TOP_VIDEOS,
    {
      variables: {
        startDate: moment().format('YYYY-MM-DD'),
        endDate: reelOneWeekAgo,
      },
      fetchPolicy: 'network-only',
    },
  );

  const renderItem: ListRenderItem<
    QueryCorrectionLevelById_correctionCategoryById_children
  > = ({ item }) => (
    <View style={styles.item}>
      <KwListItemVideo
        uri={{
          uri: item.image?.url,
        }}
        title={item.name}
        text={`${String(item.description).slice(0, 50)}...`}
        number={item.children.length}
        onPress={() => {
          navigation.navigate(StudyStackRouteList.StudyVideoCategory, {
            id: item._id,
            url: String(item.image?.url),
            name: item.name,
            description: String(item.description),
          });
        }}
      />
    </View>
  );

  const renderItemCategory: ListRenderItem<
    QueryCorrectionLevelById_correctionCategoryById_children
  > = ({ item }) => (
    <View style={styles.cat}>
      <KwButton
        color={colors.app.white}
        textStyle={styles.textButton}
        size="md"
        children={item.name}
      />
    </View>
  );
  const renderItemVideo: ListRenderItem<any> = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(StudyStackRouteList.StudyVideoDetails, {
          title: item.name,
          description: String(item.description),
          studyId: item._id,
          media: item.media!,
          subjectId: item.subjectId!,
        });
      }}
    >
      <ImageBackground
        resizeMode="cover"
        style={styles.imagebg}
        source={{
          uri: item.featuredImage.url,
        }}
      >
        <LinearGradient colors={['#fffff000', '#37558A']} style={styles.linear}>
          <View style={styles.btplay}>
            <KwIcon name="play" width={60} height={60} viewBox="0 0 40 40" />
          </View>
          <Text style={styles.trending}>{item.name}</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>Top Videos</Text>
      </View>
      <FlatList
        horizontal
        data={queryTrending.data?.videoTopTen || []}
        renderItem={renderItemVideo}
        keyExtractor={(item) => item!._id}
      />
      <View>
        <Text style={styles.headerTitle}>
          {i18n.t('COMMON__VIDEOS_SUBJECT')}
        </Text>
      </View>
      <FlatList
        horizontal
        data={queryCategory?.data?.correctionCategoryById?.children || []}
        renderItem={renderItemCategory}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
  if (queryCategory?.loading || queryTrending.loading) {
    return (
      <View style={styles.background}>
        <PrHeader
          back
          title="Video Tutorials"
          avatar="https://via.placeholder.com/150"
        />
        <ActivityIndicator size="large" color={colors.app.white} />
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <PrHeader
        back
        title="Video Tutorials"
        avatar="https://via.placeholder.com/150"
      />

      <FlatList
        style={styles.flatlist}
        initialNumToRender={5}
        keyExtractor={(item) => item._id}
        data={queryCategory?.data?.correctionCategoryById?.children || []}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.app.primary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.app.white,
  },
  columnStyle: {
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  image: {
    width: 60,
    height: 60,
  },
  compTitle: {
    textAlign: 'center',
    color: colors.app.black,
    paddingTop: 5,
    fontFamily: 'Roboto-Light',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Roboto-Light',
  },
  titleDesc: {
    flexShrink: 1, // fixes overflow on text exceeding view
    fontFamily: 'Roboto-Light',
  },
  compBox: {
    backgroundColor: colors.app.black,
    borderRadius: 5,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 2,
    marginHorizontal: 5,
    marginVertical: 5,
    width: '45%',
  },
  item: {
    marginVertical: 5,
  },
  selectCountryText: {
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: 'Roboto-Light',
  },
  text: {
    alignItems: 'center',
  },
  linear: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingRight: 15,
  },
  list: { borderBottomWidth: 0 },
  flatlist: {
    backgroundColor: colors.app.backgrounfGray,
    marginHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginVertical: 0,
    paddingHorizontal: 10,
  },
  headerTitle: {
    justifyContent: 'center',
    fontSize: 21,
    fontWeight: '700',
    color: colors.text.headerColor,
    alignSelf: 'flex-start',
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  header: { flex: 1, marginVertical: 10 },
  textButton: { color: colors.text.primary, paddingHorizontal: 15 },
  cat: { marginHorizontal: 10 },
  play: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 10000,
  },
  btplay: { zIndex: 100000, position: 'absolute', top: 50, left: 120 },
  trending: {
    color: colors.app.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    margin: 10,
    fontWeight: '300',
    fontSize: 12,
  },
  imagebg: {
    width: 300,
    height: 150,
    marginHorizontal: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
});

interface StudyVideoScreenProps {
  route: RouteProp<StudyStackParamList, typeof StudyStackRouteList.StudyVideo>;
  navigation: StackNavigationProp<
    StudyStackParamList,
    typeof StudyStackRouteList.StudyVideo
  >;
}

export default StudyVideoScreen;
