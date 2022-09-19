/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: NotificationGetMany
// ====================================================

export interface NotificationGetMany_notificationFindMany_image {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface NotificationGetMany_notificationFindMany {
  __typename: "Notification";
  _id: GraphQL_MongoID;
  title: string;
  text: string;
  /**
   * page image, from media
   */
  image: NotificationGetMany_notificationFindMany_image | null;
  postId: GraphQL_MongoID | null;
  /**
   * id of a media image used for image
   */
  mediaId: GraphQL_MongoID | null;
  competitionId: GraphQL_MongoID | null;
  createdAt: GraphQL_Date | null;
}

export interface NotificationGetMany {
  notificationFindMany: (NotificationGetMany_notificationFindMany | null)[] | null;
}

export interface NotificationGetManyVariables {
  limit?: number | null;
}
