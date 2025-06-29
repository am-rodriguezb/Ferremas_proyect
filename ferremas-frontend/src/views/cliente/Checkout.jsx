// src/views/cliente/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import ClienteDatosForm from '../../components/ClienteDatosForm';
import PasoTipoEntrega from '../../components/checkout/PasoTipoEntrega';
import PasoMetodoPago from '../../components/checkout/PasoMetodoPago';
import ResumenPedido from '../../components/checkout/ResumenPedido';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // <-- Importa useNavigate

const Checkout = () => {
    const { carrito } = useCart();
    const [cliente, setCliente] = useState(null);
    const [paso, setPaso] = useState(1);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [tipoEntrega, setTipoEntrega] = useState('domicilio'); // o 'sucursal'
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState(null);
    const [metodoPago, setMetodoPago] = useState(null); // Estado para el método de pago

    const navigate = useNavigate(); // <-- Hook para navegar

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

    const confirmarPedido = async () => {
        const token = localStorage.getItem('token');
        if (!token) return alert('Debes iniciar sesión');

        // Mapea los productos del carrito al formato que Mercado Pago espera
        const items = carrito.map(p => ({
            title: p.nombre_producto,
            quantity: Number(p.cantidad),
            unit_price: Number(p.precio) // <-- asegúrate que sea number
        }));

        // Construye el body para el backend
        const body = {
            cliente_id: cliente.cliente_id,
            items,
            tipo_entrega: tipoEntrega,
            direccion_entrega: cliente.direccion,
            sucursal_id: tipoEntrega === 'Sucursal' ? sucursalSeleccionada : null
        };

        try {
            // Solo si el método de pago es Mercado Libre
            if (metodoPago === 'mercadolibre') {
                const res = await axios.post('http://localhost:4000/api/mercado_pago/preference', body, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.data.init_point) {
                    window.location.href = res.data.init_point; // Redirige a Mercado Pago
                } else {
                    alert('No se pudo generar el link de pago.');
                }
            } else if (metodoPago === 'transferencia') {
                // Aquí puedes guardar el pedido y mostrar confirmación
                alert('Pedido confirmado por transferencia 💸');
                navigate('/confirmacion');
            }
        } catch (err) {
            console.error('Error al confirmar pedido:', err);
            alert('Hubo un problema al confirmar tu pedido.');
        }
    };

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
                            tipoEntrega={tipoEntrega}
                            setTipoEntrega={setTipoEntrega}
                            sucursalSeleccionada={sucursalSeleccionada}
                            setSucursalSeleccionada={setSucursalSeleccionada}
                        />
                    )}
                    {paso === 3 && (
                        <PasoMetodoPago
                            metodoPago={metodoPago}
                            setMetodoPago={setMetodoPago}
                        />
                    )}

                    <div className="d-flex justify-content-between mt-4">
                        {paso > 1 ? (
                            <button className="btn btn-secondary" onClick={retrocederPaso}>← Volver</button>
                        ) : <div></div>}

                        {paso < 3 ? (
                            <button className="btn btn-primary" onClick={avanzarPaso}>Siguiente →</button>
                        ) : (
                            <button className="btn btn-success" onClick={confirmarPedido}>
                                Confirmar pedido
                            </button>
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
