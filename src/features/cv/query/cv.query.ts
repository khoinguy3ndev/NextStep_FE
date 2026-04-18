import { gql } from "@apollo/client";
import { CV_ANALYSIS_FIELDS } from "@/features/cv/mutation/cv.mutation";

export const GET_CV_ANALYSIS_RESULT = gql`
  query GetCvAnalysisResult($analysisId: Int!) {
    getCvAnalysisResult(analysisId: $analysisId) {
      ...CvAnalysisFields
    }
  }
  ${CV_ANALYSIS_FIELDS}
`;
