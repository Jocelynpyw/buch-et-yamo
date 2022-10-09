import { KwSquareCard } from '@KwSrc/components/card/squareCard';
import PrHeader from '@KwSrc/components/header';
import { colors, images } from '@KwSrc/utils';
import React, { FunctionComponent } from 'react';
import i18n from '@KwSrc/config/i18n/i18n';
import {
  StyleSheet,
  View,
  Text,
  ListRenderItem,
  FlatList,
  ImageSourcePropType,
  Linking,
} from 'react-native';
import { useSelector } from 'react-redux';
import { selectAppSettings } from '@KwSrc/store/reducers/app';

import { IAppSettings } from '@KwSrc/typings/apiTypes';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { KwAds } from '@KwSrc/components/ads';
import { StudyStackParamList, StudyStackRouteList } from '../route/contants';

interface BoxesProps {
  name: string;
  url: ImageSourcePropType;
  bg?: string;
  desc: string;
  route?(): void;
}

const StudyHomeScreen: FunctionComponent<StudyHomeScreenProps> = ({
  navigation,
}) => {
  const settings: IAppSettings = useSelector(selectAppSettings);
  const Boxes: BoxesProps[] = [
    {
      name: i18n.t('COMMON__PAMPHLETS'),
      desc: '5000+ Pamphlets',
      url: images.studyPamphetImage,
      route: () => {
        navigation.navigate(StudyStackRouteList.StudyPamplet);
      },
    },
    {
      name: i18n.t('COMPONENT__STUDY_VIDEOS_TUTORIALS'),
      url: images.studyVideoImage,
      desc: '1000+ Videos',
      route: () => {
        navigation.navigate(StudyStackRouteList.StudyVideo);
      },
    },
    {
      name: i18n.t('COMPONENT__SCHOOL_NOTES_TUTORIALS'),
      url: images.studyBookImage,
      desc: '2000+ Notes',
      route: () => {
        navigation.navigate(StudyStackRouteList.StudyNotes);
      },
    },
    {
      name: i18n.t('COMPONENT__BUY_CORRECTIONS_TUTORIALS'),
      url: images.studyCorrectionImage,
      desc: '100+  Corrections',
      route: () => {
        Linking.openURL(
          `whatsapp://send?phone=${
            settings!.phones!.correction[0]
          }&text=Hello sir i will like to Corrections`,
        );
      },
    },
  ];

  const renderItem: ListRenderItem<BoxesProps> = ({ item }) => (
    <View style={styles.studyBox}>
      <KwSquareCard
        onPress={item.route}
        title={item.name}
        description={item.desc}
        uri={item.url}
      />
    </View>
  );
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>
        {i18n.t('COMPONENT__HOW_CANWEHELP_TUTORIALS')}
      </Text>
    </View>
  );

  return (
    <View style={styles.background}>
      <PrHeader
        menu
        title="Your study resource"
        avatar="https://via.placeholder.com/150"
      />

      <FlatList
        style={styles.flatlist}
        initialNumToRender={5}
        keyExtractor={(item) => item.name}
        data={Boxes}
        renderItem={renderItem}
        columnWrapperStyle={styles.columnStyle}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={() => (
          <View style={styles.mv}>
            <KwAds type="notes" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.app.primary,
    paddingBottom: 70,
  },
  container: {
    flex: 1,
    backgroundColor: colors.app.white,
  },
  columnStyle: {
    justifyContent: 'space-evenly',
    marginTop: 30,
  },
  image: {
    width: 60,
    height: 60,
  },
  compTitle: {
    textAlign: 'center',
    color: colors.app.black,
    paddingTop: 5,
    fontFamily: 'Roboto-Light',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Roboto-Light',
  },
  titleDesc: {
    flexShrink: 1, // fixes overflow on text exceeding view
    fontFamily: 'Roboto-Light',
  },
  mv: { marginVertical: 5 },
  compBox: {
    backgroundColor: colors.app.black,
    borderRadius: 5,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 2,
    marginHorizontal: 5,
    marginVertical: 5,
    width: '45%',
  },
  selectCountryText: {
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: 'Roboto-Light',
  },
  text: {
    alignItems: 'center',
  },
  list: { borderBottomWidth: 0 },
  flatlist: {
    backgroundColor: colors.app.backgrounfGray,
    marginHorizontal: 10,
    borderRadius: 20,
    marginVertical: 10,
  },
  headerTitle: {
    justifyContent: 'center',
    fontSize: 21,
    fontWeight: '700',
    color: colors.text.headerColor,
    alignSelf: 'flex-start',
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 0,
  },
  header: { flex: 1, justifyContent: 'center' },
  studyBox: { width: '45%' },
});

interface StudyHomeScreenProps {
  route: RouteProp<StudyStackParamList, typeof StudyStackRouteList.StudyHome>;
  navigation: StackNavigationProp<
    StudyStackParamList,
    typeof StudyStackRouteList.StudyHome
  >;
}
export default StudyHomeScreen;
