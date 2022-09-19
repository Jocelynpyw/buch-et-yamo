/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateOneForumPostInput } from "./../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: MutationAddPost
// ====================================================

export interface MutationAddPost_forumPostCreateOne_record_category {
  __typename: "ForumCategory";
  color: string;
  name: string;
  _id: GraphQL_MongoID;
}

export interface MutationAddPost_forumPostCreateOne_record_createdBy_avatar {
  __typename: "Media";
  /**
   * A 200x200 thumbnail version of the file if its an image
   */
  thumb: string | null;
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface MutationAddPost_forumPostCreateOne_record_createdBy {
  __typename: "User";
  name: string | null;
  avatar: MutationAddPost_forumPostCreateOne_record_createdBy_avatar | null;
}

export interface MutationAddPost_forumPostCreateOne_record {
  __typename: "ForumPost";
  _id: GraphQL_MongoID;
  title: string | null;
  content: string | null;
  /**
   * This Post's Category
   */
  category: MutationAddPost_forumPostCreateOne_record_category | null;
  /**
   * Created this Post
   */
  createdBy: MutationAddPost_forumPostCreateOne_record_createdBy | null;
  upVotes: number | null;
  downVotes: number | null;
  pinned: boolean | null;
  createdAt: GraphQL_Date | null;
}

export interface MutationAddPost_forumPostCreateOne {
  __typename: "CreateOneForumPostPayload";
  /**
   * Document ID
   */
  recordId: GraphQL_MongoID | null;
  /**
   * Created document
   */
  record: MutationAddPost_forumPostCreateOne_record | null;
}

export interface MutationAddPost {
  /**
   * Create one document with mongoose defaults, setters, hooks and validation
   */
  forumPostCreateOne: MutationAddPost_forumPostCreateOne | null;
}

export interface MutationAddPostVariables {
  post: CreateOneForumPostInput;
}
