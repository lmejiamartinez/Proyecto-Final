import axios from "axios";

const useDynamicRequest = () => {
  const request = async (
    baseURL,
    queryURL,
    method = "post",
    data = null,
    options = {}
  ) => {
    const config = {
      method,
      url: queryURL,
      baseURL: baseURL ?? baseURL,
      ...options,
    };

    if (data) {
      config.data = data;
    }

    try {
      const response = await axios(config);
      return response?.data;
    } catch (error) {
      throw error;
    }
  };

  return request;
};

export default useDynamicRequest;
