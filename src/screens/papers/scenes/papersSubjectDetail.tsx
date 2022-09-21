import React, { FunctionComponent, useState } from 'react';
import { colors } from '@KwSrc/utils';
import { StyleSheet, View, Dimensions } from 'react-native';
import { KwContainer } from '@KwSrc/components/container';
import { useQuery } from '@apollo/client';
import { apolloPaperClient } from '@KwSrc/config';
import KwHearder from '@KwSrc/components/header';
import Pdf from 'react-native-pdf';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { QUERY_POSTS_DETAILS } from '../graphql/queries-wp';
import { PapersStackParamList, PapersStackRouteList } from '../constant';

const PapersSubjectDetailsScreen: FunctionComponent<
  PapersSubjectDetailsScreenProps
> = ({ route, navigation }) => {
  const { id, title } = route.params;

  const [data, setData] = useState<string>('');

  const [type, setType] = useState<string>('pdf');

  const [progress, setProgress] = useState('');

  const queryPapers = useQuery<any>(QUERY_POSTS_DETAILS, {
    variables: {
      id,
    },
    client: apolloPaperClient,
  });
  const source = {
    uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    cache: false,
  };
  return (
    <View style={styles.container_one}>
      <View style={styles.header}>
        <KwHearder
          back
          textLeft={title}
          avatar="https://via.placeholder.com/150"
        />
      </View>
      <KwContainer style={styles.container}>
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
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
