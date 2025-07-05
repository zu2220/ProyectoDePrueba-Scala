import axiosInstance from "./axios.js"; 

export const getSupplies = async () => {
  try {
    const response = await axiosInstance.get("/supplies");
    return response.data;
  } catch (error) {
    console.error("Error al obtener insumos:", error);
    throw error;
  }
};

export const createSupply = async (supplyData) => {
  try {
    const response = await axiosInstance.post("/supplies", supplyData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el insumo:", error);
    throw error;
  }
};