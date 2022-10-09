/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FragmentNewsBase
// ====================================================

export interface FragmentNewsBase_image {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface FragmentNewsBase {
  __typename: "BlogNews";
  /**
   * feture image
   */
  image: FragmentNewsBase_image | null;
  content: string | null;
  title: string;
  _id: GraphQL_MongoID;
  createdAt: GraphQL_Date | null;
}
