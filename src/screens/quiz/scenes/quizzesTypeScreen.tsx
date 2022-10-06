import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { colors, images } from '@KwSrc/utils';
import { StackScreenProps } from '@react-navigation/stack';
import i18n from '@KwSrc/config/i18n/i18n';
import { StyleSheet, View, FlatList, ListRenderItem, Text } from 'react-native';
import { KwContainer } from '@KwSrc/components/container';

import { KwQuizCard } from '@KwSrc/components/card/quizCard';
import KwPickerInput, { Iitem } from '@KwSrc/components/picker/pickerInput';
import { KwListItemQuiz } from '@KwSrc/components/listItem/listItemQuiz';
import { useQuery } from '@apollo/client';
import {
  QueryQuizTopPlayers,
  QueryQuizTopPlayers_quizTopPlayers,
} from '../graphql/__generated__/QueryQuizTopPlayers';
import { QUERY_QUIZ_TOP_PLAYER } from '../graphql/queries';
import { QuizzesStackRouteList } from '../constants';

const QuizzesTypeScreen: FunctionComponent<StackScreenProps<any>> = ({
  navigation,
}) => {
  // const navigation = useNavigation<any>();
  const [competitionPeriod, setCompetitionPeriod] = useState<Iitem>();

  const queryTopPlayer = useQuery<QueryQuizTopPlayers>(QUERY_QUIZ_TOP_PLAYER, {
    variables: {
      range: competitionPeriod?.value,
    },
    fetchPolicy: 'network-only',
  });

  const quizTop = useMemo<
    (QueryQuizTopPlayers_quizTopPlayers | null)[] | null | undefined
  >(() => queryTopPlayer.data?.quizTopPlayers, [queryTopPlayer.data]);

  // useEffect(() => {
  //   queryTopPlayer.refetch();
  // }, [competitionPeriod, queryTopPlayer]);

  const renderItem: ListRenderItem<QueryQuizTopPlayers_quizTopPlayers | null> =
    useCallback(
      ({ item }) => (
        <View>
          <KwListItemQuiz
            uri={item?.player?.avatar?.url!}
            title={item!.player?.name!}
            onPress={() => {}}
            time={String(item!.playCount)}
            number={item?.rank! < 10 ? `0${item!.rank}` : item?.rank}
            style={styles.list}
          />
        </View>
      ),
      [],
    );

  const renderHeader = () => (
    <View>
      <View style={styles.quizCardContainer}>
        <KwQuizCard
          style={styles.quizCard}
          titleStyle={{ fontSize: 16 }}
          title="Competional quiz"
          uri={images.quizCupImage}
          onPress={() => {
            navigation.navigate(QuizzesStackRouteList.CompetitionQuizzesType);
          }}
        />
        <KwQuizCard
          style={[styles.quizCard, { backgroundColor: colors.app.darkBlue }]}
          titleStyle={styles.titleQuiz}
          title={i18n.t('COMMON__NORMAL_QUIZZES')}
          uri={images.medalImage}
          onPress={() => {
            navigation.navigate(QuizzesStackRouteList.QuizzesSubjectList, {
              id: '5f3ad38d22acf64a888b8b89',
            });
          }}
        />
      </View>
      <View />
    </View>
  );

  const renderFooter = () => <View />;

  const renderEmpty = () => <View />;

  const period: Iitem[] = [
    { label: 'Weekly', value: 'week' },
    { label: 'Daily', value: 'day' },
    { label: 'Monthly', value: 'month' },
  ];
  return (
    <View style={styles.container_one}>
      {renderHeader()}
      <KwContainer style={styles.container}>
        <View>
          <View style={styles.titleView}>
            <Text style={styles.title}>
              {i18n.t('COMPONNENT__TOP_PLAYER_TEXT')}
            </Text>
            <KwPickerInput
              selectedItem={competitionPeriod}
              onSelectedItem={(it) => {
                setCompetitionPeriod(it);
              }}
              data={period}
              placeholder="Weekly"
            />
          </View>
        </View>
        <FlatList
          initialNumToRender={5}
          keyExtractor={(item) => item?.player?._id!}
          data={quizTop || []}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
        />
      </KwContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container_one: {
    flex: 1,
    backgroundColor: colors.app.primary,
    paddingHorizontal: 12,
    paddingBottom: 170,
  },
  container: {
    marginTop: 15,
    height: '89%',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  list: {
    marginTop: 10,
  },
  MT8: {
    marginTop: 8,
  },
  title: {
    fontWeight: 'bold',
    color: colors.app.black,
    fontSize: 16,
  },
  quizCardContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  quizCard: {
    backgroundColor: colors.app.lightpurple,
    borderColor: colors.app.primary,
    width: '48%',
  },
  titleQuiz: { fontSize: 16, color: colors.text.white },
});

export default QuizzesTypeScreen;
