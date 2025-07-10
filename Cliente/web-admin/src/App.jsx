import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { OrderProvider } from './context/OrderContext';
import DashboardPage from './pages/DashboardPage';
import UsersPage from './pages/UsersPage';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';
import CustomersPage from './pages/CustomersPage';
import SuppliersPage from './pages/SuppliersPage';
import SuppliesPage from './pages/SuppliesPage';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <OrderProvider>
        <UserProvider>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/orders" element={<OrdersPage />} />
            <Route path="/users" element={<UsersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/clients" element={<CustomersPage />} />
          <Route path="/providers" element={<SuppliersPage />} />
          <Route path="/supplies" element={<SuppliesPage />} />
        </Routes>
        </UserProvider>
      </OrderProvider>
    </Router>
  );
}

export default App;