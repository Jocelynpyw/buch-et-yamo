import React, { FunctionComponent, useCallback, useState } from 'react';
import { colors } from '@KwSrc/utils';

import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  Text,
  ActivityIndicator,
} from 'react-native';
import { KwListItem } from '@KwSrc/components/listItem';
import KwIcon from '@KwSrc/components/Icon';
import { KwLinearGradient } from '@KwSrc/components/linearGradient';
import { useQuery } from '@apollo/client';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AnswersStackParamList, AnswersStackRouteList } from '../constants';
import { QUERY_CORRECTION_COUNTRY_MANY } from '../graphql/queries';
import { QueryCorrectionCountryMany } from '../graphql/__generated__/QueryCorrectionCountryMany';

const AnswersCountryListScreen: FunctionComponent<
  AnswersCountryListScreenProps
> = ({ navigation }) => {
  const queryCorrectionCountryMany = useQuery<QueryCorrectionCountryMany>(
    QUERY_CORRECTION_COUNTRY_MANY,
    { fetchPolicy: 'cache-and-network' },
  );
  const [active, setActive] = useState('');

  const toRegionalCodePoint = (char: string): number =>
    char.toUpperCase().charCodeAt(0) - 65 + 127462;

  const renderItem: ListRenderItem<any> = useCallback(
    ({ item }) => (
      <View>
        <KwListItem
          style={styles.kwContainer}
          left={
            <Text style={styles.flagStyle}>
              {String.fromCodePoint(
                toRegionalCodePoint(item.code[0]),
                toRegionalCodePoint(item.code[1]),
              )}
            </Text>
          }
          title={<Text style={styles.countryTitle}>{item.name}</Text>}
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
          onPress={() => setActive(item.name === active ? '' : item.name)}
          bottom={
            active === item.name && (
              <View style={styles.levels}>
                {item.children.map((level: any) => (
                  <KwListItem
                    key={level._id}
                    style={styles.levelContainer}
                    title={<Text>{level.name}</Text>}
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
                        name: AnswersStackRouteList.AnswersSubjectList,
                        params: { levelId: level!._id, title: level!.name },
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
  if (
    queryCorrectionCountryMany.loading ||
    !queryCorrectionCountryMany.data?.correctionCategoryMany
  ) {
    return (
      <KwLinearGradient colors={['#D7DDEF', '#D7DEEF', '#FFFFFF']}>
        <View style={styles.activityContainer}>
          <ActivityIndicator size="large" color={colors.app.primary} />
        </View>
      </KwLinearGradient>
    );
  }

  return (
    <KwLinearGradient colors={['#D7DDEF', '#D7DEEF', '#FFFFFF']}>
      <View style={styles.container_one}>
        <FlatList
          // style={styles.flatlist}
          initialNumToRender={5}
          keyExtractor={(item) => String(item!._id)}
          data={queryCorrectionCountryMany.data?.correctionCategoryMany || []}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
        />
      </View>
    </KwLinearGradient>
  );
};

const styles = StyleSheet.create({
  container_one: {
    flex: 1,
    // backgroundColor: colors.app.primary,

    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: 40,
  },
  container: {
    height: '98%',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },

  flagStyle: {
    fontSize: 18,
  },
  countryTitle: {
    fontSize: 18,
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
  flatlist: {
    marginHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginVertical: 0,
    paddingHorizontal: 10,
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
  activityContainer: {
    flex: 1,
    marginTop: 30,
  },
});

interface AnswersCountryListScreenProps {
  route: RouteProp<
    AnswersStackParamList,
    typeof AnswersStackRouteList.AnswersCountryList
  >;
  navigation: StackNavigationProp<
    AnswersStackParamList,
    typeof AnswersStackRouteList.AnswersCountryList
  >;
}

export default AnswersCountryListScreen;
