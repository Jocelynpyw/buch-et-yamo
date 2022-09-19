/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FilterFindManyQuizInput } from "./../../../../globalTypes";

// ====================================================
// GraphQL query operation: quizManyByCategoryId
// ====================================================

export interface quizManyByCategoryId_quizMany_questions {
  __typename: "Question";
  _id: GraphQL_MongoID;
}

export interface quizManyByCategoryId_quizMany_metrics {
  __typename: "QuizMetrics";
  /**
   * Total number of questions in this quiz
   */
  questionCount: number;
  /**
   * Total number of times this quiz has been played.
   */
  quizSessionCount: number | null;
}

export interface quizManyByCategoryId_quizMany {
  __typename: "Quiz";
  _id: GraphQL_MongoID;
  title: string;
  /**
   * Post slug, auto generated from the post title if not passed during create or update
   */
  slug: string;
  meta: string | null;
  description: string | null;
  questions: quizManyByCategoryId_quizMany_questions[];
  metrics: quizManyByCategoryId_quizMany_metrics | null;
}

export interface quizManyByCategoryId {
  quizMany: quizManyByCategoryId_quizMany[];
}

export interface quizManyByCategoryIdVariables {
  filter: FilterFindManyQuizInput;
}
