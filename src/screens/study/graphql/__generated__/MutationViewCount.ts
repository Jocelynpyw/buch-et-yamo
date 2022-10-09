/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutationViewCount
// ====================================================

export interface MutationViewCount_videoIncViewCount {
  __typename: "Video";
  _id: GraphQL_MongoID;
}

export interface MutationViewCount {
  videoIncViewCount: (MutationViewCount_videoIncViewCount | null)[] | null;
}

export interface MutationViewCountVariables {
  videoId: GraphQL_MongoID;
}
