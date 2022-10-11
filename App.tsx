import React from 'react';
import { StatusBar } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigationContainer from '@KwSrc/navigation/index.navigation';
import FlashMessage from 'react-native-flash-message';
import { colors } from '@KwSrc/utils';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { apolloQuizClient, persistor, store } from '@KwSrc/config';
import { ApolloProvider } from '@apollo/client';
import InterceptorProvider from '@KwSrc/config/interceptorProvider';
import AppSettingsProvider from '@KwSrc/services/appSettings';
import PushNotificationController from '@KwSrc/services/notification';

const App = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <InterceptorProvider store={store}>
          <ApolloProvider client={apolloQuizClient}>
            <AppSettingsProvider store={store}>
              <>
                <StatusBar
                  barStyle="light-content"
                  backgroundColor={colors.app.primary}
                />
                <AppNavigationContainer />
                <FlashMessage position="top" />
                <PushNotificationController store={store} />
              </>
            </AppSettingsProvider>
          </ApolloProvider>
        </InterceptorProvider>
      </PersistGate>
    </Provider>
  </SafeAreaProvider>
);
export default App;
