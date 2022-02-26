import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

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
  config,
}: RequestConfig): Promise<AxiosResponse<any, any> | never> {
  const url = `${API_URL}${endpoint}`;
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
}
