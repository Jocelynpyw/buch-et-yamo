import {
  AnswerActionTypes,
  ANSWER_SET_DOWNLOAD_STATE,
  ANSWER_SUBSCRIPTION_SYNC,
  AnswerSubscriptionInfo,
  ANSWER_CLEAR_DOWNLOADS,
  AnswerSetDownloadPayload,
} from './actionsTypes';

export const answerClearDownloadsAction = (): AnswerActionTypes => ({
  type: ANSWER_CLEAR_DOWNLOADS,
});

export const answerSubscriptionSyncAction = (
  payload: AnswerSubscriptionInfo,
): AnswerActionTypes => ({
  type: ANSWER_SUBSCRIPTION_SYNC,
  payload,
});

export const answerSetDownloadStateAction = (
  payload: AnswerSetDownloadPayload,
): AnswerActionTypes => ({
  type: ANSWER_SET_DOWNLOAD_STATE,
  payload,
});
