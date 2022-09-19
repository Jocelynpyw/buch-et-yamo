/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryForumPostById
// ====================================================

export interface QueryForumPostById_forumPostById_category {
  __typename: "ForumCategory";
  color: string;
  name: string;
  _id: GraphQL_MongoID;
}

export interface QueryForumPostById_forumPostById_createdBy_avatar {
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

export interface QueryForumPostById_forumPostById_createdBy {
  __typename: "User";
  name: string | null;
  avatar: QueryForumPostById_forumPostById_createdBy_avatar | null;
}

export interface QueryForumPostById_forumPostById_image {
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

export interface QueryForumPostById_forumPostById_vote {
  __typename: "ForumPostVote";
  /**
   * Voting a post can be of three states, 1 = upvote, 0 = cancelled vote, -1 = downVote
   */
  vote: number;
  _id: GraphQL_MongoID;
}

export interface QueryForumPostById_forumPostById {
  __typename: "ForumPost";
  _id: GraphQL_MongoID;
  title: string | null;
  content: string | null;
  /**
   * This Post's Category
   */
  category: QueryForumPostById_forumPostById_category | null;
  /**
   * Created this Post
   */
  createdBy: QueryForumPostById_forumPostById_createdBy | null;
  /**
   * Post's image, from imageId
   */
  image: QueryForumPostById_forumPostById_image | null;
  /**
   * Current users vote information
   */
  vote: QueryForumPostById_forumPostById_vote | null;
  upVotes: number | null;
  downVotes: number | null;
  commentCount: number | null;
  pinned: boolean | null;
  createdAt: GraphQL_Date | null;
}

export interface QueryForumPostById {
  forumPostById: QueryForumPostById_forumPostById | null;
}

export interface QueryForumPostByIdVariables {
  id: GraphQL_MongoID;
}
