/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryQuizCompetitionMany
// ====================================================

export interface QueryQuizCompetitionMany_quizCompetitionMany {
  __typename: "QuizCompetition";
  _id: GraphQL_MongoID;
  name: string;
  /**
   * Quizzes available on this competition
   */
  quizIds: (GraphQL_MongoID | null)[] | null;
  description: string | null;
}

export interface QueryQuizCompetitionMany {
  quizCompetitionMany: QueryQuizCompetitionMany_quizCompetitionMany[];
}
