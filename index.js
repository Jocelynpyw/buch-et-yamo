/**
 * @format
 */
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { AppRegistry } from 'react-native';
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
    android: { channelId },
  });
});

AppRegistry.registerComponent(appName, () => App);
