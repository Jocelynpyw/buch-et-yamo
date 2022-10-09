/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnumCorrectionSubscriptionState } from "./../../../../globalTypes";

// ====================================================
// GraphQL query operation: QueryCorrectionUserSubscriptions
// ====================================================

export interface QueryCorrectionUserSubscriptions_correctionSubscriptionPagination_items_bundleVariant {
  __typename: "CorrectionBundleVariants";
  price: number;
  _id: GraphQL_MongoID | null;
}

export interface QueryCorrectionUserSubscriptions_correctionSubscriptionPagination_items_bundle {
  __typename: "CorrectionBundle";
  name: string;
}

export interface QueryCorrectionUserSubscriptions_correctionSubscriptionPagination_items {
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
  bundleVariant: QueryCorrectionUserSubscriptions_correctionSubscriptionPagination_items_bundleVariant;
  /**
   * The bundle this subscription was created from
   */
  bundle: QueryCorrectionUserSubscriptions_correctionSubscriptionPagination_items_bundle | null;
}

export interface QueryCorrectionUserSubscriptions_correctionSubscriptionPagination_pageInfo {
  __typename: "PaginationInfo";
  currentPage: number;
  perPage: number;
  pageCount: number | null;
  itemCount: number | null;
  hasNextPage: boolean | null;
  hasPreviousPage: boolean | null;
}

export interface QueryCorrectionUserSubscriptions_correctionSubscriptionPagination {
  __typename: "CorrectionSubscriptionPagination";
  /**
   * Array of objects.
   */
  items: QueryCorrectionUserSubscriptions_correctionSubscriptionPagination_items[] | null;
  /**
   * Information to aid in pagination.
   */
  pageInfo: QueryCorrectionUserSubscriptions_correctionSubscriptionPagination_pageInfo;
}

export interface QueryCorrectionUserSubscriptions {
  correctionSubscriptionPagination: QueryCorrectionUserSubscriptions_correctionSubscriptionPagination | null;
}

export interface QueryCorrectionUserSubscriptionsVariables {
  userId: GraphQL_MongoID;
  page: number;
  now: GraphQL_Date;
}
