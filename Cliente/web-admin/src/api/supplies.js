import axiosInstance from "./axios.js"; 

export const getSupplies = async () => axiosInstance.get("/supplies");

export const createSupply = async (supplyData) => axiosInstance.post("/supplies", supplyData);

export const updateSupply = async (supplyData) => axiosInstance.put("/supplies", supplyData);

export const deleteSupply = async (supplyId) => axiosInstance.delete(`/supplies/${supplyId}`);