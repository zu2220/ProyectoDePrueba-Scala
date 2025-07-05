import { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';

const FormularioInsumos = ({ agregarInsumo }) => {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [fat, setFat] = useState('');
  const [carbohydrates, setCarbohydrates] = useState('');
  const [protein, setProtein] = useState('');
  const [unit, setUnit] = useState('');
  const [supplier, setSupplier] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && calories && fat && carbohydrates && protein && unit) {
      const newSupply = {
        name,
        calories: parseFloat(calories),
        fat: parseFloat(fat),
        carbohydrates: parseFloat(carbohydrates),
        protein: parseFloat(protein),
        unit,
        supplier: supplier || null,
      };

      agregarInsumo(newSupply);
      console.log('Datos del insumo a enviar:', newSupply);
      setName('');
      setCalories('');
      setFat('');
      setCarbohydrates('');
      setProtein('');
      setUnit('');
      setSupplier('');
    } else {
      alert('Por favor, complete todos los campos obligatorios: Nombre, Calorías, Grasas, Carbohidratos, Proteínas y Unidad.');
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-success text-white">
        <h2 className="h5 mb-0">Registrar Nuevo Insumo</h2> 
      </div>
      <div className="card-body">
        <Box component="form" onSubmit={handleSubmit} sx={{ margin: '0 auto' }}>
          <Grid container spacing={2}>

            <Grid item xs={12}> 
              <TextField
                label="Nombre del Insumo"
                variant="outlined"
                fullWidth
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                margin="normal" 
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Calorías (kcal / 100g)"
                type="number"
                variant="outlined"
                fullWidth
                name="calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                required
                inputProps={{ step: "0.01" }}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Grasas (g / 100g)"
                type="number"
                variant="outlined"
                fullWidth
                name="fat"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                required
                inputProps={{ step: "0.01" }}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Carbohidratos (g / 100g)"
                type="number"
                variant="outlined"
                fullWidth
                name="carbohydrates"
                value={carbohydrates}
                onChange={(e) => setCarbohydrates(e.target.value)}
                required
                inputProps={{ step: "0.01" }}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Proteínas (g / 100g)"
                type="number"
                variant="outlined"
                fullWidth
                name="protein"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                required
                inputProps={{ step: "0.01" }}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Unidad de Medida (ej. g, ml, unidad)"
                variant="outlined"
                fullWidth
                name="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                required
                margin="normal"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Proveedor (Opcional)"
                variant="outlined"
                fullWidth
                name="supplier"
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
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
                Registrar Insumo
              </Button>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default FormularioInsumos;