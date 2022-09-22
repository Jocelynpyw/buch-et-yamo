import {
  IAppInstance,
  IApp,
  IUser,
  IAppSettings,
  IAppNetworks,
} from '@KwSrc/typings/apiTypes';
import * as t from './actions';

export interface authState {
  user?: IUser;
  accessToken?: string;
  refreshToken?: string;
}

export interface AppInstanceState extends IAppInstance {}
export interface AppState extends IApp {}
export interface AppSettings extends IAppSettings {}
export interface AppNetworks extends IAppNetworks {}

// actionTypes aeith action creators

export interface AuthSignInActionType {
  type: typeof t.AUTH_SIGNIN_ACCOUNT_START;
  data: IUser;
}

export interface AuthSignOutActionType {
  type: typeof t.AUTH_SIGNOUT_START;
}

export interface AppInstanceSyncActionType {
  type: typeof t.APP_INSTANCE_SYNC_START;
  data: IAppInstance;
}

export interface AppSyncActionType {
  type: typeof t.APP_CHECK_START;
  data: IApp;
}
export interface AppSettingsActionType {
  type: typeof t.APP_SETTINGS_SUCCESS;
  payload: IAppSettings;
}
export interface AppNetworksActionType {
  type: typeof t.APP_NETWORKS_SUCCESS;
  payload: IAppNetworks;
}

export interface AppSyncSuccessActionType {
  type: typeof t.APP_CHECK_SUCCESS;
  payload: IApp;
}
export interface AppInstanceSyncSuccessActionType {
  type: typeof t.APP_INSTANCE_SYNC_SUCCESS;
  payload: IAppInstance;
}

export interface AppInstanceLang {
  type: typeof t.APP_LANG_CHANGE_SUCCESS;
  payload: IAppInstance;
}

export type AuthActionTypes =
  | AuthSignInActionType
  | AppInstanceSyncActionType
  | AppSyncActionType
  | AppSettingsActionType
  | AppNetworksActionType
  | AuthSignOutActionType;
