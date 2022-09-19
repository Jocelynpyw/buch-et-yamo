/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryPostsDetails
// ====================================================

export interface QueryPostsDetails_post {
  __typename: "Post";
  /**
   * The globally unique identifier of the post object.
   */
  id: string;
  /**
   * The content of the post.
   */
  content: string | null;
}

export interface QueryPostsDetails {
  /**
   * An object of the post Type.
   */
  post: QueryPostsDetails_post | null;
}

export interface QueryPostsDetailsVariables {
  id: string;
}
