import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 

function SideBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column p-3 text-white bg-dark" style={{ width: '280px', minHeight: '100vh' }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4">Admin</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link text-white">
            <i className="bi bi-speedometer2"></i> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/orders" className="nav-link text-white">
            <i className="bi bi-table"></i> Órdenes
          </Link>
        </li>
        <li>
          <Link to="/users" className="nav-link text-white">
            <i className="bi bi-people"></i> Usuarios
          </Link>
        </li>
        <li>
          <Link to="/products" className="nav-link text-white">
            <i className="bi bi-box"></i> Productos
          </Link>
        </li>
        <li>
          <Link to="/clients" className="nav-link text-white">
            <i className="bi bi-person"></i> Clientes
          </Link>
        </li>
        <li>
          <Link to="/providers" className="nav-link text-white">
            <i className="bi bi-truck"></i> Proveedores
          </Link>
        </li>
        <li>
          <Link to="/supplies" className="nav-link text-white">
            <i className="bi bi-tools"></i> Insumos
          </Link>
        </li>
      </ul>
      <hr />
      <div className="mt-auto">
        <button
          className="btn btn-outline-danger w-100"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

export default SideBar;