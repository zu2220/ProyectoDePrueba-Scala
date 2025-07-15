import axiosInstance from "./axios";

export const getUsers = async () => axiosInstance.get('/users');
export const createUser = async (userData) => axiosInstance.post('/users', userData);
export const updateUser = async (userId, userData) => axiosInstance.put(`/users/${userId}`, userData);
export const deleteUser = async (userId) => axiosInstance.delete(`/users/${userId}`);