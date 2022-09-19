/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryCategoryById
// ====================================================

export interface QueryCategoryById_categoryById_children_children {
  __typename: "Category";
  name: string;
  _id: GraphQL_MongoID;
  /**
   * Get all child category ids of this category
   */
  childrenIds: (GraphQL_MongoID | null)[] | null;
}

export interface QueryCategoryById_categoryById_children {
  __typename: "Category";
  _id: GraphQL_MongoID;
  name: string;
  /**
   * Get all child category ids of this category
   */
  childrenIds: (GraphQL_MongoID | null)[] | null;
  /**
   * Get all child categories of this category
   */
  children: QueryCategoryById_categoryById_children_children[];
}

export interface QueryCategoryById_categoryById {
  __typename: "Category";
  _id: GraphQL_MongoID;
  name: string;
  /**
   * Category slug, auto generated from the category name if not passed during create or update
   */
  slug: string;
  parentIds: (GraphQL_MongoID | null)[] | null;
  meta: string | null;
  content: string | null;
  /**
   * Get all child categories of this category
   */
  children: QueryCategoryById_categoryById_children[];
}

export interface QueryCategoryById {
  categoryById: QueryCategoryById_categoryById | null;
}

export interface QueryCategoryByIdVariables {
  id: GraphQL_MongoID;
}
