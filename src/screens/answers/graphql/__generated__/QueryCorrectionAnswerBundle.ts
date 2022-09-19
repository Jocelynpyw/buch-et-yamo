/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryCorrectionAnswerBundle
// ====================================================

export interface QueryCorrectionAnswerBundle_correctionBundlePagination_items {
  __typename: "CorrectionBundle";
  _id: GraphQL_MongoID;
  name: string;
}

export interface QueryCorrectionAnswerBundle_correctionBundlePagination_pageInfo {
  __typename: "PaginationInfo";
  currentPage: number;
  perPage: number;
  pageCount: number | null;
  itemCount: number | null;
  hasNextPage: boolean | null;
  hasPreviousPage: boolean | null;
}

export interface QueryCorrectionAnswerBundle_correctionBundlePagination {
  __typename: "CorrectionBundlePagination";
  /**
   * Array of objects.
   */
  items: QueryCorrectionAnswerBundle_correctionBundlePagination_items[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: QueryCorrectionAnswerBundle_correctionBundlePagination_pageInfo;
}

export interface QueryCorrectionAnswerBundle {
  correctionBundlePagination: QueryCorrectionAnswerBundle_correctionBundlePagination | null;
}

export interface QueryCorrectionAnswerBundleVariables {
  page: number;
  answerId: GraphQL_MongoID;
  subjectId: GraphQL_MongoID;
}
