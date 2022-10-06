import { gql } from '@apollo/client';
import {
  FRAGMENT_CORRECTION_CATEGORY_BASE,
  FRAGMENT_CORRECTION_MEDIA_BASE,
  FRAGMENT_CORRECTION_SUBSCRIPTION,
} from './fragments';
import { FRAGMENT_PAGINATION_INFO } from '../../../config/graphql/fragments';

export const QUERY_CORRECTION_COUNTRY_MANY = gql`
  query QueryCorrectionCountryMany {
    correctionCategoryMany(filter: { type: country }) {
      ...FragmentCorrectionCategoryBase

      children {
        ...FragmentCorrectionCategoryBase
      }
    }
  }

  ${FRAGMENT_CORRECTION_CATEGORY_BASE}
`;

export const QUERY_CORRECTION_LEVEL_BY_ID = gql`
  query QueryCorrectionLevelById($levelId: MongoID!) {
    correctionCategoryById(_id: $levelId) {
      ...FragmentCorrectionCategoryBase

      # actual subjects
      children {
        ...FragmentCorrectionCategoryBase
        children {
          ...FragmentCorrectionCategoryBase
        }
      }
    }
  }

  ${FRAGMENT_CORRECTION_CATEGORY_BASE}
`;

export const QUERY_CORRECTION_SUBJECT_BY_ID = gql`
  query QueryCorrectionSubjectById($subjectId: MongoID!) {
    correctionCategoryById(_id: $subjectId) {
      ...FragmentCorrectionCategoryBase
    }

    correctionMediaMany(filter: { subjectId: $subjectId }) {
      ...FragmentCorrectionMediaBase
    }
  }

  ${FRAGMENT_CORRECTION_CATEGORY_BASE}
  ${FRAGMENT_CORRECTION_MEDIA_BASE}
`;

export const QUERY_CORRECTION_ANSWER_BY_ID = gql`
  query QueryCorrectionAnswerById($answerId: MongoID!) {
    correctionMediaById(_id: $answerId) {
      ...FragmentCorrectionMediaBase

      media {
        _id
        url
        ext
        type
      }
      subscription {
        _id
        expiresOn
      }

      subject {
        ...FragmentCorrectionCategoryBase
      }
    }
  }

  ${FRAGMENT_CORRECTION_CATEGORY_BASE}
  ${FRAGMENT_CORRECTION_MEDIA_BASE}
`;

export const QUERY_CORRECTION_ANSWER_BUNDLES = gql`
  query QueryCorrectionAnswerBundle(
    $page: Int!
    $answerId: MongoID!
    $subjectId: MongoID!
  ) {
    correctionBundlePagination(
      page: $page
      filter: {
        OR: [
          { _operators: { mediaIds: { in: [$answerId] } } }
          { _operators: { subjectIds: { in: [$subjectId] } } }
        ]
      }
      sort: _ID_DESC
    ) {
      items {
        _id
        name
      }

      pageInfo {
        ...FragmentPaginationInfo
      }
    }
  }

  ${FRAGMENT_PAGINATION_INFO}
`;

export const QUERY_CORRECTION_BUNDLE_BY_ID = gql`
  query QueryCorrectionBundleById($bundleId: MongoID!) {
    correctionBundleById(_id: $bundleId) {
      _id
      name
      features
      variants {
        price
        isStarter
        period {
          days
          months
          years
        }
      }
    }
  }
`;

export const QUERY_CORRECTION_USER_SUBSCRIPTIONS = gql`
  query QueryCorrectionUserSubscriptions(
    $userId: MongoID!
    $page: Int!
    $now: Date!
  ) {
    correctionSubscriptionPagination(
      page: $page
      filter: {
        userId: $userId
        _operators: { expiresOn: { gt: $now }, state: { in: [payed, draft] } }
      }
      sort: STATE_ASC
      perPage: 100
    ) {
      items {
        ...FragmentCorrectionSubscription

        bundle {
          name
        }
      }

      pageInfo {
        ...FragmentPaginationInfo
      }
    }
  }

  ${FRAGMENT_PAGINATION_INFO}
  ${FRAGMENT_CORRECTION_SUBSCRIPTION}
`;
export const QUERY_CORRECTION_USER_BUNDLE_SUBSCRIPTIONS = gql`
  query QueryCorrectionUserBundleSubscriptions(
    $userId: MongoID!
    $page: Int!
    $now: Date!
    $bundleId: MongoID!
  ) {
    correctionSubscriptionPagination(
      page: $page
      filter: {
        userId: $userId
        bundleId: $bundleId
        _operators: { expiresOn: { gt: $now }, state: { in: [payed, draft] } }
      }
      sort: STATE_ASC
      perPage: 100
    ) {
      items {
        ...FragmentCorrectionSubscription

        bundle {
          name
        }
      }

      pageInfo {
        ...FragmentPaginationInfo
      }
    }
  }

  ${FRAGMENT_PAGINATION_INFO}
  ${FRAGMENT_CORRECTION_SUBSCRIPTION}
`;

export const QUERY_CORRECTION_USER_SUBSCRIPTIONS_MANY = gql`
  query QueryCorrectionUserSubscriptionsMany($userId: MongoID!) {
    correctionSubscriptionPagination(
      page: 1
      filter: { userId: $userId }
      sort: _ID_DESC
    ) {
      items {
        ...FragmentCorrectionSubscription

        bundle {
          name
        }
      }

      pageInfo {
        ...FragmentPaginationInfo
      }
    }
  }

  ${FRAGMENT_PAGINATION_INFO}
  ${FRAGMENT_CORRECTION_SUBSCRIPTION}
`;
