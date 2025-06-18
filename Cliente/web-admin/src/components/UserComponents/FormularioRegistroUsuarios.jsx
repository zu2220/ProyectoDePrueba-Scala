// FormularioRegistro.jsx
import React, { useState } from 'react';
import { TextField, Button, Box, Grid, InputLabel, Select, MenuItem, FormControl } from '@mui/material';

const FormularioRegistroUsuarios = ({ agregarUsuario }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nacimiento, setNacimiento] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [celular, setCelular] = useState('');
  const [rol, setRol] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && apellido && nacimiento && correo && contrasena && celular && rol) {
      agregarUsuario({ nombre, apellido, nacimiento, correo, contrasena, celular, rol });
      setNombre('');
      setApellido('');
      setNacimiento('');
      setCorreo('');
      setContrasena('');
      setCelular('');
      setRol('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '600px', margin: '0 auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Apellido"
            variant="outlined"
            fullWidth
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Fecha de nacimiento"
            variant="outlined"
            fullWidth
            value={nacimiento}
            onChange={(e) => setNacimiento(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Correo Electrónico"
            type="email"
            variant="outlined"
            fullWidth
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contraseña"
            type="text"
            variant="outlined"
            fullWidth
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Número de Celular"
            type="tel"
            variant="outlined"
            fullWidth
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            required
          />
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth required>
            <InputLabel id="rol-label">Rol</InputLabel>
            <Select
              labelId="rol-label"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              label="Rol"
            >
              <MenuItem value="admin">Administrador</MenuItem>
              <MenuItem value="user">Usuario</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Registrar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormularioRegistroUsuarios;
