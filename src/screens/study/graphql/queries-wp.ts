import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query QueryProducts {
    products(first: 100) {
      nodes {
        description(format: RENDERED)
        name
        productId

        image {
          mediaItemUrl
        }
        productCategories {
          nodes {
            name
          }
        }
        ... on SimpleProduct {
          id
          name

          price(format: FORMATTED)
        }
      }
    }
  }
`;

export const QUERY_PRODUCTS_RECOMMENDATION = gql`
  query QueryProductsRecommendation($productId: [Int]!) {
    products(where: { exclude: $productId }, first: 100) {
      nodes {
        description(format: RENDERED)
        name
        productId

        image {
          mediaItemUrl
        }
        productCategories {
          nodes {
            name
          }
        }
        ... on SimpleProduct {
          id
          name

          price(format: FORMATTED)
        }
      }
    }
  }
`;

export const QUERY_PRODUCTS_CATEGORIES = gql`
  query QueryProductsCategories {
    productCategories {
      nodes {
        name
        id
      }
    }
  }
`;

export const QUERY_NOTES = gql`
  query QueryNotes($catId: [String]!, $subId: [String]!) {
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

export const QUERY_NOTES_DETAILS = gql`
  query QueryNotesDetails($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
      id
      content
    }
  }
`;
