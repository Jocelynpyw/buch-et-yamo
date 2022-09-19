/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FilterFindManyForumPostInput } from "./../../../../globalTypes";

// ====================================================
// GraphQL query operation: QueryForumPostMany
// ====================================================

export interface QueryForumPostMany_forumPostMany_category {
  __typename: "ForumCategory";
  color: string;
  name: string;
  _id: GraphQL_MongoID;
}

export interface QueryForumPostMany_forumPostMany_createdBy_avatar {
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

export interface QueryForumPostMany_forumPostMany_createdBy {
  __typename: "User";
  name: string | null;
  avatar: QueryForumPostMany_forumPostMany_createdBy_avatar | null;
}

export interface QueryForumPostMany_forumPostMany_image {
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

export interface QueryForumPostMany_forumPostMany_vote {
  __typename: "ForumPostVote";
  /**
   * Voting a post can be of three states, 1 = upvote, 0 = cancelled vote, -1 = downVote
   */
  vote: number;
  _id: GraphQL_MongoID;
}

export interface QueryForumPostMany_forumPostMany {
  __typename: "ForumPost";
  _id: GraphQL_MongoID;
  title: string | null;
  content: string | null;
  /**
   * This Post's Category
   */
  category: QueryForumPostMany_forumPostMany_category | null;
  /**
   * Created this Post
   */
  createdBy: QueryForumPostMany_forumPostMany_createdBy | null;
  /**
   * Post's image, from imageId
   */
  image: QueryForumPostMany_forumPostMany_image | null;
  /**
   * Current users vote information
   */
  vote: QueryForumPostMany_forumPostMany_vote | null;
  upVotes: number | null;
  downVotes: number | null;
  commentCount: number | null;
  pinned: boolean | null;
  createdAt: GraphQL_Date | null;
}

export interface QueryForumPostMany {
  forumPostMany: QueryForumPostMany_forumPostMany[];
}

export interface QueryForumPostManyVariables {
  filter?: FilterFindManyForumPostInput | null;
}
