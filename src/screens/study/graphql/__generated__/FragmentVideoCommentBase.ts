/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FragmentVideoCommentBase
// ====================================================

export interface FragmentVideoCommentBase_createdBy_avatar {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface FragmentVideoCommentBase_createdBy {
  __typename: "User";
  name: string | null;
  avatar: FragmentVideoCommentBase_createdBy_avatar | null;
}

export interface FragmentVideoCommentBase {
  __typename: "VideoComment";
  _id: GraphQL_MongoID;
  content: string | null;
  createdAt: GraphQL_Date | null;
  /**
   * Created this Comment
   */
  createdBy: FragmentVideoCommentBase_createdBy | null;
}
