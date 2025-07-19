import axiosInstance from "./axios";

export const getUsers = async() => await axiosInstance.get('/users');

export const createUser = async (userData) => axiosInstance.post('/users', userData);

export const updateUser = async (userData) => axiosInstance.put("/users", userData);

export const deleteUser = async (userId) => axiosInstance.delete(`/users/${userId}`);