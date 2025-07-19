import { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';

const FormularioProveedores = ({ agregarProveedor, proveedorSeleccionado, actualizarProveedor }) => {

  const emptyForm = {
    _id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    supply: '',
  }

  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (proveedorSeleccionado) {
      setIsEditing(true);
      setFormData({
        _id: proveedorSeleccionado._id || '',
        name: proveedorSeleccionado.name || '',
        email: proveedorSeleccionado.email || '',
        phone: proveedorSeleccionado.phone || '',
        address: proveedorSeleccionado.address || '',
        supply: proveedorSeleccionado.supply || '',
      })
    } else {
      setFormData(emptyForm);
      setIsEditing(false);
    }
  }, [proveedorSeleccionado])

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, address, supply } = formData;
    if (name && email && phone && address && supply) {
      if (proveedorSeleccionado) {
        actualizarProveedor(formData);
        setIsEditing(false);
      } else {
        agregarProveedor(formData);
        setFormData(emptyForm);
      }

    } else {
      alert('Por favor, complete todos los campos obligatorios.');
    }
  };

  if(isEditing){
     return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-success text-white">
        <h2 className="h5 mb-0">Registrar Proveedor</h2>
      </div>
      <div className="card-body">
        <Box component="form" onSubmit={handleSubmit} sx={{ margin: '0 auto' }}>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre del Proveedor"
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
                label="Email"
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

            <Grid item xs={12} sm={6}>
              <TextField
                label="Teléfono"
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
              <TextField
                label="Dirección"
                variant="outlined"
                fullWidth
                name="address"
                value={formData.address}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Tipo de Suministro"
                variant="outlined"
                fullWidth
                name="supply"
                value={formData.supply}
                onChange={handleChange} 
                required
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                EDITAR PROVEEDOR
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
        <h2 className="h5 mb-0">Registrar Proveedor</h2>
      </div>
      <div className="card-body">
        <Box component="form" onSubmit={handleSubmit} sx={{ margin: '0 auto' }}>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre del Proveedor"
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
                label="Email"
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

            <Grid item xs={12} sm={6}>
              <TextField
                label="Teléfono"
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
              <TextField
                label="Dirección"
                variant="outlined"
                fullWidth
                name="address"
                value={formData.address}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Tipo de Suministro"
                variant="outlined"
                fullWidth
                name="supply"
                value={formData.supply}
                onChange={handleChange} 
                required
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                REGISTRAR PROVEEDOR
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default FormularioProveedores;