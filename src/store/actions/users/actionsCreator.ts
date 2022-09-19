import { IUser } from '@KwSrc/typings/apiTypes';
import * as t from './actionsTypes';

export const AuthSignInAction = (data: IUser) => ({
  type: t.AUTH_SIGNIN_ACCOUNT_START,
  data,
});

export const AuthUpdateAccountAction = (data: IUser) => ({
  type: t.AUTH_UPDATE_ACCOUNT_START,
  data,
});

export const AuthSignOutAccount = () => ({
  type: t.AUTH_SIGNOUT_START,
});
