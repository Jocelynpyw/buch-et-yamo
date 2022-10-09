/* eslint-disable arrow-body-style */
import React, { FunctionComponent } from 'react';
import KwIcon from '@KwSrc/components/Icon';
import { colors } from '@KwSrc/utils';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute, Route } from '@react-navigation/native';
import i18n from '@KwSrc/config/i18n/i18n';

import { StudyStack } from '@KwSrc/screens/study';

import { QuizzesStack } from '@KwSrc/screens/quiz';
import { AnswersStack } from '@KwSrc/screens/answers';
import { PapersStack } from '@KwSrc/screens/papers';
import { ForumStack } from '@KwSrc/screens/forum';
import {
  HomeBottomTabParamList,
  HomeBottomTabRouteList,
} from './constants.navigation';

const BottomIconStack: {
  [index in keyof HomeBottomTabParamList]: string;
} = {
  [HomeBottomTabRouteList.ForumStack]: 'bottomForumFill',
  [HomeBottomTabRouteList.PaperStack]: 'bottomPaper',
  [HomeBottomTabRouteList.StudyStack]: 'bottomStudy',
  [HomeBottomTabRouteList.QuizStack]: 'bottomQuiz',
  [HomeBottomTabRouteList.AnswerStack]: 'bottomAnswer',
};

const TabBottomNavigator = createBottomTabNavigator<HomeBottomTabParamList>();

export const HomeBottomTab: FunctionComponent = () => {
  return (
    <TabBottomNavigator.Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: false,
          headerStyle: {
            backgroundColor: 'transparent',
            elevation: 0,
          },
          tabBarStyle: {
            // backgroundColor: colors.app.white,
            // backgroundColor: 'green',
            // elevation: 0,
            // borderTopEndRadius: 50,
            // borderTopStartRadius: 50,
            // height: 70,
            // paddingBottom: 2,
            // borderTopWidth: 0,
            // backgroundColor: colors.app.white,
            // backgroundColor: 'green',
            // elevation: 0,
            // borderTopEndRadius: 20,
            // borderTopStartRadius: 20,
          },
          tabBarItemStyle: {
            marginTop: 10,
            paddingTop: 10,
            marginBottom: 8,
          },
          tabBarLabelStyle: { fontSize: 10 },
          tabBarActiveTintColor: colors.app.primary,
          tabBarInactiveTintColor: colors.app.lightGrey,

          tabBarIcon: ({ focused }) => {
            const icon =
              BottomIconStack[route.name as keyof HomeBottomTabParamList];

            return focused ? (
              <KwIcon
                name={icon}
                fill={colors.app.primary}
                viewBox="0 0 30 30"
                width="30"
                height="30"
                stroke={colors.app.primary}
                strokeWidth="0.8"
              />
            ) : (
              <KwIcon
                name={icon}
                fill="none"
                stroke={colors.app.primary}
                viewBox="0 0 30 35"
                width="30"
                height="30"
                strokeWidth="0.8"
              />
            );
          },
        };
      }}
    >
      <TabBottomNavigator.Screen
        name={HomeBottomTabRouteList.ForumStack}
        component={ForumStack}
        options={({ route }) => ({
          tabBarStyle: {
            backgroundColor: colors.app.white,

            elevation: 0,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            height: getTabBarVisibility(route) === 0 ? 0 : 70,
            paddingBottom: 2,
            borderTopWidth: 0,
            width: getTabBarVisibility(route) === 0 ? 0 : undefined,
            position: 'absolute',
          },
          tabBarLabel: i18n.t('COMMON__FORUM'),
          tabBarIcon: ({ focused }) => {
            const icon =
              BottomIconStack[route.name as keyof HomeBottomTabParamList];

            return focused ? (
              <KwIcon
                name={icon}
                fill={colors.app.primary}
                viewBox="-2 4 30 20"
                width="30"
                height="30"
              />
            ) : (
              <KwIcon
                name={icon}
                fill="none"
                stroke={colors.app.primary}
                viewBox="-2 4 30 20"
                width="30"
                height="30"
                strokeWidth="1.5"
              />
            );
          },
        })}
      />
      <TabBottomNavigator.Screen
        name={HomeBottomTabRouteList.PaperStack}
        component={PapersStack}
        options={({ route }) => ({
          tabBarStyle: {
            backgroundColor: colors.app.white,
            elevation: 0,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            height: getTabBarVisibility(route) === 0 ? 0 : 70,
            paddingBottom: 2,
            borderTopWidth: 0,
            width: getTabBarVisibility(route) === 0 ? 0 : undefined,
            position: 'absolute',
          },

          tabBarLabel: i18n.t('COMMON__PAPERS'),
          tabBarIcon: ({ focused }) => {
            const icon =
              BottomIconStack[route.name as keyof HomeBottomTabParamList];

            return focused ? (
              <KwIcon
                name="bottomPaperFill"
                fill={colors.app.primary}
                viewBox="0 0 50 60"
                width="30"
                height="30"
              />
            ) : (
              <KwIcon
                name={icon}
                fill="none"
                stroke={colors.app.primary}
                viewBox="0 0 50 60"
                width="30"
                height="30"
                strokeWidth="1.8"
              />
            );
          },
        })}
      />

      <TabBottomNavigator.Screen
        name={HomeBottomTabRouteList.StudyStack}
        options={({ route }) => ({
          tabBarStyle: {
            backgroundColor: colors.app.white,
            elevation: 0,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            height: getTabBarVisibility(route) === 0 ? 0 : 70,
            paddingBottom: 2,
            borderTopWidth: 0,
            width: getTabBarVisibility(route) === 0 ? 0 : undefined,
            position: 'absolute',
          },
          tabBarLabel: i18n.t('COMMON__STUDY'),
          tabBarIcon: ({ focused }) => {
            const icon =
              BottomIconStack[route.name as keyof HomeBottomTabParamList];

            return focused ? (
              <KwIcon
                name={icon}
                fill={colors.app.primary}
                viewBox="0 0 70 70"
                width="30"
                height="30"
              />
            ) : (
              <KwIcon
                name={icon}
                fill="none"
                stroke={colors.app.primary}
                viewBox="0 0 70 70"
                width="30"
                height="30"
                strokeWidth="2"
              />
            );
          },
        })}
        component={StudyStack}
      />
      <TabBottomNavigator.Screen
        name={HomeBottomTabRouteList.QuizStack}
        options={({ route }) => ({
          tabBarStyle: {
            backgroundColor: colors.app.white,
            elevation: 0,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            height: getTabBarVisibility(route) === 0 ? 0 : 70,
            paddingBottom: 2,
            borderTopWidth: 0,
            width: getTabBarVisibility(route) === 0 ? 0 : undefined,
            position: 'absolute',
          },
          tabBarLabel: i18n.t('COMMON__QUIZZES'),
          tabBarIcon: ({ focused }) => {
            const icon =
              BottomIconStack[route.name as keyof HomeBottomTabParamList];

            return focused ? (
              <KwIcon
                name={icon}
                fill={colors.app.primary}
                viewBox="0 0 20 20"
                width="30"
                height="30"
              />
            ) : (
              <KwIcon
                name={icon}
                fill="none"
                stroke={colors.app.primary}
                viewBox="0 0 20 20"
                width="30"
                height="30"
                strokeWidth="0.8"
              />
            );
          },
        })}
        component={QuizzesStack}
      />
      <TabBottomNavigator.Screen
        name={HomeBottomTabRouteList.AnswerStack}
        options={({ route }) => ({
          tabBarStyle: {
            backgroundColor: colors.app.white,
            elevation: 0,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            height: getTabBarVisibility(route) === 0 ? 0 : 70,
            paddingBottom: 2,
            borderTopWidth: 0,
            width: getTabBarVisibility(route) === 0 ? 0 : undefined,
            position: 'absolute',
          },
          tabBarLabel: i18n.t('COMMON__ANSWERS'),
          tabBarIcon: ({ focused }) => {
            const icon =
              BottomIconStack[route.name as keyof HomeBottomTabParamList];

            return focused ? (
              <KwIcon
                name="bottomAnswerFill"
                viewBox="0 0 15 15"
                width="30"
                height="30"
                strokeWidth="0.8"
              />
            ) : (
              <KwIcon
                name={icon}
                fill="none"
                stroke={colors.app.primary}
                viewBox="0 0 15 15"
                width="30"
                height="30"
                strokeWidth="0.8"
              />
            );
          },
        })}
        component={AnswersStack}
      />
    </TabBottomNavigator.Navigator>
  );
};

const getTabBarVisibility = (
  route: Partial<Route<string, object | undefined>>,
) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'ForumHomeTab';

  if (
    routeName !== 'ForumHomeTab' &&
    routeName !== 'StudyHome' &&
    routeName !== 'PapersTab' &&
    routeName !== 'QuizzesTab' &&
    routeName !== 'AnswersTab'
  ) {
    return 0;
  }
  return 1;
};
