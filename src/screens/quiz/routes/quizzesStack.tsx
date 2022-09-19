import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import KwHearder from '@KwSrc/components/header';
import i18n from '@KwSrc/config/i18n/i18n';
import { StyleSheet, View } from 'react-native';
import { colors } from '@KwSrc/utils';
import QuizzesTypeScreen from '../scenes/quizzesTypeScreen';
import { QuizzesStackParamList, QuizzesStackRouteList } from '../constants';
import QuizzesSubjectListScreen from '../scenes/quizzesSubjectListScreen';
import QuizzesSubjectDetailScreen from '../scenes/quizzesSubjectDetailScreen';
import CompetitionQuizzesTypeScreen from '../scenes/competitionQuizzesTypeScreen';
import QuizPlayScreen from '../scenes/quizPlayScreen';
import CompetitionQuizResultScreen from '../scenes/competionQuizResultScreen';
import QuizResultScreen from '../scenes/quizResultScreen';
import CompetitionQuizzesScreen from '../scenes/competitonQuizzesScreen';
import QuizDetailsScreen from '../scenes/quizDetailsScreen';

const StackNavigator = createStackNavigator<QuizzesStackParamList>();

export const QuizzesStack = () => (
  <StackNavigator.Navigator initialRouteName={QuizzesStackRouteList.QuizzesTab}>
    <StackNavigator.Screen
      name={QuizzesStackRouteList.QuizzesTab}
      component={QuizzesTypeScreen}
      options={{
        header: () => (
          <View style={styles.header}>
            <KwHearder
              menu
              avatar="https://via.placeholder.com/150"
              title={i18n.t('COMMON__QUIZZES')}
            />
          </View>
        ),
      }}
    />
    <StackNavigator.Screen
      name={QuizzesStackRouteList.CompetitionQuizzesType}
      component={CompetitionQuizzesTypeScreen}
      options={{
        header: () => (
          <View style={styles.header}>
            <KwHearder
              back
              avatar="https://via.placeholder.com/150"
              title={i18n.t('COMMON__QUIZZES')}
            />
          </View>
        ),
      }}
    />
    <StackNavigator.Screen
      name={QuizzesStackRouteList.QuizzesSubjectList}
      component={QuizzesSubjectListScreen}
      options={{
        headerShown: false,
      }}
    />
    <StackNavigator.Screen
      name={QuizzesStackRouteList.QuizzesSubjectDetail}
      component={QuizzesSubjectDetailScreen}
      options={{
        headerShown: false,
        // header: () => (
        //   <View style={styles.header}>
        //     <KwHearder
        //       back
        //       avatar="https://via.placeholder.com/150"
        //       title={i18n.t('COMPONNENT__CHEMISTRY_QUIZZES_MESSAGE')}
        //     />
        //   </View>
        // ),
      }}
    />
    <StackNavigator.Screen
      name={QuizzesStackRouteList.CompetitionQuizzes}
      component={CompetitionQuizzesScreen}
      options={{
        header: () => (
          <View style={styles.header}>
            <KwHearder
              back
              avatar="https://via.placeholder.com/150"
              title="Competition quizzes"
            />
          </View>
        ),
      }}
    />
    <StackNavigator.Screen
      name={QuizzesStackRouteList.QuizDetails}
      component={QuizDetailsScreen}
      options={{
        headerShown: false,
      }}
    />
    <StackNavigator.Screen
      name={QuizzesStackRouteList.QuizPlay}
      component={QuizPlayScreen}
      options={{
        headerShown: false,
      }}
    />
    <StackNavigator.Screen
      name={QuizzesStackRouteList.CompetitionQuizResult}
      component={CompetitionQuizResultScreen}
      options={{
        header: () => (
          <View>
            <KwHearder back transparent />
          </View>
        ),
        headerShown: false,
      }}
    />
    <StackNavigator.Screen
      name={QuizzesStackRouteList.QuizResult}
      component={QuizResultScreen}
      options={{
        headerShown: false,
      }}
    />
  </StackNavigator.Navigator>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.app.primary,
    paddingBottom: 10,
  },
});
