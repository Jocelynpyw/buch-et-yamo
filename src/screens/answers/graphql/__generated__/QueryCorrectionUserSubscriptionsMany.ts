/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnumCorrectionSubscriptionState } from "./../../../../globalTypes";

// ====================================================
// GraphQL query operation: QueryCorrectionUserSubscriptionsMany
// ====================================================

export interface QueryCorrectionUserSubscriptionsMany_correctionSubscriptionPagination_items_bundle {
  __typename: "CorrectionBundle";
  name: string;
}

export interface QueryCorrectionUserSubscriptionsMany_correctionSubscriptionPagination_items {
  __typename: "CorrectionSubscription";
  _id: GraphQL_MongoID;
  state: EnumCorrectionSubscriptionState;
  userId: GraphQL_MongoID;
  bundleId: GraphQL_MongoID;
  /**
   * A DateTime when this subscription expires.
   */
  expiresOn: GraphQL_Date;
  createdAt: GraphQL_Date | null;
  /**
   * The bundle this subscription was created from
   */
  bundle: QueryCorrectionUserSubscriptionsMany_correctionSubscriptionPagination_items_bundle | null;
}

export interface QueryCorrectionUserSubscriptionsMany_correctionSubscriptionPagination_pageInfo {
  __typename: "PaginationInfo";
  currentPage: number;
  perPage: number;
  pageCount: number | null;
  itemCount: number | null;
  hasNextPage: boolean | null;
  hasPreviousPage: boolean | null;
}

export interface QueryCorrectionUserSubscriptionsMany_correctionSubscriptionPagination {
  __typename: "CorrectionSubscriptionPagination";
  /**
   * Array of objects.
   */
  items: QueryCorrectionUserSubscriptionsMany_correctionSubscriptionPagination_items[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: QueryCorrectionUserSubscriptionsMany_correctionSubscriptionPagination_pageInfo;
}

export interface QueryCorrectionUserSubscriptionsMany {
  correctionSubscriptionPagination: QueryCorrectionUserSubscriptionsMany_correctionSubscriptionPagination | null;
}

export interface QueryCorrectionUserSubscriptionsManyVariables {
  userId: GraphQL_MongoID;
}
