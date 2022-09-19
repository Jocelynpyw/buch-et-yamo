/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QuerySharePagination
// ====================================================

export interface QuerySharePagination_SharePagination_items_media {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
  /**
   * File extension since we will not be storing with filename
   */
  ext: string | null;
}

export interface QuerySharePagination_SharePagination_items_createdBy_avatar {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface QuerySharePagination_SharePagination_items_createdBy {
  __typename: "User";
  _id: GraphQL_MongoID;
  name: string | null;
  email: string | null;
  avatar: QuerySharePagination_SharePagination_items_createdBy_avatar | null;
}

export interface QuerySharePagination_SharePagination_items {
  __typename: "Share";
  _id: GraphQL_MongoID;
  title: string;
  /**
   * id of a media resource
   */
  mediaId: GraphQL_MongoID | null;
  media: QuerySharePagination_SharePagination_items_media | null;
  createdAt: GraphQL_Date | null;
  /**
   * Created this Post
   */
  createdBy: QuerySharePagination_SharePagination_items_createdBy | null;
}

export interface QuerySharePagination_SharePagination_pageInfo {
  __typename: "PaginationInfo";
  currentPage: number;
  perPage: number;
  pageCount: number | null;
  itemCount: number | null;
  hasNextPage: boolean | null;
  hasPreviousPage: boolean | null;
}

export interface QuerySharePagination_SharePagination {
  __typename: "SharePagination";
  /**
   * Total object count.
   */
  count: number | null;
  /**
   * Array of objects.
   */
  items: QuerySharePagination_SharePagination_items[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: QuerySharePagination_SharePagination_pageInfo;
}

export interface QuerySharePagination {
  SharePagination: QuerySharePagination_SharePagination | null;
}

export interface QuerySharePaginationVariables {
  page: number;
}
