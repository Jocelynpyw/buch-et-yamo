/**
 * @format
 */
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { AppRegistry, Linking } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  const channelId = await notifee.createChannel({
    id: 'kawlo-channel-id',
    name: 'KawloAppChannel',
  });
  const { notification, data } = remoteMessage;
  notifee.displayNotification({
    title: notification?.title,
    body: notification?.body,
    data,
    android: { channelId, smallIcon: 'ic_launcher_round' },
  });
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification } = detail;
  // console.log('User pressed an action with the id: ', notification);
  if (type === EventType.PRESS) {
    const { link = null } = notification?.data || {};

    if (link) {
      Linking.openURL(link);
    }
    // navigate here
  }
});

AppRegistry.registerComponent(appName, () => App);
