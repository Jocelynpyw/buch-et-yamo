import { Store } from 'redux';
import { useEffect, useState, useCallback } from 'react';
import PushNotification, {
  ReceivedNotification,
} from 'react-native-push-notification';
import { Linking, Platform } from 'react-native';
import { AppInstanceSyncAction } from '@KwSrc/store/actions';

import { deviceInfo } from '@KwSrc/utils/deviceInfo';

interface NotificationInterface {
  store: Store;
}

interface NotificationResponse extends Omit<ReceivedNotification, 'userInfo'> {
  channelId?: string;
  title?: string;
  imgUrl?: string;
  bigPictureUrl?: string;
}

const PushNotificationController = (props: NotificationInterface) => {
  const [firebaseToken, setToken] = useState<string | null>(null);

  const notif = useCallback(async () => {
    if (firebaseToken) {
      const data = await deviceInfo();
      data.token = firebaseToken;
      props?.store.dispatch(AppInstanceSyncAction(data));
    }
  }, [firebaseToken, props?.store]);

  useEffect(() => {
    setTimeout(() => {
      notif();
    }, 2000);
  }, [notif]);

  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'kawlo-channel-id', // (required)
        channelName: 'KawloAppChannel', // (required)
        channelDescription: 'This Channel is to send Kawlo notifications', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      () => {}, // (optional) callback returns whether the channel was created, false means it already existed.
    );

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister(token) {
        setToken(token.token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification(notification: NotificationResponse) {
        // console.log('REMOTE NOTIFICATION ==>', notification);
        if (notification.userInteraction) {
          const { link = null } = notification?.data || {};

          if (link) {
            Linking.openURL(link);
          }
        } else {
          PushNotification.localNotification({
            channelId: 'prenapp-channel-id',
            autoCancel: true,
            title: String(notification?.title),
            message: String(notification.message),
            largeIconUrl: String(notification.bigPictureUrl),
            picture: String(notification.bigPictureUrl),
            bigPictureUrl: String(notification.bigPictureUrl),
            vibrate: true,
            vibration: 300,
            playSound: true,
            soundName: 'default',
            largeIcon: 'ic_launcher',
            smallIcon: 'ic_launcher',
            userInfo: notification.data,
          });
        }

        // process the notification here
      },
      // Android only: GCM or FCM Sender ID
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });
  }, []);

  return null;
};

export default PushNotificationController;
