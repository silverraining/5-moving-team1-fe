"use client";
import { Box, Stack } from "@mui/material";
import SortDropdown from "@/src/components/shared/components/drop-down/SortDropdown";
import TextField from "@/src/components/shared/components/text-field";
import { CardListMover } from "@/src/components/shared/components/card/CardListMover";
import { CardData } from "@/src/types/card";

interface Props {
  movers: CardData[];
  searchKeyword: string;
  setSearchKeyword: (v: string) => void;
}

export const MoverCardList = ({
  movers,
  searchKeyword,
  setSearchKeyword,
}: Props) => {
  return (
    <Box width="955px" display="flex" flexDirection="column">
      <Box display="flex" justifyContent="flex-end">
        <SortDropdown
          defaultOption={{ value: "리뷰 많은순", label: "리뷰 많은순" }}
          options={[
            { value: "리뷰 많은순", label: "리뷰 많은순" },
            { value: "평점 높은순", label: "평점 높은순" },
            { value: "경력 높은순", label: "경력 높은순" },
            { value: "확정 많은순", label: "확정 많은순" },
          ]}
          onChange={(option) => console.log("선택된 옵션:", option)}
        />
      </Box>

      <Box mt={3} mb={4}>
        <TextField.Search
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onClick={() => setSearchKeyword("")}
          placeholder="텍스트를 입력해주세요."
          variation="left"
          sx={{
            "& input::placeholder": {
              color: (theme) => theme.palette.Grayscale[400],
              opacity: 1,
            },
          }}
        />
      </Box>

      <Stack spacing={4}>
        {movers.map((mover, idx) => (
          <CardListMover
            key={idx}
            data={mover}
            onLikeClick={() => console.log("찜 ")}
          />
        ))}
      </Stack>
    </Box>
  );
};
