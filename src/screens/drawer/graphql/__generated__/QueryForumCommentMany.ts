/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryForumCommentMany
// ====================================================

export interface QueryForumCommentMany_forumCommentMany_image {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface QueryForumCommentMany_forumCommentMany_document {
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

export interface QueryForumCommentMany_forumCommentMany_createdBy_avatar {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface QueryForumCommentMany_forumCommentMany_createdBy {
  __typename: "User";
  name: string | null;
  avatar: QueryForumCommentMany_forumCommentMany_createdBy_avatar | null;
  _id: GraphQL_MongoID;
}

export interface QueryForumCommentMany_forumCommentMany {
  __typename: "ForumComment";
  _id: GraphQL_MongoID;
  content: string | null;
  createdAt: GraphQL_Date | null;
  /**
   * Comment's image, from imageId
   */
  image: QueryForumCommentMany_forumCommentMany_image | null;
  /**
   * Comment's document, from documentId
   */
  document: QueryForumCommentMany_forumCommentMany_document | null;
  /**
   * Created this Comment
   */
  createdBy: QueryForumCommentMany_forumCommentMany_createdBy | null;
}

export interface QueryForumCommentMany {
  forumCommentMany: QueryForumCommentMany_forumCommentMany[];
}

export interface QueryForumCommentManyVariables {
  userId: GraphQL_MongoID;
}
