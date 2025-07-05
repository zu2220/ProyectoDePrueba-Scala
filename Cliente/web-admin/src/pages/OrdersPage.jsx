import React from "react";
import SideBar from "../components/SideBar"; 
import FormularioOrdenes from "../components/OrderComponents/FormularioOrdenes"; 
import TablaOrdenes from "../components/OrderComponents/TablaOrdenes"; 
import { useOrders } from "../context/OrderContext";

function OrdersPage() {
  const { orders, addOrder, loading, error, clearOrders } = useOrders(); 

  async function handleAgregarOrden(nuevaOrden) {
    const success = await addOrder(nuevaOrden);
    if (success) {
      alert("Orden guardada con éxito!");
    } else {
      alert("Error al guardar la orden. Por favor, intente de nuevo.");
    }
  }

  if (loading) return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Gestión de Órdenes de Venta</h1>
        <p className="text-center text-muted">Cargando órdenes...</p>
      </div>
    </div>
  );
  if (error) return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Gestión de Órdenes de Venta</h1>
        <p className="text-center text-danger">Error al cargar órdenes: {error.message}</p>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Gestión de Órdenes de Venta</h1>
        <FormularioOrdenes agregarOrden={handleAgregarOrden} />

        <TablaOrdenes orders={orders} />
      </div>
    </div>
  );
}

export default OrdersPage;