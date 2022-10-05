import React, { FunctionComponent, useEffect, useMemo } from 'react';
import { colors } from '@KwSrc/utils';
import { StackNavigationProp } from '@react-navigation/stack';

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { KwContainer } from '@KwSrc/components/container';
import i18n from '@KwSrc/config/i18n/i18n';
import { KwAlertCard } from '@KwSrc/components/card/alertCard';
import { KwCorrectionCard } from '@KwSrc/components/card/correctionCard';
import { ScrollView } from 'react-native-gesture-handler';
import KwHearder from '@KwSrc/components/header';
import { RouteProp } from '@react-navigation/native';
import { useLazyQuery, useQuery } from '@apollo/client';
import { selectAuth } from '@KwSrc/store/reducers/users';
import moment from 'moment';
import { useSelector } from 'react-redux';
import {
  QUERY_CORRECTION_ANSWER_BUNDLES,
  QUERY_CORRECTION_ANSWER_BY_ID,
  QUERY_CORRECTION_USER_BUNDLE_SUBSCRIPTIONS,
} from '../graphql/queries';
import {
  QueryCorrectionAnswerById,
  QueryCorrectionAnswerByIdVariables,
} from '../graphql/__generated__/QueryCorrectionAnswerById';
import {
  QueryCorrectionAnswerBundle,
  QueryCorrectionAnswerBundleVariables,
  QueryCorrectionAnswerBundle_correctionBundlePagination_items,
} from '../graphql/__generated__/QueryCorrectionAnswerBundle';
import { AnswersStackParamList, AnswersStackRouteList } from '../constants';
import {
  QueryCorrectionUserBundleSubscriptions,
  QueryCorrectionUserBundleSubscriptionsVariables,
} from '../graphql/__generated__/QueryCorrectionUserBundleSubscriptions';

const AnswersBundleScreen: FunctionComponent<AnswersBundleScreenProps> = ({
  navigation,
  route,
}) => {
  const { name, answerId, media } = route.params;
  const auth = useSelector(selectAuth);

  const queryCorrectionAnswerById = useQuery<
    QueryCorrectionAnswerById,
    QueryCorrectionAnswerByIdVariables
  >(QUERY_CORRECTION_ANSWER_BY_ID, {
    fetchPolicy: 'cache-and-network',
    variables: { answerId },
  });

  const answer = useMemo(
    () => queryCorrectionAnswerById.data?.correctionMediaById,
    [queryCorrectionAnswerById.data],
  );

  const queryCorrectionBundle = useQuery<
    QueryCorrectionAnswerBundle,
    QueryCorrectionAnswerBundleVariables
  >(QUERY_CORRECTION_ANSWER_BUNDLES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      page: 1,
      answerId: String(answer?._id),
      subjectId: String(answer?.subject?._id),
    },
  });

  const [querySubscriptionCurrent, { loading, data }] = useLazyQuery<
    QueryCorrectionUserBundleSubscriptions,
    QueryCorrectionUserBundleSubscriptionsVariables
  >(QUERY_CORRECTION_USER_BUNDLE_SUBSCRIPTIONS);

  useEffect(() => {
    if (
      !!queryCorrectionBundle.data?.correctionBundlePagination?.items &&
      queryCorrectionBundle.data?.correctionBundlePagination?.items.length > 0
    ) {
      querySubscriptionCurrent({
        variables: {
          page: 1,
          now: moment().toString(),
          userId: String(auth?.user?.uid),
          bundleId:
            queryCorrectionBundle.data?.correctionBundlePagination?.items[0]
              ?._id,
        },
      });
    }
  }, [
    auth?.user?.uid,
    queryCorrectionBundle.data?.correctionBundlePagination?.items,
    querySubscriptionCurrent,
  ]);

  useEffect(() => {
    if (
      data?.correctionSubscriptionPagination?.items &&
      data!.correctionSubscriptionPagination!.items!.length > 0
    ) {
      navigation.navigate({
        name: AnswersStackRouteList.AnswersSubjectView,
        params: {
          answerId,
          media,
          name,
        },
      });
    }
  }, [answerId, data, media, name, navigation]);

  if (
    queryCorrectionAnswerById.loading ||
    queryCorrectionBundle.loading ||
    loading
  ) {
    return (
      <View style={styles.layout}>
        <Text>Checking subscription</Text>
        <ActivityIndicator size="large" color={colors.app.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container_one}>
      <View style={styles.header}>
        <KwHearder
          back
          avatar="https://via.placeholder.com/150"
          title={`Buy ${name}`}
        />
      </View>
      <KwContainer style={styles.container}>
        <ScrollView>
          <View>
            <KwAlertCard
              description={i18n.t('COMPONENT__ANSWERSBUNDLESCREEN_DESCRIPTION')}
            />
          </View>

          {queryCorrectionBundle.data!.correctionBundlePagination!.items!.map(
            (
              item: QueryCorrectionAnswerBundle_correctionBundlePagination_items,
            ) => (
              <KwCorrectionCard
                key={item._id}
                title={item.name}
                item={[]}
                style={styles.MT8}
                onPress={() => {
                  navigation.navigate({
                    name: AnswersStackRouteList.AnswersSubscribe,
                    params: {
                      bundleId: item._id,
                      name: item.name,
                    },
                  });
                }}
              />
            ),
          )}
        </ScrollView>
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
  MT8: {
    marginTop: 8,
  },
  priceCards: { flexDirection: 'row', justifyContent: 'space-between' },
});
interface AnswersBundleScreenProps {
  route: RouteProp<
    AnswersStackParamList,
    typeof AnswersStackRouteList.AnswersBundle
  >;
  navigation: StackNavigationProp<
    AnswersStackParamList,
    typeof AnswersStackRouteList.AnswersBundle
  >;
}
export default AnswersBundleScreen;
