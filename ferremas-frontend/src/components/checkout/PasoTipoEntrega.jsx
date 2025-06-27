// src/components/checkout/PasoTipoEntrega.jsx
import React from 'react';

const PasoTipoEntrega = ({ tipoEntrega, setTipoEntrega }) => {
    return (
        <div className="card p-4 mb-4 shadow-sm">
        <h4 className="mb-3">¿Cómo quieres recibir tu pedido?</h4>

        <div className="form-check mb-2">
            <input
            className="form-check-input"
            type="radio"
            name="tipoEntrega"
            id="entregaDomicilio"
            value="domicilio"
            checked={tipoEntrega === 'domicilio'}
            onChange={(e) => setTipoEntrega(e.target.value)}
            />
            <label className="form-check-label" htmlFor="entregaDomicilio">
            Envío a domicilio
            </label>
        </div>

        <div className="form-check">
            <input
            className="form-check-input"
            type="radio"
            name="tipoEntrega"
            id="entregaSucursal"
            value="sucursal"
            checked={tipoEntrega === 'sucursal'}
            onChange={(e) => setTipoEntrega(e.target.value)}
            />
            <label className="form-check-label" htmlFor="entregaSucursal">
            Retiro en sucursal
            </label>
        </div>

        {tipoEntrega === 'sucursal' && (
            <div className="mt-3">
            <label htmlFor="sucursal" className="form-label">Selecciona una sucursal</label>
            <select className="form-select" id="sucursal">
                <option>Sucursal Puerto Montt</option>
                <option>Sucursal Osorno</option>
                <option>Sucursal Valdivia</option>
            </select>
            </div>
        )}
        </div>
    );
};

export default PasoTipoEntrega;
