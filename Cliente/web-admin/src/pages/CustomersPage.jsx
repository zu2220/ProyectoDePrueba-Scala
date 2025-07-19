import React, { useState, useEffect } from "react";
import SideBar from "../components/general/SideBar";
import FormularioClientes from "../components/ClientComponents/FormularioClientes";
import TablaClientes from "../components/ClientComponents/TablaClientes";
import {useClient} from "../context/ClientContext";

function ClientsPage() {
  const {clients, loading, error, addClient, editClient, removeClient} = useClient();
  const [clienteSeleccionado, setclienteSeleccionado] = useState(null);

  function handleSeleccionarCliente(cliente){
    if(!clienteSeleccionado){
      setclienteSeleccionado(cliente);
    } else {
      setclienteSeleccionado(null);
    }
  }

  async function handleAgregarCliente(cliente) {
    const success = await addClient(cliente);

    if(success){
      alert("Cliente guardado con éxito!");
    } else {
      alert("No se pudo guardar al cliente. Por favor, intente de nuevo");
    }
  }

  async function handleActualizarCliente(cliente) {
    const success = await editClient(cliente);

    if(success){
      alert("Cliente actualizado con éxito!");
    } else {
      alert("No se pudo actualizar los datos del cliente. Por favor, intente de nuevo.");
    }

    setclienteSeleccionado(null);
  }

  async function handleEliminarCliente(clienteId) {
    const success = await removeClient(clienteId);

    if(success) {
      alert("Cliente eliminado con éxito!");
    } else {
      alert("No se pudo eliminar al cliente. Por favor, intente de nuevo.");
    }
  }

  if(loading){
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Gestión de Clientes</h1>
        <p className="text-center text-muted">Cargando clientes...</p>
      </div>
    </div>
  }

  if(error) {
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Gestión de Clientes</h1>
        <p className="text-center text-danger">Error al cargar a los clientes</p>
      </div>
    </div>
  }

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Gestión de Clientes</h1>
        <FormularioClientes agregarCliente={handleAgregarCliente} clienteSeleccionado={clienteSeleccionado} actualizarCliente={handleActualizarCliente} />
        <TablaClientes clients={clients} seleccionarCliente={handleSeleccionarCliente} eliminarCliente={handleEliminarCliente}/>
      </div>
    </div>
  );
}

export default ClientsPage;