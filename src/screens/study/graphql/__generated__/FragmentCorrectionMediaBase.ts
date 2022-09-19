/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FragmentCorrectionMediaBase
// ====================================================

export interface FragmentCorrectionMediaBase_featuredMedia {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface FragmentCorrectionMediaBase_author {
  __typename: "User";
  name: string | null;
}

export interface FragmentCorrectionMediaBase_media {
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

export interface FragmentCorrectionMediaBase {
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
  featuredMedia: FragmentCorrectionMediaBase_featuredMedia | null;
  /**
   * Author of this media
   */
  author: FragmentCorrectionMediaBase_author | null;
  /**
   * Correction's media, from imageId
   */
  media: FragmentCorrectionMediaBase_media | null;
}
