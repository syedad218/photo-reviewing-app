import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const BASE_URL = "https://unsplash.com/";
export const API_URL = "https://api.unsplash.com/";

interface RequestConfig {
  method: AxiosRequestConfig["method"];
  endpoint: string;
  authEndpoint?: boolean;
  config: AxiosRequestConfig;
}

export default async function request({
  method,
  endpoint,
  authEndpoint,
  config,
}: RequestConfig): Promise<AxiosResponse<any, any> | never> {
  const url = `${authEndpoint ? BASE_URL : API_URL}${endpoint}`;
  try {
    throw new Error("Not implemented");
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
}
