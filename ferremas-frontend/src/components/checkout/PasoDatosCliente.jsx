import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckoutPaso1 = () => {
    const [cliente, setCliente] = useState(null);
    const [modoEdicion, setModoEdicion] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchCliente = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/clientes/perfil', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCliente(res.data);
            } catch (err) {
                console.error('Error al obtener datos del cliente:', err);
            }
        };

        fetchCliente();
    }, []);

    if (!cliente) return <p>Cargando datos del cliente...</p>;

    return (
        <div className="p-4 bg-white rounded shadow-sm">
            <h4>Confirma o edita tus datos</h4>
            <p className="text-muted">La dirección de entrega se utilizará para encontrar las mejores opciones de despacho.</p>

            <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Dirección de entrega</h5>
                <button className="btn btn-outline-dark btn-sm" onClick={() => setModoEdicion(!modoEdicion)}>
                    {modoEdicion ? 'Cancelar' : 'Editar'}
                </button>
            </div>

            {modoEdicion ? (
                <form className="mt-3">
                    <input className="form-control mb-2" value={cliente.nombre} placeholder="Nombre" />
                    <input className="form-control mb-2" value={cliente.apellido} placeholder="Apellido" />
                    <input className="form-control mb-2" value={cliente.direccion} placeholder="Dirección" />
                    <input className="form-control mb-2" value={cliente.telefono} placeholder="Teléfono" />
                    <input className="form-control mb-2" value={cliente.correo} placeholder="Correo electrónico" />
                    <button type="submit" className="btn btn-primary">Guardar cambios</button>
                </form>
            ) : (
                <div className="mt-3">
                    <p><strong>{cliente.nombre} {cliente.apellido}</strong></p>
                    <p>{cliente.direccion}</p>
                    <p>{cliente.telefono}</p>
                    <p>{cliente.correo}</p>
                </div>
            )}
        </div>
    );
};

export default CheckoutPaso1;