declare module 'react-native-svg-icon' {
  import { Component } from 'react';

  interface ISvgIconsProps {
    defaultViewBox?: string;
    fill?: string;
    fillRule?: string;
    height?: number | string;
    name?: string;
    stroke?: string;
    strokeWidth?: number | string;
    style?: object;
    svgs?: object;
    width?: number | string;
    viewBox?: string;
  }
  export default class ISvgIcons extends Component<ISvgIconsProps, any> {}
}
