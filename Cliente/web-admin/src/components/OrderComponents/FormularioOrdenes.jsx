import React, { useState } from 'react';

function FormularioOrdenes({ agregarOrden }) {
  const [formData, setFormData] = useState({
    customer_name: '',
    product_name: '',
    total_amount: '',
    order_date: '',
    status: 'Pendiente',
    payment_method: 'Efectivo',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderDateFormatted = formData.order_date;
    const newOrder = {
      ...formData,
      total_amount: parseFloat(formData.total_amount),
      order_date: orderDateFormatted, 
    };

    const success = await agregarOrden(newOrder);
    if (success) {
      setFormData({
        customer_name: '',
        product_name: '',
        total_amount: '',
        order_date: '',
        status: 'Pendiente',
        payment_method: 'Efectivo',
        notes: '',
      });
    }
  };

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header bg-success text-white">
        <h2 className="h5 mb-0">Agregar Nueva Orden</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="customer_name" className="form-label">Nombre del Cliente</label>
              <input
                type="text"
                className="form-control"
                id="customer_name"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="product_name" className="form-label">Nombre del Producto</label>
              <input
                type="text"
                className="form-control"
                id="product_name"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="total_amount" className="form-label">Monto Total</label>
              <input
                type="number"
                className="form-control"
                id="total_amount"
                name="total_amount"
                value={formData.total_amount}
                onChange={handleChange}
                step="0.01"
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="order_date" className="form-label">Fecha de Orden</label>
              <input
                type="date"
                className="form-control"
                id="order_date"
                name="order_date"
                value={formData.order_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="status" className="form-label">Estado</label>
              <select
                className="form-select"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Completado">Completado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="payment_method" className="form-label">Método de Pago</label>
            <select
              className="form-select"
              id="payment_method"
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
            >
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta">Tarjeta</option>
              <option value="Transferencia">Transferencia</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="notes" className="form-label">Notas</label>
            <textarea
              className="form-control"
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Guardar Orden</button>
        </form>
      </div>
    </div>
  );
}

export default FormularioOrdenes;