import { useQuery } from "@tanstack/react-query";
import useDynamicRequest from "./useDynamicRequest";

const useQueryDynamicApi = ({
  url = null,
  enabled = true,
  method = "get",
  body = null,
  ...queryOptions
}) => {
  const request = useDynamicRequest();

  return useQuery({
    queryKey: [url],
    enabled: enabled,
    queryFn: async ({ signal }) => {
      const response = await request(url, method, body, {
        signal,
      });
      return response;
    },
    ...queryOptions,
  });
};

export default useQueryDynamicApi;
