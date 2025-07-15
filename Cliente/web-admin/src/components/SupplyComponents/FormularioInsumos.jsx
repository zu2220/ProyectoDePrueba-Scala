import { useEffect, useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material';

const FormularioInsumos = ({ agregarInsumo, insumoSeleccionado, actualizarInsumo }) => {

  const emptyForm = {
    _id: '',
    name: '',
    calories: 0,
    fat: 0,
    carbohydrates: 0,
    protein: 0,
    unit: '',
    supplier: ''
  }

  const [formData, setFormData] = useState(emptyForm);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (insumoSeleccionado) {
      setIsEditing(true);
      setFormData({
        _id: insumoSeleccionado._id || '',
        name: insumoSeleccionado.name || '',
        calories: parseFloat(insumoSeleccionado.calories) || 0,
        fat: parseFloat(insumoSeleccionado.fat) || 0,
        carbohydrates: parseFloat(insumoSeleccionado.carbohydrates) || 0,
        protein: parseFloat(insumoSeleccionado.protein) || 0,
        unit: insumoSeleccionado.unit || '',
        supplier: insumoSeleccionado.supplier || ''
      })
    } else {
      setIsEditing(false);
      setFormData(emptyForm);
    }
  }, [insumoSeleccionado])

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {_id, name, calories, fat, carbohydrates, protein, unit, supplier} = formData;
    if (name && calories > 0 && fat > 0 && carbohydrates > 0 && protein > 0 && unit) {
      const newSupply = {
        _id,
        name,
        calories: parseFloat(calories),
        fat: parseFloat(fat),
        carbohydrates: parseFloat(carbohydrates),
        protein: parseFloat(protein),
        unit,
        supplier: supplier || null,
      };

      if(insumoSeleccionado){
        actualizarInsumo(newSupply);
      }else{
        agregarInsumo(newSupply);
      }
      setFormData(emptyForm);

    } else {
      alert('Por favor, complete todos los campos obligatorios: Nombre, Calorías, Grasas, Carbohidratos, Proteínas y Unidad.');
    }
  };

  if(isEditing){
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
                value={formData.name}
                onChange={handleChange}
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
                value={formData.calories}
                onChange={handleChange}
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
                value={formData.fat}
                onChange={handleChange}
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
                value={formData.carbohydrates}
                onChange={handleChange}
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
                value={formData.protein}
                onChange={handleChange}
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
                value={formData.unit}
                onChange={handleChange}
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
                value={formData.supplier}
                onChange={handleChange}
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
                Editar Insumo
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
                value={formData.name}
                onChange={handleChange}
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
                value={formData.calories}
                onChange={handleChange}
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
                value={formData.fat}
                onChange={handleChange}
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
                value={formData.carbohydrates}
                onChange={handleChange}
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
                value={formData.protein}
                onChange={handleChange}
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
                value={formData.unit}
                onChange={handleChange}
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
                value={formData.supplier}
                onChange={handleChange}
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