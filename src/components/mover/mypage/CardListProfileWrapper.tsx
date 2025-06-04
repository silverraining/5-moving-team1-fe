"use client";

import { CardListProfile } from "@/src/components/mover/mypage/CardListProfile-refactor";
import { CardData } from "@/src/types/card";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";

interface Props {
  data: CardData;
}
/**
 * @file CardListProfileWrapper.tsx
 * @description
 * 기사님의 마이페이지에서 사용되는 프로필 카드 컴포넌트(CardListProfile)의 래퍼 컴포넌트
 *
 * `CardListProfile`의 스타일/레이아웃을 그대로 사용하되,
 * 마이페이지 내에서 버튼 문구 및 위치 반전, 스타일 커스터마이징 적용
 * 데스크탑 사이즈에서  reverseButtons를 통해 버튼 위치 반전하도록함
 */
export default function CardListProfileWrapper({ data }: Props) {
  return (
    <CardListProfile
      data={data}
      onMyClick={() => console.log("기본 정보 수정 클릭")}
      onBasicClick={() => console.log("내 프로필 수정 클릭")}
      buttonLabels={{
        secondary: (
          <Box component="span" display="inline-flex" alignItems="center">
            <Typography component="span">기본 정보 수정</Typography>
            <Image
              src="/images/profile/writing_gray.svg"
              width={24}
              height={24}
              alt="수정 아이콘"
              style={{ marginLeft: 6 }}
            />
          </Box>
        ),
        primary: (
          <Box component="span" display="inline-flex" alignItems="center">
            <Typography component="span">내 프로필 수정</Typography>
            <Image
              src="/images/profile/writing.svg"
              width={24}
              height={24}
              alt="수정 아이콘"
              style={{ marginLeft: 6 }}
            />
          </Box>
        ),
      }}
      reverseButtons // 버튼 순서 반전
    />
  );
}
