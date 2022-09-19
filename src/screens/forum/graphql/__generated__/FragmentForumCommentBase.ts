/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FragmentForumCommentBase
// ====================================================

export interface FragmentForumCommentBase_image {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface FragmentForumCommentBase_document {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
  /**
   * File name as received set by user before uploading or sent in the mutation record
   */
  filename: string | null;
}

export interface FragmentForumCommentBase_createdBy_avatar {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface FragmentForumCommentBase_createdBy {
  __typename: "User";
  name: string | null;
  avatar: FragmentForumCommentBase_createdBy_avatar | null;
}

export interface FragmentForumCommentBase {
  __typename: "ForumComment";
  _id: GraphQL_MongoID;
  content: string | null;
  createdAt: GraphQL_Date | null;
  /**
   * Comment's image, from imageId
   */
  image: FragmentForumCommentBase_image | null;
  /**
   * Comment's document, from documentId
   */
  document: FragmentForumCommentBase_document | null;
  /**
   * Created this Comment
   */
  createdBy: FragmentForumCommentBase_createdBy | null;
}
