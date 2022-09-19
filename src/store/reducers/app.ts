import {
  AppState,
  AppInstanceState,
  AppInstanceSyncSuccessActionType,
  AppSyncSuccessActionType,
  AppInstanceLang,
  AppSettings,
  AppSettingsActionType,
} from '../types';
import * as t from '../actions';
import { APP_LANG_CHANGE_SUCCESS } from '../actions/app/actionsTypes';

const appInstanceInitialState: AppInstanceState = {};
const appInitialState: AppState = {};
const appSettingsIntitailState: AppSettings = {};

export const selectApp: any = (state: any) => state.appInstance;

// appInstance

const appInstanceReducer = (
  state = appInstanceInitialState,
  action: AppInstanceSyncSuccessActionType,
) => {
  switch (action.type) {
    case t.APP_INSTANCE_SYNC_SUCCESS:
      state = {
        ...state,
        ...action.payload,
      };
      return state;

    default:
      return state;
  }
};

// appReducer

const appReducer = (
  state = appInitialState,
  action: AppSyncSuccessActionType,
) => {
  switch (action.type) {
    case t.APP_CHECK_SUCCESS:
      state = {
        ...state,
        ...action.payload,
      };
      return state;

    default:
      return state;
  }
};

// initial state value must be default language

const initialState = {
  lang: null,
};
export const selectLang: any = (state: any) => state.language.lang;

const languageReducer = (state = initialState, action: AppInstanceLang) => {
  switch (action.type) {
    case APP_LANG_CHANGE_SUCCESS:
      state = {
        ...state,
        ...action.payload,
      };
      return state;

    default:
      return state;
  }
};

// appReducer

export const selectAppSettings: any = (state: any) => state.appSettings;

const appSettingsReducer = (
  state = appSettingsIntitailState,
  action: AppSettingsActionType,
) => {
  switch (action.type) {
    case t.APP_SETTINGS_SUCCESS:
      state = {
        ...state,
        ...action.payload,
      };
      return state;

    default:
      return state;
  }
};

export { appInstanceReducer, appReducer, languageReducer, appSettingsReducer };
