export interface IUser {
  uid: string;
  sid: string;
  email: string;
  phone: string;
  username: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
  roles: string[];
}
export interface IAppInstance {
  _id?: string;
  aid?: string;
  uid?: string;
  sid?: string;
  socketId?: string;
  apolloSocketId?: string;
  token?: string;
  deviceId?: string;
  deviceOS?: string;
  devicePlatform?: EPlatform;
  deviceBrand?: string;
  OSVersion?: string;
  locale?: string;
  state?: EnumAppInstanceState;
}

export interface IApp {
  id?: string;
  identifier?: string;
  platform?: string;
}

export interface IAppSettings {
  _id?: string;
  ads?: {
    adsense: {
      adUnitID: string;
    };
    facebook: {
      publisherId: string;
    };
    select: string;
  };
  emails?: string[];
  phones?: {
    books: string[];
    correction: string[];
    others: string[];
  };
  version?: number;
}

export interface IAppData {
  _id: string;
  identifier: string;
  baseVersion: string;
  Platform: string;
  buildIos: string;
  buildAndroid: string;
  buildWeb: string;
  state: string;
  forceUpdate?: boolean;
  changeLog: string[];
}

export enum EAppPlatform {
  Web = 'web',
  Android = 'android',
  Ios = 'ios',
}

export enum EPlatform {
  Web = 'web',
  Mobile = 'mobile',
}

export enum EnumAppState {
  Init = 'init',
  Published = 'published',
  Deprecated = 'deprecated',
}

export enum EnumAppInstanceState {
  Installed = 'installed',
  SignedIn = 'signed_in',
  SignedOut = 'signed_out',
  Uninstalled = 'uninstalled',
}
