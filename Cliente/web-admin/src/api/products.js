import axiosInstance from "./axios.js";

export const getProducts = async () => axiosInstance.get("/products");
export const createProduct = async (product) => await axiosInstance.post("/products", product);
export const updateProduct = async (productId, productData) => await axiosInstance.put(`/products/${productId}`, productData);
export const deleteProduct = async (productId) => await axiosInstance.delete(`/products/${productId}`);