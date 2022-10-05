import React, { FunctionComponent } from 'react';
import { colors } from '@KwSrc/utils';

import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import { KwContainer } from '@KwSrc/components/container';
import { KwAlertCard } from '@KwSrc/components/card/alertCard';
import { KwCorrectionCard } from '@KwSrc/components/card/correctionCard';
import { KwPriceCard } from '@KwSrc/components/card/priceCard';
import KwHearder from '@KwSrc/components/header';
import { useQuery } from '@apollo/client';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { QUERY_CORRECTION_BUNDLE_BY_ID } from '../graphql/queries';

import {
  QueryCorrectionBundleById,
  QueryCorrectionBundleByIdVariables,
} from '../graphql/__generated__/QueryCorrectionBundleById';
import { AnswersStackParamList, AnswersStackRouteList } from '../constants';

const AnswersSubscribeScreen: FunctionComponent<
  AnswersSubscribeScreenProps
> = ({ route }) => {
  const { bundleId, name } = route.params;

  const queryCorrectionBundleById = useQuery<
    QueryCorrectionBundleById,
    QueryCorrectionBundleByIdVariables
  >(QUERY_CORRECTION_BUNDLE_BY_ID, { variables: { bundleId } });

  if (queryCorrectionBundleById.loading) {
    return (
      <View style={styles.container_one}>
        <View style={styles.header}>
          <KwHearder
            back
            avatar="https://via.placeholder.com/150"
            title={name}
          />
        </View>
        <KwContainer style={styles.container}>
          <ActivityIndicator size="large" color={colors.app.primary} />
        </KwContainer>
      </View>
    );
  }

  const renderFooter = () => <View />;

  const renderEmpty = () => <View />;
  const renderHeader = () => (
    <>
      <KwCorrectionCard
        title={String(
          queryCorrectionBundleById.data?.correctionBundleById?.name,
        )}
        item={
          queryCorrectionBundleById!.data!.correctionBundleById!.features || []
        }
        style={styles.MT8}
        onPress={() => {}}
      />
      <KwAlertCard description="Choose the bundle you will like to buy, corrections can be accessed offline via the download menu." />
    </>
  );

  const renderItem: ListRenderItem<any> = ({ item, index }) => (
    <KwPriceCard
      style={{
        backgroundColor:
          index === 0
            ? colors.app.pinkLight
            : index === 1
            ? colors.app.greenLight
            : colors.app.primary,
      }}
      price={Number(item.price)}
      time={item.period}
      color={
        index === 0
          ? colors.app.lightPinkPrice
          : index === 1
          ? colors.app.lightGreenPrice
          : colors.app.lightBluePrice
      }
      number={1}
    />
  );

  return (
    <View style={styles.container_one}>
      <View style={styles.header}>
        <KwHearder back avatar="https://via.placeholder.com/150" title={name} />
      </View>

      <KwContainer style={styles.container}>
        <FlatList
          initialNumToRender={5}
          keyExtractor={(item) => String(item!.price)}
          data={
            queryCorrectionBundleById?.data?.correctionBundleById?.variants ||
            []
          }
          columnWrapperStyle={styles.columnStyle}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
          ListHeaderComponent={renderHeader}
          numColumns={2}
        />
      </KwContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container_one: {
    flex: 1,
    backgroundColor: colors.app.primary,
  },
  layout: {
    flex: 1,
    backgroundColor: colors.app.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    minHeight: '85%',
    paddingVertical: 25,

    marginHorizontal: 10,
  },
  header: {
    backgroundColor: colors.app.primary,
    paddingBottom: 20,
  },
  columnStyle: {
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  MT8: {
    marginTop: 8,
  },
  priceCards: { flexDirection: 'row', justifyContent: 'space-between' },
});

interface AnswersSubscribeScreenProps {
  route: RouteProp<
    AnswersStackParamList,
    typeof AnswersStackRouteList.AnswersSubscribe
  >;
  navigation: StackNavigationProp<
    AnswersStackParamList,
    typeof AnswersStackRouteList.AnswersSubscribe
  >;
}

export default AnswersSubscribeScreen;
