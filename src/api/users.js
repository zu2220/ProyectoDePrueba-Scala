import axiosInstance from "./axios";

export const getUsers = async () => axiosInstance.get('/users');
export const createUser = async (userData) => axiosInstance.post('/users', userData);