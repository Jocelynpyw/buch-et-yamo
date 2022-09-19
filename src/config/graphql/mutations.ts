import { gql } from '@apollo/client';

export const MUTATION_MEDIA_UPLOAD_BY_FILE = gql`
  mutation MutationMediaUploadByFile($record: UploadByFileMediaInput!) {
    mediaUploadByFile(record: $record) {
      recordId
      record {
        _id
      }
    }
  }
`;
