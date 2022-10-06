import axios, { AxiosResponse, Method } from 'axios';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as t from '../actions';
import { selectApp } from '../reducers/app';
import {
  AppSyncActionType,
  AppInstanceSyncActionType,
  AuthSignInActionType,
} from '../types';
import { APP_LANG_CHANGE_SUCCESS } from '../actions/app/actionsTypes';

function apicaller(method: Method, url: string, data?: any) {
  return axios({
    method,
    url,
    data,
  });
}

function* AuthSignIn(action: AuthSignInActionType): any {
  try {
    yield put({
      type: t.AUTH_SIGNIN_ACCOUNT_SUCCESS,

      payload: {
        user: action.data,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
      },
    });

    const appInstance: any = yield select(selectApp);
    // console.log('appInstance', appInstance);

    appInstance.uid = action.data.uid;
    appInstance.sid = action.data.sid;

    if (appInstance) {
      yield put({
        type: t.APP_INSTANCE_SYNC_START,

        data: {
          ...appInstance,
        },
      });
    }
  } catch (error: unknown) {
    console.log('saga fail: ', error);
  }
}

function* AuthUpdate(action: AuthSignInActionType) {
  try {
    yield put({
      type: t.AUTH_UPDATE_ACCOUNT_SUCCESS,

      payload: {
        user: action.data,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
      },
    });
  } catch (error: unknown) {
    console.log('saga fail: ', error);
  }
}

function* AppInstanceSync(action: AppInstanceSyncActionType): any {
  try {
    const appInstance: any = yield select(selectApp);

    const data = {
      ...appInstance,
      ...action.data,
    };

    const result: AxiosResponse = yield call(
      apicaller,
      'post',
      '/apps/instances/sync',
      data,
    );
    yield put({
      type: t.APP_INSTANCE_SYNC_SUCCESS,
      payload: {
        ...result.data,
      },
    });
  } catch (error: unknown) {
    console.log('saga fail: ', error);
  }
}

function* AppSync(action: AppSyncActionType) {
  try {
    const result: AxiosResponse = yield call(
      apicaller,
      'get',
      `/apps/app/latest/{identifier}/{platform}?identifier=${action.data.id}&platform=${action.data.platform}`,
    );
    yield put({
      type: t.APP_CHECK_SUCCESS,
      payload: {
        ...result.data,
      },
    });
  } catch (error: unknown) {
    console.log('saga fail: ', error);
  }
}

function* AuthSignOut(): any {
  try {
    yield put({
      type: t.AUTH_SIGNOUT_SUCCESS,
    });
    const appInstance: any = yield select(selectApp);

    // console.log('appInstance', appInstance);
    delete appInstance.uid;
    delete appInstance.sid;

    if (appInstance) {
      yield put({
        type: t.APP_INSTANCE_SYNC_START,

        data: {
          ...appInstance,
        },
      });
    }
  } catch (error: unknown) {
    console.log('saga fail: ', error);
  }
}

function* ChangeLang(action: any) {
  try {
    yield put({
      type: APP_LANG_CHANGE_SUCCESS,
      payload: {
        lang: action.payload,
      },
    });
  } catch (error: unknown) {
    console.log('saga fail: ', error);
  }
}
function* AppSetting(action: any) {
  try {
    yield put({
      type: t.APP_SETTINGS_SUCCESS,
      payload: {
        ...action.payload,
      },
    });
  } catch (error: unknown) {
    console.log('saga fail: ', error);
  }
}
function* AppNetWork(action: any) {
  try {
    yield put({
      type: t.APP_NETWORKS_SUCCESS,
      payload: {
        ...action.payload,
      },
    });
  } catch (error: unknown) {
    console.log('saga fail: ', error);
  }
}

export function* watcherAuthSignIn() {
  yield takeLatest(t.AUTH_SIGNIN_ACCOUNT_START, AuthSignIn);
}

export function* watcherAuthSignOut() {
  yield takeLatest(t.AUTH_SIGNOUT_START, AuthSignOut);
}

export function* watcherAuthUpdate() {
  yield takeLatest(t.AUTH_UPDATE_ACCOUNT_START, AuthUpdate);
}

export function* watcherAppInstanceSync() {
  yield takeLatest(t.APP_INSTANCE_SYNC_START, AppInstanceSync);
}

export function* watcherAppSync() {
  yield takeLatest(t.APP_CHECK_START, AppSync);
}

export function* watcherChangeLang() {
  yield takeLatest(t.APP_LANG_CHANGE_START, ChangeLang);
}

export function* watcherAppSettings() {
  yield takeLatest(t.APP_SETTINGS_START, AppSetting);
}
export function* watcherAppNetworks() {
  yield takeLatest(t.APP_NETWORKS_START, AppNetWork);
}
