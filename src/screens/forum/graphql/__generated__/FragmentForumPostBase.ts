/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FragmentForumPostBase
// ====================================================

export interface FragmentForumPostBase_category {
  __typename: "ForumCategory";
  color: string;
  name: string;
  _id: GraphQL_MongoID;
}

export interface FragmentForumPostBase_createdBy_avatar {
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

export interface FragmentForumPostBase_createdBy {
  __typename: "User";
  name: string | null;
  avatar: FragmentForumPostBase_createdBy_avatar | null;
}

export interface FragmentForumPostBase_image {
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

export interface FragmentForumPostBase_vote {
  __typename: "ForumPostVote";
  /**
   * Voting a post can be of three states, 1 = upvote, 0 = cancelled vote, -1 = downVote
   */
  vote: number;
  _id: GraphQL_MongoID;
}

export interface FragmentForumPostBase {
  __typename: "ForumPost";
  _id: GraphQL_MongoID;
  title: string | null;
  content: string | null;
  /**
   * This Post's Category
   */
  category: FragmentForumPostBase_category | null;
  /**
   * Created this Post
   */
  createdBy: FragmentForumPostBase_createdBy | null;
  /**
   * Post's image, from imageId
   */
  image: FragmentForumPostBase_image | null;
  /**
   * Current users vote information
   */
  vote: FragmentForumPostBase_vote | null;
  upVotes: number | null;
  downVotes: number | null;
  commentCount: number | null;
  pinned: boolean | null;
  createdAt: GraphQL_Date | null;
}
