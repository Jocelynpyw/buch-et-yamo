/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnumCorrectionCategoryType } from "./../../../../globalTypes";

// ====================================================
// GraphQL query operation: QueryCorrectionCountryMany
// ====================================================

export interface QueryCorrectionCountryMany_correctionCategoryMany_children {
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
}

export interface QueryCorrectionCountryMany_correctionCategoryMany {
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
  /**
   * Get all child categories of this category
   */
  children: QueryCorrectionCountryMany_correctionCategoryMany_children[];
}

export interface QueryCorrectionCountryMany {
  correctionCategoryMany: QueryCorrectionCountryMany_correctionCategoryMany[];
}
