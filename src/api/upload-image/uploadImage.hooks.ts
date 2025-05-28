import { useState, useCallback } from "react";
import { uploadImageToS3 } from "./uploadImage.api";
import { fileToBase64 } from "../../utils/imageUpload.utils";
import { useSnackbarStore } from "../../store/snackBarStore";

export interface UseImageUploadOptions {
  onUploadSuccess?: (s3Url: string) => void;
  onUploadError?: (error: string) => void;
  showSnackbar?: boolean;
}

export interface UseImageUploadReturn {
  previewImage: string | null;
  s3ImageUrl: string | null;
  isUploading: boolean;
  error: string | null;
  handleFileUpload: (file: File) => Promise<void>;
  setPreviewImage: (image: string | null) => void;
}

/**
 * 이미지 업로드 훅
 * @param options - 업로드 성공/실패 시 콜백 함수들과 스낵바 표시
 */
export const useImageUpload = (
  options: UseImageUploadOptions = {}
): UseImageUploadReturn => {
  const { onUploadSuccess, onUploadError, showSnackbar = true } = options;

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [s3ImageUrl, setS3ImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openSnackbar = useSnackbarStore((state) => state.openSnackbar);

  /**
   * 파일 업로드 처리 함수
   * 1. 미리보기용 base64 이미지 생성
   * 2. S3에 이미지 업로드
   * 3. 성공/실패에 따른 상태 업데이트 및 콜백 실행
   */
  const handleFileUpload = useCallback(
    async (file: File) => {
      try {
        setIsUploading(true);
        setError(null);

        // 1. 미리보기용 base64 이미지 생성
        const base64Image = await fileToBase64(file);
        setPreviewImage(base64Image);

        // 2. S3에 이미지 업로드
        const s3Url = await uploadImageToS3(file);
        setS3ImageUrl(s3Url);

        // 3. 성공 처리
        if (showSnackbar) {
          openSnackbar("이미지가 성공적으로 업로드되었습니다.", "success");
        }
        onUploadSuccess?.(s3Url);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "이미지 업로드 중 오류가 발생했습니다.";

        setError(errorMessage);
        setPreviewImage(null);
        setS3ImageUrl(null);

        if (showSnackbar) {
          openSnackbar(errorMessage, "error");
        }
        onUploadError?.(errorMessage);
      } finally {
        setIsUploading(false);
      }
    },
    [onUploadSuccess, onUploadError, showSnackbar, openSnackbar]
  );

  return {
    previewImage,
    s3ImageUrl,
    isUploading,
    error,
    handleFileUpload,
    setPreviewImage,
  };
};
