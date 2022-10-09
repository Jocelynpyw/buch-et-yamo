import { gql } from '@apollo/client';

export const FRAGMENT_CORRECTION_CATEGORY_BASE = gql`
  fragment FragmentCorrectionCategoryBase on CorrectionCategory {
    _id
    name
    type
    code
    description
    image {
      url
    }
  }
`;

export const FRAGMENT_CORRECTION_MEDIA_BASE = gql`
  fragment FragmentCorrectionMediaBase on CorrectionMedia {
    _id
    name
    mediaId
    featuredMedia {
      url
    }
    author {
      name
    }
    media {
      ext
      filename
      url
      type
    }
  }
`;

export const FRAGMENT_CORRECTION_SUBSCRIPTION = gql`
  fragment FragmentCorrectionSubscription on CorrectionSubscription {
    _id
    state
    userId
    bundleId
    expiresOn
    createdAt
    bundleVariant {
      price
      _id
    }
  }
`;
