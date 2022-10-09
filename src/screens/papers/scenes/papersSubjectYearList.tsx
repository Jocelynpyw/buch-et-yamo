import React, { FunctionComponent, useCallback, useState } from 'react';
import { colors, images } from '@KwSrc/utils';
import { useQuery } from '@apollo/client';

import { StackNavigationProp } from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  FlatList,
  ListRenderItem,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import { KwContainer } from '@KwSrc/components/container';
import { KwListItem } from '@KwSrc/components/listItem';
import { RouteProp } from '@react-navigation/native';
import KwHearder from '@KwSrc/components/header';
import { apolloPaperClient } from '@KwSrc/config';
import { PapersStackParamList, PapersStackRouteList } from '../constant';
import { QUERY_PAPERS } from '../graphql/queries-wp';
import {
  QueryPapers,
  QueryPapersVariables,
  QueryPapers_posts_nodes,
} from '../graphql/__generated__/QueryPapers';

const PapersSubjectYearListScreen: FunctionComponent<
  PapersSubjectYearListScreenProps
> = ({ navigation, route }) => {
  const { subjectId, levelId, subject, level } = route.params;

  const PapersQuery = useQuery<QueryPapers, QueryPapersVariables>(
    QUERY_PAPERS,
    {
      variables: {
        catId: String(levelId) as any,
        subId: String(subjectId) as any,
      },
      client: apolloPaperClient,
    },
  );
  const [papers, setPapers] = useState<any[] | undefined>(undefined);

  const search = (text: string) => {
    if (text.length > 0) {
      const filteredItems = PapersQuery!.data!.posts!.nodes!.filter(
        (item: any) => item.title.includes(text),
      );
      setPapers(filteredItems);
    } else {
      setPapers(undefined);
    }
  };

  const renderItem: ListRenderItem<QueryPapers_posts_nodes> = useCallback(
    ({ item }) => (
      <View style={styles.mv}>
        <KwListItem
          left={
            <Image
              source={images.papersImage}
              style={styles.image}
              resizeMode="contain"
            />
          }
          title={<Text style={styles.title}>{item.title}</Text>}
          onPress={() =>
            navigation.navigate(PapersStackRouteList.PapersSubjectDetail, {
              title: String(item!.title),
              id: String(item!.postId),
            })
          }
        />
      </View>
    ),
    [navigation],
  );

  const renderFooter = () => <View />;

  const renderEmpty = () => (
    <View>
      <Text style={styles.paper}>No Paper found :( !</Text>
    </View>
  );
  if (PapersQuery.loading) {
    return (
      <View style={styles.container_one}>
        <View style={styles.header}>
          <KwHearder
            back
            avatar="https://via.placeholder.com/150"
            title={level}
          />
        </View>
        <KwContainer
          textStyle={{ fontSize: 16 }}
          style={styles.container}
          title={`${level || ''} - ${subject || ''} Papers`}
        >
          <ActivityIndicator size="large" color={colors.app.primary} />
        </KwContainer>
      </View>
    );
  }
  return (
    <View style={styles.container_one}>
      <View style={styles.header}>
        <KwHearder
          back
          avatar="https://via.placeholder.com/150"
          title={level}
          searchBottom
          getSearchText={(text) => {
            search(text);
          }}
        />
      </View>
      <KwContainer
        textStyle={{ fontSize: 16 }}
        style={styles.container}
        title={`${level || ''} - ${subject || ''} Papers`}
        ads
      >
        <FlatList
          initialNumToRender={5}
          data={papers || PapersQuery?.data?.posts?.nodes || []}
          keyExtractor={(item) => String(item!.postId)}
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
  text: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  title: {
    fontWeight: '400',
    color: colors.app.black,
    fontSize: 13,
    marginLeft: 5,
  },
  image: { width: 30, height: 30 },
  header: {
    backgroundColor: colors.app.primary,
    paddingBottom: 20,
  },
  mv: { marginVertical: 5 },
  paper: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
  },
});

interface PapersSubjectYearListScreenProps {
  route: RouteProp<
    PapersStackParamList,
    typeof PapersStackRouteList.PapersSubjectYearList
  >;
  navigation: StackNavigationProp<
    PapersStackParamList,
    typeof PapersStackRouteList.PapersSubjectYearList
  >;
}

export default PapersSubjectYearListScreen;
