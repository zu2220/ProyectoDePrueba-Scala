import FormularioRegistroUsuarios from "../components/UserComponents/FormularioRegistroUsuarios.jsx";
import SideBar from "../components/SideBar.jsx";
import TablaUsuarios from "../components/UserComponents/TablaUsuarios.jsx";
import { useState, useEffect } from "react";
import {createUser, getUsers} from "../api/users.js";
import { useUsers } from "../context/UserContext.jsx";

function UsersPage() {
const {users, loading, error, addUser, editUser, removeUser, clearUsers} = useUsers();

  async function handleAgregarUsuario(nuevoUsuario){
    const success = await addUser(nuevoUsuario);
    if (success) {
      alert("Usuario guardado con éxito!");
    } else {
      alert("Error al guardar el usuario. Por favor, intente de nuevo.");
    }
  }
<<<<<<< HEAD
  
=======

  async function handleActualizarUsuario(usuarioActualizado) {
    const success = await editUser(usuarioActualizado._id, usuarioActualizado);
    if (success) {
      alert("Usuario actualizado con éxito!");
    } else {
      alert("Error al actualizar el usuario. Por favor, intente de nuevo.");
    }
  }

  async function handleEliminarUsuario(id) {
    const success = await removeUser(id);
    if (success) {
      alert("Usuario eliminado con éxito!");
    } else {
      alert("Error al eliminar el usuario. Por favor, intente de nuevo.");
    }
  }

  function handleSeleccionarUsuario(usuario) {
    // Aquí puedes implementar la lógica para seleccionar un usuario
    // Por ejemplo, podrías abrir un modal con los detalles del usuario
    console.log("Usuario seleccionado:", usuario);
  }


  if (loading) return (
    <div style={{display: 'flex'}}>
      <SideBar />
      <div style={{flexGrow: 1, padding: '20px'}}>
        <h1>Gestión de Usuarios</h1>
        <p className="text-center text-muted">Cargando usuarios...</p>
      </div>
    </div>
  );
  if (error) return (
    <div style={{display: 'flex'}}>
      <SideBar />
      <div style={{flexGrow: 1, padding: '20px'}}>
        <h1>Gestión de Usuarios</h1>
        <p className="text-center text-danger">Error al cargar usuarios: {error.message}</p>
      </div>
    </div>
  );


>>>>>>> f/cambios
  return (
    <div style={{display: 'flex'}}>
      <SideBar />
      <div style={{flexGrow: 1, padding: '20px'}}>
<<<<<<< HEAD
        <FormularioRegistroUsuarios agregarUsuario={agregarUsuario} />
        <TablaUsuarios users={users} />
      </div>
=======
        <FormularioRegistroUsuarios agregarUsuario={handleAgregarUsuario} />
        <TablaUsuarios users={users} eliminarUsuario={handleActualizarUsuario}
        seleccionarUsuario={handleSeleccionarUsuario} />
    </div>
>>>>>>> f/cambios
    </div>
  );
}
export default UsersPage;