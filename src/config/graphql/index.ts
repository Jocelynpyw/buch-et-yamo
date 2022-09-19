/* eslint-disable camelcase */
import {
  ApolloClient,
  ApolloLink,
  FieldMergeFunction,
  fromPromise,
  InMemoryCache,
  FieldPolicy,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { AuthUpdateAccountAction } from '@KwSrc/store/actions';
import { RootState } from '@KwSrc/store/configStore';
import { createUploadLink } from 'apollo-upload-client';
import axios from 'axios';
import { Store } from 'redux';
import { RetryLink } from '@apollo/client/link/retry';

import { relayStylePagination } from '@apollo/client/utilities';
import { FragmentPaginationInfo } from './__generated__/FragmentPaginationInfo';

// error handler

const errorLink = (store: Store<RootState>) =>
  onError(
    // eslint-disable-next-line consistent-return
    ({ graphQLErrors, operation, forward }) => {
      if (graphQLErrors) {
        // eslint-disable-next-line no-restricted-syntax
        for (const err of graphQLErrors) {
          console.log(err);
          // eslint-disable-next-line default-case
          switch (err?.extensions?.code) {
            case 'UNAUTHENTICATED':
              return (
                fromPromise(
                  axios({
                    url: `/auth/refresh-access-token`,
                    headers: {
                      'X-Auth': `${store.getState().auth.refreshToken}`,
                    },
                    method: 'GET',
                  }).catch((error) => {
                    // Handle token refresh errors e.g clear stored tokens, redirect to login
                    console.log('handle refresh token', error);

                    return Promise.resolve('failed');

                    // return null; // forward(operation);
                  }),
                )
                  .filter((value) => Boolean(value))
                  // eslint-disable-next-line no-loop-func
                  .flatMap((res: any) => {
                    const oldHeaders = operation.getContext().headers;

                    if (res === 'failed') {
                      // modify the operation context with a new token
                      operation.setContext({
                        headers: {
                          ...oldHeaders,
                          Authorization: undefined,
                        },
                      });
                    } else {
                      // modify the operation context with a new token
                      operation.setContext({
                        headers: {
                          ...oldHeaders,
                          Authorization: `Bearer ${res?.data.accessToken}`,
                        },
                      });

                      store.dispatch(AuthUpdateAccountAction(res?.data));
                    }

                    // retry the request, returning the new observable
                    return forward(operation);
                  })
              );
            default:
              graphQLErrors.map(({ message, locations, path }) =>
                console.warn(
                  `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                ),
              );
          }
        }
      }
    },
  );

const createAuthMiddleware = (store: Store<RootState>) =>
  new ApolloLink((operation, forward) => {
    // get authorization from store
    // const accessToken = selectAccessToken(store.getState());

    // if (accessToken) {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }: any) => ({
      headers: {
        ...headers,
        Authorization: `Bearer ${store.getState().auth.accessToken}`,
      },
    }));
    // }

    return forward(operation);
  });

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: 20000,
    jitter: true,
  },
  attempts: {
    max: 3,
    retryIf: (error: any) => !!error,
  },
});

interface PaginatedQuery<Type extends Record<string, any>> {
  __typename: Type['__typename'];
  count: number | null;
  items: Type[] | null;
  pageInfo: FragmentPaginationInfo;
}
const mergePaginationField: FieldMergeFunction<
  PaginatedQuery<any>,
  PaginatedQuery<any>
> = (existing, incoming) => {
  const newItems = incoming?.items;
  const pageInfo = incoming?.pageInfo!;

  // ensure we never get duplicates, check cache of current page and skip.
  // (We are assuming you must load in chronological order, page 1 -> 2 -> 3 ...)
  if (
    existing?.pageInfo?.currentPage &&
    existing.pageInfo.currentPage >= incoming.pageInfo.currentPage
  ) {
    return existing;
  }

  return Array.isArray(newItems)
    ? {
        ...existing,
        __typename: incoming!.__typename,
        count: existing?.count || 0,
        items: [...(existing?.items || []), ...newItems],
        pageInfo,
      }
    : existing!;
};

const queryFieldPolicies: {
  forumPostPopular: FieldPolicy<any>;
} = {
  forumPostPopular: {
    keyArgs: [],
    merge: mergePaginationField,
  },
};

// const links = (store: Store<RootState>, uri: string) =>
//   split(
//     // split based on operation type
//     ({ query }) => {
//       const definition = getMainDefinition(query);
//       return (
//         definition.kind === 'OperationDefinition' &&
//         definition.operation === 'subscription'
//       );
//     },

//     createUploadLink({
//       uri,
//     }) as unknown as ApolloLink,
//   );

const createApolloClient = (uri: string, store: Store<RootState>) =>
  new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            ...queryFieldPolicies,
            forumPostPaginationRelay: relayStylePagination(),
            forumCommentPaginationRelay: relayStylePagination(),
          },
        },
      },
    }),

    link: ApolloLink.from([
      createAuthMiddleware(store),
      errorLink(store),
      retryLink,
      createUploadLink({
        uri,
      }),
    ]),
  });

export { createApolloClient };
