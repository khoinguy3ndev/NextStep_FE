import { gql } from "@apollo/client";

export const GET_PRESIGNED_URL = gql`
  mutation GetPresignedUrl($fileName: String!) {
    getPresignedUrl(fileName: $fileName) {
      uploadUrl
      fileKey
    }
  }
`;

export const CONFIRM_CV_UPLOAD = gql`
  mutation ConfirmCvUpload($fileName: String!, $fileKey: String!) {
    confirmCvUpload(fileName: $fileName, fileKey: $fileKey) {
      cvId
      fileName
      fileUrl
    }
  }
`;
