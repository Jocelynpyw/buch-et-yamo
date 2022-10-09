import React, {
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { colors } from '@KwSrc/utils';
import i18n from '@KwSrc/config/i18n/i18n';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  useWindowDimensions,
} from 'react-native';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import { KwContainer } from '@KwSrc/components/container';
import * as Progress from 'react-native-progress';
import KwIcon from '@KwSrc/components/Icon';
import { KwButton } from '@KwSrc/components/button';
import KwCheckbox from '@KwSrc/components/checkbox';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectAuth } from '@KwSrc/store/reducers/users';
import { useMutation } from '@apollo/client';
import RenderHtml from 'react-native-render-html';
import KwHearder from '@KwSrc/components/header';
import { KwAds } from '@KwSrc/components/ads';
import { QuizzesStackParamList, QuizzesStackRouteList } from '../constants';
import { QUESTION_CREATE_SESSION } from '../graphql/mutations';
import QuizResultScreen from './quizResultScreen';

interface QuizPlayScreenProps {
  route: RouteProp<
    QuizzesStackParamList,
    typeof QuizzesStackRouteList.QuizPlay
  >;
  navigation: StackNavigationProp<
    QuizzesStackParamList,
    typeof QuizzesStackRouteList.QuizPlay
  >;
}
const tagsStyles = {
  p: {
    whiteSpace: 'normal',
    color: 'black',
  },
  a: {
    color: colors.app.primary,
  },
};

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-6915392312901512/1958244117';

const interstitial = InterstitialAd.createForAdRequest(adUnitId);

const QuizPlayScreen: FunctionComponent<QuizPlayScreenProps> = ({
  navigation,
  route,
}) => {
  const { data, name, competitionId } = route.params;
  const { user } = useSelector(selectAuth);
  const [index, setIndex] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [ans, setAns] = useState<number>(-1);
  const [go, setGo] = useState<Boolean>(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const scrollRef = useRef<any>();
  const [createSessionQuestion] = useMutation(QUESTION_CREATE_SESSION);

  // Time
  const [counter, setCounter] = useState<number>(competitionId ? 1800 : 480);
  const [startTimer, setStartTimer] = useState<Boolean>(true);
  const [mins, setMins] = useState<number | string>(0);
  const [secs, setSecs] = useState<number | string>(0);
  const [end, setEnd] = useState<Boolean>(false);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (go === true) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        Alert.alert('Quitting quiz', 'Your about to leave the quiz.', [
          {
            text: 'Leave',
            style: 'cancel',
            onPress: () => {
              if (!loaded) {
                interstitial.show();
                setEnd(true);
                navigation.dispatch(e.data.action);
              } else {
                setEnd(true);
                navigation.dispatch(e.data.action);
              }
              // setShow(true);
            },
          },
          {
            text: "Don't leave",
            style: 'destructive',

            onPress: () => {},
          },
        ]);
      }),
    [go, loaded, navigation],
  );

  const timer = useCallback(() => {
    if (counter > 0) {
      setTimeout(() => {
        const minutes = parseInt(String((counter - 1) / 60), 10);
        const seconds = parseInt(String((counter - 1) % 60), 10);

        setMins(minutes < 10 ? `0${minutes}` : minutes);
        setSecs(seconds < 10 ? `0${seconds}` : seconds);
        setCounter(counter - 1);
      }, 1000);
    }

    if (counter === 0 && startTimer) {
      setStartTimer(false);
      setEnd(true);
      // setShow(true);
    }
  }, [counter, startTimer]);

  useEffect(() => {
    timer();
  }, [counter, startTimer, timer]);

  const validateAns = () => {
    if (ans === -1) {
      Alert.alert(
        'Please select an answer',
        'You  must select an answer to move to the next question',
        [{ text: 'Okay', style: 'cancel', onPress: () => {} }],
      );
    } else {
      answers.push(ans);
      setAnswers(answers);

      const { isCorrect } =
        data.quizSessionCreateOne.record.questions[index].answers[ans];

      const CreateOneQuestionSessionInput = {
        quizSessionId: data.quizSessionCreateOne.record._id,
        questionId: data.quizSessionCreateOne.record.questions[index]._id,
        answers: [
          {
            _id: data.quizSessionCreateOne.record.questions[index].answers[ans]
              ._id,
          },
        ],
      };

      createSessionQuestion({
        variables: {
          record: CreateOneQuestionSessionInput,
        },
      });

      if (isCorrect === true) {
        const temp: number = points + 1;
        setPoints(temp);
        const tempIndex: number = index + 1;
        setAns(-1);
        setIndex(tempIndex);
        scrollRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
      } else {
        const tempIndex: number = index + 1;
        setAns(-1);

        setIndex(tempIndex);
        scrollRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
      }
    }
  };

  const selectedAns = (ansIndex: number) => {
    setAns(ansIndex);
  };
  const { width } = useWindowDimensions();

  const renderQuestions = () =>
    data.quizSessionCreateOne.record.questions.map((item: any, i: number) => {
      if (i === index) {
        return (
          <Fragment key={item._id}>
            <View>
              <View style={styles.number}>
                <View style={styles.row}>
                  <Text style={styles.bold}>Question {index + 1}</Text>
                  <Text style={styles.questionNumber}>
                    /{data.quizSessionCreateOne.record.questions.length}
                  </Text>
                </View>
                <View style={styles.row}>
                  <KwIcon
                    name="clock_blue"
                    width="40"
                    height="40"
                    viewBox="-22 -4 40 40"
                  />
                  <Text style={styles.blue}>
                    {mins}:{secs}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Progress.Bar
                color={colors.app.primary}
                height={5}
                unfilledColor={colors.app.backgroundGrey}
                borderColor="none"
                borderWidth={0}
                progress={
                  (index + 1) /
                  data.quizSessionCreateOne.record.questions.length
                }
                width={width - 50}
              />
            </View>
            <View>
              <View style={styles.question}>
                <RenderHtml
                  contentWidth={width}
                  source={{
                    html: `<p>${item.content}<p/>`,
                  }}
                  tagsStyles={tagsStyles}
                  enableExperimentalMarginCollapsing
                />
                {!!item.image && (
                  <Image
                    style={styles.image}
                    source={{ uri: item.image.url }}
                    resizeMode="contain"
                  />
                )}

                {item.answers.map((items: any, indexs: number) => (
                  <View style={styles.MT30} key={items._id}>
                    <KwCheckbox
                      labelRight
                      label={items.text}
                      value={indexs.toString()}
                      image={!!items.image}
                      imageStyle={styles.image}
                      imageUrl={items.image?.url}
                      rounded
                      onPress={(state) => {
                        if (state.checked) {
                          selectedAns(indexs);
                        } else {
                          selectedAns(-1);
                        }
                      }}
                    />
                  </View>
                ))}
              </View>
              <View style={styles.buttons}>
                <KwButton
                  onPress={() => {
                    validateAns();
                  }}
                  children={i18n.t('COMMON__CONTINUE')}
                  size="md"
                  iconButton
                  iconButtonRight
                  textStyle={{
                    fontSize: 14,
                  }}
                  icon={
                    <KwIcon
                      name="chevron_right"
                      fill="none"
                      stroke={colors.app.white}
                      width="30"
                      height="30"
                      viewBox="0 -10 7 30"
                    />
                  }
                  color={colors.app.primary}
                  tintColor={colors.app.white}
                  style={{ width: '40%' }}
                />
              </View>
              <KwAds type="notes" />
            </View>
          </Fragment>
        );
      }

      return <View />;
    });

  if (index + 1 > data.quizSessionCreateOne.record.questions.length || end) {
    return (
      <QuizResultScreen
        navigation={navigation}
        route={route}
        data={{
          points,
          questions: data.quizSessionCreateOne.record.questions.length,
          image: user?.avatar!,
        }}
      />
    );
    // navigation.navigate(QuizzesStackRouteList.QuizResult);
  }

  return (
    <ScrollView style={styles.container_one}>
      <View style={styles.header}>
        <KwHearder back avatar="https://via.placeholder.com/150" title={name} />
      </View>
      <KwContainer>{renderQuestions()}</KwContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container_one: {
    flex: 1,
    backgroundColor: colors.app.primary,
    paddingHorizontal: 10,
  },

  row: { flexDirection: 'row' },
  number: { flexDirection: 'row', justifyContent: 'space-between' },
  bold: { fontSize: 18, fontWeight: 'bold' },
  bold1: { fontWeight: 'bold' },
  questionNumber: {
    color: colors.text.grey,

    marginLeft: 5,
    marginTop: 3,
  },
  blue: { color: colors.text.blue },
  question: {
    marginTop: 40,
    backgroundColor: colors.app.white,
    borderRadius: 12,
    padding: 20,
  },
  MT30: { marginTop: 30 },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginVertical: 30,
  },
  image: {
    height: 250,
    marginVertical: 10,
    width: '100%',
    marginTop: 20,
  },
  header: {
    backgroundColor: colors.app.primary,
    paddingBottom: 10,
  },
});

export default QuizPlayScreen;
