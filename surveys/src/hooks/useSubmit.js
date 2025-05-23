import { useMutation } from "@tanstack/react-query";
import axios from "axios";
//https://survey-backend.up.railway.app
const submitData = async (data) => {
  const response = await axios.post(
    "https://survey-backend.up.railway.app/api/financial-competency",
    data
  );
  return response.data;
};

const useSubmit = () => {
  return useMutation({
    mutationFn: submitData, // Corrected useMutation usage
    onMutate: (data) => {
      console.log("Mutation started with data:", data);
    },
    onSuccess: (data) => {
      console.log("Mutation successful:", data);
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  });
};

export default useSubmit;
