import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, InputLabel, Select, MenuItem, FormControl } from '@mui/material';

const FormularioRegistroProductos = ({ agregarProducto, productoSeleccionado, actualizarProducto }) => {

  const emptyForm = {
    _id: '',
    name: '',
    price: 0.0,
    stock: 0,
    rate: 0,
    category: '',
  }
  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (productoSeleccionado) {
      setIsEditing(true);
      setFormData({
        _id: productoSeleccionado._id || '',
        name: productoSeleccionado.name || '',
        price: productoSeleccionado.price || '',
        stock: productoSeleccionado.stock || '',
        rate: productoSeleccionado.rate || '',
        category: productoSeleccionado.category || '',
      });
    } else {
      setFormData(emptyForm);
    }
  }, [productoSeleccionado])



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: (name === 'price' || name === 'stock' || name === 'rate') ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, price, stock, rate, category } = formData;
    if (name && price >= 0 && stock >= 0 && rate >= 0 && category) {

      if (productoSeleccionado) {
        actualizarProducto(formData);
        setIsEditing(false)
      } else {
        agregarProducto(formData);
        setFormData({
          name: '',
          price: 0.0,
          stock: 0,
          rate: 0,
          category: '',
        });
      }

    } else {
      alert('Por favor, complete todos los campos obligatorios y asegúrese que los valores numéricos sean válidos.');
    }
  };

  if(productoSeleccionado){
    return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-success text-white">
        <h2 className="h5 mb-0">Registrar Nuevo Producto</h2>
      </div>
      <div className="card-body">
        <Box component="form" onSubmit={handleSubmit} sx={{ margin: '0 auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre del Producto"
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
                label="Precio"
                type="number"
                variant="outlined"
                fullWidth
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                margin="normal"
                inputProps={{ step: "0.01" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Stock"
                type="number"
                variant="outlined"
                fullWidth
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                margin="normal"
                inputProps={{ min: "0" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Calificación"
                type="number"
                variant="outlined"
                fullWidth
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                required
                margin="normal"
                inputProps={{ min: "0", max: "5", step: "0.1" }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required margin="normal">
                <InputLabel id="category-label">Categoría</InputLabel>
                <Select
                  labelId="category-label"
                  value={formData.category}
                  onChange={handleChange}
                  label="Categoría"
                  name="category"
                >
                  <MenuItem value=""><em>Seleccione una categoría</em></MenuItem>
                  <MenuItem value="Cerveza">Cerveza</MenuItem>
                  <MenuItem value="Gaseosa">Gaseosa</MenuItem>
                  <MenuItem value="Snack">Snack</MenuItem>
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
                Editar Producto
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
        <h2 className="h5 mb-0">Registrar Nuevo Producto</h2>
      </div>
      <div className="card-body">
        <Box component="form" onSubmit={handleSubmit} sx={{ margin: '0 auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre del Producto"
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
                label="Precio"
                type="number"
                variant="outlined"
                fullWidth
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                margin="normal"
                inputProps={{ step: "0.01" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Stock"
                type="number"
                variant="outlined"
                fullWidth
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                margin="normal"
                inputProps={{ min: "0" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Calificación"
                type="number"
                variant="outlined"
                fullWidth
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                required
                margin="normal"
                inputProps={{ min: "0", max: "5", step: "0.1" }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth required margin="normal">
                <InputLabel id="category-label">Categoría</InputLabel>
                <Select
                  labelId="category-label"
                  value={formData.category}
                  onChange={handleChange}
                  label="Categoría"
                  name="category"
                >
                  <MenuItem value=""><em>Seleccione una categoría</em></MenuItem>
                  <MenuItem value="Cerveza">Cerveza</MenuItem>
                  <MenuItem value="Gaseosa">Gaseosa</MenuItem>
                  <MenuItem value="Snack">Snack</MenuItem>
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
                Registrar Producto
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default FormularioRegistroProductos;