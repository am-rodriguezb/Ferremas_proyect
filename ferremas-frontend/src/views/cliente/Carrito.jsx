// src/views/cliente/CartPage.jsx
import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom'; // <-- Importa useNavigate
import '../../css/principal.css';

const CartPage = () => {
    const { carrito, agregarAlCarrito, quitarDelCarrito, vaciarCarrito } = useCart();
    const navigate = useNavigate(); // <-- Inicializa el hook

    const calcularTotal = () => {
        return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    };

    return (
        <div className="container py-5">
        <h2 className="fw-bold mb-4">Tu carrito</h2>
        <div className="row">
            {/* Columna productos */}
            <div className="col-lg-8">
            <p className="text-muted">{carrito.length} producto{carrito.length !== 1 && 's'} en total</p>
            <hr />
            {carrito.map((prod) => (
                <div key={prod.producto_id} className="d-flex align-items-center mb-4 pb-4 border-bottom">
                <img
                    src={prod.url_imagen}
                    alt={prod.nombre_producto}
                    className="me-4"
                    style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div className="flex-grow-1">
                    <h5 className="fw-bold mb-1">{prod.nombre_producto}</h5>
                    <p className="mb-2 text-muted">{prod.descripcion || 'Sin descripción'}</p>

                    {/* Controles de cantidad */}
                    <div className="d-flex align-items-center gap-3">
                    <div className="input-group" style={{ width: '120px' }}>
                        <button className="btn btn-outline-dark" onClick={() => quitarDelCarrito(prod.producto_id)}>-</button>
                        <div className="form-control text-center">{prod.cantidad}</div>
                        <button className="btn btn-outline-dark" onClick={() => agregarAlCarrito(prod)}>+</button>
                    </div>
                    <button className="btn btn-link text-danger p-0" onClick={() => quitarDelCarrito(prod.producto_id)}>Eliminar</button>
                    </div>
                </div>
                <div className="text-end fw-bold ms-3">${(prod.precio * prod.cantidad).toLocaleString()}</div>
                </div>
            ))}
            </div>

            {/* Columna resumen */}
            <div className="col-lg-4">
            <div className="border rounded p-4 shadow-sm">
                <h5 className="fw-bold mb-3">Resumen del pedido</h5>
                <div className="d-flex justify-content-between mb-2">
                <span>Productos ({carrito.length})</span>
                <span>${calcularTotal().toLocaleString()}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold mb-4">
                <span>Subtotal incl. IVA</span>
                <span className="text-primary fs-4">${calcularTotal().toLocaleString()}</span>
                </div>
                <button
                    className="btn btn-primary w-100 rounded-pill py-2 fs-5"
                    onClick={() => navigate('/checkout')}
                    disabled={carrito.length === 0} // <-- Deshabilita si el carrito está vacío
                >
                    Ir a pagar
                </button>
                {carrito.length === 0 && (
                    <p className="text-danger small mt-2">
                        Debes agregar al menos un producto para continuar.
                    </p>
                )}
                <p className="text-muted small mt-3">
                Al hacer click en "ir a pagar" estás aceptando nuestra <a href="#">Política de privacidad</a>.
                </p>
            </div>
            </div>
        </div>
        </div>
    );
};

export default CartPage;