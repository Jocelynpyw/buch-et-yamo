/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryForumPostPaginationRelay
// ====================================================

export interface QueryForumPostPaginationRelay_forumPostPaginationRelay_edges_node_category {
  __typename: "ForumCategory";
  color: string;
  name: string;
  _id: GraphQL_MongoID;
}

export interface QueryForumPostPaginationRelay_forumPostPaginationRelay_edges_node_createdBy_avatar {
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

export interface QueryForumPostPaginationRelay_forumPostPaginationRelay_edges_node_createdBy {
  __typename: "User";
  name: string | null;
  avatar: QueryForumPostPaginationRelay_forumPostPaginationRelay_edges_node_createdBy_avatar | null;
  _id: GraphQL_MongoID;
}

export interface QueryForumPostPaginationRelay_forumPostPaginationRelay_edges_node_image {
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

export interface QueryForumPostPaginationRelay_forumPostPaginationRelay_edges_node_vote {
  __typename: "ForumPostVote";
  /**
   * Voting a post can be of three states, 1 = upvote, 0 = cancelled vote, -1 = downVote
   */
  vote: number;
  _id: GraphQL_MongoID;
}

export interface QueryForumPostPaginationRelay_forumPostPaginationRelay_edges_node {
  __typename: "ForumPost";
  _id: GraphQL_MongoID;
  title: string | null;
  content: string | null;
  /**
   * This Post's Category
   */
  category: QueryForumPostPaginationRelay_forumPostPaginationRelay_edges_node_category | null;
  /**
   * Created this Post
   */
  createdBy: QueryForumPostPaginationRelay_forumPostPaginationRelay_edges_node_createdBy | null;
  /**
   * Post's image, from imageId
   */
  image: QueryForumPostPaginationRelay_forumPostPaginationRelay_edges_node_image | null;
  /**
   * Current users vote information
   */
  vote: QueryForumPostPaginationRelay_forumPostPaginationRelay_edges_node_vote | null;
  upVotes: number | null;
  downVotes: number | null;
  commentCount: number | null;
  pinned: boolean | null;
  createdAt: GraphQL_Date | null;
}

export interface QueryForumPostPaginationRelay_forumPostPaginationRelay_edges {
  __typename: "ForumPostEdge";
  /**
   * A cursor for use in pagination
   */
  cursor: string;
  /**
   * The item at the end of the edge
   */
  node: QueryForumPostPaginationRelay_forumPostPaginationRelay_edges_node;
}

export interface QueryForumPostPaginationRelay_forumPostPaginationRelay_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface QueryForumPostPaginationRelay_forumPostPaginationRelay {
  __typename: "ForumPostConnection";
  /**
   * Information to aid in pagination.
   */
  edges: QueryForumPostPaginationRelay_forumPostPaginationRelay_edges[];
  /**
   * Information to aid in pagination.
   */
  pageInfo: QueryForumPostPaginationRelay_forumPostPaginationRelay_pageInfo;
}

export interface QueryForumPostPaginationRelay {
  forumPostPaginationRelay: QueryForumPostPaginationRelay_forumPostPaginationRelay | null;
}

export interface QueryForumPostPaginationRelayVariables {
  after?: string | null;
}
