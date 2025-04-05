import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSurveyStore = create(
  persist(
    (set, get) => ({
      phone: "",
      answers: {},
      scores: {},
      totals: {}, // Store totals for each subcategory

      setPhone: (phone) => set({ phone }),

      setAnswer: (competency, subcategory, index, field, value) =>
        set((state) => {
          const updatedAnswers = { ...state.answers };
          const updatedTotals = { ...state.totals };

          // Initialize competency, subcategory, and index if they don't exist
          if (!updatedAnswers[competency]) {
            updatedAnswers[competency] = {};
          }
          if (!updatedAnswers[competency][subcategory]) {
            updatedAnswers[competency][subcategory] = {};
          }
          if (!updatedAnswers[competency][subcategory][index]) {
            updatedAnswers[competency][subcategory][index] = {
              possess: 1,
              need: 1,
            };
          }

          // Update the specific field (either possess or need) for the given question
          updatedAnswers[competency][subcategory][index][field] = Number(value);

          // Recalculate totals for the affected subcategory
          const totalPossess = Object.values(
            updatedAnswers[competency][subcategory]
          ).reduce((sum, question) => sum + (question.possess || 0), 0);
          const totalNeed = Object.values(
            updatedAnswers[competency][subcategory]
          ).reduce((sum, question) => sum + (question.need || 0), 0);

          // Update totals for this competency and subcategory
          if (!updatedTotals[competency]) {
            updatedTotals[competency] = {};
          }
          updatedTotals[competency][subcategory] = {
            possess: totalPossess,
            need: totalNeed,
          };

          return { answers: updatedAnswers, totals: updatedTotals };
        }),

      updateScores: () =>
        set((state) => {
          const updatedScores = {};
          let overallScore = 0;

          Object.entries(state.totals).forEach(
            ([competency, subcategories]) => {
              let score = 0;

              Object.values(subcategories).forEach(
                ({ need = 0, possess = 0 }) => {
                  score += need - possess;
                }
              );

              updatedScores[competency] = score;
              overallScore += score;
            }
          );

          updatedScores["overall"] = overallScore;

          console.log("Updated scores ---> ", updatedScores);

          return { scores: updatedScores };
        }),

      updateTotals: () => {
        const { answers } = get();
        const newTotals = {};

        Object.entries(answers).forEach(([competency, subcategories]) => {
          newTotals[competency] = {};

          Object.entries(subcategories).forEach(([subcategory, responses]) => {
            let totalPossess = 0;
            let totalNeed = 0;

            Object.values(responses).forEach((response) => {
              totalPossess += response.possess || 0;
              totalNeed += response.need || 0;
            });

            newTotals[competency][subcategory] = {
              possess: totalPossess,
              need: totalNeed,
            };
          });
        });

        set({ totals: newTotals });
      },

      getSurveyData: () => {
        const { phone, answers, scores, totals } = get();
        return { phone, answers, scores, totals };
      },
    }),
    {
      name: "survey-storage", // Unique name for persisted storage
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);
