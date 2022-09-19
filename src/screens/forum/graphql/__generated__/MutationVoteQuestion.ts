/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationVoteQuestion
// ====================================================

export interface MutationVoteQuestion_forumPostVote {
  __typename: "ForumPostVote";
  _id: GraphQL_MongoID;
  /**
   * Voting a post can be of three states, 1 = upvote, 0 = cancelled vote, -1 = downVote
   */
  vote: number;
}

export interface MutationVoteQuestion {
  /**
   * Voting a post, up, down or neutralising
   */
  forumPostVote: MutationVoteQuestion_forumPostVote | null;
}

export interface MutationVoteQuestionVariables {
  isUp: boolean;
  postId: GraphQL_MongoID;
}
