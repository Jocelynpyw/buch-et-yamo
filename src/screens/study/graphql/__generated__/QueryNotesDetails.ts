/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryNotesDetails
// ====================================================

export interface QueryNotesDetails_post {
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

export interface QueryNotesDetails {
  /**
   * An object of the post Type.
   */
  post: QueryNotesDetails_post | null;
}

export interface QueryNotesDetailsVariables {
  id: string;
}
