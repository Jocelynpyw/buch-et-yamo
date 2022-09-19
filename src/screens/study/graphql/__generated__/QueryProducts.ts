/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryProducts
// ====================================================

export interface QueryProducts_products_nodes_VariableProduct_image {
  __typename: "MediaItem";
  /**
   * Url of the mediaItem
   */
  mediaItemUrl: string | null;
}

export interface QueryProducts_products_nodes_VariableProduct_productCategories_nodes {
  __typename: "ProductCategory";
  /**
   * The human friendly name of the object.
   */
  name: string | null;
}

export interface QueryProducts_products_nodes_VariableProduct_productCategories {
  __typename: "ProductToProductCategoryConnection";
  /**
   * The nodes of the connection, without the edges
   */
  nodes: (QueryProducts_products_nodes_VariableProduct_productCategories_nodes | null)[] | null;
}

export interface QueryProducts_products_nodes_VariableProduct {
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
  image: QueryProducts_products_nodes_VariableProduct_image | null;
  /**
   * Connection between the Product type and the productCategory type
   */
  productCategories: QueryProducts_products_nodes_VariableProduct_productCategories | null;
}

export interface QueryProducts_products_nodes_SimpleProduct_image {
  __typename: "MediaItem";
  /**
   * Url of the mediaItem
   */
  mediaItemUrl: string | null;
}

export interface QueryProducts_products_nodes_SimpleProduct_productCategories_nodes {
  __typename: "ProductCategory";
  /**
   * The human friendly name of the object.
   */
  name: string | null;
}

export interface QueryProducts_products_nodes_SimpleProduct_productCategories {
  __typename: "ProductToProductCategoryConnection";
  /**
   * The nodes of the connection, without the edges
   */
  nodes: (QueryProducts_products_nodes_SimpleProduct_productCategories_nodes | null)[] | null;
}

export interface QueryProducts_products_nodes_SimpleProduct {
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
  image: QueryProducts_products_nodes_SimpleProduct_image | null;
  /**
   * Connection between the Product type and the productCategory type
   */
  productCategories: QueryProducts_products_nodes_SimpleProduct_productCategories | null;
  /**
   * The globally unique identifier for the product
   */
  id: string;
  /**
   * Product&#039;s active price
   */
  price: string | null;
}

export type QueryProducts_products_nodes = QueryProducts_products_nodes_VariableProduct | QueryProducts_products_nodes_SimpleProduct;

export interface QueryProducts_products {
  __typename: "RootQueryToProductConnection";
  /**
   * The nodes of the connection, without the edges
   */
  nodes: (QueryProducts_products_nodes | null)[] | null;
}

export interface QueryProducts {
  /**
   * Connection between the RootQuery type and the Product type
   */
  products: QueryProducts_products | null;
}
