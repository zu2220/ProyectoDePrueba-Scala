import { useState } from 'react';
import { TextField, Button, Box, Grid } from '@mui/material'; 

const FormularioProveedores = ({ agregarProveedor }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [supply, setSupply] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name && email && phone && address && supply) {
      agregarProveedor({ name, email, phone, address, supply });
      console.log({name, email, phone, address, supply});

      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setSupply('');
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
    }
  };

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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                margin="normal"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Tipo de Suministro"
                variant="outlined"
                fullWidth
                name="supply"
                value={supply}
                onChange={(e) => setSupply(e.target.value)}
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