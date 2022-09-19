/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FragmentShareBase
// ====================================================

export interface FragmentShareBase_media {
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

export interface FragmentShareBase_createdBy_avatar {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface FragmentShareBase_createdBy {
  __typename: "User";
  _id: GraphQL_MongoID;
  name: string | null;
  email: string | null;
  avatar: FragmentShareBase_createdBy_avatar | null;
}

export interface FragmentShareBase {
  __typename: "Share";
  _id: GraphQL_MongoID;
  title: string;
  /**
   * id of a media resource
   */
  mediaId: GraphQL_MongoID | null;
  media: FragmentShareBase_media | null;
  createdAt: GraphQL_Date | null;
  /**
   * Created this Post
   */
  createdBy: FragmentShareBase_createdBy | null;
}
