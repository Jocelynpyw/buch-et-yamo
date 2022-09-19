import { RFPercentage } from 'react-native-responsive-fontsize';

export const SIZES = {
  // font sizes
  largeTitle: RFPercentage(4),
  h1: RFPercentage(3.5),
  h2: RFPercentage(3),
  h3: RFPercentage(2.5),
  h4: RFPercentage(2),
  body1: RFPercentage(3.5),
  body2: RFPercentage(3),
  body3: RFPercentage(2.5),
  body4: RFPercentage(2),
  body5: RFPercentage(1.5),
};

export const FONTS = {
  robotoH1: { fontFamily: 'Roboto-Black', fontSize: SIZES.h1, lineHeight: 36 },
  robotoH2: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30 },
  robotoH3: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22 },
  robotoH4: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h4, lineHeight: 22 },
  robotoBody1: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  robotoBody2: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  robotoBody3: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  robotoBody4: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
};

const fontsizes = { SIZES, FONTS };
export const truncateStr = (str: string, num: number) =>
  num > str.length ? str : `${str.substring(0, num)}...`;
export default fontsizes;
