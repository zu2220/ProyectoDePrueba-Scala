import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, InputLabel, Select, MenuItem, FormControl } from '@mui/material';

const FormularioRegistroUsuarios = ({ agregarUsuario, usuarioSeleccionado, actualizarUsuario }) => {

  const emptyForm = {
  name: '',
  lastName: '',
  birthday: '',
  email: '',
  password: '',
  phone: '',
  role: '',
  };

  const [isEditingUser, setIsEditingUser] = useState(false);

  const [formData, setFormData] = useState(emptyForm);

useEffect(() => {
  if (usuarioSeleccionado) {
    setIsEditingUser(true);
    setFormData({
      name: usuarioSeleccionado.name || '',
      lastName: usuarioSeleccionado.lastName || '',
      birthday: usuarioSeleccionado.birthday || '',
      email: usuarioSeleccionado.email || '',
      password: usuarioSeleccionado.password || '',
      phone: usuarioSeleccionado.phone || '',
      role: usuarioSeleccionado.role || '',
    });
  } else {
    setIsEditingUser(false);
    setFormData(emptyForm);
  }
}, [usuarioSeleccionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, lastName, birthday, email, password, phone, role } = formData;
    if (name && lastName && birthday && email && password && phone && role) {
      if(usuarioSeleccionado){
        const usuarioActualizado = {
          "_id" : usuarioSeleccionado._id,
          "name" : formData.name,
          "lastName" : formData.lastName,
          "birthday" : formData.birthday,
          "email" : formData.email,
          "password" : formData.password,
          "phone" : formData.phone,
          "role" : formData.role
        };
        actualizarUsuario(usuarioActualizado);
      } else {
        agregarUsuario(formData);
        setFormData(emptyForm);
      }
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
    }
  };

  if(isEditingUser){
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
                name="name"
                value={formData.name}
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
                name="lastName"
                value={formData.lastName}
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
                name="birthday"
                value={formData.birthday}
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
                name="email"
                value={formData.email}
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
                name="password"
                value={formData.password}
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
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required margin="normal">
                <InputLabel id="role-label">Rol</InputLabel>
                <Select
                  labelId="role-label"
                  value={formData.role}
                  onChange={handleChange}
                  label="Rol"
                  name="role"
                >
                  <MenuItem value=""><em>Seleccione un role</em></MenuItem>
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
                Editar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
  }

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
                label="Name"
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
                label="Apellido"
                variant="outlined"
                fullWidth
                name="lastName"
                value={formData.lastName}
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
                name="birthday"
                value={formData.birthday}
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
                name="email"
                value={formData.email}
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
                name="password"
                value={formData.password}
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
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required margin="normal">
                <InputLabel id="role-label">Rol</InputLabel>
                <Select
                  labelId="role-label"
                  value={formData.role}
                  onChange={handleChange}
                  label="Rol"
                  name="role"
                >
                  <MenuItem value=""><em>Seleccione un role</em></MenuItem>
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