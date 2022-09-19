/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateOneQuestionSessionInput } from "./../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: MutationQuestionSessionCreateOne
// ====================================================

export interface MutationQuestionSessionCreateOne_questionSessionCreateOne_record {
  __typename: "QuestionSession";
  /**
   * Id of this questions in the question bank
   */
  questionId: GraphQL_MongoID;
}

export interface MutationQuestionSessionCreateOne_questionSessionCreateOne {
  __typename: "CreateOneQuestionSessionPayload";
  /**
   * Created document
   */
  record: MutationQuestionSessionCreateOne_questionSessionCreateOne_record | null;
}

export interface MutationQuestionSessionCreateOne {
  /**
   * Create one document with mongoose defaults, setters, hooks and validation
   */
  questionSessionCreateOne: MutationQuestionSessionCreateOne_questionSessionCreateOne | null;
}

export interface MutationQuestionSessionCreateOneVariables {
  record: CreateOneQuestionSessionInput;
}
