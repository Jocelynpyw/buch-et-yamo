/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FragmentForumPostBaseDetails
// ====================================================

export interface FragmentForumPostBaseDetails_vote {
  __typename: "ForumPostVote";
  /**
   * Voting a post can be of three states, 1 = upvote, 0 = cancelled vote, -1 = downVote
   */
  vote: number;
  _id: GraphQL_MongoID;
}

export interface FragmentForumPostBaseDetails_image {
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

export interface FragmentForumPostBaseDetails_category {
  __typename: "ForumCategory";
  name: string;
  color: string;
}

export interface FragmentForumPostBaseDetails_createdBy_avatar {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface FragmentForumPostBaseDetails_createdBy {
  __typename: "User";
  name: string | null;
  avatar: FragmentForumPostBaseDetails_createdBy_avatar | null;
  _id: GraphQL_MongoID;
}

export interface FragmentForumPostBaseDetails {
  __typename: "ForumPost";
  _id: GraphQL_MongoID;
  title: string | null;
  content: string | null;
  pinned: boolean | null;
  upVotes: number | null;
  downVotes: number | null;
  commentCount: number | null;
  createdAt: GraphQL_Date | null;
  /**
   * Current users vote information
   */
  vote: FragmentForumPostBaseDetails_vote | null;
  /**
   * Post's image, from imageId
   */
  image: FragmentForumPostBaseDetails_image | null;
  /**
   * This Post's Category
   */
  category: FragmentForumPostBaseDetails_category | null;
  /**
   * Created this Post
   */
  createdBy: FragmentForumPostBaseDetails_createdBy | null;
}
