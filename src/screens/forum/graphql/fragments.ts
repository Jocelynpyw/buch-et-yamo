import { gql } from '@apollo/client';

export const FRAGMENT_FORUM_POST_BASE = gql`
  fragment FragmentForumPostBase on ForumPost {
    _id
    title
    content
    category {
      color
      name
      _id
    }
    createdBy {
      name
      avatar {
        thumb
        url
      }
    }
    image {
      url
      thumb
    }
    vote {
      vote
      _id
    }
    upVotes
    downVotes
    commentCount
    pinned
    createdAt
  }
`;

export const FRAGMENT_FORUM_POST_BASE_DETAILS = gql`
  fragment FragmentForumPostBaseDetails on ForumPost {
    _id
    title
    content
    pinned
    upVotes
    downVotes

    commentCount
    createdAt
    vote {
      vote
      _id
    }
    image {
      url
      thumb
    }
    category {
      name
      color
    }
    createdBy {
      name
      avatar {
        url
      }
    }
  }
`;

export const FRAGMENT_FORUM_COMMENT_BASE = gql`
  fragment FragmentForumCommentBase on ForumComment {
    _id
    content
    createdAt
    image {
      url
    }

    document {
      url
      filename
    }
    createdBy {
      name
      avatar {
        url
      }
    }
  }
`;

export const FRAGMENT_FORUM_CATEGORY_BASE = gql`
  fragment FragmentForumCategoryBase on ForumCategory {
    _id
    name
  }
`;
