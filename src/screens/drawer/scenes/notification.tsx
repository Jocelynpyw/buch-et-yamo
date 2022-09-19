import { useQuery } from '@apollo/client';
import KwHearder from '@KwSrc/components/header';
import KwNotificationStack from '@KwSrc/components/notificationStack';
import { colors } from '@KwSrc/utils';
import I18n from 'i18n-js';
import React, { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { QUERY_NOTIFICATION_GET_MANY } from '../graphql/queries';
import { FragmentNotificationBase } from '../graphql/__generated__/FragmentNotificationBase';
import {
  NotificationGetMany,
  NotificationGetManyVariables,
} from '../graphql/__generated__/NotificationGetMany';

const AllNotification = () => {
  const queryNotificationGetMany = useQuery<
    NotificationGetMany,
    NotificationGetManyVariables
  >(QUERY_NOTIFICATION_GET_MANY, {
    variables: { limit: 20 },
    fetchPolicy: 'network-only',
  });

  const [erlierNotifications, setErlierNotifications] = useState<
    FragmentNotificationBase[]
  >([]);

  const [notifications, setNotifications] = useState<
    FragmentNotificationBase[] | undefined
  >(queryNotificationGetMany.data?.notificationFindMany);

  useEffect(() => {
    setNotifications(queryNotificationGetMany.data?.notificationFindMany);
    if (notifications !== undefined) {
      setErlierNotifications(notifications!.slice(0, 5));
    }
  }, [notifications, queryNotificationGetMany.data]);

  return (
    <View style={styles.containerScenes}>
      <View style={{ paddingTop: 20 }}>
        <KwNotificationStack
          category={I18n.t('NOTIFICATION__SCREEN_NEW_TEXT')}
          notifications={erlierNotifications}
        />
      </View>
    </View>
  );
};

const MentionsNotification = () => {
  const queryNotificationGetMany = useQuery<
    NotificationGetMany,
    NotificationGetManyVariables
  >(QUERY_NOTIFICATION_GET_MANY, {
    variables: { limit: 20 },
    fetchPolicy: 'network-only',
  });

  const [newNotifications, setNewNotifications] = useState<
    FragmentNotificationBase[]
  >([]);

  const [notifications, setNotifications] = useState<
    FragmentNotificationBase[] | undefined
  >(queryNotificationGetMany.data?.notificationFindMany);

  useEffect(() => {
    setNotifications(queryNotificationGetMany.data?.notificationFindMany);
    if (notifications !== undefined) {
      setNewNotifications(notifications!.slice(0, 5));
    }
  }, [notifications, queryNotificationGetMany.data]);

  return (
    <View style={styles.containerScenes}>
      <View style={{ paddingTop: 20 }}>
        <KwNotificationStack
          category={I18n.t('NOTIFICATION__SCREEN_NEW_TEXT')}
          notifications={newNotifications}
        />
      </View>
    </View>
  );
};
const renderScene = SceneMap({
  first: AllNotification,
  second: MentionsNotification,
});

const Notification = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'New' },
    { key: 'second', title: 'Old' },
  ]);

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      style={styles.tab}
      labelStyle={styles.label}
      indicatorStyle={styles.indicator}
    />
  );

  return (
    <View style={styles.container}>
      <KwHearder
        back
        title="Notifications"
        notification
        avatar="https://via.placeholder.com/150"
      />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.app.white,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  containerScenes: {
    flex: 1,
    backgroundColor: colors.app.backgrounfGray,
    paddingHorizontal: 10,
  },
  label: {
    textTransform: 'capitalize',
    color: colors.app.black,
    fontWeight: '500',
  },
  tab: {
    backgroundColor: colors.app.white,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    borderRadius: 20,
  },
  indicator: {
    width: 100,
    height: 2,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.app.primary,
    left: 40,
  },
});

export default Notification;
