import axiosInstance from "./axios.js"; 

export const getSuppliers = async () => await axiosInstance.get("/suppliers");

export const createSupplier = async (supplierData) => await axiosInstance.post("/suppliers", supplierData);

export const updateSupplier = async (supplierId, supplierData) => await axiosInstance.put(`/suppliers/${supplierId}`, supplierData);

export const deleteSupplier = async (supplierId) => await axiosInstance.delete(`/suppliers/${supplierId}`);