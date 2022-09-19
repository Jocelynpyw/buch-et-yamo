/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryForumPostPopular
// ====================================================

export interface QueryForumPostPopular_forumPostPopular_items_category {
  __typename: "ForumCategory";
  color: string;
  name: string;
  _id: GraphQL_MongoID;
}

export interface QueryForumPostPopular_forumPostPopular_items_createdBy_avatar {
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

export interface QueryForumPostPopular_forumPostPopular_items_createdBy {
  __typename: "User";
  name: string | null;
  avatar: QueryForumPostPopular_forumPostPopular_items_createdBy_avatar | null;
}

export interface QueryForumPostPopular_forumPostPopular_items_image {
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

export interface QueryForumPostPopular_forumPostPopular_items_vote {
  __typename: "ForumPostVote";
  /**
   * Voting a post can be of three states, 1 = upvote, 0 = cancelled vote, -1 = downVote
   */
  vote: number;
  _id: GraphQL_MongoID;
}

export interface QueryForumPostPopular_forumPostPopular_items {
  __typename: "ForumPost";
  _id: GraphQL_MongoID;
  title: string | null;
  content: string | null;
  /**
   * This Post's Category
   */
  category: QueryForumPostPopular_forumPostPopular_items_category | null;
  /**
   * Created this Post
   */
  createdBy: QueryForumPostPopular_forumPostPopular_items_createdBy | null;
  /**
   * Post's image, from imageId
   */
  image: QueryForumPostPopular_forumPostPopular_items_image | null;
  /**
   * Current users vote information
   */
  vote: QueryForumPostPopular_forumPostPopular_items_vote | null;
  upVotes: number | null;
  downVotes: number | null;
  commentCount: number | null;
  pinned: boolean | null;
  createdAt: GraphQL_Date | null;
}

export interface QueryForumPostPopular_forumPostPopular_pageInfo {
  __typename: "PaginationInfo";
  currentPage: number;
  perPage: number;
  pageCount: number | null;
  itemCount: number | null;
  hasNextPage: boolean | null;
  hasPreviousPage: boolean | null;
}

export interface QueryForumPostPopular_forumPostPopular {
  __typename: "ForumPostPagination";
  /**
   * Total object count.
   */
  count: number | null;
  /**
   * Array of objects.
   */
  items: QueryForumPostPopular_forumPostPopular_items[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: QueryForumPostPopular_forumPostPopular_pageInfo;
}

export interface QueryForumPostPopular {
  forumPostPopular: QueryForumPostPopular_forumPostPopular | null;
}

export interface QueryForumPostPopularVariables {
  page: number;
}
