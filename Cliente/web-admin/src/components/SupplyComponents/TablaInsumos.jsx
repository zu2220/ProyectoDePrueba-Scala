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

export default function TablaInsumos({ supplies }) { 
  return (
    <div style={{ padding: '20px', marginTop: '30px' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Listado de Insumos
      </Typography>
      <TableContainer component={Paper} sx={{ mt: 4, mb: 4, borderRadius: 2, overflow: 'hidden' }}>
        <Table sx={{ minWidth: 750 }} aria-label="tabla de insumos">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">Nombre</StyledTableCell>
              <StyledTableCell align="right">Calorías (kcal)</StyledTableCell>
              <StyledTableCell align="right">Grasas (g)</StyledTableCell>
              <StyledTableCell align="right">Carbohidratos (g)</StyledTableCell>
              <StyledTableCell align="right">Proteínas (g)</StyledTableCell>
              <StyledTableCell align="left">Unidad</StyledTableCell>
              <StyledTableCell align="left">Proveedor</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {supplies.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={8} align="center" sx={{ py: 3 }}>
                  No hay insumos registrados.
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              supplies.map((supply, index) => (
                <StyledTableRow
                  key={supply._id || index} 
                >

                  <StyledTableCell component="th" scope="row">
                    {supply._id || 'N/A'} 
                  </StyledTableCell>
                  <StyledTableCell align="left">{supply.name}</StyledTableCell>
                  <StyledTableCell align="right">{supply.calories}</StyledTableCell>
                  <StyledTableCell align="right">{supply.fat}</StyledTableCell>
                  <StyledTableCell align="right">{supply.carbohydrates}</StyledTableCell>
                  <StyledTableCell align="right">{supply.protein}</StyledTableCell>
                  <StyledTableCell align="left">{supply.unit}</StyledTableCell>
                  <StyledTableCell align="left">{supply.supplier || 'N/A'}</StyledTableCell>
                </StyledTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}