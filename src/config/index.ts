import { configStore } from '@KwSrc/store/configStore';

import { ConfigLocal } from './config.local';
import { API_BASE_URL, API_PAPERS_URL } from './constants';
import { createApolloClient } from './graphql';
import I18n from './i18n/i18n';

const { store, persistor } = configStore();
const apolloQuizClient = createApolloClient(`${API_BASE_URL}/graphql`, store);
const apolloPaperClient = createApolloClient(
  `${API_PAPERS_URL}/graphql`,
  store,
);

export {
  ConfigLocal,
  I18n,
  store,
  persistor,
  apolloQuizClient,
  apolloPaperClient,
};
