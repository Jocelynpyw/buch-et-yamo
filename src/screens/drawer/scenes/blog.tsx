import PrHeader from '@KwSrc/components/header';
import { KwListItemNote } from '@KwSrc/components/listItem/listItemNote';
import { colors, images } from '@KwSrc/utils';
import React, { FunctionComponent } from 'react';
import {
  StyleSheet,
  View,
  ListRenderItem,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';

import { KwContainer } from '@KwSrc/components/container';
import { useQuery } from '@apollo/client';
import { HomeDrawerRouteList } from '@KwSrc/navigation/constants.navigation';
import { QUERY_NEWS_GET_MANY } from '../graphql/queries';
import { NewsMany, NewsMany_newsMany } from '../graphql/__generated__/NewsMany';

const BlogScreen: FunctionComponent<any> = ({ navigation, route }) => {
  const queryNews = useQuery<NewsMany>(QUERY_NEWS_GET_MANY);

  const renderItem: ListRenderItem<NewsMany_newsMany> = ({ item }) => (
    <View style={styles.itemBook}>
      <KwListItemNote
        uri={
          item.image !== null
            ? { uri: String(item.image?.url) }
            : images.loginImage
        }
        title={String(item!.title)}
        description={String(item.content?.slice(0, 120)).replace(
          /<[^>]+>/g,
          '',
        )}
        onPress={() => {
          navigation.navigate(HomeDrawerRouteList.newsDetails, {
            title: String(item.title),
            content: String(item.content),
          });
        }}
      />
    </View>
  );

  const renderEmpty = () => (
    <Text
      style={styles.itemTitle2}
    >{`No Accoucements on ${route.params?.title} for the moment, come back later 😋.`}</Text>
  );

  if (queryNews.loading) {
    return (
      <View style={styles.background}>
        <PrHeader
          back
          title="Annoucement"
          avatar="https://via.placeholder.com/150"
        />

        <ActivityIndicator color={colors.app.white} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <PrHeader
        back
        title="Annoucement"
        avatar="https://via.placeholder.com/150"
      />
      <KwContainer textStyle={{ fontSize: 20 }} style={styles.container}>
        <FlatList
          initialNumToRender={5}
          keyExtractor={(item) => String(item!._id)}
          data={queryNews.data?.newsMany || []}
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

export default BlogScreen;
