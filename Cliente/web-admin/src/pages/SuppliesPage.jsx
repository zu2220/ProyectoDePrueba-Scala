import React, { useState, useEffect } from "react";
import SideBar from "../components/general/SideBar";
import FormularioInsumos from "../components/SupplyComponents/FormularioInsumos";
import TablaInsumos from "../components/SupplyComponents/TablaInsumos";
import { useSupply } from "../context/SupplyContext";
function SuppliesPage() {

  const { supplies, loading, error, addSupply, editSupply, removeSupply } = useSupply();
  const [insumoSeleccionado, setInsumoSeleccionado] = useState(null);

  function handleSeleccionarInsumo(insumo) {
    if (!insumoSeleccionado) {
      setInsumoSeleccionado(insumo);
    } else {
      setInsumoSeleccionado(null);
    }
  }

  async function handleAgregarInsumo(insumo) {
    const success = await addSupply(insumo);

    if (success) {
      alert("Se guardó el insumo con éxito!");
    } else {
      alert("No se pudo guardar el insumo. Por favor, intente de nuevo.");
    }
  }

  async function handleActualizarInsumo(insumo) {
    const success = await editSupply(insumo);

    if (success) {
      alert("Se actualizó los datos del insumo con éxito!");
    } else {
      alert("No se pudo actualizar los datos del insumo. Por favor, intente de nuevo");
    }

    setInsumoSeleccionado(null);
  }

  async function handleEliminarInsumo(insumoId) {
    const success = await removeSupply(insumoId);

    if (success) {
      alert("Se eliminó el insumo con éxito!");
    } else {
      alert("No se pudo eliminar el insumo. Por favor, intente de nuevo.");
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex' }}>
        <SideBar />
        <div style={{ flexGrow: 1, padding: '20px' }}>
          <h1>Gestión de Insumos</h1>
          <p className="text-center text-muted">Cargando Insumos...</p>
        </div>
      </div>
    );
  }

  if(error){
    return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Gestión de Insumos</h1> 
        <p className="text-center text-danger">Error al cargar a los insumos.</p>
      </div>
    </div>
  );
  }

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Gestión de Insumos</h1>
        <FormularioInsumos agregarInsumo={handleAgregarInsumo} insumoSeleccionado={insumoSeleccionado} actualizarInsumo={handleActualizarInsumo} />
        <TablaInsumos supplies={supplies} seleccionarInsumo={handleSeleccionarInsumo} eliminarInsumo={handleEliminarInsumo} />
      </div>
    </div>
  );
}

export default SuppliesPage;