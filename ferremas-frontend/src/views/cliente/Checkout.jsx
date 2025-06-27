// src/views/cliente/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import ClienteDatosForm from '../../components/ClienteDatosForm';
import PasoTipoEntrega from '../../components/checkout/PasoTipoEntrega';
import PasoMetodoPago from '../../components/checkout/PasoMetodoPago';
import ResumenPedido from '../../components/checkout/ResumenPedido';
import axios from 'axios';

const Checkout = () => {
    const { carrito } = useCart();
    const [cliente, setCliente] = useState(null);
    const [paso, setPaso] = useState(1);
    const [modoEdicion, setModoEdicion] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get('http://localhost:4000/api/clientes/perfil', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((res) => {
                    setCliente(res.data);
                })
                .catch((err) => {
                    console.error('Error al cargar perfil del cliente:', err);
                });
        }
    }, []);

    const avanzarPaso = () => setPaso((prev) => Math.min(prev + 1, 3));
    const retrocederPaso = () => setPaso((prev) => Math.max(prev - 1, 1));

    return (
        <div className="container py-5">
            <h2 className="mb-4">Confirmar Pedido</h2>
            <div className="row">
                <div className="col-md-8">
                    {paso === 1 && (
                        cliente ? (
                            <ClienteDatosForm
                                datosCliente={cliente}
                                modoEdicion={modoEdicion}
                                setModoEdicion={setModoEdicion}
                            />
                        ) : (
                            <p>Cargando datos del cliente...</p>
                        )
                    )}
                    {paso === 2 && (
                        <PasoTipoEntrega
                            // ...props
                        />
                    )}
                    {paso === 3 && (
                        <PasoMetodoPago
                            // ...props
                        />
                    )}

                    <div className="d-flex justify-content-between mt-4">
                        {paso > 1 ? (
                            <button className="btn btn-secondary" onClick={retrocederPaso}>← Volver</button>
                        ) : <div></div>}

                        {paso < 3 ? (
                            <button className="btn btn-primary" onClick={avanzarPaso}>Siguiente →</button>
                        ) : (
                            <button className="btn btn-success">🛒 Confirmar pedido</button>
                        )}
                    </div>
                </div>
                <div className="col-md-4">
                    <ResumenPedido carrito={carrito} />
                </div>
            </div>
        </div>
    );
};

export default Checkout;
