// src/views/admin/FacturaGenerada.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const FacturaGenerada = () => {
    const { pedidoId } = useParams();
    const [factura, setFactura] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:4000/api/facturas/pedido/${pedidoId}`)
            .then((res) => setFactura(res.data))
            .catch((err) => {
                setError('Error al obtener factura');
                console.error('Error al obtener factura:', err);
            });
    }, [pedidoId]);

    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!factura) return <p>Cargando factura...</p>;

    return (
        <div className="container mt-5">
            <h2>Factura #{factura.factura_id}</h2>
            <p><strong>Cliente:</strong> {factura.cliente_id}</p>
            <p><strong>Fecha de emisión:</strong> {new Date(factura.fecha_emision).toLocaleDateString()}</p>
            <p><strong>Tipo de entrega:</strong> {factura.tipo_entrega}</p>
            <hr />
            <h5>Productos:</h5>
            <ul className="list-group">
                {factura.detalles.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between">
                        <div>
                            {item.nombre_producto} x{item.cantidad}
                        </div>
                        <div>${item.subtotal.toLocaleString()}</div>
                    </li>
                ))}
            </ul>
            <hr />
            <h4>Total: ${factura.total.toLocaleString()}</h4>
        </div>
    );
};

export default FacturaGenerada;
