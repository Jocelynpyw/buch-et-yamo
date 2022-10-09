/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryTopVideo
// ====================================================

export interface QueryTopVideo_videoTopTen_featuredImage {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface QueryTopVideo_videoTopTen {
  __typename: "Video";
  name: string;
  description: string | null;
  _id: GraphQL_MongoID;
  /**
   * feture image
   */
  featuredImage: QueryTopVideo_videoTopTen_featuredImage | null;
}

export interface QueryTopVideo {
  videoTopTen: (QueryTopVideo_videoTopTen | null)[] | null;
}

export interface QueryTopVideoVariables {
  startDate?: string | null;
  endDate?: string | null;
}
