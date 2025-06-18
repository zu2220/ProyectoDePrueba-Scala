import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getUsers } from '../../api/users';


export default function Tablausers({users}) {
  //const [users, setusers] = useState([]);
  // useEffect(() => {
  //   const fetchusers = async () => {
  //     try {
  //       const response = await getUsers();
  //       setusers(response.data);
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     }
  //   };
  //   fetchusers();
  // }, []);
  return (
    <div style={{ marginLeft: '220px', padding: '20px' }}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Nombre</TableCell>
            <TableCell align="right">Apellido</TableCell>
            <TableCell align="right">Fecha de nacimiento</TableCell>
            <TableCell align="right">Correo</TableCell>
            <TableCell align="right">Contraseña</TableCell>
            <TableCell align="right">Celular</TableCell>
            <TableCell align="right">Rol</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.nombre}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.apellido}
              </TableCell>
              <TableCell align="right">{user.calories}</TableCell>
              <TableCell align="right">{user.fecha_nacimiento}</TableCell>
              <TableCell align="right">{user.correo}</TableCell>
              <TableCell align="right">{user.contrasena}</TableCell>
              <TableCell align="right">{user.celular}</TableCell>
              <TableCell align="right">{user.rol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
