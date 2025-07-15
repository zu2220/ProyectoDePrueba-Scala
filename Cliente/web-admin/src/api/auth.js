import axios from './axios';

export const registerUser = async (userData) => {
    try {
        const res = await axios.post('/register', userData);
        return res.data; 
    } catch (error) {
        console.error('Error en registerUser API:', error);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const res = await axios.post('/login', credentials);
        return res.data;
    } catch (error) {
        console.error('Error en loginUser API:', error);
        throw error;
    }
};
