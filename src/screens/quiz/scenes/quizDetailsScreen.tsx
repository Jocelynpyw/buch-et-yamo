import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { colors, fontsizes, images } from '@KwSrc/utils';
import { StackNavigationProp } from '@react-navigation/stack';
// import i18n from '@KwSrc/config/i18n/i18n';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  useWindowDimensions,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { KwButton } from '@KwSrc/components/button';
import { RouteProp } from '@react-navigation/native';
import { useMutation, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { selectAuth } from '@KwSrc/store/reducers/users';
import RenderHtml from 'react-native-render-html';
import { KwListItemQuiz } from '@KwSrc/components/listItem/listItemQuiz';
import KwHearder from '@KwSrc/components/header';
import { QuizzesStackParamList, QuizzesStackRouteList } from '../constants';
import {
  QueryQuizLeaderboard,
  QueryQuizLeaderboardVariables,
  QueryQuizLeaderboard_quizLeaderboard,
} from '../graphql/__generated__/QueryQuizLeaderboard';
import { QUERY_QUIZ_LEADERBOARD } from '../graphql/queries';
import { MUTATION_QUIZ_CREATE_SESSION } from '../graphql/mutations';

interface QuizQuestionDetailsScreenProps {
  route: RouteProp<
    QuizzesStackParamList,
    typeof QuizzesStackRouteList.QuizDetails
  >;
  navigation: StackNavigationProp<
    QuizzesStackParamList,
    typeof QuizzesStackRouteList.QuizDetails
  >;
}

interface ICreateOneQuizSessionInput {
  quizId: string;
  playerId: string[];
  competitionId?: string;
}

const tagsStyles = {
  p: {
    color: '#333333',
    lineHeight: 22.5,
  },
  a: {
    color: colors.app.primary,
  },
};

const QuizDetailsScreen: FunctionComponent<QuizQuestionDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const { id, name, content, number, quizSessionCount, competitionId } =
    route.params;

  const auth = useSelector(selectAuth);
  const { user } = auth;

  const [createSession, { data: mutationData, loading: mutationLoading }] =
    useMutation(MUTATION_QUIZ_CREATE_SESSION);

  const queryLeaderBoard = useQuery<
    QueryQuizLeaderboard,
    QueryQuizLeaderboardVariables
  >(QUERY_QUIZ_LEADERBOARD, {
    variables: {
      quizId: id,
    },
    nextFetchPolicy: 'network-only',
  });
  const quizLeader = useMemo<
    (QueryQuizLeaderboard_quizLeaderboard | null)[] | null | undefined
  >(() => queryLeaderBoard.data?.quizLeaderboard, [queryLeaderBoard.data]);

  useEffect(() => {
    if (!!mutationData && mutationData.quizSessionCreateOne) {
      navigation.navigate(QuizzesStackRouteList.QuizPlay, {
        name,
        data: mutationData,
        competitionId,
      });
    }
  }, [navigation, name, competitionId, mutationData]);

  const { width } = useWindowDimensions();
  const [showMore, setShowMore] = useState<boolean>(false);

  const renderItem: ListRenderItem<QueryQuizLeaderboard_quizLeaderboard | null> =
    useCallback(
      ({ item }) => (
        <View>
          <KwListItemQuiz
            uri={item?.player?.avatar?.url!}
            title={item?.player?.name!}
            onPress={() => {}}
            score={`${String(item?.score)} / ${number}`}
            number={item?.rank! < 10 ? `0${item!.rank}` : item?.rank}
            style={styles.list}
          />
        </View>
      ),
      [number],
    );

  const renderHeader = () => (
    <View>
      <View style={styles.contain}>
        <KwHearder
          back
          textLeft={name}
          avatar="https://via.placeholder.com/150"
        />
      </View>
      <View style={styles.P10}>
        {/* <View style={styles.card}>
          <View style={styles.cardContain}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{name}</Text>
              <View style={styles.MT8}>
                <Text style={{ color: colors.app.lightGrey }}>
                  {number} {i18n.t('COMMON__QUESTION')}
                </Text>
              </View>
            </View>

            
          </View>
        </View> */}
        <View style={[styles.card, { marginTop: 10 }]}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={images.competitionImage}
            />
          </View>
          <View>
            {(content?.length || -1) > 340 ? (
              showMore ? (
                <View style={[styles.cardText]}>
                  <RenderHtml
                    enableExperimentalMarginCollapsing
                    contentWidth={width}
                    tagsStyles={tagsStyles}
                    source={{
                      html: `
                          <p style='text-align:left;'>
                          ${content}
                          </p>`,
                    }}
                  />

                  <TouchableOpacity onPress={() => setShowMore(false)}>
                    <Text style={[styles.seeMore]}>Show Less</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={[styles.cardText]}>
                  <RenderHtml
                    contentWidth={width}
                    enableExperimentalMarginCollapsing
                    tagsStyles={tagsStyles}
                    source={{
                      html: `
                          <p style="text-align:left;">
                          ${content!.slice(0, 340)}...  
                          </p>`,
                    }}
                  />

                  <TouchableOpacity
                    onPress={() => {
                      setShowMore(!showMore);
                    }}
                  >
                    <Text style={[styles.seeMore]}>Show more</Text>
                  </TouchableOpacity>
                </View>
              )
            ) : (
              <RenderHtml
                contentWidth={width}
                enableExperimentalMarginCollapsing
                source={{
                  html: `
                  <p style='text-align:left;'>
                  ${content}
                  </p>`,
                }}
              />
            )}

            <View style={styles.MT15}>
              <View style={styles.quizOne}>
                <View style={styles.li} />

                <Text style={styles.users}>Number of question : {number}</Text>
              </View>

              {!competitionId && (
                <View style={styles.quizOne}>
                  <View style={styles.li} />

                  <Text style={styles.users}>
                    Played : {quizSessionCount} times
                  </Text>
                </View>
              )}
              <View style={styles.quizOne}>
                <View style={styles.li} />

                <Text style={styles.users}>
                  Time for quiz : {competitionId ? '30 ' : '8 '}minutes
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <KwButton
              onPress={() => {
                if (user !== undefined) {
                  let CreateOneQuizSessionInput: ICreateOneQuizSessionInput = {
                    quizId: id,
                    playerId: [user.uid],
                  };

                  if (competitionId) {
                    CreateOneQuizSessionInput = {
                      competitionId,
                      ...CreateOneQuizSessionInput,
                    };
                  }
                  createSession({
                    variables: {
                      record: CreateOneQuizSessionInput,
                    },
                  });
                } else {
                  Alert.alert(
                    'Login required',
                    'You must be loggedIn to be able to play this quiz',
                    [
                      {
                        text: 'Not now',
                        style: 'cancel',
                      },
                      {
                        text: 'Login',
                        onPress: () => {
                          // navigation.navigate('login');
                        },
                      },
                    ],
                  );
                }
              }}
              rounded
              size="lg"
              color={colors.app.primary}
              children="Start Quiz"
              style={{ width: '48%' }}
              isLoading={mutationLoading}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 15,
            paddingTop: 15,
            borderTopWidth: 1,
            borderTopColor: colors.app.greyLight,
          }}
        >
          <Text
            style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}
          >
            Top Players
          </Text>

          {queryLeaderBoard.loading && (
            <ActivityIndicator size="large" color={colors.app.primary} />
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={quizLeader || []}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        keyExtractor={(it) => `${it?.player?._id}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container_one: {
    flex: 1,
    backgroundColor: colors.app.primary,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: colors.app.white,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  title: {
    fontSize: 18,
    marginTop: 2,
    color: colors.app.primary,
    fontWeight: 'bold',
  },
  image: { width: 240, height: 120, alignItems: 'flex-end' },
  imageContainer: {
    alignItems: 'center',
  },
  alertContainer: {
    backgroundColor: 'rgba(77, 118, 193, 0.17)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alert: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  box: {
    borderRadius: 15,
    backgroundColor: colors.app.primary,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.white,
  },
  number: { marginLeft: 5, fontWeight: 'bold' },
  MT8: {
    marginTop: 8,
  },
  tag: {
    color: colors.text.grey,
    fontSize: 14,
    marginTop: 15,
    textAlign: 'center',
  },
  description: {
    lineHeight: 20,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: colors.app.white,
    // shadowColor: colors.app.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 12,
    // },
    // shadowOpacity: Platform.OS === 'ios' ? 0.1 : 0.38,
    // shadowRadius: 12,

    // top: -20,
    // elevation: 5,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
  },
  cardContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contain: {
    paddingBottom: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  P10: { padding: 10 },
  PV15: { paddingVertical: 15 },
  MT15: { marginTop: 15 },
  cardText: {
    fontSize: 14,
    marginVertical: 5,
    fontWeight: '400',
    fontFamily: fontsizes.FONTS.robotoBody4.fontFamily,
    color: colors.text.black,
  },
  seeMore: {
    paddingHorizontal: 15,
    color: colors.text.blue,
  },
  li: {
    backgroundColor: colors.app.primary,
    height: 15,
    width: 15,
    borderRadius: 15,
  },
  quizOne: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'flex-start',
    marginHorizontal: 20,
  },
  users: {
    fontFamily: 'Roboto-Regular',
    marginLeft: 10,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  list: {
    marginHorizontal: 10,
  },
});

export default QuizDetailsScreen;
