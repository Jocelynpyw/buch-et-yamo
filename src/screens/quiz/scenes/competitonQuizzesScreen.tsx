import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { colors, images } from '@KwSrc/utils';
import { StackNavigationProp } from '@react-navigation/stack';
import i18n from '@KwSrc/config/i18n/i18n';
import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from 'react-native';
import { KwListItemSimple } from '@KwSrc/components/listItem/listItemSimple';
import { KwContainer } from '@KwSrc/components/container';
import { useQuery } from '@apollo/client';

import { RouteProp } from '@react-navigation/native';
import { QuizzesStackParamList, QuizzesStackRouteList } from '../constants';
import {
  QueryQuizCompetitionMany,
  QueryQuizCompetitionMany_quizCompetitionMany,
} from '../graphql/__generated__/QueryQuizCompetitionMany';
import { QUERY_COMPETITION_QUIZ_MANY } from '../graphql/queries';

interface QuizCompetitionScreenProps {
  route: RouteProp<
    QuizzesStackParamList,
    typeof QuizzesStackRouteList.CompetitionQuizzes
  >;
  navigation: StackNavigationProp<
    QuizzesStackParamList,
    typeof QuizzesStackRouteList.CompetitionQuizzes
  >;
}

const CompetitionQuizzesScreen: FunctionComponent<
  QuizCompetitionScreenProps
> = ({ navigation }) => {
  const queryQuizCompetition = useQuery<QueryQuizCompetitionMany>(
    QUERY_COMPETITION_QUIZ_MANY,
    {
      nextFetchPolicy: 'network-only',
    },
  );

  const quizCompetition = useMemo<
    QueryQuizCompetitionMany_quizCompetitionMany[] | undefined | null
  >(
    () => queryQuizCompetition.data?.quizCompetitionMany,
    [queryQuizCompetition.data],
  );

  const renderItem: ListRenderItem<QueryQuizCompetitionMany_quizCompetitionMany> =
    useCallback(
      ({ item }) => (
        <KwListItemSimple
          uri={images.quizImage}
          title={i18n.t('COMPONENT_ADVANCE_LEVEL')}
          description={item.description?.replace(/<[^>]+>/g, '')}
          onPress={() => {
            navigation.navigate(QuizzesStackRouteList.QuizDetails, {
              id: item.quizIds ? item.quizIds[0]! : '',
              name: item.name,
              content: item.description ? item.description : '',
              competitionId: item?._id,
            });
          }}
        />
      ),
      [navigation],
    );

  const renderFooter = () => <View />;

  const renderEmpty = () => <View />;

  if (queryQuizCompetition.loading) {
    return (
      <View style={styles.container_one}>
        <ActivityIndicator size="large" color={colors.app.white} />
      </View>
    );
  }

  return (
    <View style={styles.container_one}>
      <KwContainer textStyle={{ fontSize: 20 }} style={styles.container}>
        <FlatList
          initialNumToRender={5}
          keyExtractor={(it) => it?._id}
          data={quizCompetition || []}
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
    paddingHorizontal: 10,
  },
  container: {
    height: '98%',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  title: {
    fontWeight: 'bold',
    color: colors.app.black,
    fontSize: 16,
  },
});

export default CompetitionQuizzesScreen;
