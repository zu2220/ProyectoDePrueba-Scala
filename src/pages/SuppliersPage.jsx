// src/pages/SuppliersPage.jsx

import React, { useState, useEffect } from "react"; 
import SideBar from "../components/SideBar";
import FormularioProveedores from "../components/SupplierComponents/FormularioProveedores";
import TablaProveedores from "../components/SupplierComponents/TablaProveedores";
import { createSupplier, getSuppliers } from "../api/suppliers.js"; 

function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    async function fetchSuppliers() {
      try {
        const data = await getSuppliers(); 
        setSuppliers(data);
      } catch (error) {
        console.error("Error al obtener proveedores:", error);
      }
    }
    fetchSuppliers();
  }, []); 

  async function agregarProveedor(nuevoProveedor) {
    try {
      const createdSupplier = await createSupplier(nuevoProveedor);
      setSuppliers(prevSuppliers => [...prevSuppliers, createdSupplier]);
      alert("Proveedor guardado con éxito!");
    } catch (error) {
      console.error("Error al agregar proveedor:", error);
      alert("Error al guardar el proveedor. Por favor, intente de nuevo.");
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Gestión de Proveedores</h1> 
        <FormularioProveedores agregarProveedor={agregarProveedor} />
        <TablaProveedores suppliers={suppliers} />
      </div>
    </div>
  );
}

export default SuppliersPage;