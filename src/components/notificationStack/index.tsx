import { colors, fontsizes } from '@KwSrc/utils';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import KwNotificationCard from '../notificationCard';

interface INotificationStack {
  category: string;
  onPress?(): void;
  notifications: any[];
}

const { width } = Dimensions.get('window');

export default function KwNotificationStack({
  category,
  notifications,
}: INotificationStack) {
  const notificationItem = ({ item }: any) => (
    <KwNotificationCard notification={item} />
  );

  // console.log('notification', notifications);
  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <Text style={styles.category}>{category}</Text>
      </View>

      <View>
        <FlatList
          data={notifications}
          renderItem={notificationItem}
          ListEmptyComponent={
            <Text style={styles.text}>No Notifications for the moment :)</Text>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
  },

  bottomStackContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -10,
    // position: 'relative',
    bottom: 50,
  },

  bottomStack: {
    backgroundColor: colors.app.white,
    borderRadius: 14,
    height: 20,
    position: 'absolute',
    /* shadowColor: colors.app.black,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.38,
    shadowRadius: 12, */

    elevation: 2,
  },

  bottomStackCard1: {
    width: width - 55,
    top: 35,
    zIndex: 3,
    elevation: 2.5,
  },

  bottomStackCard2: {
    width: width - 70,
    top: 45,
  },

  categoryContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    marginLeft: 5,
    resizeMode: 'contain',
    tintColor: colors.app.grey,
  },
  category: {
    fontWeight: 'bold',
    color: colors.text.primary,
    fontSize: fontsizes.SIZES.h4,
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
  text: {
    marginTop: 100,
    fontWeight: '500',
    fontSize: 14,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
});
