import { Stack, Typography, Box } from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { API_BASE_URL } from "@/src/lib/constants";

interface SnsLoginSectionProps {
  title: string;
  isSmall: boolean;
}

export const SnsLoginSection = ({ isSmall, title }: SnsLoginSectionProps) => {
  const size = isSmall ? 54 : 72;
  const pathname = usePathname();

  const handleGoogleLogin = () => {
    // 현재 로그인 페이지 경로에 따라 역할 결정
    const role = pathname.includes("/mover/") ? "mover" : "customer";
    // 세션에 역할을 저장하고 OAuth로 리디렉션
    window.location.href = `${API_BASE_URL}/auth/login/google/role/${role}`;
  };
  const handleKakaoLogin = () => {
    const role = pathname.includes("/mover/") ? "mover" : "customer";
    // 카카오 OAuth로 리디렉션
    window.location.href = `${API_BASE_URL}/auth/login/kakao/role/${role}`;
  };

  const handleNaverLogin = () => {
    // TODO: 네이버 로그인 구현
  };

  //버튼 호버 스타일
  const snsButtonStyle = {
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    transform: "scale(1)",
    filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
    "&:hover": {
      transform: "scale(1.05)",
      filter: "drop-shadow(0 6px 10px rgba(0, 0, 0, 0.2))",
    },
  };

  return (
    <Stack spacing={[3, 3, 4]} alignItems={"center"}>
      <Typography variant={isSmall ? "R_12" : "R_20"}>{title}</Typography>
      <Stack direction={"row"} spacing={[3, 3, 4]}>
        <Box sx={snsButtonStyle} onClick={handleGoogleLogin}>
          <Image
            src={"/Images/icon-btn/google_login.svg"}
            alt="google"
            width={size}
            height={size}
          />
        </Box>
        <Box sx={snsButtonStyle} onClick={handleKakaoLogin}>
          <Image
            src={"/Images/icon-btn/kakao_login.svg"}
            alt="kakao"
            width={size}
            height={size}
          />
        </Box>
        <Box sx={snsButtonStyle} onClick={handleNaverLogin}>
          <Image
            src={"/Images/icon-btn/naver_login.svg"}
            alt="naver"
            width={size}
            height={size}
          />
        </Box>
      </Stack>
    </Stack>
  );
};
