module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        root: ['.'],

        alias: {
          '@KwSrc': './src',
          '@KwStorybook': './storybook',
          '@KwComponents': './src/components',
          '@KwAssets': './src/assets',
          '@KwConfig': './src/config',
          '@KwNavigation': './src/navigation',
          '@KwScreen': './src/screens',
          '@KwUtils': './src/utils',
          '@KwTypings': './src/typings',
          '@KwServices': 'src/services',
          '@KwStore': 'src/store',
        },
      },
    ],
    'react-native-reanimated/plugin',
    // 'jest-hoist',
  ],
};
