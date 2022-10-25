import linking from '@KwSrc/config/linking';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { AppDrawerNavigation } from './drawer.navigation';

export const navigationRef = createNavigationContainerRef();

export function navigateCustom(name: never, params: never) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

const AppNavigationContainer = () => (
  <NavigationContainer
    linking={linking}
    onReady={() => {
      RNBootSplash.hide({ fade: true });
    }}
    ref={navigationRef}
  >
    <AppDrawerNavigation />
  </NavigationContainer>
);

export default AppNavigationContainer;
