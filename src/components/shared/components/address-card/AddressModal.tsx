import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Box,
  styled,
  Button,
} from "@mui/material";
import { SearchInput } from "../text-field/Search";
import AddressCard from "./AddressCard";
import Image from "next/image";
import { convertSidoToEnglish } from "@/src/utils/parseAddress";
import { ModalAddress } from "@/src/utils/parseAddress";
import { useTranslation } from "react-i18next";

interface Address {
  zipCode: string;
  roadAddress: string;
  jibunAddress: string;
}

interface AddressModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (address: ModalAddress) => void;
  title?: string;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    width: "100%",
    maxWidth: "560px",
    borderRadius: "20px",
    margin: "16px",
  },
}));

const StyledDialogTitle = styled(DialogTitle)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "24px",
});

const StyledDialogContent = styled(DialogContent)({
  padding: "0 24px 24px 24px",
});

const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "56px",
  borderRadius: "16px",
  marginTop: "24px",
  fontSize: ["16px", "16px", "20px"],
  fontWeight: "semibold",
  "&.Mui-disabled": {
    backgroundColor: theme.palette.Grayscale[200],
    color: theme.palette.White[100],
  },
}));

const AddressModal: React.FC<AddressModalProps> = ({
  open,
  onClose,
  onSelect,
  title,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [addresses, setAddresses] = useState<ModalAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<ModalAddress | null>(
    null
  );
  const { t } = useTranslation();
  /**
   * 카카오 우편번호 서비스 API 연동 방법:
   * 1. 카카오 개발자 센터에서 JavaScript 앱 키를 발급받습니다.
   * 2. index.html 또는 _document.tsx에 다음 스크립트를 추가합니다:
   *    <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
   * 3. 아래 handleSearch 함수에서 다음과 같이 API를 호출합니다:
   *    new window.daum.Postcode({
   *      oncomplete: function(data) {
   *        const address = {
   *          zipCode: data.zonecode,
   *          newAddress: data.roadAddress,
   *          oldAddress: data.jibunAddress,
   *        };
   *        setAddresses([address]);
   *      }
   *    }).open();
   */

  // ✅ 추가: 카카오 주소 검색 팝업 호출 함수
  const openKakaoPostcode = () => {
    if (typeof window === "undefined") return;

    new window.daum.Postcode({
      oncomplete: function (data) {
        const roadAddress = data.roadAddress;
        const fullAddress = roadAddress;
        const [sido, sigungu] = roadAddress.split(" ");
        const parsedAddress: ModalAddress = {
          zipCode: data.zonecode,
          roadAddress: data.roadAddress,
          jibunAddress: data.jibunAddress,
          sido,
          sigungu,
          sidoEnglish: convertSidoToEnglish(sido),
          fullAddress,
        };

        // ✅ 주소 선택 및 반영
        setSelectedAddress(parsedAddress);
        setSearchValue(data.roadAddress);
        setAddresses([parsedAddress]); // ✅ 한 건만 표시
      },
    }).open();
  };

  // const handleSearch = (value: string) => {
  //   setSearchValue(value);
  //   // TODO: 카카오 우편번호 서비스 API 연동
  //   // 임시 데이터
  //   setAddresses([
  //     {
  //       zipCode: "04538",
  //       roadAddress: "서울 중구 삼일대로 343 (대신파이낸스센터)",
  //       jibunAddress: "서울 중구 저동1가 114",
  //     },
  //   ]);
  // };

  // const handleAddressSelect = (address: Address) => {
  //   setSelectedAddress(address);
  // };

  const handleComplete = () => {
    if (selectedAddress) {
      onSelect(selectedAddress);
      onClose();
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth>
      <StyledDialogTitle>
        <Typography
          fontWeight="semibold"
          sx={{
            fontSize: ["18px", "18px", "24px"],
          }}
        >
          {title}
        </Typography>
        <IconButton onClick={onClose}>
          <Image
            src="/이미지/header/X.svg"
            alt="close"
            width={24}
            height={24}
          />
        </IconButton>
      </StyledDialogTitle>
      <StyledDialogContent>
        <Box mb={3}>
          <SearchInput
            variation="right"
            placeholder={t("도로명, 지번, 건물명으로 검색")}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} // ✅ 검색어 입력 가능
            onClick={openKakaoPostcode} // ✅ 검색 아이콘 클릭 시 카카오 팝업 호출
            onDeleteClick={() => setSearchValue("")}
          />
        </Box>
        <Box>
          {addresses.map((address, index) => (
            <AddressCard
              key={index}
              zipCode={address.zipCode}
              roadAddress={address.roadAddress}
              jibunAddress={address.jibunAddress}
              selected={selectedAddress?.zipCode === address.zipCode}
              onClick={() => setSelectedAddress(address)}
              // zipCode={address.zipCode}
              // roadAddress={address.roadAddress}
              // jibunAddress={address.jibunAddress}
              // onClick={() => handleAddressSelect(address)}
              // selected={selectedAddress?.zipCode === address.zipCode}
            />
          ))}
        </Box>
        <StyledButton
          variant="contained"
          disabled={!selectedAddress}
          onClick={handleComplete}
          sx={(theme) => ({
            backgroundColor: selectedAddress
              ? theme.palette.PrimaryBlue[300]
              : undefined,
            fontSize: ["16px", "16px", "20px"],
          })}
        >
          {t("선택완료")}
        </StyledButton>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default AddressModal;
