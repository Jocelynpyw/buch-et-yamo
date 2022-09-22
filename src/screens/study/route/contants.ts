import { NavigatorRouteList } from '@KwSrc/navigation/constants.navigation';

export type StudyStackParamList = {
  StudyNotesSubjectLists: undefined;
  StudyHome: undefined;
  StudyVideoDetail: {
    StudyId: string;
    title: string;
    desc: string;
  };
  StudyPamplet: undefined;
  StudyVideo: undefined;
  StudyVideoCategory: {
    name: string;
    url: string;
    id: string;
    description: string;
  };
  StudyPampletDetail: {
    productId: string;
    productName: string;
    productPrice: string;
    productUri: string;
    productDescription: string;
  };
  StudyNotesList: {
    subjectId: string;
    title: string;
  };
  StudyNotes: undefined;
  StudyNotesDetails: {
    id: string;
    title: string;
  };
};

export const StudyStackRouteList: NavigatorRouteList<StudyStackParamList> = {
  StudyNotesSubjectLists: 'StudyNotesSubjectLists',
  StudyHome: 'StudyHome',
  StudyPamplet: 'StudyPamplet',
  StudyVideo: 'StudyVideo',
  StudyVideoDetail: 'StudyVideoDetail',
  StudyVideoCategory: 'StudyVideoCategory',
  StudyPampletDetail: 'StudyPampletDetail',
  StudyNotesList: 'StudyNotesList',
  StudyNotes: 'StudyNotes',
  StudyNotesDetails: 'StudyNotesDetails',
};

export type StudyHomeTabParamList = {
  StudyNotesList: undefined;
  StudyNotes: undefined;
  StudyHome: undefined;
  StudyCorrection: undefined;
  StudyPamplet: undefined;
  StudyVideo: undefined;
  StudyVideoDetail: undefined;
  StudyVideoCategory: undefined;
  StudyPampletDetail: undefined;
};

export const StudyHomeTabRouteList: NavigatorRouteList<StudyHomeTabParamList> =
  {
    StudyNotesList: 'StudyNotesList',
    StudyNotes: 'StudyNotes',
    StudyHome: 'StudyHome',
    StudyCorrection: 'StudyCorrection',
    StudyPamplet: 'StudyPamplet',
    StudyVideo: 'StudyVideo',
    StudyVideoDetail: 'StudyVideoDetail',
    StudyVideoCategory: 'StudyVideoCategory',
    StudyPampletDetail: 'StudyPampletDetail',
  };
