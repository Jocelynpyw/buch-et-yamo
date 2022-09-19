import { gql } from '@apollo/client';
import { FRAGMENT_PAGINATION_INFO } from '../../../config/graphql/fragments';
import { FRAGMENT_SHARE_BASE } from './fragments';

export const QUERY_SHARE_POST_PAGINATION = gql`
  query QuerySharePagination($page: Int!) {
    SharePagination(page: $page, sort: _ID_DESC, perPage: 20) {
      count
      items {
        ...FragmentShareBase
      }
      pageInfo {
        ...FragmentPaginationInfo
      }
    }
  }

  ${FRAGMENT_SHARE_BASE}
  ${FRAGMENT_PAGINATION_INFO}
`;
