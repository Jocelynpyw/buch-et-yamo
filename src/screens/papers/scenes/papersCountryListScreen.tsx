import React, { FunctionComponent, useCallback, useState } from 'react';
import { colors } from '@KwSrc/utils';
import { StackNavigationProp } from '@react-navigation/stack';
import i18n from '@KwSrc/config/i18n/i18n';
import { StyleSheet, View, FlatList, ListRenderItem, Text } from 'react-native';
import { KwContainer } from '@KwSrc/components/container';
import { KwListItem } from '@KwSrc/components/listItem';
import KwIcon from '@KwSrc/components/Icon';
import { RouteProp } from '@react-navigation/native';
import { KwAds } from '@KwSrc/components/ads';
import { PapersStackParamList, PapersStackRouteList } from '../constant';

export interface Icountries {
  title: string;
  flag: string;
  levels: [
    {
      title: string;
      id: number;
    },
  ];
}

const countries = [
  {
    title: i18n.t('COMMON__CAMEROON'),
    flag: '🇨🇲',
    levels: [
      { title: 'GCE O Level', id: 1 },
      { title: 'GCE A Level', id: 2 },
      { title: 'Technical GCE', id: 3 },
      { title: 'Commercial GCE', id: 4 },
    ],
  },
  {
    title: i18n.t('COMMON__TANZANIA'),
    flag: '🇹🇿',
    levels: [
      { title: 'CSEE (Form 4)', id: 5 },
      { title: 'ACSEE (Form 6)', id: 6 },
    ],
  },
  {
    title: i18n.t('COMMON__UGANDA'),
    flag: '🇺🇬',
    levels: [
      { title: 'UCE', id: 7 },
      { title: 'UACE', id: 8 },
    ],
  },
  {
    title: i18n.t('COMMON__ZAMBIA'),
    flag: '🇿🇲',
    levels: [
      { title: 'ECZ 7', id: 9 },
      { title: 'ECZ 9', id: 10 },
      { title: 'ECZ 12', id: 11 },
    ],
  },
];

const PapersCountryListScreen: FunctionComponent<
  PapersCountryListScreenProps
> = ({ navigation }) => {
  const [active, setActive] = useState('');

  const renderItem: ListRenderItem<any> = useCallback(
    ({ item }) => (
      <View>
        <KwListItem
          style={styles.kwContainer}
          left={<Text style={styles.flagStyle}>{item.flag}</Text>}
          title={<Text style={styles.countryTitle}>{item.title}</Text>}
          right={
            <KwIcon
              name="chevron_down"
              width="30"
              height="30"
              viewBox="-5 -5 20 25"
              stroke={colors.app.black}
              fill="none"
            />
          }
          onPress={() => setActive(item.title === active ? '' : item.title)}
          bottom={
            active === item.title && (
              <View style={styles.levels}>
                {item.levels.map((level: any) => (
                  <KwListItem
                    key={level.id}
                    style={styles.levelContainer}
                    title={<Text>{level.title}</Text>}
                    right={
                      <KwIcon
                        name="chevron_right"
                        width="30"
                        height="30"
                        viewBox="-5 -5 30 30"
                        stroke={colors.app.black}
                        fill="none"
                      />
                    }
                    onPress={() =>
                      navigation.navigate({
                        name: PapersStackRouteList.PapersList,
                        params: { level: level.title, id: level.id },
                      })
                    }
                  />
                ))}
              </View>
            )
          }
        />
      </View>
    ),
    [active, navigation],
  );

  const renderFooter = () => <View />;

  const renderEmpty = () => <View />;

  return (
    <View style={styles.container_one}>
      <KwContainer
        textStyle={styles.textContainer}
        title={i18n.t('COMON__SECLECT_YOU_COUNTRY_MESSAGE')}
        style={styles.container}
      >
        <FlatList
          initialNumToRender={5}
          data={countries}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
        />
        <KwAds type="notes" />
      </KwContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container_one: {
    flex: 1,
    backgroundColor: colors.app.primary,
    paddingHorizontal: 12,
    paddingBottom: 70,
  },
  container: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  title: {
    fontWeight: 'bold',
    color: colors.app.black,
    fontSize: 16,
  },
  list: {
    height: 63,
    marginTop: 10,
  },
  flagStyle: {
    fontSize: 18,
  },
  countryTitle: {
    fontSize: 18,
  },
  kwContainer: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: colors.app.white,
    borderWidth: 1,
    borderColor: colors.app.white,
  },
  levels: { marginLeft: 20 },
  levelContainer: { backgroundColor: 'white', marginBottom: 2 },
  textContainer: { fontSize: 20, marginBottom: 20 },
});

interface PapersCountryListScreenProps {
  route: RouteProp<PapersStackParamList, typeof PapersStackRouteList.PapersTab>;
  navigation: StackNavigationProp<
    PapersStackParamList,
    typeof PapersStackRouteList.PapersTab
  >;
}

export default PapersCountryListScreen;
