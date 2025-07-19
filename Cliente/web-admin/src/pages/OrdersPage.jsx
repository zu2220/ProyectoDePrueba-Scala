import React, {useState} from "react";
import SideBar from "../components/general/SideBar"; 
import FormularioOrdenes from "../components/OrderComponents/FormularioOrdenes"; 
import TablaOrdenes from "../components/OrderComponents/TablaOrdenes"; 
import { useOrders } from "../context/OrderContext";

function OrdersPage() {
  const { orders, addOrder, editOrder, removeOrder, loading, error } = useOrders(); 
  const [selectedOrder, setSelectedOrder] = useState(null);

  async function handleAgregarOrden(nuevaOrden) {
    const success = await addOrder(nuevaOrden);
    if (success) {
      alert("Orden guardada con éxito!");
    } else {
      alert("Error al guardar la orden. Por favor, intente de nuevo.");
    }
  }

  async function handleActualizarOrden(ordenActualizada) {
    console.log("id de la orden: " + ordenActualizada._id);
    const success = await editOrder(ordenActualizada);
    if (success) {
      alert("Orden actualizada con éxito!");
      setSelectedOrder(null);
    } else {
      alert("Error al actualizar la orden. Por favor, intente de nuevo.");
      setSelectedOrder(null);
    }
  }

  async function handleEliminarOrden(id) {
    const success = await removeOrder(id);
    if (success) {
      alert("Orden eliminada con éxito!");
    } else {
      alert("Error al eliminar la orden. Por favor, intente de nuevo.");
    }
  }

  function handleSeleccionarOrden(order){
    if(!selectedOrder) {
      setSelectedOrder(order);
    } else {
      setSelectedOrder(null);
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
        <FormularioOrdenes agregarOrden={handleAgregarOrden}
        actualizarOrden={handleActualizarOrden} ordenSeleccionada={selectedOrder} />
        <TablaOrdenes orders={orders}
        eliminarOrden={handleEliminarOrden} seleccionarOrden={handleSeleccionarOrden} />
      </div>
    </div>
  );
}

export default OrdersPage;