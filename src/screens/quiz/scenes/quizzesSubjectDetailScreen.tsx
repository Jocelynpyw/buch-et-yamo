import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { colors, images } from '@KwSrc/utils';
import { StackNavigationProp } from '@react-navigation/stack';
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
import KwHearder from '@KwSrc/components/header';
import {
  quizManyByCategoryId,
  quizManyByCategoryIdVariables,
  quizManyByCategoryId_quizMany,
} from '../graphql/__generated__/quizManyByCategoryId';
import { QUIZ_MANY_QUERY } from '../graphql/queries';
import { QuizzesStackParamList, QuizzesStackRouteList } from '../constants';

interface QuizzesSubjectDetailScreenProps {
  route: RouteProp<
    QuizzesStackParamList,
    typeof QuizzesStackRouteList.QuizzesSubjectDetail
  >;
  navigation: StackNavigationProp<
    QuizzesStackParamList,
    typeof QuizzesStackRouteList.QuizzesSubjectDetail
  >;
  data: any;
}

const QuizzesSubjectDetailScreen: FunctionComponent<
  QuizzesSubjectDetailScreenProps
> = ({ navigation, route }) => {
  const { subject } = route.params;

  const queryQuizMany = useQuery<
    quizManyByCategoryId,
    quizManyByCategoryIdVariables
  >(QUIZ_MANY_QUERY, {
    variables: {
      filter: {
        OR: [
          { categoryId: subject._id },
          { _operators: { categoryId: { in: subject.childrenIds } } },
        ],
      },
    },
    fetchPolicy: 'network-only',
  });

  const quizMany = useMemo<quizManyByCategoryId_quizMany[] | undefined>(
    () => queryQuizMany.data?.quizMany,
    [queryQuizMany.data],
  );

  const renderItem: ListRenderItem<quizManyByCategoryId_quizMany> = useCallback(
    ({ item }) => (
      <KwListItemSimple
        uri={images.quizImage}
        title={item.title}
        description={
          item.description ? item.description!.replace(/<[^>]+>/g, '') : ''
        }
        onPress={() => {
          navigation.navigate(QuizzesStackRouteList.QuizDetails, {
            id: item._id,
            name: item.title,
            content: item.description ? item.description : '',
            number: item.questions.length ? item.questions.length : 0,
            quizSessionCount: item.metrics?.quizSessionCount
              ? item.metrics.quizSessionCount
              : 0,
          });
        }}
        time="20"
        number={item.questions.length ? item.questions.length : 0}
      />
    ),
    [navigation],
  );
  const renderFooter = () => <View />;

  const renderEmpty = () => <View />;

  return (
    <View style={styles.container_one}>
      <View style={styles.header}>
        <KwHearder
          back
          avatar="https://via.placeholder.com/150"
          textLeft={subject.name.replace(/gcse/gi, '')}
        />
      </View>
      {queryQuizMany.loading ? (
        <View style={styles.container_one}>
          <ActivityIndicator size="large" color={colors.app.white} />
        </View>
      ) : (
        <KwContainer
          textStyle={{ fontSize: 20 }}
          style={styles.container}
          title={subject.name.replace(/gcse/gi, '')}
          ads
        >
          <FlatList
            keyExtractor={(it) => it?._id}
            initialNumToRender={5}
            data={quizMany || []}
            renderItem={renderItem}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
          />
        </KwContainer>
      )}
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
    flex: 1,
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
  header: {
    backgroundColor: colors.app.primary,
    paddingBottom: 20,
  },
});

export default QuizzesSubjectDetailScreen;
