import { gql } from '@apollo/client';

export const QUERY_CATEGORY_BY_ID = gql`
  query QueryCategoryById($id: MongoID!) {
    categoryById(_id: $id) {
      _id
      name
      slug
      parentIds
      meta

      content
      children {
        _id
        name
        childrenIds
        children(limit: 1000) {
          name
          _id
          childrenIds
        }
      }
    }
  }
`;

export const QUERY_CATEGORY_MANY = gql`
  query QueryCategoryMany {
    categoryMany(limit: 10000) {
      _id
    }
  }
`;

export const QUERY_QUIZ_MANY = gql`
  query QueryQuizMany($id: FilterFindManyQuizInput!) {
    quizMany(filter: $id, sort: _ID_DESC) {
      _id
      title
      slug
      description
      questions {
        _id
      }
      metrics {
        questionCount
        quizSessionCount
      }
    }
  }
`;

export const QUIZ_MANY_QUERY = gql`
  query quizManyByCategoryId($filter: FilterFindManyQuizInput!) {
    quizMany(filter: $filter) {
      _id
      title
      slug
      meta
      description
      questions {
        _id
      }
      metrics {
        questionCount
        quizSessionCount
      }
    }
  }
`;

export const QUERY_COMPETITION_QUIZ_MANY = gql`
  query QueryQuizCompetitionMany {
    quizCompetitionMany(filter: { state: active }) {
      _id
      name
      quizIds
      description
    }
  }
`;
export const QUERY_QUIZ_LEADERBOARD = gql`
  query QueryQuizLeaderboard($quizId: MongoID!) {
    quizLeaderboard(quizId: $quizId, limit: 10) {
      rank

      score
      player {
        name
        avatar {
          url
        }

        _id
      }
    }
  }
`;
export const QUERY_QUIZ_TOP_PLAYER = gql`
  query QueryQuizTopPlayers($range: String) {
    quizTopPlayers(range: $range, limit: 20) {
      rank
      playCount

      player {
        name
        avatar {
          url
        }

        _id
      }
    }
  }
`;
