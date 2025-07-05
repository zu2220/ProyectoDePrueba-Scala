import axiosInstance from "./axios.js"; 

export const getOrders = async () => {
  try {
    const response = await axiosInstance.get("/orders");
    return response.data;
  } catch (error) {
    console.error("Error al obtener órdenes:", error);
    throw error;
  }
};

export const createOrder = async (orderData) => await axiosInstance.post("/orders", orderData);
