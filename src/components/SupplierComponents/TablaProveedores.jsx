// src/components/SupplierComponents/TablaProveedores.jsx

import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function TablaProveedores({ suppliers }) {
  return (
    <div style={{ padding: '20px' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="tabla de proveedores">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Teléfono</TableCell>
              <TableCell align="left">Dirección</TableCell>
              <TableCell align="left">Suministro</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">No hay proveedores registrados.</TableCell>
              </TableRow>
            ) : (
              suppliers.map((supplier, index) => (
                <TableRow
                  key={index} // Se cambió de supplier.email a index para evitar la advertencia de clave duplicada
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {supplier.name}
                  </TableCell>
                  <TableCell align="left">{supplier.email}</TableCell>
                  <TableCell align="left">{supplier.phone}</TableCell>
                  <TableCell align="left">{supplier.address}</TableCell>
                  <TableCell align="left">{supplier.supply}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}