import { AUTH_BASE_URL } from '@KwSrc/config/constants';
import { ToastService } from '@KwSrc/services';
import { AuthUpdateAccountAction } from '@KwSrc/store/actions';
import { RootState } from '@KwSrc/store/configStore';
// import { selectAuth } from '@KwSrc/store/reducers/users';
import axios, { AxiosError, AxiosRequestConfig, AxiosPromise } from 'axios';
import { Store } from 'redux';
// import AsyncStorage from '@react-native-community/async-storage';

axios.defaults.baseURL = AUTH_BASE_URL;
// not showing alert for these url
const urlsException = ['/apps/app-instance', '/auth/refresh-access-token'];

export type InterceptorCallback = (
  store: Store,
  api: AxiosRequest,
) => Promise<unknown> | unknown;

export interface ConfigAxios extends AxiosRequestConfig {
  __isRetryRequest?: boolean;
  __override?: boolean;
}

export interface InterceptorError extends AxiosError {
  config: ConfigAxios;
}

export type AxiosRequest = (options: ConfigAxios) => AxiosPromise;

// const observeStore = (
//   store: Store,
//   select: any,
//   onChange: (currentState: any) => void,
// ) => {
//   let currentState: any;

//   function handleChange() {
//     const nextState = select(store.getState());
//     if (nextState !== currentState) {
//       currentState = nextState;
//       onChange(currentState);
//     }
//   }

//   const unsubscribe = store.subscribe(handleChange);
//   handleChange();
//   return unsubscribe;
// };

export const requestInterceptor = (store: Store) => {
  const { auth } = store.getState();

  return axios.interceptors.request.use(async (config: ConfigAxios) => {
    if (
      config.url === '/auth/refresh-access-token' ||
      config.url === '/auth/me' ||
      config.__override
    ) {
      return config;
    }

    config!.headers!.Authorization = `Bearer ${auth?.user?.accessToken}`;

    return config;
  });
};

export const refreshToken: InterceptorCallback = async (store, api) => {
  const token = store.getState().auth;
  try {
    const res = await api({
      url: '/auth/refresh-access-token',
      headers: {
        'X-Auth': `${token.refreshToken}`,
      },
      method: 'GET',
    });
    // console.log('from refreshtoken', res.data);

    store.dispatch(AuthUpdateAccountAction(res?.data));

    return Promise.resolve(res.data.accessToken);
  } catch (authError: unknown) {
    // refreshing has failed, but report the original error, i.e. 401
    return Promise.reject(authError);
  }
};

// const authTokenSaver = async (currentState: any) => {
//   // await AsyncStorage.setItem('@storage_Key', value);
//   console.log('currentState', currentState);
// };

export const errorInterceptor = (
  code: number | string,
  store: Store,
  callback: InterceptorCallback,
  api: AxiosRequest,
) => {
  axios.interceptors.response.use(
    undefined,
    async (error: InterceptorError) => {
      if (code === '*') {
        if (urlsException.includes(error.response?.config.url!)) {
          return Promise.reject(error);
        }

        ToastService.showToast({
          message: error.name,
          description:
            Object.values(error.response?.data?.details).length > 0
              ? JSON.stringify(Object.values(error.response?.data?.details)[0])
              : 'Your requested failed, please try again.',
          type: 'danger',
          duration: 5500,
        });
        return Promise.reject(error);
      }

      if (error.response?.config.url === '/auth/refresh-access-token') {
        // ToastService.showToast({
        //   message: error.name,
        //   description: error.response?.data?.message,
        //   type: 'danger',
        // });
        return Promise.reject(error);
      }

      if (error.response?.config.url === '/auth/sign-in') {
        ToastService.showToast({
          message: error.name || 'Request failed',
          description:
            Object.values(error.response?.data?.details).length > 0
              ? JSON.stringify(Object.values(error.response?.data?.details)[0])
              : 'Your requested failed, please try again.',
          type: 'danger',
          duration: 5500,
        });
        return Promise.reject(error);
      }

      if (
        error.response?.status === code &&
        error.config &&
        !error.config?.__isRetryRequest
      ) {
        const resp = await callback(store, api);
        const config = {
          ...error.config,
          headers: {
            ...error.config.headers,
            Authorization: `Bearer ${resp}`,
          },
          __override: true,
          __isRetryRequest: true,
        };
        return Promise.resolve(axios(config));
      }
      return Promise.reject(error);
    },
  );
};

export const configureInterceptors = async (store: Store<RootState>) => {
  errorInterceptor('*', store, refreshToken, axios);
  errorInterceptor(401, store, refreshToken, axios);
  // errorInterceptor(400, store, refreshToken, axios);
  requestInterceptor(store);
};
