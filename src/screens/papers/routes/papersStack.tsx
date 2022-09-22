import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import i18n from '@KwSrc/config/i18n/i18n';
import KwHearder from '@KwSrc/components/header';
import { StyleSheet, View } from 'react-native';
import { colors } from '@KwSrc/utils';
import PapersListScreen from '../scenes/papersListScreen';
import PapersCountryListScreen from '../scenes/papersCountryListScreen';
import { PapersStackParamList, PapersStackRouteList } from '../constant';
import PapersSubjectListScreen from '../scenes/papersSubjectList';
import PapersSubjectYearListScreen from '../scenes/papersSubjectYearList';
import PapersSubjectDetailScreen from '../scenes/papersSubjectDetail';
import PapersDownloadedListScreen from '../scenes/papersDownload';

const StackNavigator = createStackNavigator<PapersStackParamList>();

export const PapersStack = () => (
  <StackNavigator.Navigator initialRouteName={PapersStackRouteList.PapersTab}>
    <StackNavigator.Screen
      name={PapersStackRouteList.PapersTab}
      component={PapersCountryListScreen}
      options={{
        header: () => (
          <View style={styles.header}>
            <KwHearder
              menu
              avatar="https://via.placeholder.com/150"
              title={i18n.t('COMMON__PAPERS')}
            />
          </View>
        ),
      }}
    />
    <StackNavigator.Screen
      name={PapersStackRouteList.PapersList}
      component={PapersListScreen}
      options={{
        headerShown: false,
      }}
    />
    <StackNavigator.Screen
      name={PapersStackRouteList.PapersSubjectList}
      component={PapersSubjectListScreen}
      options={{
        headerShown: false,
      }}
    />
    <StackNavigator.Screen
      name={PapersStackRouteList.PapersSubjectYearList}
      component={PapersSubjectYearListScreen}
      options={{
        headerShown: false,
      }}
    />
    <StackNavigator.Screen
      name={PapersStackRouteList.PapersSubjectDetail}
      component={PapersSubjectDetailScreen}
      options={{
        headerShown: false,
      }}
    />
    <StackNavigator.Screen
      name={PapersStackRouteList.PapersDownload}
      component={PapersDownloadedListScreen}
      options={{
        header: () => (
          <View style={styles.header}>
            <KwHearder
              back
              avatar="https://via.placeholder.com/150"
              title="Downloaded Papers"
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
});
