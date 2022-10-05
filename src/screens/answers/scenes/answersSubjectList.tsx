import React, { FunctionComponent, useCallback, useState } from 'react';
import { colors, images } from '@KwSrc/utils';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
  Text,
} from 'react-native';
import { KwListItemSimple } from '@KwSrc/components/listItem/listItemSimple';
import { KwContainer } from '@KwSrc/components/container';
import KwHearder from '@KwSrc/components/header';
import { RouteProp } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import {
  QueryCorrectionLevelById,
  QueryCorrectionLevelByIdVariables,
} from '../graphql/__generated__/QueryCorrectionLevelById';
import { QUERY_CORRECTION_LEVEL_BY_ID } from '../graphql/queries';
import { AnswersStackParamList, AnswersStackRouteList } from '../constants';

const AnswersSubjectListScreen: FunctionComponent<
  AnswersSubjectListScreenProps
> = ({ navigation, route }) => {
  const [levelId] = useState(route?.params?.levelId);

  const queryCorrectionLevelById = useQuery<
    QueryCorrectionLevelById,
    QueryCorrectionLevelByIdVariables
  >(QUERY_CORRECTION_LEVEL_BY_ID, { variables: { levelId } });

  const renderItem: ListRenderItem<any> = useCallback(
    ({ item }) => (
      <KwListItemSimple
        uri={images.filesImage}
        title={item.name}
        onPress={() =>
          navigation.navigate(AnswersStackRouteList.AnswersSubjectDetail, {
            subjectId: item._id,
            title: item.name,
          })
        }
        style={{ paddingVertical: 12 }}
      />
    ),
    [navigation],
  );

  const renderFooter = () =>
    queryCorrectionLevelById.loading ||
    !queryCorrectionLevelById.data?.correctionCategoryById ? (
      <ActivityIndicator size="large" color={colors.app.primary} />
    ) : null;

  const renderEmpty = () =>
    !queryCorrectionLevelById.loading ? (
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
        title="Subjects"
      >
        <FlatList
          initialNumToRender={5}
          data={
            queryCorrectionLevelById.data?.correctionCategoryById?.children ||
            []
          }
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
  container: {
    flex: 1,
  },
  containerText: { fontSize: 20, marginBottom: 10 },

  text: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  header: {
    backgroundColor: colors.app.primary,
    paddingBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    color: colors.app.black,
    fontSize: 16,
  },
});

interface AnswersSubjectListScreenProps {
  route: RouteProp<
    AnswersStackParamList,
    typeof AnswersStackRouteList.AnswersSubjectList
  >;
  navigation: StackNavigationProp<
    AnswersStackParamList,
    typeof AnswersStackRouteList.AnswersSubjectList
  >;
}

export default AnswersSubjectListScreen;
