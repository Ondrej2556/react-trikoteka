import axios from "axios";

const API_URL = "https://api.trikoteka.brainsov.com";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("Error:", error);
    throw error;
  }
);

const getCommissions = async () => {
    return axiosInstance.get("/commissions");
};

export {getCommissions}