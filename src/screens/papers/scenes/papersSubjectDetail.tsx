import React, { FunctionComponent, useEffect, useState } from 'react';
import { colors } from '@KwSrc/utils';
import {
  StyleSheet,
  View,
  ToastAndroid,
  Alert,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { KwContainer } from '@KwSrc/components/container';
import { useQuery } from '@apollo/client';
import { apolloPaperClient } from '@KwSrc/config';
import KwHearder from '@KwSrc/components/header';
import Pdf from 'react-native-pdf';
import { Dirs, FileSystem } from 'react-native-file-access';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { checkFiles, papersFileManager } from '@KwSrc/utils/encrypteFiles';
import { decrypt } from '@KwSrc/utils/encryptor';
import WebView from 'react-native-webview';
import { useSelector } from 'react-redux';
import { selectAppNetwork } from '@KwSrc/store/reducers/app';
import { IAppNetworks } from '@KwSrc/typings/apiTypes';
import { QUERY_POSTS_DETAILS } from '../graphql/queries-wp';
import { PapersStackParamList, PapersStackRouteList } from '../constant';

const PapersSubjectDetailsScreen: FunctionComponent<
  PapersSubjectDetailsScreenProps
> = ({ route, navigation }) => {
  const { id, title } = route.params;

  const [data, setData] = useState<string>('');

  const [type, setType] = useState<string>('pdf');

  const [progress, setProgress] = useState('');

  const network: any = useSelector<IAppNetworks>(selectAppNetwork);

  const queryPapers = useQuery<any>(QUERY_POSTS_DETAILS, {
    variables: {
      id,
    },
    client: apolloPaperClient,
  });
  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'Your Paper is saved in your Downloads folder!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  };
  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerTitleStyle: {
        textTransform: 'capitalize',
      },
    });

    let raw: any = {};
    const path = `${Dirs.DocumentDir}/${title.replace('/', '')}.kw.txt`;
    const final = `${Dirs.CacheDir}/${title.replace('/', '')}.pdf`;
    const Filename = title.replace('/', '');

    if (network?.isInternetReachable) {
      checkFiles(Filename).then(async (exist) => {
        if (exist) {
          await decrypt(path, final);
          setData(final);
          // setLoading(false);
          showToastWithGravity();
        } else if (!queryPapers.loading && !!queryPapers.data) {
          if (queryPapers.data.post !== null) {
            raw = queryPapers.data.post.content;
            const url = /(https|http)?:\/\/[^" ]*.(pdf|PDF)/;
            if (raw.match(url) !== null) {
              let urlFinal = raw.match(url)[0];

              urlFinal = urlFinal.replace('http://www.', 'https://');

              papersFileManager(title.replace('/', ''), urlFinal, (pro: any) =>
                setProgress(
                  ((pro.bytesRead / pro.contentLength) * 100).toFixed(0),
                ),
              ).then((urls: any) => {
                const temp = urls || '';
                setData(temp);
                showToastWithGravity();
              });
            } else {
              setType('text');
              setData(raw);
              // setLoading(false);
            }
          }
        }
      });
    } else {
      checkFiles(Filename).then(async (exist) => {
        if (exist) {
          await decrypt(path, final);
          setData(final);

          //  setLoading(false);
          showToastWithGravity();
        } else {
          Alert.alert('No connection');
        }
      });
    }
    return () => {
      FileSystem.unlink(final);
    };
  }, [title, navigation, queryPapers, network?.isInternetReachable]);

  if (data === '') {
    return (
      <View style={styles.layout}>
        {progress !== '' ? (
          <>
            <Text style={styles.text}>
              {progress ? `Downloading ${title}` : `Fetching ${title}`}
            </Text>

            <Text style={styles.text}>{progress ? ` ${progress} %` : ''}</Text>
          </>
        ) : (
          <ActivityIndicator size="large" color={colors.app.primary} />
        )}
      </View>
    );
  }
  if (type === 'pdf') {
    return (
      <View style={styles.container_one}>
        <View style={styles.header}>
          <KwHearder
            back
            title={title}
            avatar="https://via.placeholder.com/150"
          />
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
  }
  return (
    <View style={styles.container_one}>
      <View style={styles.header}>
        <KwHearder
          back
          title={title}
          avatar="https://via.placeholder.com/150"
        />
      </View>
      <KwContainer style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, flex: 1 }}>
          <WebView
            originWhitelist={['*']}
            source={{
              html: String(data)
                .replace('Download this question in our application', '')
                .replace(
                  'Looking for solutions to this question? click here to download  our app and get the solutions',
                  '',
                ),
            }}
            scalesPageToFit={false}
          />
        </ScrollView>
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
interface PapersSubjectDetailsScreenProps {
  route: RouteProp<
    PapersStackParamList,
    typeof PapersStackRouteList.PapersSubjectDetail
  >;
  navigation: StackNavigationProp<
    PapersStackParamList,
    typeof PapersStackRouteList.PapersSubjectDetail
  >;
}

export default PapersSubjectDetailsScreen;
