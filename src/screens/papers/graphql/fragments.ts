import {gql} from '@apollo/client';

export const FRAGMENT_SHARE_BASE = gql`
  fragment FragmentShareBase on Share {
    _id
    title
    mediaId
    media {
      url
      ext
    }
    createdAt
    createdBy {
      _id
      name
      email
      avatar {
        url
      }
    }
  }
`;
