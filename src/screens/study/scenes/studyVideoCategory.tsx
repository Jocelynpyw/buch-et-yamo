import PrHeader from '@KwSrc/components/header';
import KwIcon from '@KwSrc/components/Icon';
import { colors } from '@KwSrc/utils';
import React, { FunctionComponent, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { KwContainer } from '@KwSrc/components/container';
import { useQuery } from '@apollo/client';
import { VideoModel } from '@KwSrc/components/videoModal';
import { StudyStackParamList, StudyStackRouteList } from '../route/contants';
import {
  QueryVideoByCategory,
  QueryVideoByCategoryVariables,
  QueryVideoByCategory_VideoMany,
} from '../graphql/__generated__/QueryVideoByCategory';
import { QUERY_VIDEO_BY_CATEGORY } from '../graphql/queries';

const StudyVideoCategoryScreen: FunctionComponent<
  StudyVideoCategoryScreenProps
> = ({ route }) => {
  const { id, name, description, url } = route.params;

  const [showModal, setShowModal] = useState<boolean>(false);

  const queryVideos = useQuery<
    QueryVideoByCategory,
    QueryVideoByCategoryVariables
  >(QUERY_VIDEO_BY_CATEGORY, {
    variables: {
      filter: {
        subjectId: id,
      },
    },
  });

  const renderHeader = () => (
    <View>
      <ImageBackground
        resizeMode="cover"
        style={styles.imagebg}
        source={{
          uri: url,
        }}
      >
        <LinearGradient colors={['#fffff000', '#37558A']} style={styles.linear}>
          <View style={styles.btplay}>
            <KwIcon name="play" width={60} height={60} viewBox="0 0 40 40" />
          </View>
        </LinearGradient>
      </ImageBackground>

      <View>
        <Text style={styles.titleVideo}>{name}</Text>
        <Text>{description}</Text>
      </View>
    </View>
  );

  const renderItem: ListRenderItem<QueryVideoByCategory_VideoMany> = ({
    item,
    index,
  }) => (
    <TouchableOpacity style={styles.videoCount}>
      <Text style={styles.videoNumber}>{index + 1}</Text>
      <View>
        <Text style={styles.videoTitle}>{item.name}</Text>
        <Text style={styles.videoTime}>view count {item.viewCount}</Text>
      </View>
      <View>
        <KwIcon name="play" width={40} height={40} viewBox="0 0 40 40" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.background}>
      <PrHeader back title={name} avatar="https://via.placeholder.com/150" />
      <KwContainer textStyle={{ fontSize: 20 }} style={styles.container}>
        {showModal ? (
          <VideoModel
            url="https://v1.dev-general.prenapp.com/media/stream/62b9aa45288647af4b8f74b7/master.m3u8"
            postUrl="https://v1.dev-general.prenapp.com/media/image/6299f86b4a9b1bcdc182ccc0.jpg"
            name={name}
          />
        ) : (
          <FlatList
            initialNumToRender={5}
            data={queryVideos.data?.VideoMany || []}
            ListHeaderComponent={renderHeader}
            renderItem={renderItem}
          />
        )}
      </KwContainer>
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
    marginTop: 20,
    marginHorizontal: 5,
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
  item: {
    marginVertical: 5,
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
  linear: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingRight: 15,
  },
  list: { borderBottomWidth: 0 },
  titleVideo: {
    marginVertical: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.text.headerColor,
  },
  flatlist: {
    backgroundColor: colors.app.white,
    marginHorizontal: 10,
    borderRadius: 20,
    marginVertical: 0,
    paddingHorizontal: 10,
    paddingTop: 20,
    flex: 1,
  },
  headerTitle: {
    justifyContent: 'center',
    fontSize: 21,
    fontWeight: '700',
    color: colors.text.headerColor,
    alignSelf: 'flex-start',
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  header: { flex: 1, marginVertical: 10 },
  textButton: { color: colors.text.primary, paddingHorizontal: 15 },
  cat: { marginHorizontal: 10 },
  play: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 10000,
  },
  btplay: {
    zIndex: 100000,
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  videoNumber: {
    color: colors.text.numberCount,
    fontSize: 24,
  },
  videoTitle: {
    fontWeight: '400',
    fontSize: 14,
  },
  videoTime: {
    color: colors.text.numberCount,
    fontSize: 12,
  },
  trending: {
    color: colors.app.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    margin: 10,
    fontWeight: '300',
    fontSize: 12,
  },
  imagebg: {
    width: '100%',
    height: 200,
    marginHorizontal: 10,
    overflow: 'hidden',
    borderRadius: 10,
    alignSelf: 'center',
  },
  videoCount: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backgroundVideo: {
    width: 300,
    height: 300,
  },
});

interface StudyVideoCategoryScreenProps {
  route: RouteProp<
    StudyStackParamList,
    typeof StudyStackRouteList.StudyVideoCategory
  >;
  navigation: StackNavigationProp<
    StudyStackParamList,
    typeof StudyStackRouteList.StudyVideoCategory
  >;
}

export default StudyVideoCategoryScreen;
