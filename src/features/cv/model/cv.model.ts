import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import {
  ANALYZE_CV,
  CONFIRM_CV_UPLOAD,
  GET_PRESIGNED_URL,
} from "../mutation/cv.mutation";
import { GET_CV_ANALYSIS_RESULT } from "../query/cv.query";

interface GetPresignedUrlResponse {
  getPresignedUrl: {
    uploadUrl: string;
    fileKey: string;
  };
}

export type UploadedCv = {
  cvId: string;
  fileName: string;
  fileUrl: string;
};

interface ConfirmCvUploadResponse {
  confirmCvUpload: UploadedCv;
}

export type CvSkillAnalysis = {
  name: string;
  proficiency: number;
  yearsOfExperience: number;
};

export type JobSkillAnalysis = {
  name: string;
  importance: number;
  requiredProficiency: number;
};

export type CvAnalysisResult = {
  analysisResultId?: number | null;
  extractedProfile: {
    cvLevel: string;
    cvYearsExperience: number;
    preferredLocations: string[];
    cvCertifications: string[];
    cvSkills: CvSkillAnalysis[];
  };
  jobContext: {
    jobId: number;
    title: string;
    sourceUrl: string;
    jobLevel: string;
    jobYearsRequired: number;
    jobLocation?: string | null;
    jobIsRemote: boolean;
    jobSkills: JobSkillAnalysis[];
  };
  jobMatch: {
    score: number;
    scoreBreakdown: {
      skillMatch: number;
      experienceMatch: number;
      levelMatch: number;
      salaryMatch: number;
      locationMatch: number;
      keywordMatch?: number | null;
      titleMatch?: number | null;
      atsReadability?: number | null;
    };
    missingSkills: string[];
    matchedSkills: string[];
  };
  gapAnalysis: {
    recommendedSkills: string[];
    skillGap: {
      missing: Array<{
        skill: string;
        importance: string;
        reason: string;
      }>;
      weak: Array<{
        skill: string;
        currentProficiency: number;
        requiredProficiency: number;
        gap: number;
      }>;
    };
    experienceGap: {
      requiredYears: number;
      currentYears: number;
      gapWeeks: number;
    };
    levelGap: {
      cvLevel: string;
      jobLevel: string;
      gapLevels: number;
    };
    certificationGap: {
      required: string[];
      have: string[];
      missing: string[];
    };
  };
  roadmap: {
    totalWeeks: number;
    estimatedCompletion: string;
    difficultyLevel: string;
    phases: Array<{
      phase: number;
      durationWeeks: number;
      title: string;
      skills: Array<{
        skillName: string;
        priority: number;
        estimatedWeeks: number;
        baselineHours?: number | null;
        transferBonus: number;
        adjustedHours?: number | null;
        recommendedResources: Array<{
          title: string;
          provider?: string | null;
          url?: string | null;
          durationHours?: number | null;
        }>;
      }>;
    }>;
  };
};

interface AnalyzeCvResponse {
  analyzeCv: CvAnalysisResult;
}

interface GetCvAnalysisResultResponse {
  getCvAnalysisResult: CvAnalysisResult;
}

export function useUploadCv() {
  const [isUploading, setIsUploading] = useState(false);

  const [getPresignedUrl] =
    useMutation<GetPresignedUrlResponse>(GET_PRESIGNED_URL);
  const [confirmCvUpload] =
    useMutation<ConfirmCvUploadResponse>(CONFIRM_CV_UPLOAD);

  const uploadCv = async (file: File) => {
    try {
      setIsUploading(true);

      const { data: presignedData } = await getPresignedUrl({
        variables: { fileName: file.name },
      });

      if (!presignedData) throw new Error("No data received from server");

      const { uploadUrl, fileKey } = presignedData.getPresignedUrl;

      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type || "application/octet-stream",
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to storage");
      }

      const { data: confirmData } = await confirmCvUpload({
        variables: {
          fileName: file.name,
          fileKey,
        },
      });

      if (!confirmData) throw new Error("Failed to confirm upload");

      return confirmData.confirmCvUpload;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadCv,
    isUploading,
  };
}

export function useAnalyzeCv() {
  const [analyzeCvMutation, state] =
    useMutation<AnalyzeCvResponse>(ANALYZE_CV);

  const analyzeCv = async (cvId: number, jobId: number) => {
    const { data } = await analyzeCvMutation({
      variables: { cvId, jobId },
    });

    if (!data) {
      throw new Error("Failed to analyze CV");
    }

    return data.analyzeCv;
  };

  return {
    analyzeCv,
    isAnalyzing: state.loading,
  };
}

export function useCvAnalysisResult(analysisId?: number | null) {
  const query = useQuery<GetCvAnalysisResultResponse>(GET_CV_ANALYSIS_RESULT, {
    variables: {
      analysisId,
    },
    skip: !analysisId,
  });

  return {
    analysis: query.data?.getCvAnalysisResult ?? null,
    loading: query.loading,
    error: query.error,
  };
}
