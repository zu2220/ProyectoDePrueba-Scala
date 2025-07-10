import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/users.js';

// Se define el contexto para los usuarios
// Este contexto se utilizará para compartir el estado de los usuarios en toda la aplicación   
const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    console.log('useUsers must be used within a UserProvider');
};
  return context;
};

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
        const data = await getUsers();
        setUsers(data);
        console.log("1. :" + data)
        console.log("2. :" + data.data)
        } catch (err) {
        console.error("Error fetching users in context:", err);
        setError(err);
        } finally {
        setLoading(false);
        }
    };
    
    const addUser = async (newUserData) => {
        setError(null);
        try {
        await createUser(newUserData);
        await fetchUsers(); 
        return true;
        } catch (err) {
        console.error("Error creating user:", err);
        setError(err);
        return false;
        }
    };
    
    const editUser = async (userId, userData) => {
        setError(null);
        try {
        await updateUser(userId, userData);
        await fetchUsers(); 
        return true;
        } catch (err) {
        console.error("Error editing user:", err);
        setError(err);
        return false;
        }
    };
    
    const removeUser = async (userId) => {
        setError(null);
        try {
        await deleteUser(userId);
        await fetchUsers(); 
        return true;
        } catch (err) {
        console.error("Error deleting user:", err);
        setError(err);
        return false;
        }
    };

    const clearUsers = () => {
        setUsers([]);
    };
    
    useEffect(() => {
        fetchUsers();
    }, []);
    
    const contextValue = {
        users,
        loading,
        error,
        addUser,
        editUser,
        removeUser,
        clearUsers
    };

    return (
            <UserContext.Provider value={contextValue}>
            {children}
            </UserContext.Provider>
        );
    }