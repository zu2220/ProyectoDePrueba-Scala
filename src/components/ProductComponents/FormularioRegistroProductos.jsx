// FormularioRegistro.jsx
import { useState } from 'react';
import { TextField, Button, Box, Grid, InputLabel, Select, MenuItem, FormControl } from '@mui/material';

const FormularioRegistroProductos = ({ agregarProducto }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0.0);
  const [stock, setStock] = useState(0);
  const [rate, setRate] = useState(0);
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && price && stock && rate && category) {
      agregarProducto({ name, price, stock, rate, category});
      setName('');
      setPrice(0.0);
      setStock(0);
      setRate(0);
      setCategory('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '600px', margin: '0 auto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Producto"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Precio"
            type="number"
            variant="outlined"
            fullWidth
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Stock"
            type="number"
            variant="outlined"
            fullWidth
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Calificación"
            type="number"
            variant="outlined"
            fullWidth
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            required
          />
        </Grid>
        <Grid item xs={4}>
                  <FormControl fullWidth required>
                    <InputLabel id="rol-label">Categoría</InputLabel>
                    <Select
                      labelId="rol-label"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      label="Rol"
                    >
                      <MenuItem value="Cerveza">Cerveza</MenuItem>
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

export default FormularioRegistroProductos;
