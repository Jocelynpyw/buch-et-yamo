import { APP_ID } from '@KwSrc/config/constants';
import { AppSettingsAction } from '@KwSrc/store/actions';
import { EnumAppState, IAppData } from '@KwSrc/typings/apiTypes';
import axios from 'axios';
import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads';

import { ReactElement, useCallback, useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { Store } from 'redux';
import appJson from '../../../app.json';

interface AppSettingsInterface {
  children: ReactElement;
  store: Store;
}

// This provider is used to provide the interceptos with default auth values

function AppSettingsProvider(props: AppSettingsInterface) {
  // checkupdate

  const checkUpdate = (appInfo: IAppData) => {
    const openUrl = async (url: string, fallback?: string) => {
      try {
        await Linking.openURL(url);
      } catch (e) {
        if (fallback) {
          await Linking.openURL(fallback);
        }
      }
    };
    if (appInfo !== null) {
      if (appInfo?.state === EnumAppState.Published && appInfo._id !== APP_ID) {
        // Alert the user and direct to the app url

        Alert.alert(
          'Please Update Application',
          'You have to update your application to the latest version to continue using.',
          [
            {
              text: 'Update',
              onPress: () => {
                openUrl(
                  'market://details?id=com.kawlo',
                  'https://play.google.com/store/apps/details?id=com.kawlo',
                );
              },
            },
          ],
          { cancelable: true },
        );
      }
    }
  };

  // get AppSettings

  const getAppSettings = useCallback(() => {
    axios({
      method: 'GET',
      url: `/apps/settings/${String(appJson.settingVersion)}`,
    })
      .then((res) => {
        props.store.dispatch(AppSettingsAction(res.data));
      })
      .catch(() => {});
  }, [props.store]);

  // get Applatest

  const getAppLatest = useCallback(() => {
    axios({
      method: 'GET',
      url: `/apps/latest?platform=${Platform.OS}&identifier=${String(
        appJson.identifier,
      )}`,
    })
      .then((res) => {
        checkUpdate(res.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getAppSettings();
      getAppLatest();
    }, 1000);
  }, [getAppSettings, getAppLatest]);

  useEffect(() => {
    mobileAds()
      .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,

        // An array of test device IDs to allow.
        testDeviceIdentifiers: ['EMULATOR'],
      })
      .then(() => {
        // Request config successfully set!
      });

    mobileAds()
      .initialize()
      .then((adapterStatuses) => {
        console.log('adapterStatuses', adapterStatuses);
        // Initialization complete!
      });
  }, []);

  return props.children;
}
export default AppSettingsProvider;
