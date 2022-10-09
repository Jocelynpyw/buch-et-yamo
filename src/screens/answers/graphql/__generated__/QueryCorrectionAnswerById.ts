/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnumMediaType, EnumCorrectionCategoryType } from "./../../../../globalTypes";

// ====================================================
// GraphQL query operation: QueryCorrectionAnswerById
// ====================================================

export interface QueryCorrectionAnswerById_correctionMediaById_featuredMedia {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface QueryCorrectionAnswerById_correctionMediaById_author {
  __typename: "User";
  name: string | null;
}

export interface QueryCorrectionAnswerById_correctionMediaById_media {
  __typename: "Media";
  /**
   * File extension since we will not be storing with filename
   */
  ext: string | null;
  /**
   * File name as received set by user before uploading or sent in the mutation record
   */
  filename: string | null;
  /**
   * Url to the file in question.
   */
  url: string;
  /**
   * Specify the file type, to know how to group, treat them before save.
   */
  type: EnumMediaType;
  _id: GraphQL_MongoID;
}

export interface QueryCorrectionAnswerById_correctionMediaById_subscription {
  __typename: "CorrectionSubscription";
  _id: GraphQL_MongoID;
  /**
   * A DateTime when this subscription expires.
   */
  expiresOn: GraphQL_Date;
}

export interface QueryCorrectionAnswerById_correctionMediaById_subject_image {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface QueryCorrectionAnswerById_correctionMediaById_subject {
  __typename: "CorrectionCategory";
  _id: GraphQL_MongoID;
  name: string;
  /**
   * Category type, all top levels is a country -> mid level -> base - subject
   */
  type: EnumCorrectionCategoryType;
  /**
   * If its a country, then its code (e.g. cm), level its code (e.g. 7000 A/L), subject code 5110
   */
  code: string | null;
  description: string | null;
  image: QueryCorrectionAnswerById_correctionMediaById_subject_image | null;
}

export interface QueryCorrectionAnswerById_correctionMediaById {
  __typename: "CorrectionMedia";
  _id: GraphQL_MongoID;
  name: string;
  /**
   * The actual Media to use, could be an image, document or video
   */
  mediaId: GraphQL_MongoID;
  /**
   * Correction's featured Image
   */
  featuredMedia: QueryCorrectionAnswerById_correctionMediaById_featuredMedia | null;
  /**
   * Author of this media
   */
  author: QueryCorrectionAnswerById_correctionMediaById_author | null;
  /**
   * Correction's media, from imageId
   */
  media: QueryCorrectionAnswerById_correctionMediaById_media | null;
  /**
   * Gets a subscription with the highest expiresOn value.
   */
  subscription: QueryCorrectionAnswerById_correctionMediaById_subscription | null;
  /**
   * This Media's subject
   */
  subject: QueryCorrectionAnswerById_correctionMediaById_subject | null;
}

export interface QueryCorrectionAnswerById {
  correctionMediaById: QueryCorrectionAnswerById_correctionMediaById | null;
}

export interface QueryCorrectionAnswerByIdVariables {
  answerId: GraphQL_MongoID;
}
