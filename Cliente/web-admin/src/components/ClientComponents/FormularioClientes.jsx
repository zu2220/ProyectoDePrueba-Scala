import React, { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material'; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const FormularioClientes = ({ agregarCliente }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    birthdate: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDateChange = (newValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      birthdate: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone, address, birthdate } = formData;

    if (!name || !email || !phone) {
      alert('Por favor, complete los campos obligatorios marcados con *.');
      return;
    }

    const newClient = {
      name,
      email,
      phone,
      address: address || null,
      birthdate: birthdate ? birthdate.toISOString() : null,
    };

    agregarCliente(newClient);
    console.log('Datos del cliente a enviar:', newClient);

    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      birthdate: null,
    });
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-success text-white">
        <h2 className="h5 mb-0">Registrar Nuevo Cliente</h2>
      </div>
      <div className="card-body">
        <Box component="form" onSubmit={handleSubmit} sx={{ margin: '0 auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre *"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Email *"
                variant="outlined"
                fullWidth
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Teléfono *"
                variant="outlined"
                fullWidth
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Dirección (Opcional)"
                variant="outlined"
                fullWidth
                name="address"
                value={formData.address}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de Nacimiento (Opcional)"
                  value={formData.birthdate}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                REGISTRAR CLIENTE
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default FormularioClientes;