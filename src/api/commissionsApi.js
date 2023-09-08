import axios from "axios";

const API_URL = "https://api.trikoteka.brainsov.com";
const TOKEN = "my_custom_token"

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${TOKEN}`
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