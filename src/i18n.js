
import i18n from "i18next";
import {  initReactI18next } from "react-i18next";
import { arabicTranslation, engilshTranslation } from "./components/util/Translation";

i18n
  .use(initReactI18next) 
  .init({

    resources: {
      en: {
        translation: engilshTranslation
      },
      ar: {
        translation: arabicTranslation
      }
    },
    lng: "en", 

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });
  export default i18n;

