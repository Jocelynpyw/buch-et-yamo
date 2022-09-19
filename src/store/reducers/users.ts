import { RootState, SelectorFn } from '../configStore';
import { authState } from '../types';
import * as t from '../actions';

const initialState: authState = {};

export const selectAuth: SelectorFn<authState> = (state: RootState) =>
  state.auth;
export const selectAccessToken: any = (state: any) => state.auth.accessToken;
export const selectRefreshToken: any = (state: any) => state.auth.accessToken;

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case t.AUTH_SIGNIN_ACCOUNT_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
      return state;
    case t.AUTH_UPDATE_ACCOUNT_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
      return state;

    case t.AUTH_SIGNOUT_SUCCESS:
      state = initialState;
      return state;

    default:
      return state;
  }
};

export default authReducer;
