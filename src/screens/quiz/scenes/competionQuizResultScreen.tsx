import React, { FunctionComponent } from 'react';
import { colors, images } from '@KwSrc/utils';
import { StackScreenProps } from '@react-navigation/stack';
import i18n from '@KwSrc/config/i18n/i18n';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import KwIcon from '@KwSrc/components/Icon';
import KwAvatar from '@KwSrc/components/avatar';
import { KwButton } from '@KwSrc/components/button';

const CompetitionQuizResultScreen: FunctionComponent<StackScreenProps<any>> = ({
  navigation,
}) => (
  <View style={styles.container_one}>
    <ImageBackground source={images.backgroundImage} style={styles.MAXWH}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.P20}
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
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.congratsText}>{i18n.t('COMMON__CONGRATS')}</Text>
          <Image style={styles.congrats} source={images.congratsImage} />
        </View>
        <Text style={styles.player}>Will Smith</Text>
        <View style={styles.rank}>
          <View style={styles.center}>
            <KwAvatar
              src="https://via.placeholder.com/150"
              size="large"
              style={styles.MB10}
            />
            <View style={styles.star}>
              <KwIcon
                name="star"
                width="140"
                height="140"
                viewBox="0 0 50 10"
                stroke={colors.app.white}
                strokeWidth={0.5}
                fill={colors.app.orange}
              />
            </View>
            <Text style={styles.points}>9 Points</Text>
            <Image
              source={images.firstImage}
              // resizeMode="contain"
              style={styles.imageSizeLarge}
            />
          </View>
          <View style={styles.center}>
            <KwAvatar
              src="https://via.placeholder.com/150"
              size="small"
              style={styles.MB10}
            />
            <Text style={styles.secondPoints}>6 Points</Text>
            <Image
              source={images.secondImage}
              // resizeMode="contain"
              style={styles.imageSizeSmall}
            />
          </View>
        </View>
        <View style={[styles.MT5, styles.center]}>
          <Text style={styles.white}>
            {i18n.t('COMPONENT__SHARE_YOUR_ACHIVEMENT_MESSAGE')}{' '}
          </Text>
          <Text style={styles.white}>
            {i18n.t('COMPONENT__TAKE_ANOTHER_MESSAGE')}
          </Text>
          <View style={[styles.buttons, styles.center]}>
            <KwButton
              onPress={() => {}}
              children={i18n.t('COMPONENT__CHILDREN__SHARE_RESULTS')}
              size="md"
              iconButton
              iconButtonLeft
              textStyle={{
                fontSize: 14,
                color: colors.text.white,
              }}
              icon={
                <KwIcon
                  name="shareIcon"
                  fill={colors.app.white}
                  width="30"
                  height="30"
                  viewBox="2 -10 7 30"
                />
              }
              color={colors.app.primary}
              tintColor={colors.app.black}
              style={styles.button}
            />
            <KwButton
              onPress={() => {}}
              children={i18n.t('COMPONENT__CHILDREN__TAKE_NEW_QUIZ')}
              size="md"
              textStyle={{
                fontSize: 14,
                paddingVertical: 5,
              }}
              color={colors.app.orange}
              tintColor={colors.app.white}
              style={styles.button}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container_one: {
    flex: 1,
    backgroundColor: colors.app.primary,
  },
  container: { alignItems: 'center' },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  congratsText: {
    textTransform: 'uppercase',
    fontSize: 32,
    lineHeight: 28,
    color: colors.text.white,
    paddingTop: 20,
    fontWeight: 'bold',
  },
  congrats: {
    height: 50,
    width: 50,
  },
  P20: { padding: 20 },
  player: {
    textTransform: 'capitalize',
    color: colors.text.lightYellow,
    fontSize: 18,
    marginVertical: 15,
    fontWeight: 'bold',
  },
  MB10: {
    marginBottom: 10,
    borderColor: colors.app.white,
    borderWidth: 2,
  },
  MT5: {
    marginTop: 15,
  },
  MAXWH: { height: '100%', width: '100%' },
  star: { position: 'absolute', top: -80, left: 30 },
  rank: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 30,
  },
  center: {
    alignItems: 'center',
  },
  points: {
    position: 'absolute',
    top: 115,
    zIndex: 1000,
    textAlign: 'center',
    color: colors.app.white,
  },
  secondPoints: {
    position: 'absolute',
    top: 55,
    zIndex: 1000,
    textAlign: 'center',
    color: colors.app.white,
  },
  white: {
    color: colors.app.white,
  },
  buttons: {
    flexDirection: 'row',
    // width: '100%',
    justifyContent: 'space-between',
    marginVertical: 30,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  button: { width: '40%', marginHorizontal: 5 },
  imageSizeSmall: { width: 86, height: 182 },
  imageSizeLarge: { width: 86, height: 242 },
});

export default CompetitionQuizResultScreen;
