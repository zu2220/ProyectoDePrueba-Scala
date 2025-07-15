import axiosInstance from "./axios.js";

export const getProducts = async () => axiosInstance.get("/products");
export const createProduct = async (product) => await axiosInstance.post("/products", product);