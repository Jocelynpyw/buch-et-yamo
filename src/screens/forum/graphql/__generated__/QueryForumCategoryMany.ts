/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryForumCategoryMany
// ====================================================

export interface QueryForumCategoryMany_forumCategoryMany {
  __typename: "ForumCategory";
  _id: GraphQL_MongoID;
  name: string;
}

export interface QueryForumCategoryMany {
  forumCategoryMany: QueryForumCategoryMany_forumCategoryMany[];
}
