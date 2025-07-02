import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [ventasMes, setVentasMes] = useState(0);
    const [pedidosMes, setPedidosMes] = useState(0);
    const [stockCritico, setStockCritico] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // Total ventas del mes
        axios.get('http://localhost:4000/api/reportes/ventas', { headers })
            .then(res => {
                if (res.data.length > 0) {
                    setVentasMes(Number(res.data[0].total_ventas) || 0);
                } else {
                    setVentasMes(0);
                }
            });

        // Total pedidos del mes
        axios.get('http://localhost:4000/api/reportes/pedidos', { headers }) // pedidos del mes
            .then(res => {
                const pedidosEsteMes = res.data.filter(p => {
                    const fecha = new Date(p.fecha);
                    const ahora = new Date();
                    return fecha.getMonth() === ahora.getMonth() && fecha.getFullYear() === ahora.getFullYear();
                });
                setPedidosMes(pedidosEsteMes.length);
            });

        // Productos con bajo o sin stock
        axios.get('http://localhost:4000/api/reportes/stock-bajo', { headers }) // productos críticos
            .then(res => {
                setStockCritico(res.data.length);
            });
    }, []);

    return (
        <div className="d-flex">
            {/* Menú lateral */}
            <AdminSidebar />

            {/* Contenido principal */}
            <main className="flex-grow-1 p-4">
                <h2 className="mb-4">📊 Panel de Administración</h2>

                <div className="row g-4 mb-5">
                    <div className="col-md-4">
                        <div className="card text-white bg-success shadow">
                            <div className="card-body">
                                <h5 className="card-title">💰 Ventas del mes</h5>
                                <p className="display-6">${(ventasMes || 0).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card text-white bg-primary shadow">
                            <div className="card-body">
                                <h5 className="card-title">📦 Pedidos este mes</h5>
                                <p className="display-6">{pedidosMes}</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card text-white bg-danger shadow">
                            <div className="card-body">
                                <h5 className="card-title">⚠️ Productos críticos</h5>
                                <p className="display-6">{stockCritico}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card border-primary h-100">
                            <div className="card-body">
                                <h5 className="card-title">Pedidos recientes</h5>
                                <p className="card-text">Visualiza y gestiona pedidos pendientes.</p>
                                <Link to="/admin/resumen-pedidos" className="btn btn-primary btn-sm">Ver pedidos</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card border-success h-100">
                            <div className="card-body">
                                <h5 className="card-title">Facturación</h5>
                                <p className="card-text">Consulta y administra facturas emitidas.</p>
                                <Link to="/admin/factura" className="btn btn-success btn-sm">Ver facturas</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card border-info h-100">
                            <div className="card-body">
                                <h5 className="card-title">Usuarios y sucursales</h5>
                                <p className="card-text">Gestiona empleados y sucursales del sistema.</p>
                                <Link to="/admin/usuarios" className="btn btn-info btn-sm">Gestionar usuarios</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    className="btn btn-outline-danger mt-5"
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = '/';
                    }}
                >
                    Cerrar sesión
                </button>
            </main>
        </div>
    );
};

export default Dashboard;