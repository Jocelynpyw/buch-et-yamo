import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { colors } from '@KwSrc/utils';
import {
  StyleSheet,
  View,
  ToastAndroid,
  Text,
  ActivityIndicator,
} from 'react-native';
import { KwContainer } from '@KwSrc/components/container';

import KwHearder from '@KwSrc/components/header';
import Pdf from 'react-native-pdf';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { answerFileManager } from '@KwSrc/utils/encrypteFiles';

import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import {
  isItemStale,
  SelectAnswerDownloads,
  shouldShowAnswer,
} from '@KwSrc/store/reducers/answers';
import { RootActionTypes } from '@KwSrc/store/configStore';
import { useQuery } from '@apollo/client';
import {
  answerSetDownloadStateAction,
  answerSubscriptionSyncAction,
} from '@KwSrc/store/actions';
import { AnswersStackParamList, AnswersStackRouteList } from '../constants';
import {
  QueryCorrectionAnswerById,
  QueryCorrectionAnswerByIdVariables,
} from '../graphql/__generated__/QueryCorrectionAnswerById';
import { QUERY_CORRECTION_ANSWER_BY_ID } from '../graphql/queries';
import AnswersBundle from '../components/answersBundle';

const AnwersSubjectViewScreen: FunctionComponent<
  AnswersSubjectViewScreenProps
> = ({ route, navigation }) => {
  const { name, answerId } = route.params;

  const [hasSyncedSubscription, setHasSyncedSubscription] = useState(false);

  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [progress, setProgress] = useState('');

  const downloads = useSelector(SelectAnswerDownloads);
  const dispatch = useDispatch<Dispatch<RootActionTypes>>();

  const answerDownload = useMemo(
    () => downloads.find((download) => download.answerId === answerId),
    [answerId, downloads],
  );

  const queryCorrectionAnswerById = useQuery<
    QueryCorrectionAnswerById,
    QueryCorrectionAnswerByIdVariables
  >(QUERY_CORRECTION_ANSWER_BY_ID, {
    fetchPolicy: 'cache-and-network',
    variables: { answerId },
  });

  const answer = useMemo(
    () => queryCorrectionAnswerById.data?.correctionMediaById,
    [queryCorrectionAnswerById.data],
  );

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      'Your Paper is saved in your Downloads folder!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  };
  // check if subscription, then sync it
  useEffect(() => {
    if (answer) {
      if (answer.subscription) {
        dispatch(
          answerSubscriptionSyncAction({
            answerId: answer._id,
            name: answer.name,
            mediaId: answer.media?._id,
            subscriptionId: answer.subscription?._id,
            expiresOn: answer.subscription?.expiresOn,
          }),
        );
      } else {
        // will remove since no subscription
        // call method to delete locally here
        dispatch(
          answerSubscriptionSyncAction({
            answerId: answer._id,
            name: answer.name,
          }),
        );
      }

      setTimeout(() => setHasSyncedSubscription(true), 200);
    }
  }, [dispatch, answer]);

  // listen to downloads, download file if init, or failed earlier
  useEffect(() => {
    // answer only available if network
    // well if no network we cannot download
    if (shouldShowAnswer(answerDownload) && answer?.media) {
      if (
        // assuming it should download complete in 2 minuit
        (answerDownload.state === 'downloading' &&
          isItemStale(answerDownload._stale_)) ||
        answerDownload.state === 'init' ||
        answerDownload.state === 'failed'
      ) {
        // ... download file here, dispatch downloading
        // try to check the path if this file already exist
        dispatch(
          answerSetDownloadStateAction({
            answerId: answer._id,
            state: 'downloading',
          }),
        );
        // if a promise, it should call this below on complete or failed on failure
        answerFileManager(answerId, answer.media.url, (pro: any) =>
          setProgress(((pro.bytesRead / pro.contentLength) * 100).toFixed(0)),
        )
          .then((url) => {
            setFileUrl(url);

            dispatch(
              answerSetDownloadStateAction({
                answerId: answer._id,
                state: 'downloaded',
              }),
            );
            showToastWithGravity();
          })
          .catch(() =>
            dispatch(
              answerSetDownloadStateAction({
                answerId: answer._id,
                state: 'failed',
              }),
            ),
          );
      }
    }
  }, [navigation, dispatch, answerDownload, answer, answerId]);

  useEffect(() => {
    if (answerDownload?.state === 'downloaded') {
      if (!fileUrl) {
        answerFileManager(answerDownload.answerId).then((url) =>
          setFileUrl(url),
        );
      }
    }

    return () => {
      // file is only available when we have downloaded it. so we clean it
      if (fileUrl && answerDownload?.state === 'downloaded') {
        answerFileManager.clear(fileUrl).then();
      }
    };
  }, [answerDownload, fileUrl]);

  const notFound = useMemo(
    () =>
      !queryCorrectionAnswerById.loading &&
      !queryCorrectionAnswerById.data?.correctionMediaById,
    [queryCorrectionAnswerById],
  );

  if (notFound && !answerDownload) {
    return (
      <View style={styles.layout}>
        <Text style={styles.text}>:( Sorry, this link is broken...</Text>
        <Text style={styles.text}>Check your network or Try again Later.</Text>
      </View>
    );
  }

  if (!shouldShowAnswer(answerDownload)) {
    // used to fix the latency between calling dispatch and actually setting that item in state.
    if (answer && hasSyncedSubscription) {
      return (
        <AnswersBundle
          name={name}
          navigation={navigation}
          answerId={answerId}
        />
      );
    }

    return (
      <View style={styles.layout}>
        <Text>Checking subscription</Text>
        <ActivityIndicator size="large" color={colors.app.primary} />
      </View>
    );
  }

  if (!fileUrl) {
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
            uri: `file://${fileUrl}`,
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
