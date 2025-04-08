import React from "react";
import { useSurveyStore } from "../store/useSurveyStore";
import { useUserStore } from "../store/useUserStore";
import { useTranslation } from "react-i18next";

const Result = () => {
  const { answers, scores } = useSurveyStore();
  const user = useUserStore((state) => state);
  const { t, i18n } = useTranslation();

  const overallScore = scores?.overall;

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-10">
      <h2 className="font-bold text-2xl text-gray-800 text-center mb-6">
        {t("Competency Gap")}
      </h2>

      {/* Competency Gap Circle */}
      {overallScore !== undefined && (
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="p-5 bg-blue-500 text-white rounded flex items-center justify-center text-2xl font-bold shadow-lg">
            {overallScore}
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;
