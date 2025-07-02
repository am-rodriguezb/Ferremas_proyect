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
    const [sucursalesDisponibles, setSucursalesDisponibles] = useState([]); // Estado para las sucursales disponibles

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

    useEffect(() => {
        // Fetch sucursales disponibles cuando el tipo de entrega cambie a 'Sucursal'
        if (tipoEntrega === 'Sucursal') {
            axios.get('http://localhost:4000/api/sucursales')
                .then((res) => {
                    setSucursalesDisponibles(res.data);
                })
                .catch((err) => {
                    console.error('Error al cargar sucursales:', err);
                });
        } else {
            setSucursalesDisponibles([]); // Limpiar sucursales si el tipo de entrega no es 'Sucursal'
        }
    }, [tipoEntrega]);

    const avanzarPaso = () => setPaso((prev) => Math.min(prev + 1, 3));
    const retrocederPaso = () => setPaso((prev) => Math.max(prev - 1, 1));

    const confirmarPedido = async () => {
        const tipoEntregaBD = 
            tipoEntrega === 'Sucursal' ? 'Retiro en tienda' : 'Despacho a domicilio';

        const pedido = {
            cliente_id: cliente.cliente_id,
            vendedor_id: 2,
            bodeguero_id: 3,
            tipo_entrega: tipoEntregaBD,
            sucursal_id: tipoEntregaBD === 'Retiro en tienda' ? sucursalSeleccionada : null,
            direccion_envio: tipoEntregaBD === 'Despacho a domicilio' ? cliente.direccion : null,
            estado_actual: 1,
            total: carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0),
            observaciones: '',
            productos: carrito.map(p => ({
                producto_id: p.producto_id,
                cantidad: p.cantidad,
                precio_unitario: p.precio
            }))
        };

        try {
            // 1. Registra el pedido
            const resPedido = await axios.post('http://localhost:4000/api/pedidos/crear-con-detalles', pedido);

            if (metodoPago === 'mercadolibre') {
                // 2. Crea preferencia de Mercado Pago
                const items = carrito.map(p => ({
                    title: p.nombre_producto,
                    quantity: Number(p.cantidad),
                    unit_price: Number(p.precio),
                }));

                const resMP = await axios.post('http://localhost:4000/api/mercado_pago/preference', { items });
                if (resMP.data.init_point) {
                    window.location.href = resMP.data.init_point;
                } else {
                    alert('No se pudo obtener la URL de pago');
                }
            } else {
                alert('Pedido registrado correctamente');
                // Limpia el carrito y redirige si quieres
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('carrito');
                }
                window.location.href = '/confirmacion';
            }
        } catch (err) {
            alert('Error al registrar el pedido');
            console.error(err);
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
                            <button
                                className="btn btn-primary"
                                onClick={avanzarPaso}
                                disabled={
                                    (tipoEntrega === 'Sucursal' && sucursalesDisponibles.length === 0)
                                }
                            >
                                Siguiente →
                            </button>
                        ) : (
                            <button
                                className="btn btn-success"
                                onClick={confirmarPedido}
                                disabled={!metodoPago}
                            >
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
