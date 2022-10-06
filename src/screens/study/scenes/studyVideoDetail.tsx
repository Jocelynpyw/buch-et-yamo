import PrHeader from '@KwSrc/components/header';
import KwIcon from '@KwSrc/components/Icon';
import { colors } from '@KwSrc/utils';
import React, { FunctionComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { KwContainer } from '@KwSrc/components/container';
import { StudyStackParamList, StudyStackRouteList } from '../route/contants';
import KwCommentInput from '@KwSrc/components/commentInput';

const StudyVideoDetailScreen: FunctionComponent<
  StudyVideoDetailScreenProps
> = ({}) => {
  // const { id, name, description, url } = route.params;

  return (
    <View style={styles.background}>
      <PrHeader
        back
        textLeft={'Introduction to reproduction in Animals and Plants'}
        avatar="https://via.placeholder.com/150"
      />
      <KwContainer textStyle={{ fontSize: 20 }} style={styles.container}>
        <ImageBackground
          resizeMode="cover"
          style={styles.imagebg}
          source={{
            uri: 'https://cameroongcerevision.com/wp-content/uploads/2021/03/cover-1.png',
          }}
        >
          <LinearGradient
            colors={['#fffff000', '#37558A']}
            style={styles.linear}
          >
            <View style={styles.btplay}>
              <KwIcon name="play" width={60} height={60} viewBox="0 0 40 40" />
            </View>
          </LinearGradient>
        </ImageBackground>
        <Text style={styles.largeTitle}>
          Introduction to reproduction in Animals and Plants
        </Text>

        <View style={styles.border} />
        <ScrollView>
          <Text>Comments</Text>
        </ScrollView>

        <View style={styles.commentContainer}>
          <KwCommentInput
            onSendComment={() => {}}
            style={styles.commentStyle}
          />
        </View>
      </KwContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.app.primary,
    paddingBottom: 0,
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
  commentContainer: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
  },
  commentStyle: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 0,
  },
  largeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  border: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.app.borderColor,
    marginVertical: 10,
  },
});

interface StudyVideoDetailScreenProps {
  route: RouteProp<
    StudyStackParamList,
    typeof StudyStackRouteList.StudyVideoDetails
  >;
  navigation: StackNavigationProp<
    StudyStackParamList,
    typeof StudyStackRouteList.StudyVideoDetails
  >;
}

export default StudyVideoDetailScreen;
