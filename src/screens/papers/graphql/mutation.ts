import { gql } from '@apollo/client';
import { FRAGMENT_SHARE_BASE } from './fragments';

export const MUTATION_ADD_QUESTION_SHARE = gql`
  mutation MutationShareCreateOne($id: CreateOneShareInput!) {
    ShareCreateOne(record: $id) {
      recordId
      record {
        ...FragmentShareBase
      }
    }
  }

  ${FRAGMENT_SHARE_BASE}
`;
