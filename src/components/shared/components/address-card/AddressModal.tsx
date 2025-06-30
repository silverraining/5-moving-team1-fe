import React, { useEffect } from "react";
import { Dialog } from "@mui/material";
import { convertSidoToEnglish } from "@/src/utils/parseAddress";
import { ModalAddress } from "@/src/utils/parseAddress";

interface AddressModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (address: ModalAddress) => void;
  title?: string;
}

const AddressModal: React.FC<AddressModalProps> = ({
  open,
  onClose,
  onSelect,
}) => {
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
  useEffect(() => {
    if (!open || typeof window === "undefined" || !window.daum?.Postcode)
      return;

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

        // ✅ 선택한 주소 전달 후 모달 닫기
        onSelect(parsedAddress);
        onClose();
      },
      onclose: onClose,
    }).open();
  }, [open, onClose, onSelect]);

  return (
    // ✅ UI 없는 빈 다이얼로그. 화면에는 표시되지 않음
    <Dialog open={open} onClose={onClose} />
  );
};

export default AddressModal;
