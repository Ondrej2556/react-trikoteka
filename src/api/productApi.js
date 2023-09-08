import axios from "axios";

const API_URL = "https://api.trikoteka.brainsov.com";
const TOKEN = "EXAMPLE-TOKEN";

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

const getAllProducts = () => {
  return axiosInstance.get("/products");
};

const getProductById = (productId) => {
  return axiosInstance.get(`/product/${productId}`);
};

const deleteProductById = (productId) => {
  return axiosInstance.delete(`/product/${productId}`);
};


const getAllColors = () => {
  return axiosInstance.get("/colors");
};

const getAllCategories = () => {
  return axiosInstance.get("/categories");
};

const getAllKeywords = () => {
  return axiosInstance.get("/keywords");
};

const uploadMedia = (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile, imageFile.name);
  return axiosInstance.post("/media/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const createProduct = (productData) => {
  return axiosInstance.post("/product", productData);
};

const editProductById = (productId, productData) => {
  return axiosInstance.put(`/product/${productId}`, productData)
}

export {
  getAllProducts,
  getAllColors,
  getAllCategories,
  uploadMedia,
  createProduct,
  getAllKeywords,
  getProductById,
  deleteProductById,
  editProductById
};
