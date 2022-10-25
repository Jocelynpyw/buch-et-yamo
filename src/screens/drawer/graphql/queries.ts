import { gql } from '@apollo/client';
import {
  FRAGMENT_FORUM_COMMENT_BASE,
  FRAGMENT_FORUM_POST_BASE,
} from '@KwSrc/screens/forum/graphql/fragments';
import { FRAGMENT_NEWS_BASE, FRAGMENT_NOTIFICATION_BASE } from './fragments';

export const QUERY_NOTIFICATION_GET_MANY = gql`
  query NotificationGetMany($limit: Int) {
    notificationFindMany(limit: $limit) {
      ...FragmentNotificationBase
    }
  }

  ${FRAGMENT_NOTIFICATION_BASE}
`;
export const QUERY_NEWS_GET_MANY = gql`
  query NewsMany {
    newsMany(limit: 20) {
      ...FragmentNewsBase
    }
  }

  ${FRAGMENT_NEWS_BASE}
`;

export const QUERY_USERS_INFO = gql`
  query QueryUsersInformation($userId: MongoID!) {
    userById(_id: $userId) {
      _id
      email
      phone
      username
      name
      dob
      avatar {
        url
      }
      createdAt
      metrics {
        questions
        answers
      }
    }
  }
`;

export const QUERY_FORUM_COMMENT_MANY = gql`
  query QueryForumCommentMany($userId: MongoID!) {
    forumCommentMany(filter: { createdById: $userId }) {
      ...FragmentForumCommentBase
    }
  }

  ${FRAGMENT_FORUM_COMMENT_BASE}
`;
export const QUERY_FORUM_POST_MANY = gql`
  query QueryForumPostManyUser($userId: MongoID!) {
    forumPostMany(filter: { createdById: $userId }) {
      ...FragmentForumPostBase
    }
  }

  ${FRAGMENT_FORUM_POST_BASE}
`;
