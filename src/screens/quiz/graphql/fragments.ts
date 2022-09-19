import {gql} from '@apollo/client';

export const FRAGMENT_QUIZ_SESSION_BASE = gql`
  fragment FragmentQuizSessionBase on QuizSession {
    _id
    quizId
    createdAt
    questionIds
    questions {
      _id
      content
      hint
      note
      imageId
      image {
        url
      }
      answers {
        _id
        text
        isCorrect
        image {
          url
        }
      }
    }
  }
`;
