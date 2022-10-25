/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Category type, all top levels is a country -> mid level -> base - subject
 */
export enum EnumCorrectionCategoryType {
  country = "country",
  level = "level",
  subject = "subject",
}

export enum EnumCorrectionSubscriptionState {
  cancelled = "cancelled",
  draft = "draft",
  payed = "payed",
}

/**
 * Specify the file type, to know how to group, treat them before save.
 */
export enum EnumMediaType {
  Stream = "Stream",
  document = "document",
  image = "image",
  video = "video",
}

export interface CreateOneForumCommentInput {
  content?: string | null;
  postId: GraphQL_MongoID;
  _id?: GraphQL_MongoID | null;
  image?: GraphQL_Upload | null;
  document?: GraphQL_Upload | null;
}

export interface CreateOneForumPostInput {
  title?: string | null;
  content?: string | null;
  categoryId?: GraphQL_MongoID | null;
  pinned?: boolean | null;
  createdById: GraphQL_MongoID;
  image?: GraphQL_Upload | null;
}

export interface CreateOneQuestionSessionInput {
  quizSessionId: GraphQL_MongoID;
  questionId: GraphQL_MongoID;
  answers?: (QuestionSessionAnswersInput | null)[] | null;
}

export interface CreateOneQuizSessionInput {
  quizId: GraphQL_MongoID;
  competitionId?: GraphQL_MongoID | null;
  playerId?: (GraphQL_MongoID | null)[] | null;
}

export interface CreateOneShareInput {
  title: string;
  mediaId?: GraphQL_MongoID | null;
  createdById?: GraphQL_MongoID | null;
  updatedById?: GraphQL_MongoID | null;
  updatedAt?: GraphQL_Date | null;
  createdAt?: GraphQL_Date | null;
}

export interface CreateOneVideoCommentInput {
  content?: string | null;
  videoId: GraphQL_MongoID;
  _id?: GraphQL_MongoID | null;
  image?: GraphQL_Upload | null;
}

export interface FilterFindManyForumCommentCreatedByIdOperatorsInput {
  gt?: GraphQL_MongoID | null;
  gte?: GraphQL_MongoID | null;
  lt?: GraphQL_MongoID | null;
  lte?: GraphQL_MongoID | null;
  ne?: GraphQL_MongoID | null;
  in?: (GraphQL_MongoID | null)[] | null;
  nin?: (GraphQL_MongoID | null)[] | null;
  exists?: boolean | null;
}

export interface FilterFindManyForumCommentInput {
  content?: string | null;
  postId?: GraphQL_MongoID | null;
  imageId?: GraphQL_MongoID | null;
  documentId?: GraphQL_MongoID | null;
  createdById?: GraphQL_MongoID | null;
  _id?: GraphQL_MongoID | null;
  updatedAt?: GraphQL_Date | null;
  createdAt?: GraphQL_Date | null;
  _operators?: FilterFindManyForumCommentOperatorsInput | null;
  OR?: FilterFindManyForumCommentInput[] | null;
  AND?: FilterFindManyForumCommentInput[] | null;
}

/**
 * For performance reason this type contains only *indexed* fields.
 */
export interface FilterFindManyForumCommentOperatorsInput {
  postId?: FilterFindManyForumCommentPostIdOperatorsInput | null;
  createdById?: FilterFindManyForumCommentCreatedByIdOperatorsInput | null;
  _id?: FilterFindManyForumComment_idOperatorsInput | null;
}

export interface FilterFindManyForumCommentPostIdOperatorsInput {
  gt?: GraphQL_MongoID | null;
  gte?: GraphQL_MongoID | null;
  lt?: GraphQL_MongoID | null;
  lte?: GraphQL_MongoID | null;
  ne?: GraphQL_MongoID | null;
  in?: (GraphQL_MongoID | null)[] | null;
  nin?: (GraphQL_MongoID | null)[] | null;
  exists?: boolean | null;
}

export interface FilterFindManyForumComment_idOperatorsInput {
  gt?: GraphQL_MongoID | null;
  gte?: GraphQL_MongoID | null;
  lt?: GraphQL_MongoID | null;
  lte?: GraphQL_MongoID | null;
  ne?: GraphQL_MongoID | null;
  in?: (GraphQL_MongoID | null)[] | null;
  nin?: (GraphQL_MongoID | null)[] | null;
  exists?: boolean | null;
}

export interface FilterFindManyForumPostCreatedByIdOperatorsInput {
  gt?: GraphQL_MongoID | null;
  gte?: GraphQL_MongoID | null;
  lt?: GraphQL_MongoID | null;
  lte?: GraphQL_MongoID | null;
  ne?: GraphQL_MongoID | null;
  in?: (GraphQL_MongoID | null)[] | null;
  nin?: (GraphQL_MongoID | null)[] | null;
  exists?: boolean | null;
}

export interface FilterFindManyForumPostInput {
  title?: string | null;
  content?: string | null;
  categoryId?: GraphQL_MongoID | null;
  pinned?: boolean | null;
  createdById?: GraphQL_MongoID | null;
  _id?: GraphQL_MongoID | null;
  _operators?: FilterFindManyForumPostOperatorsInput | null;
  OR?: FilterFindManyForumPostInput[] | null;
  AND?: FilterFindManyForumPostInput[] | null;
}

/**
 * For performance reason this type contains only *indexed* fields.
 */
export interface FilterFindManyForumPostOperatorsInput {
  createdById?: FilterFindManyForumPostCreatedByIdOperatorsInput | null;
  _id?: FilterFindManyForumPost_idOperatorsInput | null;
}

export interface FilterFindManyForumPost_idOperatorsInput {
  gt?: GraphQL_MongoID | null;
  gte?: GraphQL_MongoID | null;
  lt?: GraphQL_MongoID | null;
  lte?: GraphQL_MongoID | null;
  ne?: GraphQL_MongoID | null;
  in?: (GraphQL_MongoID | null)[] | null;
  nin?: (GraphQL_MongoID | null)[] | null;
  exists?: boolean | null;
}

export interface FilterFindManyQuizCategoryIdOperatorsInput {
  gt?: GraphQL_MongoID | null;
  gte?: GraphQL_MongoID | null;
  lt?: GraphQL_MongoID | null;
  lte?: GraphQL_MongoID | null;
  ne?: GraphQL_MongoID | null;
  in?: (GraphQL_MongoID | null)[] | null;
  nin?: (GraphQL_MongoID | null)[] | null;
  exists?: boolean | null;
}

export interface FilterFindManyQuizInput {
  title?: string | null;
  description?: string | null;
  slug?: string | null;
  meta?: string | null;
  keywords?: (string | null)[] | null;
  categoryId?: GraphQL_MongoID | null;
  questionIds?: (GraphQL_MongoID | null)[] | null;
  createdById?: GraphQL_MongoID | null;
  updatedById?: GraphQL_MongoID | null;
  _id?: GraphQL_MongoID | null;
  updatedAt?: GraphQL_Date | null;
  createdAt?: GraphQL_Date | null;
  _operators?: FilterFindManyQuizOperatorsInput | null;
  OR?: FilterFindManyQuizInput[] | null;
  AND?: FilterFindManyQuizInput[] | null;
}

/**
 * For performance reason this type contains only *indexed* fields.
 */
export interface FilterFindManyQuizOperatorsInput {
  slug?: FilterFindManyQuizSlugOperatorsInput | null;
  categoryId?: FilterFindManyQuizCategoryIdOperatorsInput | null;
  _id?: FilterFindManyQuiz_idOperatorsInput | null;
}

export interface FilterFindManyQuizSlugOperatorsInput {
  gt?: string | null;
  gte?: string | null;
  lt?: string | null;
  lte?: string | null;
  ne?: string | null;
  in?: (string | null)[] | null;
  nin?: (string | null)[] | null;
  regex?: GraphQL_RegExpAsString | null;
  exists?: boolean | null;
}

export interface FilterFindManyQuiz_idOperatorsInput {
  gt?: GraphQL_MongoID | null;
  gte?: GraphQL_MongoID | null;
  lt?: GraphQL_MongoID | null;
  lte?: GraphQL_MongoID | null;
  ne?: GraphQL_MongoID | null;
  in?: (GraphQL_MongoID | null)[] | null;
  nin?: (GraphQL_MongoID | null)[] | null;
  exists?: boolean | null;
}

export interface FilterFindManyVideoCommentCreatedByIdOperatorsInput {
  gt?: GraphQL_MongoID | null;
  gte?: GraphQL_MongoID | null;
  lt?: GraphQL_MongoID | null;
  lte?: GraphQL_MongoID | null;
  ne?: GraphQL_MongoID | null;
  in?: (GraphQL_MongoID | null)[] | null;
  nin?: (GraphQL_MongoID | null)[] | null;
  exists?: boolean | null;
}

export interface FilterFindManyVideoCommentInput {
  content?: string | null;
  videoId?: GraphQL_MongoID | null;
  imageId?: GraphQL_MongoID | null;
  createdById?: GraphQL_MongoID | null;
  _id?: GraphQL_MongoID | null;
  updatedAt?: GraphQL_Date | null;
  createdAt?: GraphQL_Date | null;
  _operators?: FilterFindManyVideoCommentOperatorsInput | null;
  OR?: FilterFindManyVideoCommentInput[] | null;
  AND?: FilterFindManyVideoCommentInput[] | null;
}

/**
 * For performance reason this type contains only *indexed* fields.
 */
export interface FilterFindManyVideoCommentOperatorsInput {
  videoId?: FilterFindManyVideoCommentVideoIdOperatorsInput | null;
  createdById?: FilterFindManyVideoCommentCreatedByIdOperatorsInput | null;
  _id?: FilterFindManyVideoComment_idOperatorsInput | null;
}

export interface FilterFindManyVideoCommentVideoIdOperatorsInput {
  gt?: GraphQL_MongoID | null;
  gte?: GraphQL_MongoID | null;
  lt?: GraphQL_MongoID | null;
  lte?: GraphQL_MongoID | null;
  ne?: GraphQL_MongoID | null;
  in?: (GraphQL_MongoID | null)[] | null;
  nin?: (GraphQL_MongoID | null)[] | null;
  exists?: boolean | null;
}

export interface FilterFindManyVideoComment_idOperatorsInput {
  gt?: GraphQL_MongoID | null;
  gte?: GraphQL_MongoID | null;
  lt?: GraphQL_MongoID | null;
  lte?: GraphQL_MongoID | null;
  ne?: GraphQL_MongoID | null;
  in?: (GraphQL_MongoID | null)[] | null;
  nin?: (GraphQL_MongoID | null)[] | null;
  exists?: boolean | null;
}

export interface FilterFindManyVideoInput {
  name?: string | null;
  featuredImageId?: GraphQL_MongoID | null;
  subjectId?: GraphQL_MongoID | null;
  mediaId?: GraphQL_MongoID | null;
  authorId?: GraphQL_MongoID | null;
  viewCount?: number | null;
  commentCount?: number | null;
  description?: string | null;
  createdById?: GraphQL_MongoID | null;
  updatedById?: GraphQL_MongoID | null;
  _id?: GraphQL_MongoID | null;
  updatedAt?: GraphQL_Date | null;
  createdAt?: GraphQL_Date | null;
  _operators?: FilterFindManyVideoOperatorsInput | null;
  OR?: FilterFindManyVideoInput[] | null;
  AND?: FilterFindManyVideoInput[] | null;
}

/**
 * For performance reason this type contains only *indexed* fields.
 */
export interface FilterFindManyVideoOperatorsInput {
  _id?: FilterFindManyVideo_idOperatorsInput | null;
}

export interface FilterFindManyVideo_idOperatorsInput {
  gt?: GraphQL_MongoID | null;
  gte?: GraphQL_MongoID | null;
  lt?: GraphQL_MongoID | null;
  lte?: GraphQL_MongoID | null;
  ne?: GraphQL_MongoID | null;
  in?: (GraphQL_MongoID | null)[] | null;
  nin?: (GraphQL_MongoID | null)[] | null;
  exists?: boolean | null;
}

export interface QuestionSessionAnswersInput {
  _id?: GraphQL_MongoID | null;
}

export interface UploadByFileMediaInput {
  type: EnumMediaType;
  meta?: GraphQL_JSON | null;
  altText?: string | null;
  isPrivate?: boolean | null;
  filename?: string | null;
  ext?: string | null;
  file: GraphQL_Upload;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
