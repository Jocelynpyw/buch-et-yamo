export const ANSWER_SUBSCRIPTION_SYNC = 'ANSWER_SUBSCRIPTION_SYNC';
export interface AnswerSubscriptionSyncAction {
  type: typeof ANSWER_SUBSCRIPTION_SYNC;
  payload: AnswerSubscriptionInfo;
}

export const ANSWER_SET_DOWNLOAD_STATE = 'ANSWER_SET_DOWNLOAD_STATE';
export interface AnswerSetDownloadStateAction {
  type: typeof ANSWER_SET_DOWNLOAD_STATE;
  payload: AnswerSetDownloadPayload;
}

export const ANSWER_CLEAR_DOWNLOADS = 'ANSWER_CLEAR_DOWNLOADS';
export interface AnswerClearDownloadsAction {
  type: typeof ANSWER_CLEAR_DOWNLOADS;
}

export type AnswerActionTypes =
  | AnswerClearDownloadsAction
  | AnswerSetDownloadStateAction
  | AnswerSubscriptionSyncAction;

export interface AnswerSetDownloadPayload {
  answerId: string;
  state: AnswerStateDownload['state'];
  path?: string;
}

export interface AnswerSubscriptionInfo {
  answerId: string; // will serve as path
  name: string;
  mediaId?: string;
  subscriptionId?: string;
  expiresOn?: string; // date-time
}

export interface AnswerStateDownload extends AnswerSubscriptionInfo {
  state: 'init' | 'failed' | 'downloading' | 'downloaded';
  path?: string;
  _stale_?: number;
}

export interface AnswerState {
  downloads: AnswerStateDownload[];
}
