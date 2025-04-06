import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    console.log(`Current language: ${i18n.language}`);

    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <div className="flex gap-2 justify-end p-2">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-4 py-2 rounded-lg border text-sm font-medium transition 
          ${
            i18n.language === "en"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
          }`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage("ar")}
        className={`px-4 py-2 rounded-lg border text-sm font-medium transition 
          ${
            i18n.language === "ar"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
          }`}
      >
        العربية
      </button>
    </div>
  );
};

export default LanguageSwitcher;
