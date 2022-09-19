import PrHeader from '@KwSrc/components/header';
import { KwListItemNote } from '@KwSrc/components/listItem/listItemNote';
import { colors, images } from '@KwSrc/utils';
import React, { FunctionComponent, useState } from 'react';
import {
  StyleSheet,
  View,
  ListRenderItem,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import { apolloPaperClient } from '@KwSrc/config';
import { useQuery } from '@apollo/client';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { KwContainer } from '@KwSrc/components/container';
import { StudyStackParamList, StudyStackRouteList } from '../route/contants';
import { QUERY_NOTES } from '../graphql/queries-wp';
import {
  QueryNotes,
  QueryNotesVariables,
} from '../graphql/__generated__/QueryNotes';

const StudyNotesListScreen: FunctionComponent<StudyNotesListScreenProps> = ({
  navigation,
  route,
}) => {
  const { subjectId, title } = route.params;

  const [notes, setNotes] = useState<any[] | undefined>(undefined);

  const search = (text: string) => {
    if (text.length > 0) {
      const filteredItems = notesQuery!.data!.posts!.nodes!.filter(
        (item: any) => item.title.includes(text),
      );
      setNotes(filteredItems);
    } else {
      setNotes(undefined);
    }
  };

  const notesQuery = useQuery<QueryNotes, QueryNotesVariables>(QUERY_NOTES, {
    variables: {
      catId: ['17'],
      subId: [subjectId],
    },
    client: apolloPaperClient,
  });

  const renderItem: ListRenderItem<any> = ({ item }) => (
    <View style={styles.itemBook}>
      <KwListItemNote
        uri={
          item.featuredImage !== null
            ? { uri: String(item.featuredImage?.node?.mediaItemUrl) }
            : images.loginImage
        }
        title={String(item!.title)}
        description={String(item.excerpt).replace(/<[^>]+>/g, '')}
        onPress={() => {
          navigation.navigate(StudyStackRouteList.StudyNotesDetails, {
            title: String(item.title),
            id: String(item.postId),
          });
        }}
      />
    </View>
  );

  const renderEmpty = () => (
    <Text
      style={styles.itemTitle2}
    >{`No Notes on ${route.params?.title} for the moment, come back later 😋.`}</Text>
  );

  if (notesQuery.loading) {
    return (
      <View style={styles.background}>
        <PrHeader back title={title} avatar="https://via.placeholder.com/150" />

        <ActivityIndicator color={colors.app.white} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <PrHeader
        back
        searchBottom
        title={title}
        avatar="https://via.placeholder.com/150"
        getSearchText={(text) => {
          search(text);
        }}
      />
      <KwContainer textStyle={{ fontSize: 20 }} style={styles.container}>
        <FlatList
          initialNumToRender={5}
          keyExtractor={(item) => String(item!.postId)}
          data={notes || notesQuery?.data?.posts?.nodes || []}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
        />
      </KwContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.app.primary,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
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
  itemBook: {
    marginVertical: 5,
  },
  itemTitle2: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 10,
    textTransform: 'capitalize',
    fontFamily: 'Roboto-Bold',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    alignItems: 'center',
  },
  list: { borderBottomWidth: 0 },
  flatlist: {
    backgroundColor: colors.app.backgrounfGray,
    marginHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginVertical: 0,
    paddingHorizontal: 10,
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
  itembutton: { marginHorizontal: 10 },
  header: { flex: 1, marginVertical: 20 },
});

interface StudyNotesListScreenProps {
  route: RouteProp<
    StudyStackParamList,
    typeof StudyStackRouteList.StudyNotesList
  >;
  navigation: StackNavigationProp<
    StudyStackParamList,
    typeof StudyStackRouteList.StudyNotesList
  >;
}

export default StudyNotesListScreen;
