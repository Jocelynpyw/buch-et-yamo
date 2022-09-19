/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryProductsCategories
// ====================================================

export interface QueryProductsCategories_productCategories_nodes {
  __typename: "ProductCategory";
  /**
   * The human friendly name of the object.
   */
  name: string | null;
  /**
   * The globally unique ID for the object
   */
  id: string;
}

export interface QueryProductsCategories_productCategories {
  __typename: "RootQueryToProductCategoryConnection";
  /**
   * The nodes of the connection, without the edges
   */
  nodes: (QueryProductsCategories_productCategories_nodes | null)[] | null;
}

export interface QueryProductsCategories {
  /**
   * Connection between the RootQuery type and the productCategory type
   */
  productCategories: QueryProductsCategories_productCategories | null;
}
