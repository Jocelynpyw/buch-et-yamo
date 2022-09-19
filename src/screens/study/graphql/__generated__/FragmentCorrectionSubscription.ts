/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnumCorrectionSubscriptionState } from "./../../../../globalTypes";

// ====================================================
// GraphQL fragment: FragmentCorrectionSubscription
// ====================================================

export interface FragmentCorrectionSubscription {
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
}
