import React, { FunctionComponent } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Content from '@KwSrc/screens/drawer/scenes/content';
import Notification from '@KwSrc/screens/drawer/scenes/notification';
import { LoginScreen, RegisterScreen } from '@KwSrc/screens/auth';
import ForgotPasswordScreen from '@KwSrc/screens/auth/scences/forgotPassword';
import ResetPasswordScreen from '@KwSrc/screens/auth/scences/resetPassword';
import DownloadScreen from '@KwSrc/screens/drawer/scenes/download';
import AboutUsSection from '@KwSrc/screens/drawer/scenes/aboutUs';
import ContactUsSection from '@KwSrc/screens/drawer/scenes/contactUs';
import Souscription from '@KwSrc/screens/drawer/scenes/Souscription';
import Settings from '@KwSrc/screens/drawer/scenes/settings';
import BlogScreen from '@KwSrc/screens/drawer/scenes/blog';
import BlogDetailsScreen from '@KwSrc/screens/drawer/scenes/blogDetail';
import {
  HomeDrawerParamList,
  HomeDrawerRouteList,
} from './constants.navigation';
import { HomeBottomTab } from './bottomTap.navigation';

const DrawerNavigation = createDrawerNavigator<HomeDrawerParamList>();

export const AppDrawerNavigation: FunctionComponent = () => (
  <DrawerNavigation.Navigator
    initialRouteName={HomeDrawerRouteList.BottomTab}
    screenOptions={{
      drawerType: 'front',
      drawerStyle: { borderRadius: 30 },
    }}
    drawerContent={() => <Content />}
  >
    <DrawerNavigation.Screen
      name={HomeDrawerRouteList.BottomTab}
      component={HomeBottomTab}
      options={{
        headerShown: false,
      }}
    />
    <DrawerNavigation.Screen
      name={HomeDrawerRouteList.myWallet}
      component={Souscription}
      options={{
        headerShown: false,
      }}
    />

    <DrawerNavigation.Screen
      name={HomeDrawerRouteList.mySetting}
      component={Settings}
      options={{
        headerShown: false,
      }}
    />
    <DrawerNavigation.Screen
      name={HomeDrawerRouteList.contactUs}
      component={ContactUsSection}
      options={{
        headerShown: false,
      }}
    />
    <DrawerNavigation.Screen
      name={HomeDrawerRouteList.aboutUs}
      component={AboutUsSection}
      options={{
        headerShown: false,
      }}
    />

    <DrawerNavigation.Screen
      name={HomeDrawerRouteList.notificatons}
      component={Notification}
      options={{
        headerShown: false,
      }}
    />

    <DrawerNavigation.Screen
      name={HomeDrawerRouteList.download}
      component={DownloadScreen}
      options={{
        headerShown: false,
      }}
    />

    <DrawerNavigation.Screen
      name={HomeDrawerRouteList.register}
      component={RegisterScreen}
      options={{
        headerShown: false,
      }}
    />
    <DrawerNavigation.Screen
      name={HomeDrawerRouteList.login}
      component={LoginScreen}
      options={{
        headerShown: false,
      }}
    />
    <DrawerNavigation.Screen
      name={HomeDrawerRouteList.forgotPassword}
      component={ForgotPasswordScreen}
      options={{
        headerShown: false,
      }}
    />
    <DrawerNavigation.Screen
      name={HomeDrawerRouteList.news}
      component={BlogScreen}
      options={{
        headerShown: false,
      }}
    />
    <DrawerNavigation.Screen
      name={HomeDrawerRouteList.newsDetails}
      component={BlogDetailsScreen}
      options={{
        headerShown: false,
      }}
    />

    <DrawerNavigation.Screen
      name={HomeDrawerRouteList.ResetPassword}
      component={ResetPasswordScreen}
      options={{
        headerShown: false,
      }}
    />
  </DrawerNavigation.Navigator>
);
