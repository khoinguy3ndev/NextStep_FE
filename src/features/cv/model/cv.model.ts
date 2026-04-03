import { useMutation } from "@apollo/client/react"; // Đảm bảo dùng đúng path
import { useState } from "react";
import { GET_PRESIGNED_URL, CONFIRM_CV_UPLOAD } from "../mutation/cv.mutation";

interface GetPresignedUrlResponse {
  getPresignedUrl: {
    uploadUrl: string;
    fileKey: string;
  };
}

interface ConfirmCvUploadResponse {
  confirmCvUpload: {
    cvId: string;
    fileName: string;
    fileUrl: string;
  };
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
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to storage");
      }

      const { data: confirmData } = await confirmCvUpload({
        variables: {
          fileName: file.name,
          fileKey: fileKey,
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
