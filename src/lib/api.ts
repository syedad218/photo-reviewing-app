import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const BASE_URL = "https://unsplash.com";

interface RequestConfig {
  method: AxiosRequestConfig["method"];
  endpoint: string;
  config: AxiosRequestConfig;
}

export const request = async ({
  method,
  endpoint,
  config,
}: RequestConfig): Promise<AxiosResponse<any, any> | never> => {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response: AxiosResponse = await axios({
      method,
      url,
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      ...config,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
