import { NavigatorRouteList } from '@KwSrc/navigation/constants.navigation';

export type AnswersStackParamList = {
  AnswersTab: undefined;
  AnswersSubjectList: undefined;
  AnswersSubjectDetail: undefined;
  AnswersBundle: undefined;
};

export const AnswersStackRouteList: NavigatorRouteList<AnswersStackParamList> =
  {
    AnswersTab: 'AnswersTab',
    AnswersSubjectList: 'AnswersSubjectList',
    AnswersSubjectDetail: 'AnswersSubjectDetail',
    AnswersBundle: 'AnswersBundle',
  };
