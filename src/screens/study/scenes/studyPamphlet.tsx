import { KwButton } from '@KwSrc/components/button';
import PrHeader from '@KwSrc/components/header';
import { KwListItemBook } from '@KwSrc/components/listItem/listItemBook';
import { colors } from '@KwSrc/utils';
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
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { KwAds } from '@KwSrc/components/ads';
import { StudyStackParamList, StudyStackRouteList } from '../route/contants';
import {
  QUERY_PRODUCTS,
  QUERY_PRODUCTS_CATEGORIES,
} from '../graphql/queries-wp';
import {
  QueryProducts,
  QueryProducts_products_nodes,
} from '../graphql/__generated__/QueryProducts';
import { QueryProductsCategories } from '../graphql/__generated__/QueryProductsCategories';

const StudyPamphletScreen: FunctionComponent<StudyPamphletScreenProps> = ({
  navigation,
}) => {
  const queryBooks = useQuery<QueryProducts>(QUERY_PRODUCTS, {
    client: apolloPaperClient,
  });
  const queryCategories = useQuery<QueryProductsCategories>(
    QUERY_PRODUCTS_CATEGORIES,
    {
      client: apolloPaperClient,
    },
  );

  const [books, setBooks] = useState<any[] | undefined>(undefined);
  const [active, setActive] = useState<string>('all');

  const search = (text: string) => {
    if (text.length > 0) {
      const filteredItems = queryBooks!.data!.products!.nodes!.filter(
        (item: any) => item.name.includes(text),
      );
      setBooks(filteredItems);
    } else {
      setBooks(undefined);
    }
  };
  const tagSearch = (text: string) => {
    if (text.length > 0) {
      const filteredItems = queryBooks!.data!.products!.nodes!.filter(
        (item: any) =>
          item.productCategories.nodes.find(
            (val: any) => val.name.toLowerCase() === text.toLowerCase(),
          ),
      );
      setBooks(filteredItems);
    } else {
      setBooks(undefined);
    }
  };

  const renderItem: ListRenderItem<QueryProducts_products_nodes & any> = ({
    item,
  }) => (
    <View style={styles.itemBook}>
      <KwListItemBook
        uri={{
          uri: String(
            item!.image!.mediaItemUrl!.replace('http://www.', 'https://'),
          ),
        }}
        title={item.name!}
        author="Gcerevision"
        price={String(item.price) as any}
        onPress={() => {
          navigation.navigate(StudyStackRouteList.StudyPampletDetail, {
            productId: item.productId,
            productName: item.name,
            productPrice: item.price,
            productDescription: item.description,
            productUri: String(
              item!.image!.mediaItemUrl!.replace('http://www.', 'https://'),
            ),
          });
        }}
      />
    </View>
  );

  const renderItemCategory: ListRenderItem<any> = ({ item }) => (
    <View style={styles.itembutton}>
      <KwButton
        color={item.name === active ? colors.app.primary : colors.app.white}
        textStyle={{
          color: item.name === active ? colors.app.white : colors.text.primary,
          paddingHorizontal: 15,
        }}
        size="md"
        children={String(item.name)}
        onPress={() => {
          setActive(item.name);
          tagSearch(item.name);
        }}
      />
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <FlatList
        horizontal
        data={queryCategories?.data?.productCategories?.nodes || []}
        renderItem={renderItemCategory}
        keyExtractor={(item) => String(item?.id)}
      />
      <View style={styles.mv}>
        <KwAds type="notes" />
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View>
      <Text style={styles.compTitle}>No Books found :( !</Text>
    </View>
  );

  if (queryBooks.loading) {
    return (
      <View style={styles.background}>
        <PrHeader
          back
          getSearchText={(text) => {
            search(text);
          }}
          title="Pamphlets"
          avatar="https://via.placeholder.com/150"
        />
        <ActivityIndicator size="large" color={colors.app.white} />
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <PrHeader
        back
        searchBottom
        getSearchText={(text) => {
          search(text);
        }}
        title="Pamphlets"
        avatar="https://via.placeholder.com/150"
      />

      <FlatList
        style={styles.flatlist}
        initialNumToRender={5}
        keyExtractor={(item) => String(item!.productId)}
        data={books || queryBooks!.data!.products!.nodes || []}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.app.primary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.app.white,
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
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Roboto-Light',
    textTransform: 'capitalize',
  },
  titleDesc: {
    flexShrink: 1, // fixes overflow on text exceeding view
    fontFamily: 'Roboto-Light',
    textTransform: 'capitalize',
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
    textTransform: 'capitalize',
  },
  itembutton: { marginHorizontal: 10 },
  header: { flex: 1, marginVertical: 20 },
  mv: { marginVertical: 5 },
});

interface StudyPamphletScreenProps {
  route: RouteProp<
    StudyStackParamList,
    typeof StudyStackRouteList.StudyPamplet
  >;
  navigation: StackNavigationProp<
    StudyStackParamList,
    typeof StudyStackRouteList.StudyPamplet
  >;
}

export default StudyPamphletScreen;
