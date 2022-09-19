import { gql } from '@apollo/client';

export const FRAGMENT_NOTIFICATION_BASE = gql`
  fragment FragmentNotificationBase on Notification {
    _id
    title
    text
    image {
      url
    }
    postId
    mediaId
    competitionId
    createdAt
  }
`;
export const FRAGMENT_NEWS_BASE = gql`
  fragment FragmentNewsBase on BlogNews {
    image {
      url
    }
    content
    title
    _id
    slug
    createdAt
  }
`;
