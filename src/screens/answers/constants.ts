import { NavigatorRouteList } from '@KwSrc/navigation/constants.navigation';

export type AnswersStackParamList = {
  AnswersTab: undefined;
  AnswersSubjectList: { levelId: string; title: string };
  AnswersCountryList: undefined;
  AnswersSubjectDetail: {
    subjectId: string;
    title: string;
  };
  AnswersSubjectView: {
    answerId: string;
    name: string;
  };
  AnswersDownload: undefined;
  AnswersSubscribe: {
    bundleId: string;
    name: string;
  };
};

export const AnswersStackRouteList: NavigatorRouteList<AnswersStackParamList> =
  {
    AnswersTab: 'AnswersTab',
    AnswersSubjectList: 'AnswersSubjectList',
    AnswersSubjectDetail: 'AnswersSubjectDetail',
    AnswersDownload: 'AnswersDownload',
    AnswersCountryList: 'AnswersCountryList',
    AnswersSubscribe: 'AnswersSubscribe',
    AnswersSubjectView: 'AnswersSubjectView',
  };
