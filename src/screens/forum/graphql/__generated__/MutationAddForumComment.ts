/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateOneForumCommentInput } from "./../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: MutationAddForumComment
// ====================================================

export interface MutationAddForumComment_forumCommentCreateOne_record_image {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface MutationAddForumComment_forumCommentCreateOne_record_document {
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

export interface MutationAddForumComment_forumCommentCreateOne_record_createdBy_avatar {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface MutationAddForumComment_forumCommentCreateOne_record_createdBy {
  __typename: "User";
  name: string | null;
  avatar: MutationAddForumComment_forumCommentCreateOne_record_createdBy_avatar | null;
  _id: GraphQL_MongoID;
}

export interface MutationAddForumComment_forumCommentCreateOne_record {
  __typename: "ForumComment";
  _id: GraphQL_MongoID;
  content: string | null;
  createdAt: GraphQL_Date | null;
  /**
   * Comment's image, from imageId
   */
  image: MutationAddForumComment_forumCommentCreateOne_record_image | null;
  /**
   * Comment's document, from documentId
   */
  document: MutationAddForumComment_forumCommentCreateOne_record_document | null;
  /**
   * Created this Comment
   */
  createdBy: MutationAddForumComment_forumCommentCreateOne_record_createdBy | null;
}

export interface MutationAddForumComment_forumCommentCreateOne {
  __typename: "CreateOneForumCommentPayload";
  /**
   * Document ID
   */
  recordId: GraphQL_MongoID | null;
  /**
   * Created document
   */
  record: MutationAddForumComment_forumCommentCreateOne_record | null;
}

export interface MutationAddForumComment {
  /**
   * Create one document with mongoose defaults, setters, hooks and validation
   */
  forumCommentCreateOne: MutationAddForumComment_forumCommentCreateOne | null;
}

export interface MutationAddForumCommentVariables {
  comment: CreateOneForumCommentInput;
}
