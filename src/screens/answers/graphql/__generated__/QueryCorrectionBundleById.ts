/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryCorrectionBundleById
// ====================================================

export interface QueryCorrectionBundleById_correctionBundleById_variants_period {
  __typename: "CorrectionBundleVariantsPeriod";
  days: number | null;
  months: number | null;
  years: number | null;
}

export interface QueryCorrectionBundleById_correctionBundleById_variants {
  __typename: "CorrectionBundleVariants";
  price: number;
  /**
   * Used in front end to mark this variant with the start word stand out
   */
  isStarter: boolean | null;
  /**
   * The validity period of this bundle variant.
   */
  period: QueryCorrectionBundleById_correctionBundleById_variants_period;
}

export interface QueryCorrectionBundleById_correctionBundleById {
  __typename: "CorrectionBundle";
  _id: GraphQL_MongoID;
  name: string;
  /**
   * A list of text describing what is in stock
   */
  features: (string | null)[] | null;
  /**
   * Price to Period variants of this bundle.
   */
  variants: (QueryCorrectionBundleById_correctionBundleById_variants | null)[] | null;
}

export interface QueryCorrectionBundleById {
  correctionBundleById: QueryCorrectionBundleById_correctionBundleById | null;
}

export interface QueryCorrectionBundleByIdVariables {
  bundleId: GraphQL_MongoID;
}
