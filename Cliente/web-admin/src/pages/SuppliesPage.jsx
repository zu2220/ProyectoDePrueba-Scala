import React, { useState, useEffect } from "react"; 
import SideBar from "../components/SideBar";
import FormularioInsumos from "../components/SupplyComponents/FormularioInsumos"; 
import TablaInsumos from "../components/SupplyComponents/TablaInsumos"; 
import { createSupply, getSupplies } from "../api/supplies.js"; 

function SuppliesPage() {
  const [supplies, setSupplies] = useState([]);

  useEffect(() => {
    async function fetchSupplies() {
      try {
        const data = await getSupplies(); 
        setSupplies(data); 
      } catch (error) {
        console.error("Error al obtener insumos:", error); 
      }
    }
    fetchSupplies(); 
  }, []); 

  async function agregarInsumo(nuevoInsumo) { 
    try {
      const response = await createSupply(nuevoInsumo);
      setSupplies([...supplies, response]); 
      alert("Insumo guardado con éxito!"); 
    } catch (error) {
      console.error("Error al agregar insumo:", error); 
      alert("Error al guardar el insumo. Por favor, intente de nuevo."); 
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Gestión de Insumos</h1> 
        <FormularioInsumos agregarInsumo={agregarInsumo} /> 
        <TablaInsumos supplies={supplies} /> 
      </div>
    </div>
  );
}

export default SuppliesPage;