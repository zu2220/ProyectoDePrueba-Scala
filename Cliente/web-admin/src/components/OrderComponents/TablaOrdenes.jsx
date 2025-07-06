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


export default function TablaOrdenes({ orders, eliminarOrden }) {
  return (
    <div style={{ padding: '20px' }}>
      <TableContainer component={Paper} sx={{ mt: 4, mb: 4, borderRadius: 2, overflow: 'hidden' }}>
        <Table sx={{ minWidth: 700 }} aria-label="tabla de órdenes">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="left">Cliente</StyledTableCell>
              <StyledTableCell align="left">Producto</StyledTableCell>
              <StyledTableCell align="right">Monto Total</StyledTableCell>
              <StyledTableCell align="left">Fecha</StyledTableCell>
              <StyledTableCell align="left">Estado</StyledTableCell>
              <StyledTableCell align="left">Método de Pago</StyledTableCell>
              <StyledTableCell align="left">Notas</StyledTableCell>
              <StyledTableCell align="left">Acciones</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <StyledTableRow> 
                <StyledTableCell colSpan={8} align="center" sx={{ py: 3 }}> 
                  No hay órdenes registradas.
                </StyledTableCell>
              </StyledTableRow>
            ) : (
              orders.map((order, index) => (
                <StyledTableRow
                  key={order._id || index} 
                >
                  <StyledTableCell component="th" scope="row">
                    {order._id ? order._id.substring(order._id.length - 8) : 'N/A'} 
                  </StyledTableCell>
                  <StyledTableCell align="left">{order.customer_name}</StyledTableCell> 
                  <StyledTableCell align="left">{order.product_name}</StyledTableCell> 
                  <StyledTableCell align="right">
                    {typeof order.total_amount === 'number' 
                      ? `$${order.total_amount.toFixed(2)}` 
                      : `$${parseFloat(order.total_amount || 0).toFixed(2)}`}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {order.order_date ? new Date(order.order_date).toLocaleDateString('es-PE') : 'N/A'}
                  </StyledTableCell>
                  <StyledTableCell align="left">{order.status}</StyledTableCell>
                  <StyledTableCell align="left">{order.payment_method}</StyledTableCell>
                  <StyledTableCell align="left">{order.notes || 'N/A'}</StyledTableCell>
                  <StyledTableCell align="left">
                    <IconButton color="primary" aria-label="edit" size="small">
                      <Edit fontSize="inherit" />
                    </IconButton>
                    <IconButton color="secondary" aria-label="delete" size="small">
                      <Delete fontSize="inherit" onClick={()=>console.log(`order id: ${order.status}`)} />
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