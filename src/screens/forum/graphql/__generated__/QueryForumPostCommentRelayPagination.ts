/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FilterFindManyForumCommentInput } from "./../../../../globalTypes";

// ====================================================
// GraphQL query operation: QueryForumPostCommentRelayPagination
// ====================================================

export interface QueryForumPostCommentRelayPagination_forumCommentPaginationRelay_edges_node_image {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface QueryForumPostCommentRelayPagination_forumCommentPaginationRelay_edges_node_document {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
  /**
   * File name as received set by user before uploading or sent in the mutation record
   */
  filename: string | null;
}

export interface QueryForumPostCommentRelayPagination_forumCommentPaginationRelay_edges_node_createdBy_avatar {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface QueryForumPostCommentRelayPagination_forumCommentPaginationRelay_edges_node_createdBy {
  __typename: "User";
  name: string | null;
  avatar: QueryForumPostCommentRelayPagination_forumCommentPaginationRelay_edges_node_createdBy_avatar | null;
}

export interface QueryForumPostCommentRelayPagination_forumCommentPaginationRelay_edges_node {
  __typename: "ForumComment";
  _id: GraphQL_MongoID;
  content: string | null;
  createdAt: GraphQL_Date | null;
  /**
   * Comment's image, from imageId
   */
  image: QueryForumPostCommentRelayPagination_forumCommentPaginationRelay_edges_node_image | null;
  /**
   * Comment's document, from documentId
   */
  document: QueryForumPostCommentRelayPagination_forumCommentPaginationRelay_edges_node_document | null;
  /**
   * Created this Comment
   */
  createdBy: QueryForumPostCommentRelayPagination_forumCommentPaginationRelay_edges_node_createdBy | null;
}

export interface QueryForumPostCommentRelayPagination_forumCommentPaginationRelay_edges {
  __typename: "ForumCommentEdge";
  /**
   * A cursor for use in pagination
   */
  cursor: string;
  /**
   * The item at the end of the edge
   */
  node: QueryForumPostCommentRelayPagination_forumCommentPaginationRelay_edges_node;
}

export interface QueryForumPostCommentRelayPagination_forumCommentPaginationRelay_pageInfo {
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

export interface QueryForumPostCommentRelayPagination_forumCommentPaginationRelay {
  __typename: "ForumCommentConnection";
  /**
   * Information to aid in pagination.
   */
  edges: QueryForumPostCommentRelayPagination_forumCommentPaginationRelay_edges[];
  /**
   * Information to aid in pagination.
   */
  pageInfo: QueryForumPostCommentRelayPagination_forumCommentPaginationRelay_pageInfo;
}

export interface QueryForumPostCommentRelayPagination {
  forumCommentPaginationRelay: QueryForumPostCommentRelayPagination_forumCommentPaginationRelay | null;
}

export interface QueryForumPostCommentRelayPaginationVariables {
  cursor?: string | null;
  filter?: FilterFindManyForumCommentInput | null;
}
