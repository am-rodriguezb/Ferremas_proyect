// src/views/admin/FacturaAdmin.jsx
import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useNavigate } from 'react-router-dom'; // <-- Importa useNavigate
import axios from 'axios';

const FacturaAdmin = () => {
    const [pedidoId, setPedidoId] = useState('');
    const [factura, setFactura] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // <-- Inicializa el hook

    const buscarFactura = async (e) => {
        e.preventDefault();
        setError('');
        setFactura(null);

        try {
            // Usa la ruta real de tu backend
            const res = await fetch(`http://localhost:4000/api/reportes/factura/por-pedido/${pedidoId}`);
            const data = await res.json();

            if (!res.ok) throw new Error(data.message || 'No se encontró la factura.');
            setFactura(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const imprimir = () => window.print();

    const generarFactura = async (pedido_id) => {
        try {
            const res = await axios.post('http://localhost:4000/api/facturas/generar', {
                pedido_id
            });

            // Redirige a la vista de factura generada
            navigate(`/admin/factura-generada/${pedido_id}`);
        } catch (err) {
            console.error('Error al generar factura:', err);
            alert('No se pudo generar la factura');
        }
    };

    // Ejemplo de uso de navigate (puedes usarlo donde lo necesites)
    // const irADashboard = () => navigate('/admin/dashboard');

    return (
        <div className="d-flex">
            {/* Sidebar lateral */}
            <AdminSidebar />

            {/* Contenido principal */}
            <main className="flex-grow-1 p-4">
                <h2>📄 Buscar Factura por Pedido</h2>
                <form onSubmit={buscarFactura} className="row g-3 align-items-center my-4">
                    <div className="col-auto">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="ID del pedido"
                            value={pedidoId}
                            onChange={(e) => setPedidoId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">
                            Buscar
                        </button>
                    </div>
                </form>

                {error && <div className="alert alert-danger">{error}</div>}

                {factura && (
                    <div className="card mt-4 shadow">
                        <div className="card-body">
                            <h4>Factura #{factura.factura_id}</h4>
                            <p><strong>Pedido:</strong> {factura.pedido_id}</p>
                            <p>
                                <strong>Cliente:</strong> {factura.cliente?.nombre} {factura.cliente?.apellido} ({factura.cliente?.correo})
                            </p>
                            <p><strong>Total:</strong> ${factura.total}</p>
                            <p><strong>Tipo de entrega:</strong> {factura.tipo_entrega}</p>
                            <p><strong>Fecha:</strong> {new Date(factura.fecha_emision).toLocaleString()}</p>

                            <hr />
                            <h5>🛒 Detalles</h5>
                            <table className="table table-bordered mt-3">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {factura.detalles.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.nombre_producto}</td>
                                            <td>{item.cantidad}</td>
                                            <td>${item.precio_unitario}</td>
                                            <td>${item.subtotal}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <button className="btn btn-success mt-3" onClick={imprimir}>🖨 Imprimir</button>
                            {/* Botón para generar factura */}
                            <button
                                className="btn btn-primary mt-3 ms-2"
                                onClick={() => generarFactura(factura.pedido_id)}
                            >
                                Generar Factura
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default FacturaAdmin;