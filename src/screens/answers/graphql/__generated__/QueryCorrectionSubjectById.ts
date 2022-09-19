/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnumCorrectionCategoryType } from "./../../../../globalTypes";

// ====================================================
// GraphQL query operation: QueryCorrectionSubjectById
// ====================================================

export interface QueryCorrectionSubjectById_correctionCategoryById_image {
  __typename: "Media";
  _id: GraphQL_MongoID;
  /**
   * Is true for items like profile image, to provide filtering out these media in Libraries.
   */
  isPrivate: boolean | null;
  /**
   * Is true for hls conveted video.
   */
  isHLS: boolean | null;
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface QueryCorrectionSubjectById_correctionCategoryById {
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
  image: QueryCorrectionSubjectById_correctionCategoryById_image | null;
}

export interface QueryCorrectionSubjectById_correctionMediaMany_featuredMedia {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface QueryCorrectionSubjectById_correctionMediaMany_author {
  __typename: "User";
  name: string | null;
}

export interface QueryCorrectionSubjectById_correctionMediaMany_media {
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
}

export interface QueryCorrectionSubjectById_correctionMediaMany {
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
  featuredMedia: QueryCorrectionSubjectById_correctionMediaMany_featuredMedia | null;
  /**
   * Author of this media
   */
  author: QueryCorrectionSubjectById_correctionMediaMany_author | null;
  /**
   * Correction's media, from imageId
   */
  media: QueryCorrectionSubjectById_correctionMediaMany_media | null;
}

export interface QueryCorrectionSubjectById {
  correctionCategoryById: QueryCorrectionSubjectById_correctionCategoryById | null;
  correctionMediaMany: QueryCorrectionSubjectById_correctionMediaMany[];
}

export interface QueryCorrectionSubjectByIdVariables {
  subjectId: GraphQL_MongoID;
}
