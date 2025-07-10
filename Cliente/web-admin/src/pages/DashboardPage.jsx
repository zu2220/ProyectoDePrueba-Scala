import React, { useEffect, useRef } from "react";
import SideBar from "../components/SideBar"; 
import { useOrders } from "../context/OrderContext"; 
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns'; 

function DashboardPage() {
  const { orders, loading, error } = useOrders(); 
  const salesChartRef = useRef(null);
  const salesChartInstance = useRef(null);

  const paymentMethodChartRef = useRef(null);
  const paymentMethodChartInstance = useRef(null);

  useEffect(() => {
    if (salesChartInstance.current) {
      salesChartInstance.current.destroy();
      salesChartInstance.current = null;
    }
    if (paymentMethodChartInstance.current) {
      paymentMethodChartInstance.current.destroy();
      paymentMethodChartInstance.current = null;
    }

    if (orders.length > 0) {
      renderVentasChart(orders);
      renderPaymentMethodChart(orders);
    } else {
      if (salesChartInstance.current) {
        salesChartInstance.current.destroy();
        salesChartInstance.current = null;
      }
      if (paymentMethodChartInstance.current) {
        paymentMethodChartInstance.current.destroy();
        paymentMethodChartInstance.current = null;
      }
    }
    
    return () => {
      if (salesChartInstance.current) {
        salesChartInstance.current.destroy();
        salesChartInstance.current = null;
      }
      if (paymentMethodChartInstance.current) {
        paymentMethodChartInstance.current.destroy();
        paymentMethodChartInstance.current = null;
      }
    };
  }, [orders]);

  const renderVentasChart = (currentOrders) => {
    const ctx = salesChartRef.current.getContext('2d');

    const salesByDate = currentOrders.reduce((acc, order) => {
      const date = order.order_date; 
      if (date && typeof order.total_amount === 'number') {
        acc[date] = (acc[date] || 0) + order.total_amount;
      }
      return acc;
    }, {});

    const sortedDates = Object.keys(salesByDate).sort(); 
    const chartLabels = sortedDates; 
    const chartData = sortedDates.map(date => salesByDate[date]);

    salesChartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Ventas Totales por Día', 
          data: chartData,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          barPercentage: 0.9, 
          categoryPercentage: 0.7 
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Ventas Totales Diarias' 
          }
        },
        scales: {
          x: {
            type: 'time', 
            time: {
              unit: 'day', 
              tooltipFormat: 'dd/MM/yyyy', 
              displayFormats: {
                day: 'dd/MM/yyyy', 
              },
            },
            title: {
              display: true,
              text: 'Fecha' 
            },
            ticks: {
              autoSkip: true, 
              maxRotation: 45, 
              minRotation: 0,
            }
          },
          y: {
            beginAtZero: true, 
            title: {
              display: true,
              text: 'Monto Total de Ventas' 
            }
          }
        }
      }
    });
  };

  const renderPaymentMethodChart = (currentOrders) => {
    const ctx = paymentMethodChartRef.current.getContext('2d');

    const paymentMethodCounts = currentOrders.reduce((acc, order) => {
      const method = order.payment_method || 'Desconocido';
      acc[method] = (acc[method] || 0) + 1;
      return acc;
    }, {});

    const chartLabels = Object.keys(paymentMethodCounts);
    const chartData = Object.values(paymentMethodCounts);

    const backgroundColors = [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(255, 159, 64, 0.6)'
    ];
    const borderColors = [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ];

    paymentMethodChartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Órdenes por Método de Pago',
          data: chartData,
          backgroundColor: backgroundColors.slice(0, chartLabels.length),
          borderColor: borderColors.slice(0, chartLabels.length),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Cantidad de Órdenes por Método de Pago'
          }
        }
      }
    });
  };

  if (loading) return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <SideBar />
      <div className="flex-grow-1 p-4">
        <h1 className="mb-4">Dashboard de Ventas</h1>
        <p className="text-center text-muted">Cargando datos del dashboard...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <SideBar />
      <div className="flex-grow-1 p-4">
        <h1 className="mb-4">Dashboard de Ventas</h1>
        <p className="text-center text-danger">Error al cargar datos del dashboard: {error.message}</p>
      </div>
    </div>
  );

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <SideBar />
      <div className="flex-grow-1 p-4">
        <h1 className="mb-4">Dashboard de Ventas</h1>
        <p className="lead">Bienvenido al panel de control de ventas. Aquí puedes ver un resumen de tu rendimiento.</p>

        <div className="row">
          <div className="col-12 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h2 className="h5 mb-0">Ventas Totales Diarias</h2> 
              </div>
              <div className="card-body">
                <div style={{ position: 'relative', height: '350px', width: '100%' }}>
                  {orders.length > 0 ? (
                    <canvas ref={salesChartRef}></canvas>
                  ) : (
                    <p className="text-center text-muted">No hay órdenes para mostrar o no se han cargado.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 mb-4 d-flex justify-content-center"> 
            <div className="card shadow-sm" style={{ maxWidth: '600px', width: '100%' }}>
              <div className="card-header bg-info text-white">
                <h2 className="h5 mb-0">Órdenes por Método de Pago</h2>
              </div>
              <div className="card-body">
                <div style={{ position: 'relative', height: '350px', width: '100%' }}>
                  {orders.length > 0 ? (
                    <canvas ref={paymentMethodChartRef}></canvas>
                  ) : (
                    <p className="text-center text-muted">No hay órdenes para mostrar o no se han cargado.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;