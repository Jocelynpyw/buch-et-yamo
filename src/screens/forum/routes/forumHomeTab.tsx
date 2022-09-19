import React from 'react';
import i18n from '@KwSrc/config/i18n/i18n';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from '@KwSrc/utils';
import ForumListPopularScreen from '../scenes/forumListPopular';
import ForumListQuestionsScreen from '../scenes/forumListQuestions';
import { ForumHomeTabParamList, ForumHomeTabRouteList } from '../constants';
import ForumListPinnedQuestionScreen from '../scenes/ForumListPinnedQuestion';

// tab creator

const Tab = createMaterialTopTabNavigator<ForumHomeTabParamList>();

export const ForumHomeTab = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarLabel: i18n.t('COMMON__RECENT'),
      tabBarLabelStyle: {
        textTransform: 'capitalize',
        color: colors.app.black,
        fontWeight: '500',
      },
      tabBarBounces: false,

      tabBarStyle: {
        backgroundColor: colors.app.white,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
      },

      tabBarIndicatorStyle: {
        width: 50,
        height: 2,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: colors.app.primary,
        left: 40,
      },

      tabBarPressOpacity: 1,
    }}
  >
    <Tab.Screen
      name={ForumHomeTabRouteList.ForumListPopular}
      component={ForumListQuestionsScreen}
    />
    <Tab.Screen
      name={ForumHomeTabRouteList.ForumListQuestions}
      component={ForumListPopularScreen}
      options={{
        tabBarLabel: i18n.t('COMMON__POPULAR'),
      }}
    />
    <Tab.Screen
      name={ForumHomeTabRouteList.ForumListPinned}
      component={ForumListPinnedQuestionScreen}
      options={{
        tabBarLabel: i18n.t('COMMON__PINNED'),
      }}
    />
  </Tab.Navigator>
);
