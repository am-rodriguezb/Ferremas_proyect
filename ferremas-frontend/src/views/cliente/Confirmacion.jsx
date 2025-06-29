// src/views/cliente/Confirmacion.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Confirmacion = () => {
    return (
        <div className="container py-5 text-center">
            <h2 className="text-success mb-4">¡Compra confirmada con éxito! 🎉</h2>
            <p className="mb-4">
                Gracias por tu compra. Te hemos enviado un correo con los detalles del pedido. 
                Nuestro equipo te contactará para coordinar la entrega.
            </p>

            <Link to="/" className="btn btn-primary">
                Volver al inicio
            </Link>
        </div>
    );
};

export default Confirmacion;
