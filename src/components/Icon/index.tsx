import React from 'react';
import ISvgIcons, { ISvgIconsProps } from 'react-native-svg-icon';
import icons from './iconsList';

const KwIcon = (ic: ISvgIconsProps) => <ISvgIcons {...ic} svgs={icons} />;

export default KwIcon;
