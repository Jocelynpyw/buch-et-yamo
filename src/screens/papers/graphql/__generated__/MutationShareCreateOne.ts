/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateOneShareInput } from "./../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: MutationShareCreateOne
// ====================================================

export interface MutationShareCreateOne_ShareCreateOne_record_media {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
  /**
   * File extension since we will not be storing with filename
   */
  ext: string | null;
}

export interface MutationShareCreateOne_ShareCreateOne_record_createdBy_avatar {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface MutationShareCreateOne_ShareCreateOne_record_createdBy {
  __typename: "User";
  _id: GraphQL_MongoID;
  name: string | null;
  email: string | null;
  avatar: MutationShareCreateOne_ShareCreateOne_record_createdBy_avatar | null;
}

export interface MutationShareCreateOne_ShareCreateOne_record {
  __typename: "Share";
  _id: GraphQL_MongoID;
  title: string;
  /**
   * id of a media resource
   */
  mediaId: GraphQL_MongoID | null;
  media: MutationShareCreateOne_ShareCreateOne_record_media | null;
  createdAt: GraphQL_Date | null;
  /**
   * Created this Post
   */
  createdBy: MutationShareCreateOne_ShareCreateOne_record_createdBy | null;
}

export interface MutationShareCreateOne_ShareCreateOne {
  __typename: "CreateOneSharePayload";
  /**
   * Document ID
   */
  recordId: GraphQL_MongoID | null;
  /**
   * Created document
   */
  record: MutationShareCreateOne_ShareCreateOne_record | null;
}

export interface MutationShareCreateOne {
  /**
   * Create one document with mongoose defaults, setters, hooks and validation
   */
  ShareCreateOne: MutationShareCreateOne_ShareCreateOne | null;
}

export interface MutationShareCreateOneVariables {
  id: CreateOneShareInput;
}
