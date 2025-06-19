import axiosInstance from "./axios.js"; 

export const getSuppliers = async () => {
  try {
    const response = await axiosInstance.get("/suppliers");
    return response.data;
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    throw error;
  }
};

export const createSupplier = async (supplierData) => {
  try {
    const response = await axiosInstance.post("/suppliers", supplierData);
    return response.data;
  } catch (error) {
    console.error("Error al crear proveedor:", error);
    throw error;
  }
};