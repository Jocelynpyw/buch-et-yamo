/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryForumPostManyUser
// ====================================================

export interface QueryForumPostManyUser_forumPostMany_category {
  __typename: "ForumCategory";
  color: string;
  name: string;
  _id: GraphQL_MongoID;
}

export interface QueryForumPostManyUser_forumPostMany_createdBy_avatar {
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

export interface QueryForumPostManyUser_forumPostMany_createdBy {
  __typename: "User";
  name: string | null;
  avatar: QueryForumPostManyUser_forumPostMany_createdBy_avatar | null;
  _id: GraphQL_MongoID;
}

export interface QueryForumPostManyUser_forumPostMany_image {
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

export interface QueryForumPostManyUser_forumPostMany_vote {
  __typename: "ForumPostVote";
  /**
   * Voting a post can be of three states, 1 = upvote, 0 = cancelled vote, -1 = downVote
   */
  vote: number;
  _id: GraphQL_MongoID;
}

export interface QueryForumPostManyUser_forumPostMany {
  __typename: "ForumPost";
  _id: GraphQL_MongoID;
  title: string | null;
  content: string | null;
  /**
   * This Post's Category
   */
  category: QueryForumPostManyUser_forumPostMany_category | null;
  /**
   * Created this Post
   */
  createdBy: QueryForumPostManyUser_forumPostMany_createdBy | null;
  /**
   * Post's image, from imageId
   */
  image: QueryForumPostManyUser_forumPostMany_image | null;
  /**
   * Current users vote information
   */
  vote: QueryForumPostManyUser_forumPostMany_vote | null;
  upVotes: number | null;
  downVotes: number | null;
  commentCount: number | null;
  pinned: boolean | null;
  createdAt: GraphQL_Date | null;
}

export interface QueryForumPostManyUser {
  forumPostMany: QueryForumPostManyUser_forumPostMany[];
}

export interface QueryForumPostManyUserVariables {
  userId: GraphQL_MongoID;
}
