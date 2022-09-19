/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryPapersShool
// ====================================================

export interface QueryPapersShool_posts_nodes_featuredImage_node {
  __typename: "MediaItem";
  /**
   * Url of the mediaItem
   */
  mediaItemUrl: string | null;
}

export interface QueryPapersShool_posts_nodes_featuredImage {
  __typename: "NodeWithFeaturedImageToMediaItemConnectionEdge";
  /**
   * The nodes of the connection, without the edges
   */
  node: QueryPapersShool_posts_nodes_featuredImage_node | null;
}

export interface QueryPapersShool_posts_nodes {
  __typename: "Post";
  /**
   * The id field matches the WP_Post-&gt;ID field.
   */
  postId: number;
  /**
   * The globally unique identifier of the post object.
   */
  id: string;
  /**
   * The title of the post. This is currently just the raw title. An amendment to support rendered title needs to be made.
   */
  title: string | null;
  /**
   * The content of the post.
   */
  content: string | null;
  /**
   * Connection between the NodeWithFeaturedImage type and the MediaItem type
   */
  featuredImage: QueryPapersShool_posts_nodes_featuredImage | null;
}

export interface QueryPapersShool_posts {
  __typename: "RootQueryToPostConnection";
  /**
   * The nodes of the connection, without the edges
   */
  nodes: (QueryPapersShool_posts_nodes | null)[] | null;
}

export interface QueryPapersShool {
  /**
   * Connection between the RootQuery type and the post type
   */
  posts: QueryPapersShool_posts | null;
}

export interface QueryPapersShoolVariables {
  catId: (string | null)[];
  subId: (string | null)[];
}
