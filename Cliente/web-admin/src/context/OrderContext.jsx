// src/context/OrderContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getOrders, createOrder, updateOrder, deleteOrder } from '../api/orders.js'; 

// Se define el contexto para las órdenes
// Este contexto se utilizará para compartir el estado de las órdenes en toda la aplicación
const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async (isRefresh = false) => {
    
    if(isRefresh){
      setIsRefreshing(true);
    } else{
      setLoading(true);
    }

    setError(null);
    try {
      const data = await getOrders();
      
      const processedData = data.map(order => {
        let dateString = order.order_date;

        // Nos aseguramos de que total_amount sea un número
        // Si no es un número, lo convertimos a 0
        const totalAmount = parseFloat(order.total_amount) || 0;

        if (typeof order.order_date === 'number') {
          const date = new Date(order.order_date);
          dateString = date.toISOString().slice(0, 10); 
        }

        return {
          ...order,
          order_date: dateString, 
          total_amount: totalAmount
        };
      });
      setOrders(processedData);
    } catch (err) {
      console.error("Error al obtener órdenes en el contexto:", err);
      setError(err);
    } finally {
      if(isRefreshing){
        setIsRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  const addOrder = async (newOrderData) => {
    setError(null);
    try {
      await createOrder(newOrderData);
      await fetchOrders(true); 
      return true;
    } catch (err) {
      console.error("Error al agregar orden en el contexto:", err);
      setError(err);
      return false;
    }
  };

  const editOrder = async (updatedOrder)=>{
    setError(null);
    try {
      await updateOrder(updatedOrder._id, updatedOrder);
      await fetchOrders(true); 
      return true;
    } catch (err) {
      console.error("Error al actualizar orden en el contexto:", err);
      setError(err);
      return false;
    }
  }

  const removeOrder = async (id) => {
    setError(null);
    try {
      await deleteOrder(id);
      await fetchOrders(true); 
      return true;
    } catch (err) {
      console.error("Error al eliminar orden en el contexto:", err);
      setError(err);
      return false;
    }
  }

  const clearOrders = () => {
    setOrders([]); 
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const contextValue = {
    orders,
    loading,
    error,
    fetchOrders,
    addOrder,
    editOrder,
    removeOrder,
    clearOrders, 
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};