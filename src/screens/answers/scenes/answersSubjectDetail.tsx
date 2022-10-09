import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { colors, images } from '@KwSrc/utils';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  Text,
  ActivityIndicator,
} from 'react-native';
import { KwListItemSimple } from '@KwSrc/components/listItem/listItemSimple';
import { KwContainer } from '@KwSrc/components/container';

import { useQuery } from '@apollo/client';
import KwHearder from '@KwSrc/components/header';
import { RouteProp } from '@react-navigation/native';
import { QUERY_CORRECTION_SUBJECT_BY_ID } from '../graphql/queries';
import {
  QueryCorrectionSubjectById,
  QueryCorrectionSubjectByIdVariables,
  QueryCorrectionSubjectById_correctionMediaMany,
} from '../graphql/__generated__/QueryCorrectionSubjectById';
import { AnswersStackParamList, AnswersStackRouteList } from '../constants';

const AnswersSubjectDetailScreen: FunctionComponent<
  AnswersSubjectListDeatilsScreenProps
> = ({ navigation, route }) => {
  const queryCorrectionSubjectById = useQuery<
    QueryCorrectionSubjectById,
    QueryCorrectionSubjectByIdVariables
  >(QUERY_CORRECTION_SUBJECT_BY_ID, {
    variables: { subjectId: route?.params?.subjectId },
  });
  const [media, setMedia] = useState<any>([]);

  const renderItem: ListRenderItem<QueryCorrectionSubjectById_correctionMediaMany> =
    useCallback(
      ({ item }) => (
        <KwListItemSimple
          uri={images.checkImage}
          title={item.name}
          onPress={() =>
            navigation.navigate({
              name: AnswersStackRouteList.AnswersSubjectView,
              params: {
                answerId: item!._id,
                name: item.name,
              },
            })
          }
          style={{ paddingVertical: 12 }}
        />
      ),
      [navigation],
    );

  useEffect(() => {
    if (queryCorrectionSubjectById.data?.correctionMediaMany) {
      const mediaDocuments =
        queryCorrectionSubjectById.data?.correctionMediaMany.filter(
          (item: QueryCorrectionSubjectById_correctionMediaMany) =>
            item.media?.type === 'document',
        );

      if (mediaDocuments.length > 0) {
        setMedia(mediaDocuments);
      }
    }
  }, [queryCorrectionSubjectById?.data?.correctionMediaMany]);

  const renderFooter = () =>
    queryCorrectionSubjectById.loading ||
    !queryCorrectionSubjectById.data?.correctionMediaMany ? (
      <ActivityIndicator size="large" color={colors.app.primary} />
    ) : null;

  const renderEmpty = () =>
    !queryCorrectionSubjectById.loading ? (
      <Text style={styles.text}>No Subjects Added</Text>
    ) : null;

  return (
    <View style={styles.container_one}>
      <View style={styles.header}>
        <KwHearder
          back
          avatar="https://via.placeholder.com/150"
          title={route?.params?.title}
        />
      </View>
      <KwContainer
        textStyle={styles.containerText}
        style={styles.container}
        title={route?.params?.title}
      >
        <FlatList
          initialNumToRender={5}
          data={media || []}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
        />
      </KwContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container_one: {
    flex: 1,
    backgroundColor: colors.app.primary,
    paddingHorizontal: 10,
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
    marginBottom: 10,
    marginTop: 10,
  },
  MT30: {
    marginTop: 30,
  },
  header: {
    backgroundColor: colors.app.primary,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
  },
  containerText: { fontSize: 20, marginBottom: 10 },
});

interface AnswersSubjectListDeatilsScreenProps {
  route: RouteProp<
    AnswersStackParamList,
    typeof AnswersStackRouteList.AnswersSubjectDetail
  >;
  navigation: StackNavigationProp<
    AnswersStackParamList,
    typeof AnswersStackRouteList.AnswersSubjectDetail
  >;
}

export default AnswersSubjectDetailScreen;
