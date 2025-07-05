import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import FormularioClientes from "../components/ClientComponents/FormularioClientes";
import TablaClientes from "../components/ClientComponents/TablaClientes";
import { createClient, getClients } from "../api/clients.js";

function ClientsPage() {
  const [clients, setClients] = useState([]); 

  useEffect(() => {
    async function fetchClients() {
      try {
        const data = await getClients();
        setClients(data);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    }
    fetchClients();
  }, []);

  async function agregarCliente(nuevoCliente) {
    try {
      const response = await createClient(nuevoCliente);
      setClients([...clients, response]);
      alert("Cliente guardado con éxito!");
    } catch (error) {
      console.error("Error al agregar cliente:", error);
      alert("Error al guardar el cliente. Por favor, intente de nuevo.");
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <SideBar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <h1>Gestión de Clientes</h1>
        <FormularioClientes agregarCliente={agregarCliente} />
        <TablaClientes clients={clients} />
      </div>
    </div>
  );
}

export default ClientsPage;