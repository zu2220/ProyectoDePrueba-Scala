import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/users.js';

// Crear el contexto
const UserContext = createContext();
UserContext.displayName = "UserContext";

// Hook personalizado para usar el contexto
export const useUsers = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async (isRefresh = false) => {

    if(isRefresh){
      setIsRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    try {
      const data = await getUsers();
      setUsers(data.data);
    } catch (err) {
      console.error("Error fetching users in context:", err);
      setError(err);
    } finally {
      if(isRefreshing){
        setIsRefreshing(false);
      } else {
        setLoading(false)
      }
    }
  };

  const addUser = async (newUserData) => {
    setError(null);
    try {
      await createUser(newUserData);
      await fetchUsers(true);
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
      await fetchUsers(true);
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
      setUsers(users.filter(user => user._id != userId))
      //await fetchUsers();
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
    clearUsers,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
