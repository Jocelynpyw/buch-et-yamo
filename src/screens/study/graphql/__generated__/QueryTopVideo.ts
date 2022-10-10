/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnumMediaType } from "./../../../../globalTypes";

// ====================================================
// GraphQL query operation: QueryTopVideo
// ====================================================

export interface QueryTopVideo_videoTopTen_featuredImage {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface QueryTopVideo_videoTopTen_media_previwImage {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
  _id: GraphQL_MongoID;
  /**
   * Is true for hls conveted video.
   */
  isHLS: boolean | null;
}

export interface QueryTopVideo_videoTopTen_media {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
  /**
   * A 200x200 thumbnail version of the file if its an image
   */
  thumb: string | null;
  _id: GraphQL_MongoID;
  /**
   * Specify the file type, to know how to group, treat them before save.
   */
  type: EnumMediaType;
  /**
   * A 200x200 thumbnail version of the file if its an image
   */
  hlsUrl: string | null;
  previwImage: QueryTopVideo_videoTopTen_media_previwImage | null;
  /**
   * Is true for hls conveted video.
   */
  isHLS: boolean | null;
}

export interface QueryTopVideo_videoTopTen {
  __typename: "Video";
  /**
   * feture image
   */
  featuredImage: QueryTopVideo_videoTopTen_featuredImage | null;
  _id: GraphQL_MongoID;
  name: string;
  media: QueryTopVideo_videoTopTen_media | null;
  /**
   * The subject this video belongs to, category should be of type subject
   */
  subjectId: GraphQL_MongoID | null;
  /**
   * The number of view for the video
   */
  viewCount: number | null;
  description: string | null;
}

export interface QueryTopVideo {
  videoTopTen: (QueryTopVideo_videoTopTen | null)[] | null;
}

export interface QueryTopVideoVariables {
  startDate?: string | null;
  endDate?: string | null;
}
