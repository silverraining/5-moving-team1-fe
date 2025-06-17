interface DaumPostcodeData {
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
}

interface DaumPostcodeOptions {
  oncomplete: (data: DaumPostcodeData) => void;
}

interface DaumPostcode {
  open(): void;
}

interface Window {
  daum: {
    Postcode: new (options: DaumPostcodeOptions) => DaumPostcode;
  };
}
