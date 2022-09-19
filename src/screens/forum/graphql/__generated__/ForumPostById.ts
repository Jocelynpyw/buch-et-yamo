/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ForumPostById
// ====================================================

export interface ForumPostById_forumPostById_category {
  __typename: "ForumCategory";
  name: string;
  color: string;
}

export interface ForumPostById_forumPostById_createdBy_avatar {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface ForumPostById_forumPostById_createdBy {
  __typename: "User";
  name: string | null;
  avatar: ForumPostById_forumPostById_createdBy_avatar | null;
}

export interface ForumPostById_forumPostById {
  __typename: "ForumPost";
  _id: GraphQL_MongoID;
  title: string | null;
  content: string | null;
  pinned: boolean | null;
  upVotes: number | null;
  commentCount: number | null;
  createdAt: GraphQL_Date | null;
  /**
   * This Post's Category
   */
  category: ForumPostById_forumPostById_category | null;
  /**
   * Created this Post
   */
  createdBy: ForumPostById_forumPostById_createdBy | null;
}

export interface ForumPostById {
  forumPostById: ForumPostById_forumPostById | null;
}

export interface ForumPostByIdVariables {
  id: GraphQL_MongoID;
}
