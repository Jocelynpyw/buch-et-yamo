import React from 'react';
import i18n from '@KwSrc/config/i18n/i18n';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { colors } from '@KwSrc/utils';
import { AnswersStackParamList, AnswersStackRouteList } from '../constants';
import AnswersCountryListScreen from '../scenes/answersCountryListScreen';
import AnswersDownloadScreen from '../scenes/answersDownload';

// tab creator

const Tab = createMaterialTopTabNavigator<AnswersStackParamList>();

export const AnswersTab = () => (
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
        width: 80,
        height: 2,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: colors.app.primary,
        left: 60,
      },

      tabBarPressOpacity: 1,
    }}
  >
    <Tab.Screen
      name={AnswersStackRouteList.AnswersCountryList}
      component={AnswersCountryListScreen}
      options={{
        tabBarLabel: 'Answers',
      }}
    />
    <Tab.Screen
      name={AnswersStackRouteList.AnswersDownload}
      component={AnswersDownloadScreen}
      options={{
        tabBarLabel: 'Downloads',
      }}
    />
  </Tab.Navigator>
);
