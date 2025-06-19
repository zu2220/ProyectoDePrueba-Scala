// Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { Home, Dashboard, Settings, People } from '@mui/icons-material';

import EuroIcon from '@mui/icons-material/Euro';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import InventoryIcon from '@mui/icons-material/Inventory';

const drawerWidth = 200;

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Typography variant="h6" sx={{ padding: 2 }}>
        Admin
      </Typography>
      <Divider />
      <List>
        { [
          
          { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
          { text: 'Users', icon: <People />, path: '/usuarios' },
          { text: 'Órdenes', icon: <EventAvailableIcon />, path: '/ordenes' },
          { text: 'Productos', icon: <SportsBarIcon />, path: '/productos' },
          { text: 'Clientes', icon: <TagFacesIcon />, path: '/clientes' },
          { text: 'Proveedores', icon: <InventoryIcon />, path: '/proveedores' },
          { text: 'Insumos', icon: <EuroIcon />, path: '/insumos' }
       
        ].map((item, index) => (
          <ListItem button key={index} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideBar;