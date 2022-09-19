/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryQuizTopPlayers
// ====================================================

export interface QueryQuizTopPlayers_quizTopPlayers_player_avatar {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface QueryQuizTopPlayers_quizTopPlayers_player {
  __typename: "User";
  name: string | null;
  avatar: QueryQuizTopPlayers_quizTopPlayers_player_avatar | null;
  _id: GraphQL_MongoID;
}

export interface QueryQuizTopPlayers_quizTopPlayers {
  __typename: "QuizTopPlayerEntry";
  rank: number;
  playCount: number;
  /**
   * The said player with this playCount
   */
  player: QueryQuizTopPlayers_quizTopPlayers_player | null;
}

export interface QueryQuizTopPlayers {
  quizTopPlayers: (QueryQuizTopPlayers_quizTopPlayers | null)[] | null;
}

export interface QueryQuizTopPlayersVariables {
  range?: string | null;
}
