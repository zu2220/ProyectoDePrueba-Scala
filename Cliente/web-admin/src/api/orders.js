import axiosInstance from "./axios.js"; 

export const getOrders = async () => await axiosInstance.get("/orders");

export const createOrder = async (orderData) => await axiosInstance.post("/orders", orderData);

export const updateOrder = async (orderData) => await axiosInstance.put("/orders", orderData);

export const deleteOrder = async (id) => await axiosInstance.delete(`/orders/${id}`);