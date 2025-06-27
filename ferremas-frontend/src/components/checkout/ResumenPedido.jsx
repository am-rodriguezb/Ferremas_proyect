// src/components/checkout/ResumenPedido.jsx
import React from 'react';

const ResumenPedido = ({ carrito }) => {
    const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

    return (
        <div className="card shadow-sm p-4">
        <h5 className="mb-3 text-center"> Resumen del Pedido</h5>
        <ul className="list-group mb-3">
            {carrito.map((p) => (
            <li key={p.producto_id} className="list-group-item d-flex justify-content-between align-items-start">
                <div className="d-flex align-items-center gap-2">
                <img
                    src={p.url_imagen}
                    alt={p.nombre_producto}
                    width={48}
                    height={48}
                    style={{ objectFit: 'cover', borderRadius: 6 }}
                />
                <div>
                    <div className="fw-semibold">{p.nombre_producto}</div>
                    <small className="text-muted">Cantidad: {p.cantidad}</small>
                </div>
                </div>
                <span className="fw-bold text-success">${(p.precio * p.cantidad).toLocaleString()}</span>
            </li>
            ))}
        </ul>
        <div className="d-flex justify-content-between fw-bold fs-6 px-2">
            <span>Total:</span>
            <span className="text-primary">${total.toLocaleString()}</span>
        </div>
        </div>
    );
};

export default ResumenPedido;
