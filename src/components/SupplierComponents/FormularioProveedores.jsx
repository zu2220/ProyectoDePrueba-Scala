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
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '600px', margin: '0 auto', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <Grid container spacing={2}>

        {/* Las props `item` ya no están, lo cual es correcto */}
        <Grid xs={12} sm={6}>
          <TextField
            label="Nombre del Proveedor"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Grid>
        {/* Campo Email */}
        <Grid xs={12} sm={6}>
          <TextField
            label="Email"
            type="email" 
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Grid>
        {/* Campo Teléfono */}
        <Grid xs={12} sm={6}>
          <TextField
            label="Teléfono"
            type="tel"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required 
          />
        </Grid>

        <Grid xs={12} sm={6}>
          <TextField
            label="Dirección"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required 
          />
        </Grid>

        <Grid xs={12}>
          <TextField
            label="Tipo de Suministro"
            variant="outlined"
            fullWidth
            value={supply}
            onChange={(e) => setSupply(e.target.value)}
            required 
          />
        </Grid>

        <Grid xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Registrar Proveedor
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormularioProveedores;