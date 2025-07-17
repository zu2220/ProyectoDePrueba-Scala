// src/pages/RegisterPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.nombre || !formData.apellido || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor completa todos los campos.');
      setLoading(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Usuario registrado simulado:', formData.email);

      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      navigate('/login'); 

    } catch (err) {
      console.error('Error durante el registro:', err);
      setError(err.response?.data?.message || 'Error al registrar usuario. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="text-primary fw-bold">Registro de Usuario</h2>
                <p className="text-muted">Crea una nueva cuenta</p>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="apellido" className="form-label">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleTogglePasswordVisibility}
                    >
                      <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                  <div className="input-group">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleToggleConfirmPasswordVisibility}
                    >
                      <i className={`bi bi-eye${showConfirmPassword ? '-slash' : ''}`}></i>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 py-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Registrando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-person-plus me-2"></i>
                      Registrar
                    </>
                  )}
                </button>
              </form>

              <div className="text-center mt-3">
                <p>¿Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;