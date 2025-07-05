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


export default function Tablausers({users}) {
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
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {users.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  No hay usuarios registrados.
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              users.map((user, index) => (
                <StyledTableRow key={user._id || index}>
                  <StyledTableCell component="th" scope="row">
                    {user.nombre}
                  </StyledTableCell>
                  <StyledTableCell align='left'>{user.apellido}</StyledTableCell> 
                  <StyledTableCell align="left">
                    {user.nacimiento ? new Date(user.nacimiento).toLocaleDateString('es-PE') : 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell align="left">{user.correo}</StyledTableCell>
                  <StyledTableCell align="left">********</StyledTableCell>
                  <StyledTableCell align="left">{user.celular}</StyledTableCell>
                  <StyledTableCell align="left">{user.rol}</StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}