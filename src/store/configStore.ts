import { persistStore, persistReducer, Persistor } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import {
  createStore,
  combineReducers,
  applyMiddleware,
  Store,
  compose,
} from 'redux';
import rootSaga from './saga';
import authReducer from './reducers/users';
import { AuthActionTypes } from './types';
import {
  appInstanceReducer,
  appReducer,
  appSettingsReducer,
  languageReducer,
} from './reducers/app';

const composeEnhancers = compose;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  appInstance: appInstanceReducer,
  app: appReducer,
  language: languageReducer,
  appSettings: appSettingsReducer,
});

export default rootReducer;
// typing for reducer
export type RootState = ReturnType<typeof rootReducer>;

export interface SelectorFn<V, A = undefined> {
  (state: RootState, args?: A): V;
}

export type RootActionTypes = AuthActionTypes;

// persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// saga
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (__DEV__) {
  // const createDebugger = require('redux-flipper').default;
  // middlewares.push(createDebugger());
}

// configure store with types
export const configStore = function configureStore(): {
  store: Store<RootState>;
  persistor: Persistor;
} {
  const store = createStore(
    persistedReducer,
    {},
    composeEnhancers(composeWithDevTools(applyMiddleware(...middlewares))),
  );

  const persistor = persistStore(store);
  // persistor.purge();

  sagaMiddleware.run(rootSaga);

  return { persistor, store };
};
