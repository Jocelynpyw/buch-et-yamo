import { fork } from 'redux-saga/effects';
import {
  watcherAppInstanceSync,
  watcherAppSync,
  watcherAuthSignIn,
  watcherAuthUpdate,
  watcherAuthSignOut,
  watcherChangeLang,
  watcherAppSettings,
} from './saga';

export default function* rootSaga() {
  yield fork(watcherAuthSignIn);
  yield fork(watcherAuthUpdate);
  yield fork(watcherAppSync);
  yield fork(watcherAppInstanceSync);
  yield fork(watcherAuthSignOut);
  yield fork(watcherChangeLang);
  yield fork(watcherAppSettings);
}
