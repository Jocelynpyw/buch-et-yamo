/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FragmentNotificationBase
// ====================================================

export interface FragmentNotificationBase_image {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface FragmentNotificationBase {
  __typename: "Notification";
  _id: GraphQL_MongoID;
  title: string;
  text: string;
  /**
   * page image, from media
   */
  image: FragmentNotificationBase_image | null;
  postId: GraphQL_MongoID | null;
  /**
   * id of a media image used for image
   */
  mediaId: GraphQL_MongoID | null;
  competitionId: GraphQL_MongoID | null;
  createdAt: GraphQL_Date | null;
}
