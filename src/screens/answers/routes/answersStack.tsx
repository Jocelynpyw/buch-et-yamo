import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import KwHearder from '@KwSrc/components/header';
import { View } from 'react-native';
import { colors } from '@KwSrc/utils';
import { AnswersStackParamList, AnswersStackRouteList } from '../constants';
import AnswersSujectListScreen from '../scenes/answersSubjectList';
import AnswersSubjectDetailScreen from '../scenes/answersSubjectDetail';
import AnswersBundleScreen from '../scenes/answersBundleScreen';
import { AnswersTab } from './answersTab';
import AnswersSubscribeScreen from '../scenes/answersSubscribe';
import AnwersSubjectViewScreen from '../scenes/answersSubjectView';

const StackNavigator = createStackNavigator<AnswersStackParamList>();

export const AnswersStack = () => (
  <StackNavigator.Navigator initialRouteName={AnswersStackRouteList.AnswersTab}>
    <StackNavigator.Screen
      name={AnswersStackRouteList.AnswersTab}
      component={AnswersTab}
      options={{
        header: () => (
          <View
            style={{
              backgroundColor: colors.app.white,
            }}
          >
            <View
              style={{
                paddingVertical: 5,
                backgroundColor: colors.app.primary,
                borderBottomEndRadius: 20,
                borderBottomColor: colors.app.white,
                borderBottomStartRadius: 20,
                borderBottomWidth: 1,
                paddingBottom: 20,
              }}
            >
              <KwHearder
                menu
                avatar="https://via.placeholder.com/150"
                title="Gce Corrections"
              />
            </View>
          </View>
        ),
      }}
    />
    <StackNavigator.Screen
      name={AnswersStackRouteList.AnswersSubjectList}
      component={AnswersSujectListScreen}
      options={{
        headerShown: false,
      }}
    />
    <StackNavigator.Screen
      name={AnswersStackRouteList.AnswersSubjectDetail}
      component={AnswersSubjectDetailScreen}
      options={{
        headerShown: false,
      }}
    />
    <StackNavigator.Screen
      name={AnswersStackRouteList.AnswersBundle}
      component={AnswersBundleScreen}
      options={{
        headerShown: false,
      }}
    />
    <StackNavigator.Screen
      name={AnswersStackRouteList.AnswersSubscribe}
      component={AnswersSubscribeScreen}
      options={{
        headerShown: false,
      }}
    />
    <StackNavigator.Screen
      name={AnswersStackRouteList.AnswersSubjectView}
      component={AnwersSubjectViewScreen}
      options={{
        headerShown: false,
      }}
    />
  </StackNavigator.Navigator>
);
