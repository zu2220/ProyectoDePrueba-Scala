import FormularioRegistroUsuarios from "../components/UserComponents/FormularioRegistroUsuarios.jsx";
import SideBar from "../components/SideBar.jsx";
import TablaUsuarios from "../components/UserComponents/TablaUsuarios.jsx";
import { useState, useEffect } from "react";
import {createUser, getUsers} from "../api/users.js";

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  async function agregarUsuario(nuevoUsuario){
    try {
      await createUser(nuevoUsuario);
      setUsers([...users, nuevoUsuario]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div style={{display: 'flex'}}>
      <SideBar />
      <div style={{flexGrow: 1, padding: '20px'}}>
        <FormularioRegistroUsuarios agregarUsuario={agregarUsuario} />
        <TablaUsuarios users={users} />
    </div>
    </div>
  );
}
export default UsersPage;