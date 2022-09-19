/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryProductsRecommendation
// ====================================================

export interface QueryProductsRecommendation_products_nodes_VariableProduct_image {
  __typename: "MediaItem";
  /**
   * Url of the mediaItem
   */
  mediaItemUrl: string | null;
}

export interface QueryProductsRecommendation_products_nodes_VariableProduct_productCategories_nodes {
  __typename: "ProductCategory";
  /**
   * The human friendly name of the object.
   */
  name: string | null;
}

export interface QueryProductsRecommendation_products_nodes_VariableProduct_productCategories {
  __typename: "ProductToProductCategoryConnection";
  /**
   * The nodes of the connection, without the edges
   */
  nodes: (QueryProductsRecommendation_products_nodes_VariableProduct_productCategories_nodes | null)[] | null;
}

export interface QueryProductsRecommendation_products_nodes_VariableProduct {
  __typename: "VariableProduct" | "ExternalProduct" | "GroupProduct";
  /**
   * Product description
   */
  description: string | null;
  /**
   * Product name
   */
  name: string | null;
  /**
   * The Id of the order. Equivalent to WP_Post->ID
   */
  productId: number | null;
  /**
   * Main image
   */
  image: QueryProductsRecommendation_products_nodes_VariableProduct_image | null;
  /**
   * Connection between the Product type and the productCategory type
   */
  productCategories: QueryProductsRecommendation_products_nodes_VariableProduct_productCategories | null;
}

export interface QueryProductsRecommendation_products_nodes_SimpleProduct_image {
  __typename: "MediaItem";
  /**
   * Url of the mediaItem
   */
  mediaItemUrl: string | null;
}

export interface QueryProductsRecommendation_products_nodes_SimpleProduct_productCategories_nodes {
  __typename: "ProductCategory";
  /**
   * The human friendly name of the object.
   */
  name: string | null;
}

export interface QueryProductsRecommendation_products_nodes_SimpleProduct_productCategories {
  __typename: "ProductToProductCategoryConnection";
  /**
   * The nodes of the connection, without the edges
   */
  nodes: (QueryProductsRecommendation_products_nodes_SimpleProduct_productCategories_nodes | null)[] | null;
}

export interface QueryProductsRecommendation_products_nodes_SimpleProduct {
  __typename: "SimpleProduct";
  /**
   * Product description
   */
  description: string | null;
  /**
   * Product name
   */
  name: string | null;
  /**
   * The Id of the order. Equivalent to WP_Post-&gt;ID
   */
  productId: number | null;
  /**
   * Main image
   */
  image: QueryProductsRecommendation_products_nodes_SimpleProduct_image | null;
  /**
   * Connection between the Product type and the productCategory type
   */
  productCategories: QueryProductsRecommendation_products_nodes_SimpleProduct_productCategories | null;
  /**
   * The globally unique identifier for the product
   */
  id: string;
  /**
   * Product&#039;s active price
   */
  price: string | null;
}

export type QueryProductsRecommendation_products_nodes = QueryProductsRecommendation_products_nodes_VariableProduct | QueryProductsRecommendation_products_nodes_SimpleProduct;

export interface QueryProductsRecommendation_products {
  __typename: "RootQueryToProductConnection";
  /**
   * The nodes of the connection, without the edges
   */
  nodes: (QueryProductsRecommendation_products_nodes | null)[] | null;
}

export interface QueryProductsRecommendation {
  /**
   * Connection between the RootQuery type and the Product type
   */
  products: QueryProductsRecommendation_products | null;
}

export interface QueryProductsRecommendationVariables {
  productId: (number | null)[];
}
