import { gql } from '@apollo/client';

export const MUTATION_ADD_VIDEO_COMMENT = gql`
  mutation MutationAddVideoComment($comment: CreateOneVideoCommentInput!) {
    videoCommentCreateOne(record: $comment) {
      recordId
    }
  }
`;

export const MUTATION_VIEW_COUNT = gql`
  mutation MutationViewCount($videoId: MongoID!) {
    videoIncViewCount(videoId: $videoId) {
      _id
    }
  }
`;
