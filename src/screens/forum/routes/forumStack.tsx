import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import KwHearder from '@KwSrc/components/header';
import { View } from 'react-native';
import { colors } from '@KwSrc/utils';
import { ForumHomeTab } from './forumHomeTab';
import { ForumStackRouteList, ForumStackParamList } from '../constants';
import ForumDetailScreen from '../scenes/forumDetail';
import ForumAddQuestionScreen from '../scenes/forumAddQuestion';

const StackNavigator = createStackNavigator<ForumStackParamList>();

export const ForumStack = () => (
  <StackNavigator.Navigator initialRouteName={ForumStackRouteList.ForumHomeTab}>
    <StackNavigator.Screen
      name={ForumStackRouteList.ForumHomeTab}
      component={ForumHomeTab}
      options={{
        header: () => (
          <View
            style={{
              backgroundColor: colors.app.white,
            }}
          >
            <View
              style={{
                paddingVertical: 10,
                backgroundColor: colors.app.primary,
                borderBottomEndRadius: 20,
                borderBottomColor: colors.app.white,
                borderBottomStartRadius: 20,
                borderBottomWidth: 1,
                paddingBottom: 20,
              }}
            >
              <KwHearder
                notification
                search
                bell
                notificationCount={0}
                menu
                avatar="https://via.placeholder.com/150"
              />
            </View>
          </View>
        ),
      }}
    />
    <StackNavigator.Screen
      name={ForumStackRouteList.ForumDetail}
      component={ForumDetailScreen}
      options={{
        headerShown: false,
      }}
    />
    <StackNavigator.Screen
      name={ForumStackRouteList.ForumAddQuestion}
      component={ForumAddQuestionScreen}
      options={{
        headerShown: false,
      }}
    />
  </StackNavigator.Navigator>
);
