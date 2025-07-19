import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles'; 
import { tableCellClasses } from '@mui/material/TableCell'; 
import dayjs from 'dayjs'; 
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


export default function TablaClientes({ clients, seleccionarCliente, eliminarCliente }) {
  return (
    <div style={{ padding: '20px', marginTop: '30px' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Listado de Clientes
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 4, mb: 4, borderRadius: 2, overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }} aria-label="tabla de clientes">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">Nombre</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Teléfono</StyledTableCell>
              <StyledTableCell align="left">Dirección</StyledTableCell>
              <StyledTableCell align="left">Fecha de Nacimiento</StyledTableCell>
              <StyledTableCell align='left'>Acciones</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {clients.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={6} align="center" sx={{ py: 3 }}> 
                  No hay clientes registrados.
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              clients.map((client, index) => (
                <StyledTableRow
                  key={client._id || index}
                >
                  <StyledTableCell component="th" scope="row">
                    {client._id ? client._id.substring(client._id.length - 8) : 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell align="left">{client.name}</StyledTableCell>
                  <StyledTableCell align="left">{client.email}</StyledTableCell>
                  <StyledTableCell align="left">{client.phone}</StyledTableCell>
                  <StyledTableCell align="left">{client.address || 'N/A'}</StyledTableCell>
                  <StyledTableCell align="left">
                    {client.birthdate ? dayjs(client.birthdate).format('DD/MM/YYYY') : 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell>
                    <IconButton color='primary' aria-label='edit' size='small' onClick={()=>seleccionarCliente(client)}>
                      <Edit fontSize='inherit'/>
                    </IconButton>
                    <IconButton color='secondary' aria-label='delete' size='small' onClick={()=>eliminarCliente(client._id)}>
                      <Delete fontSize='inherit'/>
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}