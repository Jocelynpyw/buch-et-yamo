/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryVideoSubscription
// ====================================================

export interface QueryVideoSubscription_VideoById_subscription {
  __typename: "CorrectionSubscription";
  /**
   * A DateTime when this subscription expires.
   */
  expiresOn: GraphQL_Date;
  _id: GraphQL_MongoID;
}

export interface QueryVideoSubscription_VideoById {
  __typename: "Video";
  /**
   * The subject this video belongs to, category should be of type subject
   */
  subjectId: GraphQL_MongoID | null;
  /**
   * The number of view for the video
   */
  viewCount: number | null;
  description: string | null;
  /**
   * Gets a subscription with the highest expiresOn value.
   */
  subscription: QueryVideoSubscription_VideoById_subscription | null;
}

export interface QueryVideoSubscription {
  VideoById: QueryVideoSubscription_VideoById | null;
}

export interface QueryVideoSubscriptionVariables {
  id: GraphQL_MongoID;
}
