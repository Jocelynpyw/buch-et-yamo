/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateOneQuizSessionInput } from "./../../../../globalTypes";

// ====================================================
// GraphQL mutation operation: MutationQuizCreateSession
// ====================================================

export interface MutationQuizCreateSession_quizSessionCreateOne_record_questions_image {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface MutationQuizCreateSession_quizSessionCreateOne_record_questions_answers_image {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface MutationQuizCreateSession_quizSessionCreateOne_record_questions_answers {
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
  image: MutationQuizCreateSession_quizSessionCreateOne_record_questions_answers_image | null;
}

export interface MutationQuizCreateSession_quizSessionCreateOne_record_questions {
  __typename: "Question";
  _id: GraphQL_MongoID;
  content: string;
  hint: string | null;
  note: string | null;
  /**
   * id of a media image resource to be used when displaying question.
   */
  imageId: GraphQL_MongoID | null;
  image: MutationQuizCreateSession_quizSessionCreateOne_record_questions_image | null;
  /**
   * Answers to this question, could be more than one.
   */
  answers: (MutationQuizCreateSession_quizSessionCreateOne_record_questions_answers | null)[] | null;
}

export interface MutationQuizCreateSession_quizSessionCreateOne_record {
  __typename: "QuizSession";
  _id: GraphQL_MongoID;
  quizId: GraphQL_MongoID;
  createdAt: GraphQL_Date | null;
  questionIds: (GraphQL_MongoID | null)[] | null;
  /**
   * Questions as seen in question bank.
   */
  questions: MutationQuizCreateSession_quizSessionCreateOne_record_questions[];
}

export interface MutationQuizCreateSession_quizSessionCreateOne {
  __typename: "CreateOneQuizSessionPayload";
  /**
   * Document ID
   */
  recordId: GraphQL_MongoID | null;
  /**
   * Created document
   */
  record: MutationQuizCreateSession_quizSessionCreateOne_record | null;
}

export interface MutationQuizCreateSession {
  /**
   * Create one document with mongoose defaults, setters, hooks and validation
   */
  quizSessionCreateOne: MutationQuizCreateSession_quizSessionCreateOne | null;
}

export interface MutationQuizCreateSessionVariables {
  record: CreateOneQuizSessionInput;
}
