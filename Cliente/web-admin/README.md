# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## 🔐 Sistema de Login Implementado

### Archivos Creados:
- `src/pages/LoginPage.jsx` - Página de login con Bootstrap
- `src/components/ProtectedRoute.jsx` - Protección de rutas

### Archivos Modificados:
- `src/App.jsx` - Agregadas rutas protegidas
- `src/components/SideBar.jsx` - Agregado botón de logout
- `index.html` - Agregados iconos de Bootstrap

### Funcionalidades:
- ✅ Login con email y contraseña
- ✅ Protección de todas las rutas
- ✅ Persistencia de sesión
- ✅ Logout desde SideBar
- ✅ Estados de carga y validación
