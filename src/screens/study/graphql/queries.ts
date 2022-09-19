import { gql } from '@apollo/client';
import { FRAGMENT_VIDEO } from './fragments';

export const QUERY_VIDEO_BY_CATEGORY = gql`
  query QueryVideoByCategory($filter: FilterFindManyVideoInput) {
    VideoMany(filter: $filter) {
      ...FragmentVideo
    }
  }
  ${FRAGMENT_VIDEO}
`;
