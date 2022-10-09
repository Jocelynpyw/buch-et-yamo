import React, { FunctionComponent } from 'react';
import { colors, images } from '@KwSrc/utils';
import { StackScreenProps } from '@react-navigation/stack';

import { StyleSheet, View, Image, Text } from 'react-native';
import { KwContainer } from '@KwSrc/components/container';
import { KwButton } from '@KwSrc/components/button';
import { ScrollView } from 'react-native-gesture-handler';
import { QuizzesStackRouteList } from '../constants';

const CompetionQuizzesScreen: FunctionComponent<StackScreenProps<any>> = ({
  navigation,
}) => (
  <ScrollView>
    <View style={styles.container_one}>
      <View style={styles.imageContainer}>
        <Image
          source={images.competitionImage}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <KwContainer
        textStyle={styles.title}
        style={styles.container}
        title="Competion quiz"
      >
        <ScrollView>
          <Text style={styles.description}>
            Each weekend kawlo organises online competition quizzes for both A
            level and O level students, covering various subjects and topics,
            the winner of the quizzes stand chance of wining cash price every
            weekend.
          </Text>
          <View style={[styles.alertContainer, styles.MT15]}>
            <View style={styles.alert}>
              <View style={styles.box}>
                <Text style={styles.question}>i</Text>
              </View>
              <Text style={styles.number}>Available only on weekends</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <KwButton
              onPress={() => {
                navigation.navigate(QuizzesStackRouteList.CompetitionQuizzes);
              }}
              size="lg"
              color={colors.app.primary}
              children="Start Competition"
            />
          </View>
        </ScrollView>
      </KwContainer>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container_one: {
    flex: 1,
    backgroundColor: colors.app.primary,
    paddingHorizontal: 10,
  },
  container: {
    height: 410,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  title: { fontSize: 18, marginTop: 2 },
  image: { width: 280, height: 240, alignItems: 'center' },
  imageContainer: {
    alignItems: 'center',
  },
  alertContainer: {
    backgroundColor: 'rgba(77, 118, 193, 0.17)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alert: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  box: {
    borderRadius: 15,
    backgroundColor: colors.app.primary,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.white,
  },
  number: { marginLeft: 5, fontWeight: 'bold' },
  MT8: {
    marginTop: 8,
  },
  MT15: {
    marginTop: 15,
  },
  tag: { color: colors.text.grey, fontSize: 14, marginTop: 20 },
  description: {
    lineHeight: 20,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 20,
  },
});

export default CompetionQuizzesScreen;
