import { gql } from '@apollo/client';

export const FRAGMENT_PAGINATION_INFO = gql`
  fragment FragmentPaginationInfo on PaginationInfo {
    currentPage
    perPage
    pageCount
    itemCount
    hasNextPage
    hasPreviousPage
  }
`;
