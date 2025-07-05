// src/api/clients.js
import axiosInstance from "./axios.js"; 

// Función para obtener todos los clientes
export const getClients = async () => {
  try {
    const response = await axiosInstance.get("/clients");
    return response.data;
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    throw error;
  }
};

// Función para crear un nuevo cliente
export const createClient = async (clientData) => {
  try {
    const response = await axiosInstance.post("/clients", clientData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el cliente:", error);
    throw error;
  }
};