import React, { useState, useEffect } from "react";
import SideBar from "../components/general/SideBar";
import FormularioProveedores from "../components/SupplierComponents/FormularioProveedores";
import TablaProveedores from "../components/SupplierComponents/TablaProveedores";
import { createSupplier, getSuppliers } from "../api/suppliers.js";
import { useSupplier } from "../context/SupplierContext.jsx";

function SuppliersPage() {
  const { loading, error, suppliers, addSupplier, editSupplier, removeSupplier } = useSupplier();
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  function handleSeleccionarProveedor(proveedorSeleccionado) {
    if (!selectedSupplier) {
      setSelectedSupplier(proveedorSeleccionado);
    } else {
      setSelectedSupplier(null);
    }
  }

  async function handleAgregarProveedor(nuevoProveedor) {
    const success = await addSupplier(nuevoProveedor);
    if (success) {
      alert("Proveedor guardado con éxito!");
    } else {
      alert("No se pudo guardar al proveedor. Por favor, intente de nuevo.");
    }
  }

  async function handleActualizarProveedor(proveedorActualizado) {
    const success = await editSupplier(proveedorActualizado);
    if (success) {
      alert("Proveedor actualizado con éxito!");
    } else {
      alert("No se pudo actualizar al proveedor. Por favor, intente de nuevo.");
    }
    setSelectedSupplier(null);

  }

  async function handleEliminarProveedor(proveedorId) {
    const success = await removeSupplier(proveedorId);
    if (success) {
      alert("Proveedor eliminado con éxito!");
    } else {
      alert("No se pudo eliminar al proveedor. Por favor, intente de nuevo.");
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex' }}>
        <SideBar />
        <div style={{ flexGrow: 1, padding: '20px' }}>
          <h1>Gestión de Proveedores</h1>
          <p className="text-center text-muted">Cargando proveedores...</p>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div style={{ display: 'flex' }}>
        <SideBar />
        <div style={{ flexGrow: 1, padding: '20px' }}>
          <h1>Gestión de Proveedores</h1>
          <p className="text-center text-muted">Error al obtener a los proveedores...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Gestión de Proveedores</h1>
        <FormularioProveedores agregarProveedor={handleAgregarProveedor} proveedorSeleccionado = {selectedSupplier} actualizarProveedor={handleActualizarProveedor} />
        <TablaProveedores suppliers={suppliers} seleccionarProveedor={handleSeleccionarProveedor} eliminarProveedor={handleEliminarProveedor} />
      </div>
    </div>
  );
}

export default SuppliersPage;