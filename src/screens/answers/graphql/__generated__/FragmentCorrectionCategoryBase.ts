/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnumCorrectionCategoryType } from "./../../../../globalTypes";

// ====================================================
// GraphQL fragment: FragmentCorrectionCategoryBase
// ====================================================

export interface FragmentCorrectionCategoryBase_image {
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

export interface FragmentCorrectionCategoryBase {
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
  image: FragmentCorrectionCategoryBase_image | null;
}
