import React, { useState } from "react";
import { Card, CardContent, Box, Typography, styled } from "@mui/material";
import { COLORS } from "../../../public/theme/colors";

type AddressCardProps = {
  size?: "sm" | "md";
  zipCode: string;
  newAddress: string;
  oldAddress: string;
  onClick?: () => void;
  selected?: boolean;
};

const StyledCard = styled(Card)<{ size: "sm" | "md"; selected: boolean }>(
  ({ theme, size, selected }) => ({
    borderRadius: "16px",
    border: `1px solid ${selected ? COLORS.PrimaryBlue[200] : COLORS.Line[100]}`,
    backgroundColor: selected ? COLORS.PrimaryBlue[50] : "white",
    boxShadow: "none",
    padding: "20px 16px 24px 16px",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    width: "100%",
    marginBottom: "8px",
    "&:hover": {
      borderColor: COLORS.PrimaryBlue[200],
      backgroundColor: COLORS.PrimaryBlue[50],
    },
  })
);

const StyledLabel = styled(Typography)<{ cardSize: "sm" | "md" }>(
  ({ theme, cardSize }) => ({
    color: COLORS.PrimaryBlue[300],
    backgroundColor: COLORS.PrimaryBlue[50],
    padding: "2px 8.5px",
    borderRadius: "14px",
    fontSize: cardSize === "sm" ? "12px" : "14px",
    fontWeight: "semibold", // 도로명, 지번 폰트 두께: 피그마 문서대로 적용했으나 실제 폰트 두께가 다르다면 이 줄을 수정해주세요
    marginRight: "8px",
    minWidth: cardSize === "sm" ? "32px" : "48px",
    textAlign: "center",
  })
);

const StyledValue = styled(Typography)<{ cardSize: "sm" | "md" }>(
  ({ cardSize }) => ({
    fontSize: cardSize === "sm" ? "12px" : "14px",
    fontWeight: "normal",
    flex: 1,
  })
);

const AddressCard = ({
  size = "md",
  zipCode,
  newAddress,
  oldAddress,
  onClick,
  selected = false,
}: AddressCardProps) => {
  const [isSelected, setIsSelected] = useState(selected);

  const handleClick = () => {
    setIsSelected(!isSelected);
    onClick && onClick();
  };

  return (
    <StyledCard size={size} selected={isSelected} onClick={handleClick}>
      <CardContent sx={{ padding: 0, "&:last-child": { paddingBottom: 0 } }}>
        <Typography
          variant="body1"
          fontWeight="semibold" // 우편번호 폰트 두께: 피그마 문서대로 적용했으나 실제 폰트 두께가 다르다면 이 줄을 수정해주세요
          mb={1}
          sx={{
            fontSize: size === "sm" ? "14px" : "16px",
          }}
        >
          {zipCode}
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          mb={1}
          sx={{ paddingLeft: "4px" }}
        >
          <StyledLabel cardSize={size}>도로명</StyledLabel>
          <StyledValue cardSize={size}>{newAddress}</StyledValue>
        </Box>
        {size === "md" && (
          <Box display="flex" alignItems="center" sx={{ paddingLeft: "4px" }}>
            <StyledLabel cardSize={size}>지번</StyledLabel>
            <StyledValue cardSize={size}>{oldAddress}</StyledValue>
          </Box>
        )}
        {size === "sm" && (
          <Box display="flex" alignItems="center" sx={{ paddingLeft: "4px" }}>
            <StyledLabel cardSize={size}>지번</StyledLabel>
            <StyledValue cardSize={size}>{oldAddress}</StyledValue>
          </Box>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default AddressCard;
