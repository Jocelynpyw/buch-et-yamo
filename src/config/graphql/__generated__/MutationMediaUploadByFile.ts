/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UploadByFileMediaInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: MutationMediaUploadByFile
// ====================================================

export interface MutationMediaUploadByFile_mediaUploadByFile_record {
  __typename: "Media";
  _id: GraphQL_MongoID;
}

export interface MutationMediaUploadByFile_mediaUploadByFile {
  __typename: "CreateOneMediaPayload";
  /**
   * Document ID
   */
  recordId: GraphQL_MongoID | null;
  /**
   * Created document
   */
  record: MutationMediaUploadByFile_mediaUploadByFile_record | null;
}

export interface MutationMediaUploadByFile {
  /**
   * Create one document with mongoose defaults, setters, hooks and validation
   */
  mediaUploadByFile: MutationMediaUploadByFile_mediaUploadByFile | null;
}

export interface MutationMediaUploadByFileVariables {
  record: UploadByFileMediaInput;
}
