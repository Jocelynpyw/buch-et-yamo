import { Store } from 'redux';
import { useEffect, useState, useCallback } from 'react';

import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { Alert, Linking } from 'react-native';
import { AppInstanceSyncAction } from '@KwSrc/store/actions';

import { deviceInfo } from '@KwSrc/utils/deviceInfo';
import { navigateCustom } from '@KwSrc/navigation/index.navigation';

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
        smallIcon: 'ic_launcher_round',
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

  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      const { link = null } = remoteMessage.notification?.data || {};

      if (link) {
        Linking.openURL(link);
      }
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      Alert.alert(
        'Message handled in the background state!',
        JSON.stringify(remoteMessage),
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          const { link = null } = remoteMessage.notification?.data || {};

          if (link) {
            Linking.openURL(link);
          }
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // navigateCustom('ChatScreen', { userName: 'Lucy' });
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });
  }, []);

  return null;
};

export default PushNotificationController;
