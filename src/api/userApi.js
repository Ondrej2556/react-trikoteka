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

const registerUser = async (userData) => {
    return axiosInstance.get("/sign/up", userData);
};

const loginUser = async (userData) => {
    return axiosInstance.get("/sign/in", userData);
};

export {registerUser, loginUser}