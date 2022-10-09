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
      type
    }
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
    description
  }
`;

export const FRAGMENT_VIDEO_COMMENT_BASE = gql`
  fragment FragmentVideoCommentBase on VideoComment {
    _id
    content
    createdAt

    createdBy {
      name
      avatar {
        url
      }
    }
  }
`;
