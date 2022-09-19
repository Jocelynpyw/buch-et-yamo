/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryQuizLeaderboard
// ====================================================

export interface QueryQuizLeaderboard_quizLeaderboard_player_avatar {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface QueryQuizLeaderboard_quizLeaderboard_player {
  __typename: "User";
  name: string | null;
  avatar: QueryQuizLeaderboard_quizLeaderboard_player_avatar | null;
  _id: GraphQL_MongoID;
}

export interface QueryQuizLeaderboard_quizLeaderboard {
  __typename: "QuizLeaderEntry";
  rank: number;
  score: number;
  /**
   * The said player with this score
   */
  player: QueryQuizLeaderboard_quizLeaderboard_player | null;
}

export interface QueryQuizLeaderboard {
  quizLeaderboard: (QueryQuizLeaderboard_quizLeaderboard | null)[] | null;
}

export interface QueryQuizLeaderboardVariables {
  quizId: GraphQL_MongoID;
}
