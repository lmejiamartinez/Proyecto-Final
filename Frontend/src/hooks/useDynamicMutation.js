import { useMutation } from "@tanstack/react-query";
import useDynamicRequest from "./useDynamicRequest";

const useDynamicMutation = (queryParams) => {
  const { qry = "", method = "post", onSuccess, onError } = queryParams;
  const baseURL = import.meta.env.VITE_APP_BACKEND_API_URL_LOCAL;
  const request = useDynamicRequest();

  return useMutation({
    mutationFn: async (body) => {
      try {
        const response = await request(baseURL, qry, method, body, null);
        return response;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useDynamicMutation;
