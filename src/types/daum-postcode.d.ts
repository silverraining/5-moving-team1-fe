interface DaumPostcodeOptions {
  oncomplete: (data: {
    zonecode: string;
    roadAddress: string;
    jibunAddress: string;
    // 필요에 따라 다른 필드 추가 가능
  }) => void;
}

interface DaumPostcode {
  open(): void;
}

interface DaumStatic {
  Postcode: new (options: DaumPostcodeOptions) => DaumPostcode;
}

interface Window {
  daum: DaumStatic;
}
