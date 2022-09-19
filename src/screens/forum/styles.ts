import { colors } from '@KwSrc/utils';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',

    justifyContent: 'flex-start',
    backgroundColor: colors.app.white,

    alignSelf: 'center',
    padding: 10,

    borderColor: colors.app.backgroundCopies,
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
  },

  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  column: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  username: {
    fontSize: 12,
    fontFamily: 'Roboto-Bold',
    color: colors.app.lightBlue,
  },
  subject: {
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    color: '#39F',
    textTransform: 'capitalize',
  },
  clock: {
    color: colors.app.lightBlue,
    fontSize: 12,
    marginHorizontal: 5,
  },
  userMargin: {
    marginHorizontal: 20,
  },
  body: { marginVertical: 15 },
  title: {
    fontFamily: 'Roboto-ExtraBold',
    fontSize: 14,
    color: colors.app.black,
  },
  content: {
    fontFamily: 'Roboto-Regular',
    lineHeight: 24,
    marginVertical: 10,
    color: colors.app.grey,
  },
  bottom: { alignItems: 'center', flexDirection: 'row' },
  bottomTitle: {
    fontFamily: 'Roboto-ExtraBold',
    fontSize: 14,
    marginHorizontal: 10,
  },
  image: {
    height: 150,
    marginVertical: 10,
  },
  marginHome: { flex: 1, marginLeft: -10, marginTop: 10 },
});

export const tag = {
  p: {
    fontFamily: 'Roboto-Regular',
    color: colors.app.black,
    textAlign: 'left',
    marginBottom: 5,
  },
};
