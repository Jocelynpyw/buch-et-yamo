/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FilterFindManyQuizInput } from "./../../../../globalTypes";

// ====================================================
// GraphQL query operation: QueryQuizMany
// ====================================================

export interface QueryQuizMany_quizMany_questions {
  __typename: "Question";
  _id: GraphQL_MongoID;
}

export interface QueryQuizMany_quizMany_metrics {
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

export interface QueryQuizMany_quizMany {
  __typename: "Quiz";
  _id: GraphQL_MongoID;
  title: string;
  /**
   * Post slug, auto generated from the post title if not passed during create or update
   */
  slug: string;
  description: string | null;
  questions: QueryQuizMany_quizMany_questions[];
  metrics: QueryQuizMany_quizMany_metrics | null;
}

export interface QueryQuizMany {
  quizMany: QueryQuizMany_quizMany[];
}

export interface QueryQuizManyVariables {
  id: FilterFindManyQuizInput;
}
