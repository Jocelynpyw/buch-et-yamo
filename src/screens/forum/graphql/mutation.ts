import { gql } from '@apollo/client';
import {
  FRAGMENT_FORUM_COMMENT_BASE,
  FRAGMENT_FORUM_POST_BASE,
} from './fragments';

export const MUTATION_ADD_FORUM_POST = gql`
  mutation MutationAddForumPost($post: CreateOneForumPostInput!) {
    forumPostCreateOne(record: $post) {
      recordId
      record {
        ...FragmentForumPostBase
      }
    }
  }

  ${FRAGMENT_FORUM_POST_BASE}
`;

export const MUTATION_ADD_FORUM_POST_COMMENT = gql`
  mutation MutationAddForumComment($comment: CreateOneForumCommentInput!) {
    forumCommentCreateOne(record: $comment) {
      recordId
      record {
        ...FragmentForumCommentBase
      }
    }
  }

  ${FRAGMENT_FORUM_COMMENT_BASE}
`;

export const MUTATION_VOTE_QUESTION = gql`
  mutation MutationVoteQuestion($isUp: Boolean!, $postId: MongoID!) {
    forumPostVote(isUp: $isUp, postId: $postId) {
      _id
      vote
    }
  }
`;
