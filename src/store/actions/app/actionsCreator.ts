import { IAppInstance, IApp, IAppSettings } from '@KwSrc/typings/apiTypes';
import * as t from './actionsTypes';

export const AppInstanceSyncAction = (data: IAppInstance) => ({
  type: t.APP_INSTANCE_SYNC_START,
  data,
});

export const AppSyncAction = (data: IApp) => ({
  type: t.APP_CHECK_START,
  data,
});

export const changeLanguage = (payload: string) => ({
  type: t.APP_LANG_CHANGE_START,
  payload,
});

export const AppSettingsAction = (payload: IAppSettings) => ({
  type: t.APP_SETTINGS_START,
  payload,
});
