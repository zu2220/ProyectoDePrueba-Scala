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


export default function TablaProductos({ products, seleccionarProducto, eliminarProducto }) {

  return (
    <div style={{ padding: '20px' }}>
      <TableContainer component={Paper} sx={{ mt: 4, mb: 4, borderRadius: 2, overflow: 'hidden' }}>
        <Table sx={{ minWidth: 700 }} aria-label="tabla de productos">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Producto</StyledTableCell>
              <StyledTableCell align="right">Precio</StyledTableCell>
              <StyledTableCell align="right">Stock</StyledTableCell>
              <StyledTableCell align="right">Calificación</StyledTableCell>
              <StyledTableCell align="left">Categoría</StyledTableCell>
              <StyledTableCell align='left'>Acciones</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {products.length === 0 ? (
              <StyledTableRow>
                <StyledTableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  No hay productos registrados.
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              products.map((product, index) => (
                <StyledTableRow key={product._id || product.name || index}>
                  <StyledTableCell component="th" scope="row">
                    {product.name}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {typeof product.price === 'number'
                      ? `$${product.price.toFixed(2)}`
                      : `$${parseFloat(product.price || 0).toFixed(2)}`}
                  </StyledTableCell>
                  <StyledTableCell align='right'>{product.stock}</StyledTableCell>
                  <StyledTableCell align="right">{product.rate}</StyledTableCell>
                  <StyledTableCell align="left">{product.category}</StyledTableCell>
                  <StyledTableCell align="left">
                    <IconButton color="primary" aria-label="edit" size="small" onClick={() => seleccionarProducto(product)}>
                      <Edit fontSize="inherit" />
                    </IconButton>
                    <IconButton color="secondary" aria-label='delete' size="small" onClick={() => eliminarProducto(product._id)}>
                      <Delete fontSize='inherit' />
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