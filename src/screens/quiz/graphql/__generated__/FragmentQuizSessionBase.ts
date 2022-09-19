/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FragmentQuizSessionBase
// ====================================================

export interface FragmentQuizSessionBase_questions_image {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface FragmentQuizSessionBase_questions_answers_image {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface FragmentQuizSessionBase_questions_answers {
  __typename: "QuestionAnswers";
  _id: GraphQL_MongoID | null;
  /**
   * Text displayed.
   */
  text: string | null;
  /**
   * Will be true if this answer makes the question correct
   */
  isCorrect: boolean;
  image: FragmentQuizSessionBase_questions_answers_image | null;
}

export interface FragmentQuizSessionBase_questions {
  __typename: "Question";
  _id: GraphQL_MongoID;
  content: string;
  hint: string | null;
  note: string | null;
  /**
   * id of a media image resource to be used when displaying question.
   */
  imageId: GraphQL_MongoID | null;
  image: FragmentQuizSessionBase_questions_image | null;
  /**
   * Answers to this question, could be more than one.
   */
  answers: (FragmentQuizSessionBase_questions_answers | null)[] | null;
}

export interface FragmentQuizSessionBase {
  __typename: "QuizSession";
  _id: GraphQL_MongoID;
  quizId: GraphQL_MongoID;
  createdAt: GraphQL_Date | null;
  questionIds: (GraphQL_MongoID | null)[] | null;
  /**
   * Questions as seen in question bank.
   */
  questions: FragmentQuizSessionBase_questions[];
}
