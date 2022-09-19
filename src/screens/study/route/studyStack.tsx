import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StudyStackParamList, StudyStackRouteList } from './contants';
import StudyHomeScreen from '../scenes/studyHome';
import StudyPamphletScreen from '../scenes/studyPamphlet';
import StudyPamphletDetailScreen from '../scenes/studyPamphetDetail';
import StudyVideoScreen from '../scenes/studyVideo';
import StudyVideoCategoryScreen from '../scenes/studyVideoCategory';
import StudyNotesScreen from '../scenes/studyNotes';
import StudyNotesListScreen from '../scenes/studyNotesList';
import StudyNoteDetailsScreen from '../scenes/studyNoteDetail';

const StackNavigator = createStackNavigator<StudyStackParamList>();

export const StudyStack = () => (
  <StackNavigator.Navigator initialRouteName={StudyStackRouteList.StudyHome}>
    <StackNavigator.Screen
      name={StudyStackRouteList.StudyHome}
      component={StudyHomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <StackNavigator.Screen
      name={StudyStackRouteList.StudyPamplet}
      component={StudyPamphletScreen}
      options={{
        headerShown: false,
      }}
    />
    <StackNavigator.Screen
      name={StudyStackRouteList.StudyPampletDetail}
      component={StudyPamphletDetailScreen}
      options={{
        headerShown: false,
      }}
    />
    <StackNavigator.Screen
      name={StudyStackRouteList.StudyVideo}
      component={StudyVideoScreen}
      options={{
        headerShown: false,
      }}
    />
    <StackNavigator.Screen
      name={StudyStackRouteList.StudyVideoCategory}
      component={StudyVideoCategoryScreen}
      options={{
        headerShown: false,
      }}
    />
    <StackNavigator.Screen
      name={StudyStackRouteList.StudyNotes}
      component={StudyNotesScreen}
      options={{
        headerShown: false,
      }}
    />
    <StackNavigator.Screen
      name={StudyStackRouteList.StudyNotesList}
      component={StudyNotesListScreen}
      options={{
        headerShown: false,
      }}
    />
    <StackNavigator.Screen
      name={StudyStackRouteList.StudyNotesDetails}
      component={StudyNoteDetailsScreen}
      options={{
        headerShown: false,
      }}
    />
  </StackNavigator.Navigator>
);
