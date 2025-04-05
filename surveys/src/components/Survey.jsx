import React, { useEffect } from "react";
import { competencies } from "../data/Questions";
import { useSurveyStore } from "../store/useSurveyStore";
import { useNavigate } from "react-router-dom";
import useSubmit from "../hooks/useSubmit";
import { useUserStore } from "../store/useUserStore";

const Survey = () => {
  const {
    answers,
    setAnswer,
    updateScores,
    getSurveyData,
    setPhone,
    totals,
    scores,
    updateTotals,
  } = useSurveyStore();

  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const mutation = useSubmit();

  useEffect(() => {
    setPhone(userInfo.phone);
  }, [setPhone, userInfo.phone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateScores();
    console.log("the scores --> ", scores);
    // updateTotals();
    // const surveyData = getSurveyData();

    // try {
    //   await mutation.mutateAsync({
    //     phone: surveyData.phone,
    //     answers: surveyData.answers,
    //     scores: surveyData.scores,
    //     totals: surveyData.totals,
    //   });
    //   navigate("/report");
    // } catch (error) {
    //   console.error("Submission failed", error);
    // }
  };

  return (
    <div className="w-full max-w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
      <form className="space-y-8" onSubmit={handleSubmit}>
        {Object.entries(competencies).map(([competency, subcategories]) => (
          <div key={competency} className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">
              {competency}
            </h2>
            {Object.entries(subcategories).map(([subcategory, questions]) => (
              <div key={subcategory} className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700">
                  {subcategory}
                </h3>
                <table className="w-full border-collapse border border-gray-300 text-left mt-2">
                  <thead>
                    <tr className="bg-blue-100">
                      <th className="border border-gray-300 px-4 py-3">
                        Question
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-center">
                        The Work Needs It (1-10)
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-center">
                        I Possess It (1-10)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.map((question, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-3">
                          {question}
                        </td>
                        {["need", "possess"].map((field) => (
                          <td
                            key={field}
                            className="border border-gray-300 px-4 py-3 text-center"
                          >
                            <select
                              name={`${competency}-${subcategory}-${index}-${field}`}
                              value={
                                answers?.[competency]?.[subcategory]?.[index]?.[
                                  field
                                ] || ""
                              }
                              onChange={(e) => {
                                setAnswer(
                                  competency,
                                  subcategory,
                                  index,
                                  field,
                                  e.target.value
                                );
                              }}
                              required
                              className="w-24 px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                                hover:border-blue-500 transition-all duration-200 text-gray-700"
                            >
                              <option
                                value=""
                                disabled
                                className="text-gray-500"
                              >
                                Select
                              </option>
                              {[...Array(10).keys()].map((num) => (
                                <option
                                  key={num + 1}
                                  value={num + 1}
                                  className="text-gray-800"
                                >
                                  {num + 1}
                                </option>
                              ))}
                            </select>
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="bg-blue-100 font-semibold">
                      <td className="border border-gray-300 px-4 py-3 text-right">
                        Total
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        {totals?.[competency]?.[subcategory]?.need || 0}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-center">
                        {totals?.[competency]?.[subcategory]?.possess || 0}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))}
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Survey;
