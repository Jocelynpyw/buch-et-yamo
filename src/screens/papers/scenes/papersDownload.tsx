import React, { FunctionComponent, useCallback, useState } from 'react';
import { Dirs, FileStat, FileSystem } from 'react-native-file-access';
import {
  Image,
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { colors, images } from '@KwSrc/utils';
import { KwListItemNote } from '@KwSrc/components/listItem/listItemNote';
import moment from 'moment';
import KwIcon from '@KwSrc/components/Icon';
import { PapersStackRouteList } from '../constant';

const PapersDownloadedListScreen: FunctionComponent<any> = ({ navigation }) => {
  const [data, setData] = useState<any[]>();
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      FileSystem.statDir(Dirs.DocumentDir)
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

  const _getFileSize = (byte: number): string => {
    const standard = 1024;
    let unit = 0;
    while (byte >= standard || -byte >= standard) {
      byte /= standard;
      unit++;
    }
    return `${(unit ? `${byte.toFixed(1)} ` : byte) + ' KMGTPEZY'[unit]}B`;
  };

  const renderEmpty = () => (
    <View style={styles.center}>
      <Image
        source={images.loginImage}
        style={styles.imageInf}
        resizeMode="contain"
      />
      <Text style={styles.text}>No Question Downloaded</Text>
    </View>
  );
  const renderItem = ({ item }: any) => (
    <KwListItemNote
      uri={images.papersImage}
      title={String(item.filename.replace('.kw.txt', ''))}
      dep={
        <>
          <Text numberOfLines={5} style={styles.itemDescription}>
            file size :{' '}
            {item.size && _getFileSize(Number.parseInt(item.size, 10))}
          </Text>
          {/* <Text numberOfLines={5} style={styles.itemDescription}>
            Downloaded on the : {item.ctime && _getDateWithFormat(item.ctime)}
          </Text> */}
          <Text numberOfLines={5} style={styles.itemDescription}>
            Lasted opened :{' '}
            {item.lastModified &&
              moment(item.lastModified).format('DD MMM YYYY')}
          </Text>

          <TouchableOpacity
            onPress={() => {
              FileSystem.unlink(item.path);
              navigation.goBack();
            }}
          >
            <KwIcon
              style={{}}
              name="trash"
              width="30"
              height="30"
              viewBox="0 0 20 30"
              strokeWidth="1"
            />
          </TouchableOpacity>
        </>
      }
      key={item.filename + item.lastModified}
      style={styles.item}
      onPress={() => {
        navigation.navigate(PapersStackRouteList.PapersSubjectDetail, {
          id: '',
          title: item.filename.replace('.kw.txt', ''),
          path: item.path,
        });
      }}
    />
  );
  if (loading) {
    return (
      <View style={styles.container_one}>
        <ActivityIndicator size="large" color={colors.app.primary} />
      </View>
    );
  }
  return (
    <View style={styles.background}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.name + item.mtime}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.app.white,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
  },
  item: {
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  itemTitle: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: 'bold',
    marginLeft: 5,
    textTransform: 'capitalize',
  },
  itemDescription: {
    fontSize: 12,
    lineHeight: 20,
    color: '#333',
    marginLeft: 5,
  },
  itemImage: {
    width: 105,
    height: 105,
  },
  container_one: {
    flex: 1,
    backgroundColor: colors.app.white,
    padding: 0,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    marginTop: 50,
  },
  imageInf: { height: 300, width: '60%', marginTop: 20 },
  center: { alignItems: 'center' },
});

export default PapersDownloadedListScreen;
