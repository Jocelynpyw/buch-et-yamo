import { gql } from '@apollo/client';

export const QUERY_POSTS_DETAILS = gql`
  query QueryPostsDetails($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
      id
      content
    }
  }
`;

export const QUERY_PAPERS = gql`
  query QueryPapers($catId: [String]!, $subId: [String]!) {
    posts(
      where: {
        taxQuery: {
          relation: AND
          taxArray: [
            { operator: AND, field: ID, taxonomy: CATEGORY, terms: $catId }
            { operator: AND, field: ID, taxonomy: CATEGORY, terms: $subId }
          ]
        }
      }
      first: 200
    ) {
      nodes {
        postId

        id
        title
        excerpt(format: RENDERED)
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`;
export const QUERY_SCHOOLS = gql`
  query QueryPapersShool($catId: [String]!, $subId: [String]!) {
    posts(
      where: {
        taxQuery: {
          relation: AND
          taxArray: [
            { operator: AND, field: ID, taxonomy: CATEGORY, terms: $catId }
            { operator: AND, field: ID, taxonomy: CATEGORY, terms: $subId }
          ]
        }
      }
      first: 100
    ) {
      nodes {
        postId

        id
        title
        content(format: RENDERED)

        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  }
`;
