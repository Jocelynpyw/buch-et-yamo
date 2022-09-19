import React from 'react';

import { StyleSheet, View } from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

const styles = StyleSheet.create({
  constainer: {
    width: '95%',
    alignSelf: 'center',
    height: 100,
  },
  viewParams: {
    height: 100,
    width: '100%',
  },
  iconParams: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  callAction: {
    height: 45,
    paddingHorizontal: 12,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 10,
  },
  ads: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
});
interface AdsProps {
  type?: string;
}
export const KwAds = ({ type }: AdsProps) => {
  const adUnitId = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-6915392312901512/1958244117';

  if (type === 'notes') {
    return (
      <View style={styles.ads}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </View>
    );
  }
  return (
    <View style={styles.ads}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.MEDIUM_RECTANGLE}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};
