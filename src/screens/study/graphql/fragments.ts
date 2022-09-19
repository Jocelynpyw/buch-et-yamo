import { gql } from '@apollo/client';

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
  }
`;
export const FRAGMENT_VIDEO = gql`
  fragment FragmentVideo on Video {
    _id
    name
    media {
      url
      thumb
      _id
      type
      hlsUrl
      previwImage {
        url
        _id
        isHLS
      }
      isHLS
    }
    subjectId
    viewCount
  }
`;
