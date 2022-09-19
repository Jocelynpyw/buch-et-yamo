import {gql} from '@apollo/client';
import {FRAGMENT_QUIZ_SESSION_BASE} from './fragments';

export const MUTATION_QUIZ_CREATE_SESSION = gql`
  mutation MutationQuizCreateSession($record: CreateOneQuizSessionInput!) {
    quizSessionCreateOne(record: $record) {
      recordId
      record {
        ...FragmentQuizSessionBase
      }
    }
  }
  ${FRAGMENT_QUIZ_SESSION_BASE}
`;

export const QUESTION_CREATE_SESSION = gql`
  mutation MutationQuestionSessionCreateOne(
    $record: CreateOneQuestionSessionInput!
  ) {
    questionSessionCreateOne(record: $record) {
      record {
        questionId
      }
    }
  }
`;
