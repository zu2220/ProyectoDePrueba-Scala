
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


export default function TablaProveedores({ suppliers }) {
  return (
    <div style={{ padding: '20px', marginTop: '30px' }}> 
      <Typography variant="h5" component="h2" gutterBottom>
        Listado de Proveedores
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 4, mb: 4, borderRadius: 2, overflow: 'hidden' }}>
        <Table sx={{ minWidth: 650 }} aria-label="tabla de proveedores">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell align="left">Email</StyledTableCell>
              <StyledTableCell align="left">Teléfono</StyledTableCell>
              <StyledTableCell align="left">Dirección</StyledTableCell>
              <StyledTableCell align="left">Suministro</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {suppliers.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  No hay proveedores registrados.
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              suppliers.map((supplier, index) => (
                <StyledTableRow
                  key={supplier._id || index} 
                >
                  <StyledTableCell component="th" scope="row">
                    {supplier.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">{supplier.email}</StyledTableCell>
                  <StyledTableCell align="left">{supplier.phone}</StyledTableCell>
                  <StyledTableCell align="left">{supplier.address || 'N/A'}</StyledTableCell>
                  <StyledTableCell align="left">{supplier.supply || 'N/A'}</StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}