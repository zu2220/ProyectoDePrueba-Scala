// src/api/clients.js
import axiosInstance from "./axios.js"; 

// Función para obtener todos los clientes
export const getClients = async () => axiosInstance.get("/clients");

// Función para crear un nuevo cliente
export const createClient = async (clientData) => axiosInstance.post("/clients", clientData);

// Función para actualizar a un cliente
export const updateClient = async (clientId, clientData) => axiosInstance.put(`/clients/${clientId}`, clientData);

// Función para eliminar a un cliente
export const deleteClient = async (clientId) => axiosInstance.delete(`/clients/${clientId}`);