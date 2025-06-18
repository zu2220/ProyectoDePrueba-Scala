import FormularioRegistroUsuarios from "../components/UserComponents/FormularioRegistroUsuarios.jsx";
import SideBar from "../components/SideBar.jsx";
import TablaUsuarios from "../components/UserComponents/TablaUsuarios.jsx";
import { useState } from "react";
import {createUser} from "../api/users.js";

function UsersPage() {
  const [users, setUsers] = useState([]);
  async function agregarUsuario(nuevoUsuario){
    try {
      await createUser(nuevoUsuario);
      setUsers([...users, nuevoUsuario]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <SideBar />
      <h1>Users Page</h1>
      <FormularioRegistroUsuarios agregarUsuario={agregarUsuario} />
      <TablaUsuarios users={users} />
    </div>
  );
}
export default UsersPage;