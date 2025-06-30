// src/views/cliente/ComprobantePago.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ComprobantePago = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const payment_id = params.get('payment_id');
    const status = params.get('status');
    const merchant_order_id = params.get('merchant_order_id');

    return (
        <div className="container py-5 text-center">
            <h2 className="text-success mb-4">¡Compra confirmada con éxito! 🎉</h2>
            <p className="mb-4">
                Gracias por tu compra. Tu pago fue procesado correctamente.
            </p>
            <div className="mb-4">
                <strong>ID de pago:</strong> {payment_id} <br />
                <strong>Estado:</strong> {status} <br />
                <strong>Orden:</strong> {merchant_order_id}
            </div>
            <Link to="/" className="btn btn-primary">
                Volver al inicio
            </Link>
        </div>
    );
};

export default ComprobantePago;