import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import i18n from '@KwSrc/config/i18n/i18n';
import KwHearder from '@KwSrc/components/header';
import { StyleSheet, View } from 'react-native';
import { colors } from '@KwSrc/utils';
import { AnswersStackParamList, AnswersStackRouteList } from '../constants';
import AnswersSujectListScreen from '../scenes/answersSubjectList';
import AnswersCountryListScreen from '../scenes/answersCountryListScreen';
import AnswersSubjectDetailScreen from '../scenes/answersSubjectDetail';
import AnswersBundleScreen from '../scenes/answersBundleScreen';

const StackNavigator = createStackNavigator<AnswersStackParamList>();

export const AnswersStack = () => (
  <StackNavigator.Navigator
    initialRouteName={AnswersStackRouteList.AnswersBundle}
  >
    <StackNavigator.Screen
      name={AnswersStackRouteList.AnswersTab}
      component={AnswersCountryListScreen}
      options={{
        header: () => (
          <View style={styles.header}>
            <KwHearder
              back
              avatar="https://via.placeholder.com/150"
              title={i18n.t('COMPONENT__ANSWERS_TITLE_ONE')}
            />
          </View>
        ),
      }}
    />
    <StackNavigator.Screen
      name={AnswersStackRouteList.AnswersSubjectList}
      component={AnswersSujectListScreen}
      options={{
        header: () => (
          <View style={styles.headerColor}>
            <KwHearder
              back
              avatar="https://via.placeholder.com/150"
              title={i18n.t('COMPONENT__ANSWERS_TITLE_ONE')}
              searchBottom
            />
          </View>
        ),
      }}
    />
    <StackNavigator.Screen
      name={AnswersStackRouteList.AnswersSubjectDetail}
      component={AnswersSubjectDetailScreen}
      options={{
        header: () => (
          <View style={styles.headerColor}>
            <KwHearder
              back
              avatar="https://via.placeholder.com/150"
              title={i18n.t('COMPONENT__ANSWERS_TITLE_TWO')}
              searchBottom
            />
          </View>
        ),
      }}
    />
    <StackNavigator.Screen
      name={AnswersStackRouteList.AnswersBundle}
      component={AnswersBundleScreen}
      options={{
        header: () => (
          <View style={styles.header}>
            <KwHearder
              back
              avatar="https://via.placeholder.com/150"
              title={i18n.t('COMPONENT__ANSWERS_TITLE_THREE')}
            />
          </View>
        ),
      }}
    />
  </StackNavigator.Navigator>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.app.primary,
    paddingBottom: 20,
  },
  headerColor: {
    backgroundColor: colors.app.primary,
  },
});
