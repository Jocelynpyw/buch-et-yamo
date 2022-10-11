import linking from '@KwSrc/config/linking';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { AppDrawerNavigation } from './drawer.navigation';

const AppNavigationContainer = () => (
  <NavigationContainer
    linking={linking}
    onReady={() => RNBootSplash.hide({ fade: true })}
  >
    <AppDrawerNavigation />
  </NavigationContainer>
);

export default AppNavigationContainer;
