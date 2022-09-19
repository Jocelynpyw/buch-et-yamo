import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { colors, images } from '@KwSrc/utils';
import { StackScreenProps } from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  ActivityIndicator,
} from 'react-native';
import { KwListItemSimple } from '@KwSrc/components/listItem/listItemSimple';
import { KwContainer } from '@KwSrc/components/container';
import { useQuery } from '@apollo/client';
import KwHearder from '@KwSrc/components/header';
import {
  QueryCategoryById,
  QueryCategoryByIdVariables,
  QueryCategoryById_categoryById,
  QueryCategoryById_categoryById_children,
} from '../graphql/__generated__/QueryCategoryById';
import { QUERY_CATEGORY_BY_ID } from '../graphql/queries';
import { QuizzesStackRouteList } from '../constants';

const QuizzesSubjectListScreen: FunctionComponent<StackScreenProps<any>> = ({
  navigation,
}) => {
  const queryQuizSubject = useQuery<
    QueryCategoryById,
    QueryCategoryByIdVariables
  >(QUERY_CATEGORY_BY_ID, {
    variables: {
      id: '5f3ad38d22acf64a888b8b89',
    },
    fetchPolicy: 'network-only',
  });

  const quizSubject = useMemo<
    QueryCategoryById_categoryById | null | undefined
  >(() => queryQuizSubject.data?.categoryById, [queryQuizSubject.data]);

  const [subjects, setSubject] = useState<any[] | undefined>(undefined);

  const search = (text: string) => {
    if (text.length > 0) {
      setSubject(undefined);
    }

    const filteredItems = quizSubject?.children.filter((item: any) =>
      item.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()),
    );

    setSubject(filteredItems);
  };

  const renderItem: ListRenderItem<QueryCategoryById_categoryById_children> =
    useCallback(
      ({ item }) => (
        <KwListItemSimple
          uri={images.medalImage}
          title={item.name.replace(/gcse/gi, '')}
          onPress={() => {
            navigation.navigate(QuizzesStackRouteList.QuizzesSubjectDetail, {
              subject: item,
            });
          }}
          style={{ paddingVertical: 12 }}
        />
      ),
      [navigation],
    );

  const renderFooter = () => <View />;

  const renderEmpty = () => <View />;

  return (
    <View style={styles.container_one}>
      <View style={styles.header}>
        <KwHearder
          back
          avatar="https://via.placeholder.com/150"
          title="Subjects List"
          searchBottom
          getSearchText={(text) => {
            search(text);
          }}
        />
      </View>
      {queryQuizSubject.loading ? (
        <View style={styles.container_one}>
          <ActivityIndicator size="large" color={colors.app.white} />
        </View>
      ) : (
        <KwContainer
          textStyle={{ fontSize: 20 }}
          style={styles.container}
          title="Subjects List"
        >
          <FlatList
            keyExtractor={(it) => it?._id}
            initialNumToRender={5}
            data={subjects || quizSubject?.children || []}
            renderItem={renderItem}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
          />
        </KwContainer>
      )}
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
    height: '98%',
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
  header: {
    backgroundColor: colors.app.primary,
    paddingBottom: 20,
  },
});

export default QuizzesSubjectListScreen;
