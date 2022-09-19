import { Platform } from 'react-native';
import appJson from '../../app.json';

const config =
  process.env.NODE_ENV === 'production'
    ? appJson.scheme.production
    : appJson.scheme.development;

export const API_AUTH_URL = config.APP_BASE_URI;
export const { API_BASE_URL, AUTH_BASE_URL, API_PAPERS_URL } = config;

export const APP_ID = (
  process.env.NODE_ENV === 'production'
    ? appJson.aid.production
    : appJson.aid.development
)[Platform.OS as PLATFORM];

export enum PLATFORM {
  IOS = 'ios',
  ANDROID = 'android',
}
export enum APP_LOCALE {
  French = 'fr',
  English = 'en',
}
