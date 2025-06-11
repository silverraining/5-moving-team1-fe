import apiClient from "../axiosclient";

export interface PresignedUrlResponse {
  presignedUrl: string;
  fileUrl: string;
}

export interface UploadImageParams {
  fileName: string;
  fileType: string;
}

// 백엔드에서 presigned URL을 받아오는 함수
export const getPresignedUrl = async (
  params: UploadImageParams
): Promise<PresignedUrlResponse> => {
  const response = await apiClient.post("/s3/presigned-url", params);
  return response.data;
};

// presigned URL을 사용하여 S3에 파일을 업로드하는 함수
export const uploadToS3 = async (
  presignedUrl: string,
  file: File
): Promise<void> => {
  /* fetch 사용하여 presignedUrl에 파일 업로드
  S3 Presigned URL은 URL에 이미 인증 정보가 포함되어 있어서, 추가적인 인증 헤더가 포함되면 오히려 문제가 생김 */
  const uploadResponse = await fetch(presignedUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  if (!uploadResponse.ok) {
    console.error("S3 upload failed with status:", uploadResponse.status);
    const errorText = await uploadResponse.text();
    console.error("S3 upload error response:", errorText);
    throw new Error("Failed to upload image to S3");
  }
};

// 파일을 S3에 업로드하는 전체 프로세스를 처리하는 유틸리티 함수
export const uploadImageToS3 = async (file: File): Promise<string> => {
  try {
    // 1. presigned URL 요청
    const { presignedUrl, fileUrl } = await getPresignedUrl({
      fileName: file.name,
      fileType: file.type,
    });

    // 2. S3에 파일 업로드
    await uploadToS3(presignedUrl, file);

    // 3. 업로드된 파일의 URL 반환
    return fileUrl;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "이미지 업로드 중 오류가 발생했습니다."
    );
  }
};
