import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { IconButton } from '@mui/material';
import {Edit, Delete} from '@mui/icons-material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main, 
    color: theme.palette.common.white,
    fontWeight: 'bold', 
    fontSize: 16, 
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14, 
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover, 
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
    cursor: 'pointer',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function 


Tablausers({users, eliminarUsuario, seleccionarUsuario}) {
  console.log("users: " + users.data)
  return (
    <div style={{ padding: '20px' }}>
      <TableContainer component={Paper} sx={{ mt: 4, mb: 4, borderRadius: 2, overflow: 'hidden' }}> 
        <Table sx={{ minWidth: 700 }} aria-label="tabla de usuarios"> 
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell align="left">Apellido</StyledTableCell>
              <StyledTableCell align="left">Fecha de Nacimiento</StyledTableCell> 
              <StyledTableCell align="left">Correo</StyledTableCell> 
              <StyledTableCell align="left">Contraseña</StyledTableCell> 
              <StyledTableCell align="left">Celular</StyledTableCell> 
              <StyledTableCell align="left">Rol</StyledTableCell> 
              <StyledTableCell align="left">Acciones</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(users) && users.map((user, idx) => (
              <StyledTableRow key={user.id || idx}>
                <StyledTableCell>{user.nombre}</StyledTableCell>
                <StyledTableCell align="left">{user.apellido}</StyledTableCell>
                <StyledTableCell align="left">{user.fechaNacimiento}</StyledTableCell>
                <StyledTableCell align="left">{user.correo}</StyledTableCell>
                <StyledTableCell align="left">{user.contraseña}</StyledTableCell>
                <StyledTableCell align="left">{user.celular}</StyledTableCell>
                <StyledTableCell align="left">{user.rol}</StyledTableCell>
                <StyledTableCell align="left">
                  <IconButton onClick={() => seleccionarUsuario(user)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => eliminarUsuario(user.id)}>
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}