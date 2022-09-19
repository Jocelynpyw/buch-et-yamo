import { gql } from '@apollo/client';
import { FRAGMENT_PAGINATION_INFO } from '@KwSrc/config/graphql/fragments';
import {
  FRAGMENT_FORUM_CATEGORY_BASE,
  FRAGMENT_FORUM_COMMENT_BASE,
  FRAGMENT_FORUM_POST_BASE,
} from './fragments';

export const QUERY_FORUM_POST_RELAY_PAGINATION = gql`
  query QueryForumPostPaginationRelay($after: String) {
    forumPostPaginationRelay(first: 10, after: $after) {
      edges {
        cursor
        node {
          ...FragmentForumPostBase
        }
      }

      pageInfo {
        endCursor

        hasNextPage
      }
    }
  }

  ${FRAGMENT_FORUM_POST_BASE}
`;

export const QUERY_FORUM_POST_MANY = gql`
  query QueryForumPostMany($filter: FilterFindManyForumPostInput) {
    forumPostMany(filter: $filter, limit: 5) {
      ...FragmentForumPostBase
    }
  }

  ${FRAGMENT_FORUM_POST_BASE}
`;

export const QUERY_FORUM_POST_BY_ID = gql`
  query QueryForumPostById($id: MongoID!) {
    forumPostById(_id: $id) {
      ...FragmentForumPostBase
    }
  }

  ${FRAGMENT_FORUM_POST_BASE}
`;

export const QUERY_FORUM_POST_COMMENT_RELAY_PAGINATION = gql`
  query QueryForumPostCommentRelayPagination(
    $cursor: String
    $filter: FilterFindManyForumCommentInput
  ) {
    forumCommentPaginationRelay(first: 10, after: $cursor, filter: $filter) {
      edges {
        cursor
        node {
          ...FragmentForumCommentBase
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  ${FRAGMENT_FORUM_COMMENT_BASE}
`;

export const QUERY_FORUM_CATEGORY_MANY = gql`
  query QueryForumCategoryMany {
    forumCategoryMany(filter: { onlyAdmin: false }) {
      ...FragmentForumCategoryBase
    }
  }

  ${FRAGMENT_FORUM_CATEGORY_BASE}
`;

export const QUERY_POST_POPULAR_PAGINATION = gql`
  query QueryForumPostPopular($page: Int!) {
    forumPostPopular(page: $page, perPage: 10) {
      count
      items {
        ...FragmentForumPostBase
      }
      pageInfo {
        ...FragmentPaginationInfo
      }
    }
  }

  ${FRAGMENT_FORUM_POST_BASE}
  ${FRAGMENT_PAGINATION_INFO}
`;
