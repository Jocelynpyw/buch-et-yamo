import { NavigatorRouteList } from '@KwSrc/navigation/constants.navigation';
import { QueryCategoryById_categoryById_children } from './graphql/__generated__/QueryCategoryById';

export type QuizzesStackParamList = {
  QuizzesTab: undefined;
  CompetitionQuizzesType: undefined;
  QuizzesSubjectList: undefined;
  QuizzesSubjectDetail: {
    subject: QueryCategoryById_categoryById_children;
  };
  CompetitionQuizzes: undefined;
  QuizDetails: {
    id: string;
    name: string;
    content?: string;
    number?: number;
    quizSessionCount?: number;
    competitionId?: string;
  };
  QuizPlay: {
    data: any;
    name: string;
    competitionId?: string;
  };
  CompetitionQuizResult: undefined;
  QuizResult: undefined;
};

export const QuizzesStackRouteList: NavigatorRouteList<QuizzesStackParamList> =
  {
    QuizzesTab: 'QuizzesTab',
    CompetitionQuizzesType: 'CompetitionQuizzesType',
    QuizzesSubjectList: 'QuizzesSubjectList',
    QuizzesSubjectDetail: 'QuizzesSubjectDetail',
    CompetitionQuizzes: 'CompetitionQuizzes',
    QuizDetails: 'QuizDetails',
    QuizPlay: 'QuizPlay',
    CompetitionQuizResult: 'CompetitionQuizResult',
    QuizResult: 'QuizResult',
  };
