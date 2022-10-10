import { gql } from '@apollo/client';
import { FRAGMENT_VIDEO, FRAGMENT_VIDEO_COMMENT_BASE } from './fragments';

export const QUERY_VIDEO_BY_CATEGORY = gql`
  query QueryVideoByCategory($filter: FilterFindManyVideoInput) {
    VideoMany(filter: $filter) {
      ...FragmentVideo
    }
  }
  ${FRAGMENT_VIDEO}
`;

export const QUERY_VIDEO_COMMENT_RELAY_PAGINATION = gql`
  query QueryVideoCommentRelayPagination(
    $cursor: String
    $filter: FilterFindManyVideoCommentInput
  ) {
    videoCommentRelayPagination(first: 10, after: $cursor, filter: $filter) {
      edges {
        cursor
        node {
          ...FragmentVideoCommentBase
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  ${FRAGMENT_VIDEO_COMMENT_BASE}
`;

export const QUERY_TOP_VIDEOS = gql`
  query QueryTopVideo($startDate: String, $endDate: String) {
    videoTopTen(startDate: $startDate, endDate: $endDate) {
      featuredImage {
        url
      }
      _id
      name
      media {
        url
        thumb
        _id
        type
        hlsUrl
        previwImage {
          url
          _id
          isHLS
        }
        isHLS
      }
      subjectId
      viewCount
      description
    }
  }
`;
export const QUERY_VIDEO_SUBSCRIPTION = gql`
  query QueryVideoSubscription($id: MongoID!) {
    VideoById(_id: $id) {
      subjectId
      viewCount
      description
      subscription {
        expiresOn
        _id
      }
    }
  }
`;
