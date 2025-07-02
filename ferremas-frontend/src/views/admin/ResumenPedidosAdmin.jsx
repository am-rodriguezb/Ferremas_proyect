import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResumenPedidosAdmin = () => {
    const [pedidos, setPedidos] = useState([]);
    const [filtroEstado, setFiltroEstado] = useState('Todos');
    const [error, setError] = useState('');

    const cargarPedidos = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/reportes/pedidos');
            setPedidos(res.data);
            setError('');
        } catch (err) {
            console.error('Error al cargar pedidos:', err);
            setError('No se pudieron cargar los pedidos');
        }
    };

    useEffect(() => {
        cargarPedidos();
    }, []);

    const confirmarPedido = async (pedido_id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:4000/api/pedidos/confirmar/${pedido_id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success('Pedido confirmado');
            setPedidos(prev =>
                prev.map(p =>
                    p.pedido_id === pedido_id
                        ? { ...p, nombre_estado: 'Aprobado por Vendedor' }
                        : p
                )
            );
        } catch (err) {
            console.error('Error al confirmar:', err);
            toast.error('Error al confirmar pedido');
        }
    };

    const generarFactura = async (pedido_id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `http://localhost:4000/api/facturas/generar`,
                { pedido_id }, // <-- debe ser un número válido y existir en la base
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Factura generada con éxito');
            setPedidos(prev =>
                prev.map(p =>
                    p.pedido_id === pedido_id
                        ? { ...p, nombre_estado: 'facturado' }
                        : p
                )
            );
        } catch (err) {
            console.error('Error al generar factura:', err);
            toast.error('Error al generar factura');
        }
    };

    const cancelarPedido = async (pedido_id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:4000/api/pedidos/cancelar/${pedido_id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.info('Pedido cancelado');
            setPedidos(prev =>
                prev.map(p =>
                    p.pedido_id === pedido_id
                        ? { ...p, nombre_estado: 'cancelado' }
                        : p
                )
            );
        } catch (err) {
            console.error('Error al cancelar:', err);
            toast.error('Error al cancelar pedido');
        }
    };

    const pedidosFiltrados = pedidos.filter(p =>
        filtroEstado === 'Todos' ||
        (p.nombre_estado && p.nombre_estado.toLowerCase().trim() === filtroEstado.toLowerCase().trim())
    );

    return (
        <div className="d-flex">
            <ToastContainer position="top-right" autoClose={2000} />
            <AdminSidebar />
            <main className="flex-grow-1 p-4">
                <h2>📋 Resumen de Pedidos</h2>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                    <label>Filtrar por estado:</label>
                    <select
                        className="form-select w-auto d-inline-block ms-2"
                        value={filtroEstado}
                        onChange={e => setFiltroEstado(e.target.value)}
                    >
                        <option value="Todos">Todos</option>
                        <option value="pendiente">pendiente</option>
                        <option value="facturado">facturado</option>
                        <option value="cancelado">cancelado</option>
                        <option value="Aprobado por Vendedor">Aprobado por Vendedor</option>
                    </select>
                </div>

                <div className="table-responsive mt-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Entrega</th>
                                <th>Total</th>
                                <th>Sucursal</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidosFiltrados.map(p => (
                                <tr key={p.pedido_id}>
                                    <td>{p.pedido_id}</td>
                                    <td>{p.first_name} {p.last_name}</td>
                                    <td>{new Date(p.fecha).toLocaleDateString()}</td>
                                    <td>{p.tipo_entrega}</td>
                                    <td>${Number(p.total).toLocaleString()}</td>
                                    <td>{p.nombre_sucursal}</td>
                                    <td>
                                        <span className={`badge bg-${getEstadoColor(p.nombre_estado)} text-uppercase`}>
                                            {p.nombre_estado}
                                        </span>
                                    </td>
                                    <td>
                                        {p.nombre_estado && p.nombre_estado.trim() === 'pendiente' && (
                                            <>
                                                <button className="btn btn-sm btn-warning me-2" onClick={() => confirmarPedido(p.pedido_id)}>
                                                    Confirmar
                                                </button>
                                                <button className="btn btn-sm btn-danger" onClick={() => cancelarPedido(p.pedido_id)}>
                                                    Cancelar
                                                </button>
                                            </>
                                        )}

                                        {p.nombre_estado && p.nombre_estado.trim() === 'Aprobado por Vendedor' && (
                                            <button className="btn btn-sm btn-success" onClick={() => generarFactura(p.pedido_id)}>
                                                Generar Factura
                                            </button>
                                        )}

                                        {p.nombre_estado && p.nombre_estado.toLowerCase().trim() === 'facturado' && (
                                            <span className="badge bg-success">Ya facturado</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

// Función para estilizar estado
const getEstadoColor = (estado) => {
    switch (estado?.trim()) {
        case 'pendiente': return 'warning';
        case 'Aprobado por Vendedor': return 'success';
        case 'facturado': return 'primary';
        case 'cancelado': return 'danger';
        default: return 'secondary';
    }
};

export default ResumenPedidosAdmin;