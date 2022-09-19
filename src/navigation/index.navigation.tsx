import linking from '@KwSrc/config/linking';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AppDrawerNavigation } from './drawer.navigation';

const AppNavigationContainer = () => (
  <NavigationContainer linking={linking}>
    <AppDrawerNavigation />
  </NavigationContainer>
);

export default AppNavigationContainer;
