import { gql } from '@apollo/client';
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
