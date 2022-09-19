import React, { FunctionComponent, useEffect, useState } from 'react';
import { colors } from '@KwSrc/utils';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { KwContainer } from '@KwSrc/components/container';
import { WebView } from 'react-native-webview';
import { ScrollView } from 'react-native-gesture-handler';

import KwHearder from '@KwSrc/components/header';

const BlogDetailsScreen: FunctionComponent<any> = ({ route }) => {
  const { title, content } = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
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
              html: `<p style='text-align:left;'>
              ${content}
              </p>`,
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

export default BlogDetailsScreen;
