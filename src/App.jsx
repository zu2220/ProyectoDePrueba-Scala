import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import UsersPage from './pages/UsersPage'
import OrdersPage from './pages/OrdersPage'
import ProductsPage from './pages/ProductsPage'
import CustomersPage from './pages/CustomersPage'
import SuppliersPage from './pages/SuppliersPage'
import SuppliesPage from './pages/SuppliesPage'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/usuarios" element={<UsersPage/>} />
        <Route path="/ordenes" element={<OrdersPage/>} />
        <Route path="/productos" element={<ProductsPage/>} />
        <Route path="/clientes" element={<CustomersPage/>} />
        <Route path="/proveedores" element={<SuppliersPage/>} />
        <Route path="/insumos" element={<SuppliesPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
