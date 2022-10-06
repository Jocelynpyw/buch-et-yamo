import { KwButton } from '@KwSrc/components/button';
import PrHeader from '@KwSrc/components/header';
import KwIcon from '@KwSrc/components/Icon';
import { colors } from '@KwSrc/utils';
import React, { FunctionComponent } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18n from '@KwSrc/config/i18n/i18n';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { KwContainer } from '@KwSrc/components/container';
import { truncateStr } from '@KwSrc/utils/fontsizes';
import { apolloPaperClient } from '@KwSrc/config';
import { useQuery } from '@apollo/client';
import { StudyStackParamList, StudyStackRouteList } from '../route/contants';
import { QUERY_PRODUCTS_RECOMMENDATION } from '../graphql/queries-wp';
import {
  QueryProductsRecommendationVariables,
  QueryProductsRecommendation_products,
} from '../graphql/__generated__/QueryProductsRecommendation';
import RenderHtml from 'react-native-render-html';

const tagsStyles = {
  p: {
    whiteSpace: 'normal',
    padding: '5px',

    textTransform: 'capitalize',
  },
  a: {
    color: colors.app.primary,
  },
};

const StudyPamphletDetailScreen: FunctionComponent<
  StudyPamphletDetailScreenProps
> = ({ route, navigation }) => {
  const {
    productId,
    productName,
    productPrice,
    productUri,
    productDescription,
  } = route.params;
  const { width } = useWindowDimensions();
  const queryBooks = useQuery<
    QueryProductsRecommendation_products,
    QueryProductsRecommendationVariables
  >(QUERY_PRODUCTS_RECOMMENDATION, {
    client: apolloPaperClient,
    variables: {
      productId: [Number(productId)],
    },
  });

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(StudyStackRouteList.StudyPampletDetail, {
          productId: item.productId,
          productDescription: item.description,
          productName: item.name,
          productPrice: item.price,
          productUri: String(
            item!.image!.mediaItemUrl!.replace('http://www.', 'https://'),
          ),
        });
      }}
    >
      <View style={styles.item}>
        <Image
          style={[styles.bookImageRecommend]}
          source={{
            uri: item!.image!.mediaItemUrl!.replace('http://www.', 'https://'),
          }}
        />
        <View style={[styles.titleDescription]}>
          <Text style={styles.titleBook}>{truncateStr(item.name, 10)}</Text>

          <View style={styles.authorContainer}>
            <Text
              style={[
                styles.author,
                { fontWeight: '300', alignSelf: 'center' },
              ]}
            >
              {' '}
              Gcerevision
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => (
    <View style={styles.header}>
      <Text style={[styles.titleBook, { marginBottom: 20 }]}>
        You may also like
      </Text>

      <FlatList
        horizontal
        data={queryBooks?.data?.products?.nodes || []}
        renderItem={renderItem}
      />
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerUp}>
      <View style={styles.mainContent}>
        <Image
          style={styles.bookImage}
          resizeMode="cover"
          source={{
            uri: productUri,
          }}
        />

        <View style={styles.titleDescription}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text
              style={[
                styles.titleBook,
                {
                  fontSize: 16,
                },
              ]}
            >
              {productName}
            </Text>
          </View>

          <View style={styles.authorContainer}>
            <KwIcon
              name="people"
              width="30"
              height="30"
              viewBox="0 -5 25 25"
              fill="none"
            />

            <Text style={styles.author}>Gcerevision</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{productPrice}</Text>
          </View>

          <View style={styles.margin}>
            <KwButton
              color={colors.app.primary}
              children={i18n.t('COMMON__BUY_SOFTCOPY')}
              outline
              rounded
            />
          </View>
          <View style={styles.margin}>
            <KwButton
              color={colors.app.primary}
              children={i18n.t('COMMON__BUY_SOFTCOPY')}
              rounded
            />
          </View>
        </View>
      </View>
      <RenderHtml
        contentWidth={width}
        source={{
          html: `<p> ${productDescription} </p>`,
        }}
        tagsStyles={tagsStyles}
        enableExperimentalMarginCollapsing
      />
    </View>
  );

  return (
    <View style={styles.background}>
      <PrHeader
        back
        textLeft={productName}
        avatar="https://via.placeholder.com/150"
      />
      <KwContainer textStyle={{ fontSize: 16 }} style={styles.container}>
        <FlatList
          data={[1]}
          renderItem={renderHeader}
          // keyExtractor={(item) => String(item?.id)}
          ListFooterComponent={renderFooter}
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
    justifyContent: 'center',
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
  header: { marginVertical: 20 },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 15,
    paddingBottom: 15,
    paddingHorizontal: 10,
  },
  titleDescription: {
    marginHorizontal: 5,
    flexShrink: 1,
  },
  bookImage: {
    height: 250,
    width: 150,
    marginRight: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  bookImageRecommend: {
    height: 142,
    width: 95,
    marginRight: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  titleBook: { fontWeight: '600', fontSize: 18 },
  authorContainer: { flexDirection: 'row' },
  author: { fontWeight: '100', fontSize: 12, marginVertical: 5 },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 21,
    color: colors.app.primary,
  },
  pricePadding: { padding: 2 },
  ava: { color: colors.text.copiesColors, margin: 2, marginLeft: 20 },
  headerUp: {
    backgroundColor: colors.app.white,
    borderRadius: 20,
    marginVertical: 20,
  },
  margin: { marginVertical: 5 },
  item: { justifyContent: 'center' },
});

interface StudyPamphletDetailScreenProps {
  route: RouteProp<
    StudyStackParamList,
    typeof StudyStackRouteList.StudyPampletDetail
  >;
  navigation: StackNavigationProp<
    StudyStackParamList,
    typeof StudyStackRouteList.StudyPampletDetail
  >;
}
export default StudyPamphletDetailScreen;
