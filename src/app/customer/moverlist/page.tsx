"use client";
import React from "react";
import { Box } from "@mui/material";
import { useState } from "react";
import { CardData } from "@/src/types/card";
import { MoverFilterSidebar } from "@/src/components/customer/mover-list/MoverFilterSidebar";
import { LikedMoverList } from "@/src/components/customer/mover-list/LikedMoverList";
import { MoverCardList } from "@/src/components/customer/mover-list/MoverCardList";
// TODO: 나중에 API 연동 시 dummy 제거할 예정
//회원 로그인 후 기사님 찾기 페이지 헤더 탭 적용 필요함
/**
 * @temporary
 * @dummy
 */
export const dummyMoverList: CardData[] = [
  {
    types: ["small", "designation"],
    message: "고객님의 물품을 안전하게 운송해 드립니다.",
    imgSrc: "/Images/profile/maleProfile.svg",
    name: "김이사",
    isLiked: true,
    like: 25,
    rating: 4.9,
    count: 120,
    career: 8,
    confirm: 52,
    address: ["서울시 마포구"],
  },
  {
    types: ["small", "home"],
    message: "고객님의 물품을 안전하게 운송해 드립니다.",
    imgSrc: "/Images/profile/maleProfile.svg",
    name: "김이사",
    isLiked: true,
    like: 25,
    rating: 4.9,
    count: 120,
    career: 8,
    confirm: 52,
    address: ["서울시 마포구"],
  },
  {
    types: ["small", "office", "designation"],
    message: "고객님의 물품을 안전하게 운송해 드립니다.",
    imgSrc: "/Images/profile/maleProfile.svg",
    name: "김이사",
    isLiked: true,
    like: 25,
    rating: 4.9,
    count: 120,
    career: 8,
    confirm: 52,
    address: ["서울시 마포구"],
  },
];

export default function MoverSearchPage() {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        bgcolor: (theme) => theme.palette.White[100],
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1400px",
          px: "32px",
          py: 4,
        }}
      >
        <Box mb={6}>
          <h2 style={{ fontSize: "24px", fontWeight: 600 }}>기사님 찾기</h2>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "107px",
            justifyContent: "space-around",
            alignItems: "flex-start",
            marginX: "auto",
          }}
        >
          {/* 왼쪽: 필터 + 찜한 기사님 */}
          <Box>
            <MoverFilterSidebar />
            <Box sx={{ height: "46px" }} />
            {/* TODO: 백엔드 연동 시 아래 filter 제거 '찜한 기사님 조회 API'를
              사용하여 데이터 받아오도록 수정 예정 */}
            <LikedMoverList
              likedMovers={dummyMoverList.filter((m) => m.isLiked)}
            />
          </Box>

          {/* 오른쪽: 정렬 + 검색 + 카드 리스트 */}
          <MoverCardList
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            movers={dummyMoverList}
          />
        </Box>
      </Box>
    </Box>
  );
}
