/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateOneVideoCommentInput } from "./../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: MutationAddVideoComment
// ====================================================

export interface MutationAddVideoComment_videoCommentCreateOne {
  __typename: "CreateOneVideoCommentPayload";
  /**
   * Document ID
   */
  recordId: GraphQL_MongoID | null;
}

export interface MutationAddVideoComment {
  /**
   * Create one document with mongoose defaults, setters, hooks and validation
   */
  videoCommentCreateOne: MutationAddVideoComment_videoCommentCreateOne | null;
}

export interface MutationAddVideoCommentVariables {
  comment: CreateOneVideoCommentInput;
}
