import { colors, fontsizes } from '@KwSrc/utils';
import images from '@KwSrc/utils/images';
import { useNavigation } from '@react-navigation/native';
import React, { FunctionComponent, useState } from 'react';
import i18n from '@KwSrc/config/i18n/i18n';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import { useSelector } from 'react-redux';
import { selectAuth } from '@KwSrc/store/reducers/users';
import { HomeDrawerRouteList } from '@KwSrc/navigation/constants.navigation';
import KwAvatar from '../avatar';
import { KwButton } from '../button';
import KwDefaultInput from '../defaultInput';
import KwIcon from '../Icon';

interface Props {
  textLeft?: string;
  title?: string;
  username?: string;
  logo?: boolean;
  transparent?: boolean;
  buttonTitle?: string;
  button?: boolean;
  back?: boolean;
  search?: boolean;
  avatar?: string;
  avatarChat?: string;
  message?: boolean;
  bell?: boolean;
  photo?: boolean;
  close?: boolean;
  previous?: boolean;
  menu?: boolean;
  more?: boolean;
  loading?: boolean;
  notificationCount?: number;
  notification?: boolean;
  searchBottom?: boolean;
  clock?: number | string;
  user?: number;
  remove?: boolean;
  progress?: number;
  chatSearch?: boolean;
  iconButton?: boolean;
  onPressBack?: () => void;
  onPressSearch?: () => void;
  onPressAvatar?: () => void;
  onPressAvatarChat?: () => void;
  onPressMessage?: () => void;
  onPressButton?: () => void;
  onPressEdit?: () => void;
  onPressAudioCall?: () => void;
  onPressVideoCall?: () => void;
  onPressPhoto?: () => void;
  onPressClose?: () => void;
  onPressMore?: () => void;
  getSearchText?: (text: string) => void;
}

const KwHearder: FunctionComponent<Props> = (props: Props) => {
  const navigation = useNavigation<any>();

  const auth = useSelector(selectAuth);

  const [search, setSearch] = useState<string>();
  return (
    <View
      style={[
        styles.containerParent,
        props.transparent && styles.backgroundTransparent,
      ]}
    >
      <View style={[styles.container]}>
        {props.menu && (
          <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}
          >
            <KwIcon
              name="menu_1"
              width="38"
              height="38"
              viewBox="0 0 800 500"
              fill={colors.app.white}
            />
          </TouchableOpacity>
        )}
        {props.logo && <Image style={styles.logo} source={images.logoSmall} />}
        {props.search && (
          <View style={styles.searchCustom}>
            <KwDefaultInput
              prependIcon="search"
              keyboardType="default"
              placeholder={i18n.t('COMPONENT__SEARCH_PLACEHOLDER_TOPIC')}
              placeholderTextColor={colors.text.tertiaryGrey}
              borderColor={colors.app.white}
              backgroundColor={colors.app.white}
              prependImage={images.searchParams}
              value={search}
              onChangeText={(name, text) => {
                setSearch(text);
              }}
            />
          </View>
        )}

        {!props.search && (
          <View style={[styles.lead]}>
            {props.back && (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <KwIcon
                  name="left_arrow"
                  width="48"
                  height="48"
                  viewBox="0 0 50 10"
                  stroke={colors.app.white}
                  fill="none"
                />
              </TouchableOpacity>
            )}

            {!!props.user && (
              <KwButton
                style={styles.userButton}
                color={colors.app.backgroundQuizUser}
                size="xs"
                onPress={props.onPressPhoto}
                isLoading={!!props.loading}
              >
                <View style={styles.clockContainer}>
                  <KwIcon
                    name="user"
                    width="30"
                    height="30"
                    viewBox="0 -6 25 25"
                    fill="none"
                  />
                  <Text style={styles.clockText}>{props.user}</Text>
                </View>
              </KwButton>
            )}

            {props.avatarChat && (
              <TouchableOpacity
                style={styles.alignItemRow}
                onPress={props.onPressAvatarChat}
              >
                <View style={{ flexDirection: 'row' }}>
                  <View style={[styles.notification, styles.userOnline]} />
                  <KwAvatar
                    size="large"
                    src={props.avatarChat}
                    style={styles.avatarChat}
                  />

                  <View>
                    <Text style={styles.userStyle}>{props.username}</Text>
                    <Text style={styles.userOnlineStyle}>
                      {i18n.t('COMMON__ONLINE')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            {props.previous && (
              <TouchableOpacity onPress={props.onPressBack}>
                <KwIcon
                  name="previous"
                  width="30"
                  height="30"
                  viewBox="0 0 30 25"
                  fill="none"
                />
              </TouchableOpacity>
            )}

            {props.textLeft && (
              <View style={{ flexShrink: 1, flexDirection: 'row' }}>
                <Text style={styles.title}>{props.textLeft}</Text>
              </View>
            )}
          </View>
        )}
        {props.title && (
          <View style={{ flexGrow: 1, width: 100 }}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
        )}

        {props.progress && (
          <View style={styles.progressContainer}>
            <Progress.Bar
              color={colors.app.white}
              unfilledColor={colors.app.backgroundQuizUser}
              progress={props.progress}
              borderColor={colors.app.backgroundQuizUser}
              width={null}
            />
          </View>
        )}

        <View style={styles.actions}>
          {!!props.clock && (
            <KwButton
              style={styles.clockButton}
              color={colors.app.orange}
              size="xs"
              onPress={props.onPressPhoto}
            >
              <View style={styles.clockContainer}>
                <KwIcon
                  name="clock"
                  width="30"
                  height="30"
                  viewBox="0 -6 25 25"
                  fill="none"
                />
                <Text style={styles.clockText}>{props.clock}</Text>
              </View>
            </KwButton>
          )}
          {props.close && (
            <TouchableOpacity
              style={styles.marginLeft}
              onPress={props.onPressClose}
            >
              <KwIcon
                name="close"
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
              />
            </TouchableOpacity>
          )}

          {props.chatSearch && (
            <KwButton
              style={styles.clockButton}
              color={colors.app.white}
              size="xs"
              onPress={props.onPressPhoto}
            >
              <KwIcon
                name="search"
                width="20"
                height="20"
                viewBox="-5 -5 30 30"
                fill="none"
              />
            </KwButton>
          )}
          {props.more && (
            <TouchableOpacity onPress={props.onPressMore}>
              <KwIcon
                name="more"
                width="10"
                height="30"
                viewBox="0 0 10 14"
                stroke={colors.app.black}
                fill="none"
              />
            </TouchableOpacity>
          )}

          {!props.remove && (
            <TouchableOpacity
              style={styles.marginLeft}
              onPress={() => {
                navigation.navigate(HomeDrawerRouteList.notificatons);
              }}
            >
              {!auth?.user ? (
                <View style={{}}>
                  <KwIcon
                    name="bell"
                    width="30"
                    height="30"
                    viewBox="0 0 30 20"
                    stroke={colors.app.white}
                    fill={colors.app.white}
                  />
                  <Text
                    style={{
                      color: colors.text.white,
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 10,
                      backgroundColor: colors.app.notificationCount,
                      borderRadius: 10,
                      position: 'absolute',
                      padding: 3,
                      paddingHorizontal: 5,
                      right: 0,
                    }}
                  >
                    {props.notificationCount || 0}
                  </Text>
                </View>
              ) : (
                <KwAvatar src={String(auth.user?.avatar)} size="small" />
              )}
            </TouchableOpacity>
          )}

          {props.button && props.buttonTitle && (
            <KwButton
              style={{ paddingHorizontal: 10, width: 100 }}
              color={colors.app.white}
              size="md"
              onPress={props.onPressButton}
              isLoading={!!props.loading}
              iconButton={!!props.iconButton}
            >
              <Text
                style={{
                  color: colors.text.black,
                  paddingHorizontal: 10,
                }}
              >
                {props.buttonTitle}
              </Text>
            </KwButton>
          )}
        </View>
      </View>
      {props.searchBottom && (
        <View style={styles.searchBottom}>
          <KwDefaultInput
            prependIcon="search"
            keyboardType="default"
            placeholder="Search a topic, category…"
            placeholderTextColor={colors.text.tertiaryGrey}
            borderColor={colors.app.white}
            backgroundColor={colors.app.white}
            value={search}
            onChangeText={(name, text) => {
              setSearch(text);
              if (props.getSearchText) props.getSearchText(text);
            }}
          />
        </View>
      )}
    </View>
  );
};
export default KwHearder;

const styles = StyleSheet.create({
  containerParent: {
    backgroundColor: colors.app.primary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alignItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backgroundTransparent: {
    backgroundColor: 'transparent',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    // alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: fontsizes.SIZES.body4,
    color: colors.text.white,
  },
  lead: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexGrow: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  marginLeft: {
    marginLeft: 15,
  },
  userStyle: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontFamily: fontsizes.FONTS.robotoBody4.fontFamily,
    fontSize: fontsizes.SIZES.body4,
    color: colors.app.white,
    textTransform: 'capitalize',
  },
  userOnlineStyle: {
    marginLeft: 10,
    fontWeight: '100',
    fontFamily: fontsizes.FONTS.robotoBody4.fontFamily,
    fontSize: fontsizes.SIZES.body5,
    color: colors.app.white,
    textTransform: 'capitalize',
    marginTop: 2,
  },
  userOnline: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: colors.app.white,
    backgroundColor: colors.app.online,
    left: 45,
  },
  avatarChat: {
    marginLeft: 15,
    height: 45,
    width: 45,
  },
  button: {
    paddingHorizontal: 15,
    backgroundColor: colors.app.primary,
    borderRadius: 8,
  },
  textButton: {
    fontSize: 14,
  },
  notificationCount: {
    color: colors.text.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
  notification: {
    backgroundColor: colors.app.notificationCount,
    width: 18,
    height: 18,
    position: 'absolute',
    zIndex: 99999,
    borderRadius: 10,
    left: 30,
    top: -3,
  },
  searchCustom: { justifyContent: 'center', flex: 1 },
  searchBottom: { justifyContent: 'center', marginTop: 10 },
  clockButton: {
    justifyContent: 'center',
    padding: 1,
    paddingHorizontal: 2,
    marginLeft: 3,
  },
  userButton: {
    justifyContent: 'center',
    padding: 1,
    paddingHorizontal: 2,
    marginRight: 3,
  },
  clockContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  clockText: {
    color: colors.text.white,
    fontSize: 15,
  },
  progressContainer: { alignSelf: 'center', flex: 1 },
});
