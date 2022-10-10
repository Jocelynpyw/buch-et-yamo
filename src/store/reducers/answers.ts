import moment from 'moment';
import {
  AnswerState,
  AnswerActionTypes,
  ANSWER_SUBSCRIPTION_SYNC,
  ANSWER_SET_DOWNLOAD_STATE,
  AnswerStateDownload,
  ANSWER_CLEAR_DOWNLOADS,
} from '../actions/answers/actionsTypes';
import { SelectorFn, RootState } from '../configStore';

const initialState: AnswerState = {
  downloads: [],
};

export const getStaleTimestamp = (staleConfig: {
  [key in moment.DurationInputArg2]?: number; // object moment will parse to date
}) => moment().add(staleConfig).unix();

export const isItemStale = (stale = 0) => moment().unix() > stale;

export const shouldShowAnswer = (
  answerDownload?: AnswerStateDownload,
): answerDownload is AnswerStateDownload =>
  Boolean(
    answerDownload?.subscriptionId &&
      answerDownload.expiresOn &&
      moment().isBefore(answerDownload.expiresOn),
  );

export const SelectAnswerDownloads: SelectorFn<AnswerState['downloads']> = (
  state: RootState,
) => state.answer.downloads;

const answerReducer = (
  state = initialState,
  action: AnswerActionTypes,
): AnswerState => {
  // eslint-disable-next-line prefer-destructuring
  let downloads = state.downloads;
  let download: AnswerStateDownload | undefined;

  switch (action.type) {
    case ANSWER_SET_DOWNLOAD_STATE:
      download = downloads.find((d) => d.answerId === action.payload.answerId);

      if (download) {
        downloads = downloads.filter((d) => d.answerId !== download!.answerId);

        return {
          ...state,
          downloads: [
            {
              ...download,
              ...action.payload,
              _stale_: getStaleTimestamp({ minutes: 2 }),
            },
            ...downloads,
          ],
        };
      }
      return state;

    case ANSWER_SUBSCRIPTION_SYNC:
      download = downloads.find((d) => d.answerId === action.payload.answerId);

      if (download) {
        downloads = downloads.filter((d) => d.answerId !== download!.answerId);

        // only add if subscriptionId exist else delete
        if (action.payload.subscriptionId) {
          download = { ...download, ...action.payload };
        }
      } else {
        // only add if subscriptionId exist else delete
        if (action.payload.subscriptionId) {
          download = { ...action.payload, state: 'init' };
        } else {
          return { ...state, downloads: [...downloads] };
        }
      }
      return { ...state, downloads: [download, ...downloads] };

    case ANSWER_CLEAR_DOWNLOADS:
      return initialState;

    default:
      return state;
  }
};

export default answerReducer;
