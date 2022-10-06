import { Store } from 'redux';
import { useEffect, useState, useCallback } from 'react';

import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { Linking, Platform } from 'react-native';
import { AppInstanceSyncAction } from '@KwSrc/store/actions';

import { deviceInfo } from '@KwSrc/utils/deviceInfo';

interface NotificationInterface {
  store: Store;
}

const PushNotificationController = (props: NotificationInterface) => {
  const [firebaseToken, setToken] = useState<string | null>(null);

  const requestFCMPermission = async () => {
    const authResponse = await messaging().requestPermission();
    const enabled = authResponse === messaging.AuthorizationStatus.AUTHORIZED;

    if (enabled) {
      // Register the device with FCM
      await messaging().registerDeviceForRemoteMessages();
      // Get the token
      const fcmToken = await messaging().getToken();
      setToken(fcmToken);
    }
  };
  const onMessageHandler = async (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    const { notification, data } = remoteMessage;

    const channelId = await notifee.createChannel({
      id: 'kawlo-channel-id',
      name: 'KawloAppChannel',
    });

    notifee.displayNotification({
      title: notification?.title,
      body: notification?.body,
      data: data || {},
      android: {
        channelId,
      },
    });
  };

  const notif = useCallback(async () => {
    if (firebaseToken) {
      const data = await deviceInfo();
      data.token = firebaseToken;
      props?.store.dispatch(AppInstanceSyncAction(data));
    } else {
      const data = await deviceInfo();

      props?.store.dispatch(AppInstanceSyncAction(data));
    }
  }, [firebaseToken, props?.store]);

  useEffect(() => {
    requestFCMPermission();
    const unsubMessaging = messaging().onMessage(onMessageHandler);

    return () => {
      unsubMessaging();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        const { link = null } = detail.notification?.data || {};

        if (link) {
          Linking.openURL(link);
        }
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      notif();
    }, 2000);
  }, [notif]);

  // useEffect(() => {
  //   PushNotification.createChannel(
  //     {
  //       channelId: 'kawlo-channel-id', // (required)
  //       channelName: 'KawloAppChannel', // (required)
  //       channelDescription: 'This Channel is to send Kawlo notifications', // (optional) default: undefined.
  //       playSound: true, // (optional) default: true
  //       soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
  //       importance: 4, // (optional) default: 4. Int value of the Android notification importance
  //       vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  //     },
  //     () => {}, // (optional) callback returns whether the channel was created, false means it already existed.
  //   );

  //   PushNotification.configure({
  //     // (optional) Called when Token is generated (iOS and Android)
  //     onRegister(token) {
  //       setToken(token.token);
  //     },

  //     // (required) Called when a remote or local notification is opened or received
  //     onNotification(notification: NotificationResponse) {
  //       // console.log('REMOTE NOTIFICATION ==>', notification);
  //       if (notification.userInteraction) {
  //         const { link = null } = notification?.data || {};

  //         if (link) {
  //           Linking.openURL(link);
  //         }
  //       } else {
  //         PushNotification.localNotification({
  //           channelId: 'prenapp-channel-id',
  //           autoCancel: true,
  //           title: String(notification?.title),
  //           message: String(notification.message),
  //           largeIconUrl: String(notification.bigPictureUrl),
  //           picture: String(notification.bigPictureUrl),
  //           bigPictureUrl: String(notification.bigPictureUrl),
  //           vibrate: true,
  //           vibration: 300,
  //           playSound: true,
  //           soundName: 'default',
  //           largeIcon: 'ic_launcher',
  //           smallIcon: 'ic_launcher',
  //           userInfo: notification.data,
  //         });
  //       }

  //       // process the notification here
  //     },
  //     // Android only: GCM or FCM Sender ID
  //     popInitialNotification: true,
  //     requestPermissions: Platform.OS === 'ios',
  //   });
  // }, []);

  return null;
};

export default PushNotificationController;
