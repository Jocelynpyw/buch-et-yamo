// in this file we define the constqnt we use
// in the nqvigqtion so thqt  we dont  hqve to write them

export const HOME = {
  home: 'Home',
  homeDetails: 'HomeDetails',
  addAnswers: 'AddAnswer',
  profile: 'Profile',
  addQuestions: 'addQuestions',
  register: 'Register',
  login: 'Login',
  quiz: 'quiz',
  setting: 'setting',
  compQuiz: 'comQuiz',
  listQuizSubjects: 'listSubjectsQuiz',
  quizListQuestionScreen: 'QuizListQuestionScreen',
  quizListSubjectScreen: 'quizListSubjectsScreen',
  quizQuestionsDetails: 'QuizDetailsScreen',
  quizPlay: 'QuizPlayScreen',
  paperHome: 'papersHome',
  paperIntent: 'PaperIntentScreen',
};

export type NavigatorRouteList<ParamList> = {
  [index in keyof ParamList]: index;
};

export type RootStackParamList = {
  BottomTab: undefined;

  HomeDrawer: undefined;
  register: undefined;
  login: undefined;
  ForgotPassword: { type: 'email' | 'phone' | 'password'; token?: string };
  ResetPassword: { type: 'password'; token: string };
  setting: undefined;
  profile: {
    userId?: string;
  };
  notificatons: undefined;
  account: undefined;
  books: undefined;
  school: undefined;
  teacher: undefined;
  paperIntent: undefined;
  news: undefined;

  newsDetails: {
    slug: string;
    title: string;
  };
};

export type HomeDrawerParamList = {
  BottomTab: undefined;
  register: undefined;
  login: undefined;
  forgotPassword: { page: number };
  ResetPassword: {
    method: string;
    value: string;
  };
  profile: undefined;
  setting: undefined;
  notificatons: undefined;
  account: undefined;
  books: undefined;
  school: undefined;
  teacher: undefined;
  paperIntent: undefined;
  news: undefined;

  newsDetails: {
    title: string;
    content: string;
  };
  download: undefined;
  aboutUs: undefined;
  contactUs: undefined;
  myWallet: undefined;
  mySetting: undefined;
};

export type HomeBottomTabParamList = {
  ForumStack: undefined;
  QuizStack: undefined;
  PaperStack: undefined;
  AnswerStack: undefined;
  StudyStack: undefined;
};

export const RootStackRouteList: NavigatorRouteList<RootStackParamList> = {
  HomeDrawer: 'HomeDrawer',
  register: 'register',
  login: 'login',
  ForgotPassword: 'ForgotPassword',
  ResetPassword: 'ResetPassword',
  profile: 'profile',
  setting: 'setting',
  notificatons: 'notificatons',
  account: 'account',
  books: 'books',
  school: 'school',
  teacher: 'teacher',
  paperIntent: 'paperIntent',
  news: 'news',
  newsDetails: 'newsDetails',
  BottomTab: 'BottomTab',
};

export const HomeDrawerRouteList: NavigatorRouteList<HomeDrawerParamList> = {
  BottomTab: 'BottomTab',
  register: 'register',
  login: 'login',
  forgotPassword: 'forgotPassword',
  ResetPassword: 'ResetPassword',
  profile: 'profile',
  setting: 'setting',
  notificatons: 'notificatons',
  account: 'account',
  books: 'books',
  school: 'school',
  teacher: 'teacher',
  paperIntent: 'paperIntent',
  news: 'news',
  newsDetails: 'newsDetails',
  download: 'download',
  aboutUs: 'aboutUs',
  contactUs: 'contactUs',
  myWallet: 'myWallet',
  mySetting: 'mySetting',
};

export const HomeBottomTabRouteList: NavigatorRouteList<HomeBottomTabParamList> =
  {
    ForumStack: 'ForumStack',
    QuizStack: 'QuizStack',
    PaperStack: 'PaperStack',
    AnswerStack: 'AnswerStack',
    StudyStack: 'StudyStack',
  };
