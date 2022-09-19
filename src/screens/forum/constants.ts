import { NavigatorRouteList } from '@KwSrc/navigation/constants.navigation';

export type ForumStackParamList = {
  ForumHomeTab: ForumHomeTabParamList;
  ForumAddAnswer: {
    postId: string;
    __typename: any;
  };
  ForumDetail: {
    postId: string;
    title: string;
  };
  ForumAddQuestion: undefined;
};

export type ForumHomeTabParamList = {
  ForumListPopular: undefined;
  ForumListQuestions: undefined;
  ForumListPinned: undefined;
};

export const ForumStackRouteList: NavigatorRouteList<ForumStackParamList> = {
  ForumHomeTab: 'ForumHomeTab',
  ForumDetail: 'ForumDetail',
  ForumAddQuestion: 'ForumAddQuestion',
  ForumAddAnswer: 'ForumAddAnswer',
};

export const ForumHomeTabRouteList: NavigatorRouteList<ForumHomeTabParamList> =
  {
    ForumListPopular: 'ForumListPopular',
    ForumListQuestions: 'ForumListQuestions',
    ForumListPinned: 'ForumListPinned',
  };
