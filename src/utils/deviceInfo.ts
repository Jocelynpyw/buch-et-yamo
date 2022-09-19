import { APP_ID } from '@KwSrc/config/constants';
import { locales } from '@KwSrc/config/i18n/i18n';
import {
  EnumAppInstanceState,
  EPlatform,
  IAppInstance,
} from '@KwSrc/typings/apiTypes';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const deviceInfo = async () => {
  const appInstance: IAppInstance = {
    aid: APP_ID,
    deviceId: DeviceInfo.getUniqueId(),
    deviceOS: Platform.OS,
    OSVersion: DeviceInfo.getSystemVersion(),
    devicePlatform: EPlatform.Mobile,
    locale: locales[0].languageCode,
    state: EnumAppInstanceState.Installed,
    deviceBrand: await DeviceInfo.getManufacturer(),
  };

  return appInstance;
};
