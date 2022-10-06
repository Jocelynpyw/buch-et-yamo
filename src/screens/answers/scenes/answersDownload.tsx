import React, { FunctionComponent, useCallback, useState } from 'react';
import { colors, images } from '@KwSrc/utils';

import { KwListItem } from '@KwSrc/components/listItem';

import {
  View,
  Text,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ListRenderItem,
} from 'react-native';
import { KwLinearGradient } from '@KwSrc/components/linearGradient';
import { Dirs, FileStat, FileSystem } from 'react-native-file-access';
import { useFocusEffect } from '@react-navigation/native';

const AnswersDownloadScreen: FunctionComponent<any> = ({ navigation }) => {
  const [data, setData] = useState<any[]>();
  const [loading, setLoading] = useState(true);
  console.log(`${Dirs.CacheDir}/kawlo/`);
  useFocusEffect(
    useCallback(() => {
      FileSystem.statDir(`${Dirs.CacheDir}/kawlo/`)
        .then((srcFiles: Array<FileStat>) => {
          const files: Array<FileStat> = [];

          // eslint-disable-next-line array-callback-return
          srcFiles.map((file: FileStat) => {
            if (file.filename.indexOf('.kw.txt') >= 0 && file.type === 'file') {
              files.push(file);
            }
          });
          setData(files.reverse());
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []),
  );

  const renderItem: ListRenderItem<any> = ({ item }) => (
    <View style={styles.mv}>
      <KwListItem
        left={
          <Image
            source={images.checkImage}
            style={styles.image}
            resizeMode="contain"
          />
        }
        title={
          <Text style={styles.title}>
            {item.filename.replace('.kw.txt', '')}
          </Text>
        }
        onPress={() => {}}
      />
    </View>
  );

  const renderFooter = () => <View />;

  const renderEmpty = () => <View />;

  return (
    <SafeAreaView style={styles.container}>
      <KwLinearGradient colors={['#D7DDEF', '#D7DEEF', '#FFFFFF']}>
        <View style={styles.containerwihoutheader}>
          <FlatList
            initialNumToRender={5}
            data={data || []}
            renderItem={renderItem}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
          />
        </View>
      </KwLinearGradient>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  containerHeaderScreen: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
    height: 70,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    backgroundColor: colors.app.primary,
    color: colors.text.white,
    fontWeight: 'bold',
  },
  iconheader: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: colors.text.white,
    fontSize: 17,
    top: '35%',
  },
  mv: { marginVertical: 5 },

  textHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.text.white,
    fontSize: 17,
  },
  container: {
    flex: 1,
    // backgroundColor: colors.app.white,
  },
  containerwihoutheader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 40,
    // backgroundColor: colors.app.white,
  },
  listTab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width / 1.2,
    backgroundColor: '#0000000d',
    borderRadius: 50,
    height: 50,
  },
  btnTab: {
    width: Dimensions.get('window').width / 2.5,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#EBEBEB',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    color: '#717070',
  },
  btnTabActive: {
    backgroundColor: colors.app.white,

    shadowColor: '#000000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
  },
  textTab: {
    fontSize: 16,
    color: colors.text.tertiaryGrey,
    // fontFamily:
  },
  textTabActive: {
    color: colors.text.black,
  },
  containerVideos: {
    // backgroundColor: 'red',
    marginTop: 20,
  },
  containerPdf: {
    // backgroundColor: 'purple',
    marginTop: 20,
  },
  showThing: {
    display: 'flex',
  },
  hiddeThing: {
    display: 'none',
  },
  containervideoitem: {
    width: Dimensions.get('window').width,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: 'lime',
    height: 50,
    color: 'white',
  },
  containerpdfitem: {
    width: Dimensions.get('window').width,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: 'purple',
    height: 50,
    color: 'white',
  },
  title: {
    fontWeight: '400',
    color: colors.app.black,
    fontSize: 13,
    marginLeft: 5,
  },
  image: { width: 30, height: 30 },
  imagebg: {
    width: Dimensions.get('window').width,
    height: 200,
    marginHorizontal: 10,
    marginVertical: 10,
    overflow: 'hidden',
    borderRadius: 10,
    alignSelf: 'center',
    // borderRadius
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

  fatlist: { marginVertical: 10 },
  titleVideo: {
    marginVertical: 20,
    marginBottom: 10,
    // fontWeight: 'bold',
    fontSize: 20,
    color: colors.text.headerColor,
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
    fontWeight: '500',
    fontSize: 14,
  },
  videoTime: {
    color: colors.text.numberCount,
    fontSize: 12,
  },

  videoCount: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.app.white,
    padding: 10,
    paddingVertical: 15,
    borderRadius: 12,
  },
});

export default AnswersDownloadScreen;
