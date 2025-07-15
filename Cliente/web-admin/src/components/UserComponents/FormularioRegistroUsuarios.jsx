import React, { useState } from 'react';
import { TextField, Button, Box, Grid, InputLabel, Select, MenuItem, FormControl } from '@mui/material';

const FormularioRegistroUsuarios = ({ agregarUsuario }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    nacimiento: '',
    correo: '',
    contrasena: '',
    celular: '',
    rol: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, apellido, nacimiento, correo, contrasena, celular, rol } = formData;
    if (nombre && apellido && nacimiento && correo && contrasena && celular && rol) {
      agregarUsuario(formData);
      setFormData({
        nombre: '',
        apellido: '',
        nacimiento: '',
        correo: '',
        contrasena: '',
        celular: '',
        rol: '',
      });
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-success text-white">
        <h2 className="h5 mb-0">Registrar Nuevo Usuario</h2>
      </div>
      <div className="card-body">
        <Box component="form" onSubmit={handleSubmit} sx={{ margin: '0 auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Apellido"
                variant="outlined"
                fullWidth
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Fecha de Nacimiento"
                type="date"
                variant="outlined"
                fullWidth
                name="nacimiento"
                value={formData.nacimiento}
                onChange={handleChange}
                required
                InputLabelProps={{ shrink: true }}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo Electrónico"
                type="email"
                variant="outlined"
                fullWidth
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Número de Celular"
                type="tel"
                variant="outlined"
                fullWidth
                name="celular"
                value={formData.celular}
                onChange={handleChange}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required margin="normal">
                <InputLabel id="rol-label">Rol</InputLabel>
                <Select
                  labelId="rol-label"
                  value={formData.rol}
                  onChange={handleChange}
                  label="Rol"
                  name="rol"
                >
                  <MenuItem value=""><em>Seleccione un rol</em></MenuItem>
                  <MenuItem value="admin">Administrador</MenuItem>
                  <MenuItem value="user">Usuario</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                fullWidth
                sx={{ mt: 2 }}
              >
                Registrar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default FormularioRegistroUsuarios;