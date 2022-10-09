/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnumCorrectionCategoryType } from "./../../../../globalTypes";

// ====================================================
// GraphQL query operation: QueryCorrectionLevelById
// ====================================================

export interface QueryCorrectionLevelById_correctionCategoryById_image {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface QueryCorrectionLevelById_correctionCategoryById_children_image {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface QueryCorrectionLevelById_correctionCategoryById_children_children_image {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface QueryCorrectionLevelById_correctionCategoryById_children_children {
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
  image: QueryCorrectionLevelById_correctionCategoryById_children_children_image | null;
}

export interface QueryCorrectionLevelById_correctionCategoryById_children {
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
  image: QueryCorrectionLevelById_correctionCategoryById_children_image | null;
  /**
   * Get all child categories of this category
   */
  children: QueryCorrectionLevelById_correctionCategoryById_children_children[];
}

export interface QueryCorrectionLevelById_correctionCategoryById {
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
  image: QueryCorrectionLevelById_correctionCategoryById_image | null;
  /**
   * Get all child categories of this category
   */
  children: QueryCorrectionLevelById_correctionCategoryById_children[];
}

export interface QueryCorrectionLevelById {
  correctionCategoryById: QueryCorrectionLevelById_correctionCategoryById | null;
}

export interface QueryCorrectionLevelByIdVariables {
  levelId: GraphQL_MongoID;
}
