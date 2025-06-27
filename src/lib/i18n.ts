import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ko",
    supportedLngs: ["ko", "en", "zh"],
    detection: {
      order: ["path", "cookie", "navigator"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
    returnNull: false, // 번역문이 없으면 null 대신 key 반환
    returnEmptyString: false, // 빈 문자열 대신 key 반환
  });

export default i18n;
