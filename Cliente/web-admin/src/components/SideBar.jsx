import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SideBar.css'; 

function SideBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className="sidebar-container">
      <a href="/" className="sidebar-brand">
        <span className="fs-4">Admin</span> 
      </a>
      <hr className="sidebar-divider" />

      <ul className="sidebar-nav">
        <li className="sidebar-nav-item">
          <Link to="/dashboard" className="sidebar-nav-link">
            <i className="bi bi-speedometer2"></i> Dashboard
          </Link>
        </li>
        <li className="sidebar-nav-item">
          <Link to="/orders" className="sidebar-nav-link">
            <i className="bi bi-table"></i> Órdenes
          </Link>
        </li>
        <li className="sidebar-nav-item">
          <Link to="/users" className="sidebar-nav-link">
            <i className="bi bi-people"></i> Usuarios
          </Link>
        </li>
        <li className="sidebar-nav-item">
          <Link to="/products" className="sidebar-nav-link">
            <i className="bi bi-box"></i> Productos
          </Link>
        </li>
        <li className="sidebar-nav-item">
          <Link to="/clients" className="sidebar-nav-link">
            <i className="bi bi-person"></i> Clientes
          </Link>
        </li>
        <li className="sidebar-nav-item">
          <Link to="/providers" className="sidebar-nav-link">
            <i className="bi bi-truck"></i> Proveedores
          </Link>
        </li>
        <li className="sidebar-nav-item">
          <Link to="/supplies" className="sidebar-nav-link">
            <i className="bi bi-tools"></i> Insumos
          </Link>
        </li>
      </ul>
      <hr className="sidebar-divider" /> 

      <div className="mt-auto">
        <button
          className="btn btn-outline-danger sidebar-logout-btn"
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