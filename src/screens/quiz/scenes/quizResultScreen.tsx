import React, { FunctionComponent } from 'react';
import { colors, images } from '@KwSrc/utils';
import { StackNavigationProp } from '@react-navigation/stack';
import i18n from '@KwSrc/config/i18n/i18n';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import KwIcon from '@KwSrc/components/Icon';
import KwAvatar from '@KwSrc/components/avatar';
import { KwButton } from '@KwSrc/components/button';
import { RouteProp } from '@react-navigation/native';
import { QuizzesStackParamList, QuizzesStackRouteList } from '../constants';

interface QuizResultScreenProps {
  route: RouteProp<
    QuizzesStackParamList,
    typeof QuizzesStackRouteList.QuizPlay
  >;
  navigation: StackNavigationProp<
    QuizzesStackParamList,
    typeof QuizzesStackRouteList.QuizPlay
  >;
  data: {
    image: string;
    points: number;
    questions: number;
  };
}

const QuizResultScreen: FunctionComponent<QuizResultScreenProps> = ({
  navigation,
  data,
}) => (
  <View style={styles.container_one}>
    <ImageBackground source={images.backgroundImage_2} style={styles.MAXWH}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={images.decorationImage}
          resizeMode="contain"
          style={styles.decorationSize}
        />

        <View style={[styles.center]}>
          <View style={styles.imageContainer}>
            <KwAvatar
              src={data.image}
              size="large"
              style={[styles.MB10, styles.size]}
            />
          </View>

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
        </View>

        <View style={styles.heading}>
          <Text style={styles.congratsText}>{i18n.t('COMMON__CONGRATS')}</Text>
          <Image style={styles.congrats} source={images.congratsImage} />
        </View>
        <Text style={styles.player}>
          {i18n.t('COMPONENT__YOUT_SCORE_IS_MESSAGE')}
        </Text>
        <Text style={styles.score}>
          {data.points}/{data.questions}
        </Text>
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
              onPress={() => {
                navigation.goBack();
              }}
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
    backgroundColor: colors.app.primary,
  },
  container: { alignItems: 'center' },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 35,
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
  star: { position: 'absolute', top: -275, left: -15 },
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
  size: {
    width: 150,
    height: 150,
  },
  imageContainer: {
    position: 'absolute',
    top: -200,
    height: 200,
  },
  score: {
    color: colors.text.blue,
    backgroundColor: colors.app.backgrounfGray,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
  },
  decorationSize: { width: 280, height: 280 },
});

export default QuizResultScreen;
