/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: QueryUsersInformation
// ====================================================

export interface QueryUsersInformation_userById_avatar {
  __typename: "Media";
  /**
   * Url to the file in question.
   */
  url: string;
}

export interface QueryUsersInformation_userById_metrics {
  __typename: "UserMetrics";
  questions: number | null;
  answers: number | null;
}

export interface QueryUsersInformation_userById {
  __typename: "User";
  _id: GraphQL_MongoID;
  email: string | null;
  /**
   * Main Telephone contact, form code#telNumber, easy to match with regex
   */
  phone: string | null;
  username: string | null;
  name: string | null;
  dob: GraphQL_Date | null;
  avatar: QueryUsersInformation_userById_avatar | null;
  createdAt: GraphQL_Date | null;
  metrics: QueryUsersInformation_userById_metrics | null;
}

export interface QueryUsersInformation {
  userById: QueryUsersInformation_userById | null;
}

export interface QueryUsersInformationVariables {
  userId: GraphQL_MongoID;
}
