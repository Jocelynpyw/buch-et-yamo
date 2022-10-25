/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateOneForumPostInput } from "./../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: MutationAddForumPost
// ====================================================

export interface MutationAddForumPost_forumPostCreateOne_record_category {
  __typename: "ForumCategory";
  color: string;
  name: string;
  _id: GraphQL_MongoID;
}

export interface MutationAddForumPost_forumPostCreateOne_record_createdBy_avatar {
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

export interface MutationAddForumPost_forumPostCreateOne_record_createdBy {
  __typename: "User";
  name: string | null;
  avatar: MutationAddForumPost_forumPostCreateOne_record_createdBy_avatar | null;
  _id: GraphQL_MongoID;
}

export interface MutationAddForumPost_forumPostCreateOne_record_image {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
  /**
   * A 200x200 thumbnail version of the file if its an image
   */
  thumb: string | null;
}

export interface MutationAddForumPost_forumPostCreateOne_record_vote {
  __typename: "ForumPostVote";
  /**
   * Voting a post can be of three states, 1 = upvote, 0 = cancelled vote, -1 = downVote
   */
  vote: number;
  _id: GraphQL_MongoID;
}

export interface MutationAddForumPost_forumPostCreateOne_record {
  __typename: "ForumPost";
  _id: GraphQL_MongoID;
  title: string | null;
  content: string | null;
  /**
   * This Post's Category
   */
  category: MutationAddForumPost_forumPostCreateOne_record_category | null;
  /**
   * Created this Post
   */
  createdBy: MutationAddForumPost_forumPostCreateOne_record_createdBy | null;
  /**
   * Post's image, from imageId
   */
  image: MutationAddForumPost_forumPostCreateOne_record_image | null;
  /**
   * Current users vote information
   */
  vote: MutationAddForumPost_forumPostCreateOne_record_vote | null;
  upVotes: number | null;
  downVotes: number | null;
  commentCount: number | null;
  pinned: boolean | null;
  createdAt: GraphQL_Date | null;
}

export interface MutationAddForumPost_forumPostCreateOne {
  __typename: "CreateOneForumPostPayload";
  /**
   * Document ID
   */
  recordId: GraphQL_MongoID | null;
  /**
   * Created document
   */
  record: MutationAddForumPost_forumPostCreateOne_record | null;
}

export interface MutationAddForumPost {
  /**
   * Create one document with mongoose defaults, setters, hooks and validation
   */
  forumPostCreateOne: MutationAddForumPost_forumPostCreateOne | null;
}

export interface MutationAddForumPostVariables {
  post: CreateOneForumPostInput;
}
