import { NavigatorRouteList } from '@KwSrc/navigation/constants.navigation';

export type AnswersStackParamList = {
  AnswersTab: undefined;
  AnswersSubjectList: { levelId: string; title: string };
  AnswersCountryList: undefined;
  AnswersSubjectDetail: {
    subjectId: string;
    title: string;
  };
  AnswersBundle: {
    answerId: string;
    media: any;
    name: string;
  };
  AnswersSubjectView: {
    answerId: string;
    media: any;
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
    AnswersBundle: 'AnswersBundle',
    AnswersDownload: 'AnswersDownload',
    AnswersCountryList: 'AnswersCountryList',
    AnswersSubscribe: 'AnswersSubscribe',
    AnswersSubjectView: 'AnswersSubjectView',
  };
