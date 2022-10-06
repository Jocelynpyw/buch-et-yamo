import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { FunctionComponent } from 'react';
import { colors, fontsizes } from '@KwSrc/utils';
import KwAvatar from '@KwSrc/components/avatar';
import formateDate from '@KwSrc/utils/date';
import { useNavigation } from '@react-navigation/native';
import {
  HomeBottomTabRouteList,
  HomeDrawerRouteList,
} from '@KwSrc/navigation/constants.navigation';
import { ForumStackRouteList } from '@KwSrc/screens/forum/constants';

interface INotificationCard {
  onPressCard?: () => void;
  style?: ViewStyle;
  notification: any;
  disabled?: Boolean;
}

// interface INotification {
//   avatar: string;
//   name: string;
//   object: string;
//   wasSeen: boolean;
//   time: number;
// }

const KwNotificationCard: FunctionComponent<INotificationCard> = ({
  notification,
  disabled = false,
  style,
}) => {
  const navigation = useNavigation();
  // console.log('notification', notification);

  const navigate = () => {
    if (notification.postId) {
      navigation.navigate(HomeDrawerRouteList.BottomTab as never, {
        screen: HomeBottomTabRouteList.ForumStack as never,
        params: {
          screen: ForumStackRouteList.ForumDetail as never,
          params: {
            postId: notification.postId,
            title: notification.postTitle || notification.title,
          } as never,
        },
      });
    }
  };

  return (
    <TouchableOpacity disabled={disabled && true} onPress={navigate}>
      <View style={[styles.container, style]}>
        <KwAvatar size="small" src={notification?.image?.url} />
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{notification.text}</Text>
            <Text style={styles.textObject}>{notification.object}</Text>
          </View>
          <Text style={styles.time}>
            {formateDate({
              date: notification.createdAt!,
              format: 'L',
              type: 'FROMNOW',
            })}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.app.white,
    borderRadius: 14,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    margin: 5,
    // zIndex: 10,
    /* shadowColor: colors.app.black,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.38,
    shadowRadius: 12, */
  },
  textName: {
    fontWeight: 'bold',
    color: colors.text.primary,
    fontSize: fontsizes.SIZES.body4,
  },
  textObject: {
    color: colors.text.primary,
    fontSize: fontsizes.SIZES.body4,
  },
  textContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
  },

  notificationContainer: {
    backgroundColor: colors.app.white,
    borderRadius: 14,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    margin: 5,
    // zIndex: 10,
    /* shadowColor: colors.app.black,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.38,
    shadowRadius: 12, */
  },

  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  time: {
    color: colors.text.secondary,
    fontSize: fontsizes.SIZES.body4,
  },
  seenBull: {
    width: 10,
    height: 10,
    borderRadius: 5,
    top: -5,
    right: 15,
    position: 'absolute',
    backgroundColor: colors.app.primary,
  },
  title: {
    fontWeight: 'bold',
    marginRight: 5,
  },
});

export default KwNotificationCard;
