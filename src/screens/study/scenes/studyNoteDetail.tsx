import React, { FunctionComponent } from 'react';
import { colors } from '@KwSrc/utils';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { KwContainer } from '@KwSrc/components/container';
import { useQuery } from '@apollo/client';
import { WebView } from 'react-native-webview';
import { ScrollView } from 'react-native-gesture-handler';

import { apolloPaperClient } from '@KwSrc/config';
import KwHearder from '@KwSrc/components/header';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StudyStackParamList, StudyStackRouteList } from '../route/contants';
import {
  QueryNotesDetails,
  QueryNotesDetailsVariables,
} from '../graphql/__generated__/QueryNotesDetails';
import { QUERY_NOTES_DETAILS } from '../graphql/queries-wp';

const StudyNoteDetailsScreen: FunctionComponent<
  StudyNoteDetailsScreenProps
> = ({ route }) => {
  const { id, title } = route.params;

  const queryBook = useQuery<QueryNotesDetails, QueryNotesDetailsVariables>(
    QUERY_NOTES_DETAILS,
    {
      variables: {
        id,
      },
      client: apolloPaperClient,
    },
  );
  if (queryBook.loading) {
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
          <ActivityIndicator size="large" color={colors.app.primary} />
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
              html: String(queryBook!.data!.post!.content)
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
    backgroundColor: colors.app.white,
    padding: 0,
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
});
interface StudyNoteDetailsScreenProps {
  route: RouteProp<
    StudyStackParamList,
    typeof StudyStackRouteList.StudyNotesDetails
  >;
  navigation: StackNavigationProp<
    StudyStackParamList,
    typeof StudyStackRouteList.StudyNotesDetails
  >;
}

export default StudyNoteDetailsScreen;
