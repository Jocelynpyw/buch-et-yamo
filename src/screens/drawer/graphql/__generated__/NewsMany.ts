/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NewsMany
// ====================================================

export interface NewsMany_newsMany_image {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface NewsMany_newsMany {
  __typename: "BlogNews";
  /**
   * feture image
   */
  image: NewsMany_newsMany_image | null;
  content: string | null;
  title: string;
  _id: GraphQL_MongoID;
  /**
   * Post slug, auto generated from the post title if not passed during create or update
   */
  slug: string;
  createdAt: GraphQL_Date | null;
}

export interface NewsMany {
  newsMany: NewsMany_newsMany[];
}
