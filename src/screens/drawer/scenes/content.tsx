import KwAvatar from '@KwSrc/components/avatar';
import KwIcon from '@KwSrc/components/Icon';
import i18n from '@KwSrc/config/i18n/i18n';
import { HomeDrawerRouteList } from '@KwSrc/navigation/constants.navigation';
import { answerClearDownloadsAction } from '@KwSrc/store/actions';
import { AuthSignOutAccount } from '@KwSrc/store/actions/users/actionsCreator';
import { selectAuth } from '@KwSrc/store/reducers/users';
import { colors } from '@KwSrc/utils';
import { shareContent } from '@KwSrc/utils/share';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';

const Content = () => {
  const navigation = useNavigation<any>();
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  // console.log(auth);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containerUser}>
          <TouchableOpacity
            onPress={() => {
              if (auth?.user) {
                navigation.navigate(HomeDrawerRouteList.mySetting);
              }
            }}
          >
            <KwAvatar
              size="medium"
              src={auth?.user?.avatar || 'https://via.placeholder.com/150'}
            />
          </TouchableOpacity>
          <View style={styles.user}>
            <Text style={styles.username}>
              {auth.user?.username || 'Kawlo users'}
            </Text>
            <Text style={styles.useremail}>
              {auth.user?.email || auth.user?.phone || 'Not connected'}
            </Text>
          </View>
        </View>

        <View style={styles.contentFrist}>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() =>
              navigation.navigate(HomeDrawerRouteList.notificatons)
            }
          >
            <View>
              <Text style={styles.contentLeft}>
                {i18n.t('COMMON__NOTIFICATIONS')}
              </Text>
            </View>
            <View style={styles.contentRight} />
          </TouchableOpacity>

          {auth?.user && (
            <TouchableOpacity style={styles.contentItem}>
              <View>
                <Text style={styles.contentLeft}>
                  {' '}
                  {i18n.t('COMMON__MY_POINTS')}
                </Text>
              </View>
              <Text style={{ fontWeight: 'bold', color: colors.app.primary }}>
                0
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => navigation.navigate(HomeDrawerRouteList.download)}
          >
            <View>
              <Text style={styles.contentLeft}>
                {' '}
                {i18n.t('COMMON__MY_DOWNLOADS')}
              </Text>
            </View>

            <KwIcon
              name="chevron_right"
              width="20"
              height="20"
              viewBox="0 -10 10 20"
              stroke={colors.app.black}
              fill="none"
            />
          </TouchableOpacity>
          {auth?.user && (
            <TouchableOpacity
              style={styles.contentItem}
              onPress={() => navigation.navigate(HomeDrawerRouteList.myWallet)}
            >
              <View>
                <Text style={styles.contentLeft}>
                  {' '}
                  {i18n.t('COMMON__MY_SUBSCRIPTIONS')}
                </Text>
              </View>
              <KwIcon
                name="chevron_right"
                width="20"
                height="20"
                viewBox="0 -10 10 20"
                stroke={colors.app.black}
                fill="none"
              />
            </TouchableOpacity>
          )}

          {auth?.user && (
            <TouchableOpacity
              style={styles.contentItem}
              onPress={() => navigation.navigate(HomeDrawerRouteList.mySetting)}
            >
              <View>
                <Text style={styles.contentLeft}>
                  {' '}
                  {i18n.t('COMMON__MY_SETTINGS')}
                </Text>
              </View>
              <KwIcon
                name="chevron_right"
                width="20"
                height="20"
                viewBox="0 -10 10 20"
                stroke={colors.app.black}
                fill="none"
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.containerLine}>
          <View style={styles.line} />
        </View>

        <View style={styles.contentFrist}>
          <TouchableOpacity
            onPress={() => {
              shareContent({
                title: 'Download Kawlo',
                message:
                  'Hey!, looking for papers and solutions dowload the kawlo app now',
                url: 'https://play.google.com/store/apps/details?id=com.kawlo&hl=en&gl=US',
              });
            }}
            style={styles.contentItem}
          >
            <View>
              <Text style={styles.contentLeft}>{i18n.t('COMMON__SHARE')} </Text>
            </View>
            <KwIcon
              name="chevron_right"
              width="20"
              height="20"
              viewBox="0 -10 10 20"
              stroke={colors.app.black}
              fill="none"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(HomeDrawerRouteList.news)}
            style={styles.contentItem}
          >
            <View>
              <Text style={styles.contentLeft}> Annoucement</Text>
            </View>
            <KwIcon
              name="chevron_right"
              width="20"
              height="20"
              viewBox="0 -10 10 20"
              stroke={colors.app.black}
              fill="none"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => navigation.navigate(HomeDrawerRouteList.aboutUs)}
          >
            <View>
              <Text style={styles.contentLeft}>
                {' '}
                {i18n.t('COMMON__ABOUT_US')}{' '}
              </Text>
            </View>
            <KwIcon
              name="chevron_right"
              width="20"
              height="20"
              viewBox="0 -10 10 20"
              stroke={colors.app.black}
              fill="none"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentItem}
            onPress={() => navigation.navigate(HomeDrawerRouteList.contactUs)}
          >
            <View>
              <Text style={styles.contentLeft}>
                {' '}
                {i18n.t('COMMON__CONTACT_US')}{' '}
              </Text>
            </View>
            <KwIcon
              name="chevron_right"
              width="20"
              height="20"
              viewBox="0 -10 10 20"
              stroke={colors.app.black}
              fill="none"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (auth?.user) {
                dispatch(AuthSignOutAccount());
                dispatch(answerClearDownloadsAction());
              } else {
                navigation.navigate(HomeDrawerRouteList.login);
              }
            }}
            style={styles.contentItem}
          >
            <Text
              style={{
                color: auth?.user ? colors.app.danger : colors.app.primary,
              }}
            >
              {auth?.user ? 'Logout' : 'Login'}
            </Text>
            <KwIcon
              name="logOut"
              width={30}
              height={30}
              viewBox="0 -10 30 30"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.app.white,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  comments: {
    marginHorizontal: 5,
    borderColor: colors.app.white,
  },
  containerDetail: { paddingHorizontal: 5 },
  containerUser: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  user: { flexShrink: 1, paddingHorizontal: 5 },
  username: {
    flexDirection: 'row',
    fontWeight: 'bold',
    fontSize: 14,
    flexShrink: 1,
  },
  useremail: {
    flexDirection: 'row',
    fontWeight: '300',
    fontSize: 12,
    flexShrink: 1,
    marginTop: 5,
  },
  contentFrist: { marginTop: 30 },
  contentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    alignContent: 'center',
    marginVertical: 5,
  },
  contentLeft: { color: colors.app.black, fontWeight: '400', fontSize: 14 },
  contentRight: {
    backgroundColor: colors.app.danger,
    height: 8,
    width: 8,
    borderRadius: 8,
    alignContent: 'center',
  },
  containerLine: { paddingHorizontal: 20 },
  line: {
    borderColor: colors.app.backgrounfGray,
    borderWidth: 0.7,
    marginTop: 30,
  },
  logout: { flexDirection: 'row', justifyContent: 'space-between' },
});

export default Content;
