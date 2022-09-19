import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import KwHearder from '@KwSrc/components/header';
import { useNavigation } from '@react-navigation/native';
import { colors, images } from '@KwSrc/utils';
import { SIZES } from '@KwSrc/utils/fontsizes';

const AboutUsSection = () => {
  const navivation = useNavigation();
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <KwHearder back title="About Us" />
        <View style={styles.containerText}>
          <Text style={styles.title}>About Kawlo</Text>

          <View>
            <Image
              resizeMode="contain"
              style={styles.image}
              source={images.competitionImage}
            />
          </View>
          <Text style={styles.textContain}>
            Gcerevision is web based company that aims to facilitate education
            in africa and cameroon by providing students and teachers with
            educational materials such as past questions, quizzes , Notes, a
            forum and to correction, Currently present in four countries i.e
            cameroon, zambia, uganda and tanzania. To achieve that gcerevision
            group has created the following website/app Gcerevision.com
            Gcequiz.com Kawlo.com (website) Kawlo (playstore) .
          </Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.app.white,
  },
  containerText: {
    padding: 10,
    paddingHorizontal: 15,
  },
  textContain: {
    // textAlign: 'justify',
    lineHeight: 30,
    fontSize: SIZES.body4,
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
    textAlign: 'center',
    fontWeight: '400',
  },
  image: { width: 250, height: 250, alignSelf: 'center' },
});
export default AboutUsSection;
