import { RootStackParamList } from '@KwSrc/navigation/constants.navigation';
import { LinkingOptions } from '@react-navigation/native';

const config = {
  screens: {
    BottomTab: {
      screens: {
        ForumStack: {
          screens: {
            ForumDetail: {
              path: 'posts/:postId',
              parse: {
                postId: (postId: string) => `${postId}`,
              },
            },

            PostScreen: {
              path: 'posts',
            },
          },
        },
      },
    },
  },
};

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [
    'https://kawlo.com',
    'app://kawlo',
    'http://kawlo.com',
    'http://www.kawlo.com',
    'https:www.kawlo.com',
  ],

  config,
};

export default linking;
