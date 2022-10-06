import {
  FlatList,
  Image,
  ListRenderItem,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import React from 'react';
import KwHearder from '@KwSrc/components/header';
import { colors, images } from '@KwSrc/utils';
import { SIZES } from '@KwSrc/utils/fontsizes';
import { KwLinearGradient } from '@KwSrc/components/linearGradient';
import { KwAlertCard } from '@KwSrc/components/card/alertCard';
import { KwListItem } from '@KwSrc/components/listItem';
import {
  QUERY_CORRECTION_USER_SUBSCRIPTIONS,
  QUERY_CORRECTION_USER_SUBSCRIPTIONS_MANY,
} from '@KwSrc/screens/answers/graphql/queries';
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import { selectAuth } from '@KwSrc/store/reducers/users';
import {
  QueryCorrectionUserSubscriptionsMany,
  QueryCorrectionUserSubscriptionsManyVariables,
  QueryCorrectionUserSubscriptionsMany_correctionSubscriptionPagination_items,
} from '@KwSrc/screens/answers/graphql/__generated__/QueryCorrectionUserSubscriptionsMany';
import formateDate from '@KwSrc/utils/date';
import moment from 'moment';
import {
  QueryCorrectionUserSubscriptions,
  QueryCorrectionUserSubscriptionsVariables,
} from '@KwSrc/screens/answers/graphql/__generated__/QueryCorrectionUserSubscriptions';

const Souscription = () => {
  const auth = useSelector(selectAuth);

  const querySubscriptionPagination = useQuery<
    QueryCorrectionUserSubscriptionsMany,
    QueryCorrectionUserSubscriptionsManyVariables
  >(QUERY_CORRECTION_USER_SUBSCRIPTIONS_MANY, {
    variables: { userId: String(auth?.user?.uid) },
  });

  const querySubscriptionCurrent = useQuery<
    QueryCorrectionUserSubscriptions,
    QueryCorrectionUserSubscriptionsVariables
  >(QUERY_CORRECTION_USER_SUBSCRIPTIONS, {
    variables: {
      page: 1,
      now: moment().toString(),
      userId: String(auth?.user?.uid),
    },
  });

  const renderItem: ListRenderItem<
    QueryCorrectionUserSubscriptionsMany_correctionSubscriptionPagination_items
  > = ({ item }) => (
    <View>
      <View style={styles.mv}>
        <KwListItem
          left={
            <Image
              source={images.correctionImage}
              style={styles.imageCorrection}
              resizeMode="contain"
            />
          }
          title={
            <View>
              <Text style={styles.titleCard}>{item.bundle?.name}</Text>
              <Text style={styles.titleCard}>
                Price : {item?.bundleVariant?.price} FCFA
              </Text>
              <Text style={[styles.date, styles.mv]}>
                Expired date :
                {formateDate({
                  date: String(item.expiresOn),
                  format: 'LL',
                  type: 'MOMENT',
                })}
              </Text>
            </View>
          }
          onPress={() => {}}
        />
      </View>
    </View>
  );

  const renderFooter = () => <View />;

  const renderEmpty = () => (
    <View>
      <Text style={styles.item}>No Transcation</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contain}>
        <KwHearder
          back
          title="My Subscriptions"
          avatar="https://via.placeholder.com/150"
        />
      </View>
      <KwLinearGradient colors={['#FfFFFF', '#D7DDEF']}>
        <View style={styles.card}>
          <View style={styles.cardContain}>
            <View>
              <Text style={styles.title}>Subcritpions </Text>
              {querySubscriptionCurrent?.data?.correctionSubscriptionPagination
                ?.items &&
              querySubscriptionCurrent?.data?.correctionSubscriptionPagination
                ?.items?.length > 0 ? (
                querySubscriptionCurrent?.data?.correctionSubscriptionPagination?.items.map(
                  (item) => (
                    <View key={item._id}>
                      <Text style={styles.item}>{item.bundle?.name}</Text>
                      <Text style={styles.date}>
                        Expiring Date :{' '}
                        {formateDate({
                          date: String(item.expiresOn),
                          format: 'LL',
                          type: 'MOMENT',
                        })}
                      </Text>
                    </View>
                  ),
                )
              ) : (
                <View>
                  <Text style={styles.item}>No subscription</Text>
                </View>
              )}
            </View>

            <View>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={images.competitionImage}
              />
            </View>
          </View>
        </View>
        <KwAlertCard description="Above are the active corrections you, while below are the list of corrections you have subscripted." />
        <View
          style={{
            marginVertical: 20,
          }}
        >
          <Text style={{ fontWeight: '500', fontSize: 18 }}>
            Transaction History{' '}
          </Text>
        </View>
        <FlatList
          initialNumToRender={5}
          data={
            querySubscriptionPagination?.data?.correctionSubscriptionPagination
              ?.items || []
          }
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
        />
      </KwLinearGradient>
    </SafeAreaView>
  );
};

export default Souscription;

const styles = StyleSheet.create({
  headerContainer: {
    height: 105,
    backgroundColor: colors.app.primary,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  containerWithoutHeader: {
    alignItems: 'center',
    // paddingHorizontal: '3%',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  walletBalanceContainer: {
    height: 160,
    width: '90%',
    backgroundColor: colors.app.backgroundGrey,
    borderRadius: 20,
    marginTop: -40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 4,
  },
  item: {
    fontWeight: '500',
    fontSize: 15,
    marginVertical: 8,
    color: colors.app.primary,
  },
  walletBalancetop: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '4%',
    width: '100%',
    height: '75%',
    backgroundColor: colors.app.white,
    borderRadius: 20,
    // bor
  },
  cardContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontWeight: '500', fontSize: 12 },
  walletBalanceBottom: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '25%',
    padding: '2%',
    paddingLeft: 15,
    // backgroundColor: 'green',
  },
  walletBalancetopLeft: {
    // padding: 13,
  },
  walletBalancetopRight: {
    // padding: 13,
  },
  pointCounterText: {
    fontSize: SIZES.h1 + 12,

    fontWeight: 'bold',
  },
  currentText: {
    fontSize: SIZES.h4 - 1,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: colors.app.white,
    shadowColor: colors.app.black,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: Platform.OS === 'ios' ? 0.1 : 0.38,
    shadowRadius: 12,

    top: -20,
    elevation: 5,
    marginHorizontal: 5,
    padding: 10,
    paddingVertical: 15,
    borderRadius: 10,
  },
  iconMoneyContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  contain: {
    backgroundColor: colors.app.primary,
    paddingBottom: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  mv: { marginVertical: 5 },
  imageGold: {
    height: 20,
    width: 20,
    borderRadius: 50,
  },
  imageRightContainer: {
    height: 80,
    width: 80,
  },
  textTotal: {
    marginLeft: 10,
    fontSize: SIZES.h4,
  },
  totalRewardsPoints: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: colors.app.primary,
  },
  date: { fontWeight: '200', fontSize: 12 },
  accordionStyle: {
    width: '90%',
    marginTop: 20,
    // height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    // alignItems:'',
    // backgroundColor: colors.app.backgroundGrey,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 4,
  },
  headerBacgroundColor: {
    backgroundColor: colors.app.backgroundGrey,
  },
  transactionHistoryContainer: {
    paddingHorizontal: '6%',
    // alignContent:''
    // justifyContent:''
  },
  transactionTitle: {
    fontSize: SIZES.h1,
  },
  transactionContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  image: { width: 80, height: 80 },
  titleCard: {
    fontWeight: '400',
    color: colors.app.black,
    fontSize: 13,
  },
  imageCorrection: { width: 50, height: 30 },
});
