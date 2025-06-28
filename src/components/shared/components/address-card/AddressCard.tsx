import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";

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
    border: `1px solid ${
      selected ? theme.palette.PrimaryBlue[200] : theme.palette.Line[100]
    }`,
    backgroundColor: selected ? theme.palette.PrimaryBlue[50] : "white",
    boxShadow: "none",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    width: "100%",
    marginBottom: "8px",
    "&:hover": {
      borderColor: theme.palette.PrimaryBlue[200],
      backgroundColor: theme.palette.PrimaryBlue[50],
    },
  })
);

const StyledLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.PrimaryBlue[300],
  backgroundColor: theme.palette.PrimaryBlue[100],
  padding: "2px 8.5px",
  borderRadius: "14px",
  fontWeight: "semibold",
  marginRight: "8px",
  textAlign: "center",
  fontSize: ["12px", "12px", "14px"],
  minWidth: ["32px", "32px", "48px"],
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

const StyledValue = styled(Typography)({
  fontWeight: "normal",
  width: "100%",
  wordBreak: "break-all",
  fontSize: ["12px", "12px", "14px"],
});

const AddressCard = ({
  zipCode,
  roadAddress,
  jibunAddress,
  onClick,
  selected = false,
}: AddressCardProps) => {
  const [isSelected, setIsSelected] = useState(selected);
  const theme = useTheme();

  const handleClick = () => {
    setIsSelected(!isSelected);
    onClick && onClick();
  };
  const { t } = useTranslation();
  return (
    <StyledCard selected={isSelected} onClick={handleClick}>
      <CardContent
        sx={{
          padding: ["16px", "16px", "24px"],
          "&:last-child": {
            paddingBottom: ["16px", "16px", "24px"],
          },
        }}
      >
        <Typography
          variant="body1"
          fontWeight="semibold"
          mb={1}
          sx={{
            fontSize: ["14px", "14px", "16px"],
          }}
        >
          {zipCode}
        </Typography>
        <AddressContainer>
          <LabelContainer>
            <StyledLabel>{t("도로명")}</StyledLabel>
            <StyledLabel>{t("지번")}</StyledLabel>
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
