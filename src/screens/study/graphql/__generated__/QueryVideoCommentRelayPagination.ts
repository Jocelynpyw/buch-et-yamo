/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FilterFindManyVideoCommentInput } from "./../../../../globalTypes";

// ====================================================
// GraphQL query operation: QueryVideoCommentRelayPagination
// ====================================================

export interface QueryVideoCommentRelayPagination_videoCommentRelayPagination_edges_node_createdBy_avatar {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface QueryVideoCommentRelayPagination_videoCommentRelayPagination_edges_node_createdBy {
  __typename: "User";
  name: string | null;
  avatar: QueryVideoCommentRelayPagination_videoCommentRelayPagination_edges_node_createdBy_avatar | null;
}

export interface QueryVideoCommentRelayPagination_videoCommentRelayPagination_edges_node {
  __typename: "VideoComment";
  _id: GraphQL_MongoID;
  content: string | null;
  createdAt: GraphQL_Date | null;
  /**
   * Created this Comment
   */
  createdBy: QueryVideoCommentRelayPagination_videoCommentRelayPagination_edges_node_createdBy | null;
}

export interface QueryVideoCommentRelayPagination_videoCommentRelayPagination_edges {
  __typename: "VideoCommentEdge";
  /**
   * A cursor for use in pagination
   */
  cursor: string;
  /**
   * The item at the end of the edge
   */
  node: QueryVideoCommentRelayPagination_videoCommentRelayPagination_edges_node;
}

export interface QueryVideoCommentRelayPagination_videoCommentRelayPagination_pageInfo {
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

export interface QueryVideoCommentRelayPagination_videoCommentRelayPagination {
  __typename: "VideoCommentConnection";
  /**
   * Information to aid in pagination.
   */
  edges: QueryVideoCommentRelayPagination_videoCommentRelayPagination_edges[];
  /**
   * Information to aid in pagination.
   */
  pageInfo: QueryVideoCommentRelayPagination_videoCommentRelayPagination_pageInfo;
}

export interface QueryVideoCommentRelayPagination {
  videoCommentRelayPagination: QueryVideoCommentRelayPagination_videoCommentRelayPagination | null;
}

export interface QueryVideoCommentRelayPaginationVariables {
  cursor?: string | null;
  filter?: FilterFindManyVideoCommentInput | null;
}
