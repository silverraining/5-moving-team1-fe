import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { COLORS } from "../../../public/theme/colors";

type AddressCardProps = {
  zipCode: string;
  roadAddress: string;
  jibunAddress: string;
  onClick?: () => void;
  selected?: boolean;
};

const StyledCard = styled(Card)<{ selected: boolean }>(
  ({ selected, theme }) => ({
    borderRadius: "16px",
    border: `1px solid ${selected ? COLORS.PrimaryBlue[200] : COLORS.Line[100]}`,
    backgroundColor: selected ? COLORS.PrimaryBlue[50] : "white",
    boxShadow: "none",
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

const StyledLabel = styled(Typography)(({ theme }) => ({
  color: COLORS.PrimaryBlue[300],
  backgroundColor: COLORS.PrimaryBlue[100],
  padding: "2px 8.5px",
  borderRadius: "14px",
  fontWeight: "semibold",
  marginRight: "8px",
  textAlign: "center",
  [theme.breakpoints.down("mobile")]: {
    fontSize: "12px",
    minWidth: "32px",
  },
  [theme.breakpoints.up("mobile")]: {
    fontSize: "14px",
    minWidth: "48px",
  },
}));

const AddressContainer = styled(Box)({
  display: "flex",
  gap: "8px",
  marginTop: "16px",
});

const LabelContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  flexShrink: 0,
});

const AddressTextContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  width: "100%",
  wordBreak: "break-all",
});

const StyledValue = styled(Typography)(({ theme }) => ({
  fontWeight: "normal",
  width: "100%",
  wordBreak: "break-all",
  [theme.breakpoints.down("mobile")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.up("mobile")]: {
    fontSize: "14px",
  },
}));

const AddressCard = ({
  zipCode,
  roadAddress,
  jibunAddress,
  onClick,
  selected = false,
}: AddressCardProps) => {
  const [isSelected, setIsSelected] = useState(selected);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("mobile"));

  const handleClick = () => {
    setIsSelected(!isSelected);
    onClick && onClick();
  };

  return (
    <StyledCard selected={isSelected} onClick={handleClick}>
      <CardContent
        sx={{
          padding: isMobile ? "16px" : "24px",
          "&:last-child": {
            paddingBottom: isMobile ? "16px" : "24px",
          },
        }}
      >
        <Typography
          variant="body1"
          fontWeight="semibold"
          mb={1}
          sx={{
            fontSize: isMobile ? "14px" : "16px",
          }}
        >
          {zipCode}
        </Typography>
        <AddressContainer>
          <LabelContainer>
            <StyledLabel>도로명</StyledLabel>
            <StyledLabel>지번</StyledLabel>
          </LabelContainer>
          <AddressTextContainer>
            <StyledValue>{roadAddress}</StyledValue>
            <StyledValue>{jibunAddress}</StyledValue>
          </AddressTextContainer>
        </AddressContainer>
      </CardContent>
    </StyledCard>
  );
};

export default AddressCard;
