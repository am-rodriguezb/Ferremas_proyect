import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../../context/CartContext';

const TipoEntregaPaso = ({ datosCliente, tipoEntrega, setTipoEntrega, sucursalSeleccionada, setSucursalSeleccionada }) => {
    const { carrito } = useCart();
    const [sucursalesDisponibles, setSucursalesDisponibles] = useState([]);

    useEffect(() => {
        const cargarSucursales = async () => {
            try {
                const response = await axios.post('http://localhost:4000/api/inventario/sucursales-disponibles', {
                    productos: carrito.map(p => ({
                        producto_id: p.producto_id,
                        cantidad: p.cantidad
                    }))
                });
                setSucursalesDisponibles(response.data);
                if (!sucursalSeleccionada && response.data.length > 0) {
                    setSucursalSeleccionada(response.data[0].sucursal_id);
                }
            } catch (error) {
                console.error('Error al cargar sucursales disponibles:', error);
            }
        };

        cargarSucursales();
    }, [carrito, setSucursalSeleccionada]);

    return (
        <div className="p-4 border rounded bg-light">
            <h5 className="mb-3">Tipo de entrega</h5>

            <div className="form-check mb-2">
                <input
                    type="radio"
                    id="envio"
                    className="form-check-input"
                    checked={tipoEntrega === 'Domicilio'}
                    onChange={() => setTipoEntrega('Domicilio')}
                />
                <label htmlFor="envio" className="form-check-label">
                    Envío a domicilio
                </label>
            </div>

            <div className="form-check mb-3">
                <input
                    type="radio"
                    id="retiro"
                    className="form-check-input"
                    checked={tipoEntrega === 'Sucursal'}
                    onChange={() => setTipoEntrega('Sucursal')}
                />
                <label htmlFor="retiro" className="form-check-label">
                    Retiro en sucursal
                </label>
            </div>

            {tipoEntrega === 'Sucursal' && (
                <div className="mb-3">
                    <label className="form-label">Sucursal para retirar:</label>
                    <select
                        className="form-select"
                        value={sucursalSeleccionada || ''}
                        onChange={(e) => setSucursalSeleccionada(parseInt(e.target.value))}
                    >
                        {sucursalesDisponibles.map((sucursal) => (
                            <option key={sucursal.sucursal_id} value={sucursal.sucursal_id}>
                                {sucursal.nombre_sucursal} - {sucursal.direccion}, {sucursal.ciudad}
                            </option>
                        ))}
                    </select>
                    {sucursalesDisponibles.length === 0 && <p className="text-danger mt-2">No hay sucursales disponibles para todos los productos del carrito.</p>}
                </div>
            )}
        </div>
    );
};

export default TipoEntregaPaso;
