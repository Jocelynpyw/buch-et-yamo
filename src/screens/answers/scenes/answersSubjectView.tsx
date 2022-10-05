import React, { FunctionComponent, useEffect, useState } from 'react';
import { colors } from '@KwSrc/utils';
import {
  StyleSheet,
  View,
  ToastAndroid,
  Alert,
  Text,
  ActivityIndicator,
} from 'react-native';
import { KwContainer } from '@KwSrc/components/container';

import KwHearder from '@KwSrc/components/header';
import Pdf from 'react-native-pdf';
import { Dirs, FileSystem } from 'react-native-file-access';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { answerFileManager, checkFiles } from '@KwSrc/utils/encrypteFiles';
import { decrypt } from '@KwSrc/utils/encryptor';

import { useSelector } from 'react-redux';
import { selectAppNetwork } from '@KwSrc/store/reducers/app';
import { IAppNetworks } from '@KwSrc/typings/apiTypes';
import { AnswersStackParamList, AnswersStackRouteList } from '../constants';

const AnwersSubjectViewScreen: FunctionComponent<
  AnswersSubjectViewScreenProps
> = ({ route, navigation }) => {
  const { name, media, answerId } = route.params;

  const [data, setData] = useState<string>('');

  const [progress, setProgress] = useState('');

  const network: any = useSelector<IAppNetworks>(selectAppNetwork);

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'Your Paper is saved in your Downloads folder!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  };
  useEffect(() => {
    const path = `${Dirs.CacheDir}/${answerId}.kw.txt`;
    const final = `${Dirs.CacheDir}/${answerId}.pdf`;

    if (network?.isInternetReachable) {
      checkFiles(answerId, true).then(async (exist) => {
        if (exist) {
          await decrypt(path, final);
          setData(final);

          showToastWithGravity();
        } else {
          answerFileManager(answerId, media.url, (pro: any) =>
            setProgress(((pro.bytesRead / pro.contentLength) * 100).toFixed(0)),
          ).then((urls: any) => {
            const temp = urls || '';
            setData(temp);
            showToastWithGravity();
          });
        }
      });
    } else {
      checkFiles(answerId).then(async (exist) => {
        if (exist) {
          await decrypt(path, final);
          setData(final);

          showToastWithGravity();
        } else {
          Alert.alert('No connection');
        }
      });
    }
    return () => {
      // FileSystem.unlink(final);
    };
  }, [navigation, network?.isInternetReachable, answerId, media.url]);

  if (data === '') {
    return (
      <View style={styles.layout}>
        {progress !== '' ? (
          <>
            <Text style={styles.text}>
              {progress ? `Downloading ${name}` : `Fetching ${name}`}
            </Text>

            <Text style={styles.text}>{progress ? ` ${progress} %` : ''}</Text>
          </>
        ) : (
          <ActivityIndicator size="large" color={colors.app.primary} />
        )}
      </View>
    );
  }

  return (
    <View style={styles.container_one}>
      <View style={styles.header}>
        <KwHearder back title={name} avatar="https://via.placeholder.com/150" />
      </View>
      <KwContainer style={styles.container}>
        <Pdf
          source={{
            uri: `file://${data}`,
          }}
          style={styles.pdf}
          trustAllCerts={false}
        />
      </KwContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container_one: {
    flex: 1,
    backgroundColor: colors.app.primary,
    paddingHorizontal: 12,
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.app.primary,
    paddingBottom: 20,
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
  list: {
    height: 63,
    marginTop: 10,
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  layout: {
    flex: 1,
    backgroundColor: colors.app.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface AnswersSubjectViewScreenProps {
  route: RouteProp<
    AnswersStackParamList,
    typeof AnswersStackRouteList.AnswersSubjectView
  >;
  navigation: StackNavigationProp<
    AnswersStackParamList,
    typeof AnswersStackRouteList.AnswersSubjectView
  >;
}
export default AnwersSubjectViewScreen;
