import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { OrderProvider } from './context/OrderContext';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import CustomersPage from './pages/CustomersPage';
import SuppliersPage from './pages/SuppliersPage';
import SuppliesPage from './pages/SuppliesPage';
<<<<<<< HEAD
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
=======
import { UserProvider } from './context/UserContext';
>>>>>>> f/cambios

function App() {
  return (
    <Router>
      <OrderProvider>
        <UserProvider>
        <Routes>
<<<<<<< HEAD
          {/* Ruta pública */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Rutas protegidas */}
          <Route path="/" element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          } />
          <Route path="/products" element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          } />
          <Route path="/clients" element={
            <ProtectedRoute>
              <CustomersPage />
            </ProtectedRoute>
          } />
          <Route path="/providers" element={
            <ProtectedRoute>
              <SuppliersPage />
            </ProtectedRoute>
          } />
          <Route path="/supplies" element={
            <ProtectedRoute>
              <SuppliesPage />
            </ProtectedRoute>
          } />
=======
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/orders" element={<OrdersPage />} />
            <Route path="/users" element={<UsersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/clients" element={<CustomersPage />} />
          <Route path="/providers" element={<SuppliersPage />} />
          <Route path="/supplies" element={<SuppliesPage />} />
>>>>>>> f/cambios
        </Routes>
        </UserProvider>
      </OrderProvider>
    </Router>
  );
}

export default App;