import { gql } from "@apollo/client";

const CV_ANALYSIS_FIELDS = gql`
  fragment CvAnalysisFields on CvAnalysisResponseType {
    analysisResultId
    extractedProfile {
      cvLevel
      cvYearsExperience
      preferredLocations
      cvCertifications
      cvSkills {
        name
        proficiency
        yearsOfExperience
      }
    }
    jobContext {
      jobId
      title
      sourceUrl
      jobLevel
      jobYearsRequired
      jobLocation
      jobIsRemote
      jobSkills {
        name
        importance
        requiredProficiency
      }
    }
    jobMatch {
      score
      scoreBreakdown {
        skillMatch
        experienceMatch
        levelMatch
        salaryMatch
        locationMatch
        keywordMatch
        titleMatch
        atsReadability
      }
      missingSkills
      matchedSkills
    }
    gapAnalysis {
      recommendedSkills
      skillGap {
        missing {
          skill
          importance
          reason
        }
        weak {
          skill
          currentProficiency
          requiredProficiency
          gap
        }
      }
      experienceGap {
        requiredYears
        currentYears
        gapWeeks
      }
      levelGap {
        cvLevel
        jobLevel
        gapLevels
      }
      certificationGap {
        required
        have
        missing
      }
    }
    roadmap {
      totalWeeks
      estimatedCompletion
      difficultyLevel
      phases {
        phase
        durationWeeks
        title
        skills {
          skillName
          priority
          estimatedWeeks
          baselineHours
          transferBonus
          adjustedHours
          recommendedResources {
            title
            provider
            url
            durationHours
          }
        }
      }
    }
  }
`;

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

export const ANALYZE_CV = gql`
  mutation AnalyzeCv($cvId: Int!, $jobId: Int!) {
    analyzeCv(cvId: $cvId, jobId: $jobId) {
      ...CvAnalysisFields
    }
  }
  ${CV_ANALYSIS_FIELDS}
`;

export { CV_ANALYSIS_FIELDS };
