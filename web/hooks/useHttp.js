import axios from "axios";
export const apiUrl = "http://localhost:9001/api";

const useHttps = () => {

  const http = axios.create({
    baseURL: apiUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const fileHttp = axios.create({
    baseURL: apiUrl,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return {
    http,
    fileHttp
  };
};

export default useHttps;
