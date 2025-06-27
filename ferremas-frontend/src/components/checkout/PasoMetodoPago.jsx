// src/components/checkout/PasoMetodoPago.jsx
import React from 'react';

const PasoMetodoPago = ({ metodoPago, setMetodoPago }) => {
    return (
        <div className="card p-4 mb-4 shadow-sm">
        <h4 className="mb-3">¿Cómo deseas pagar?</h4>

        <div className="form-check mb-2">
            <input
            className="form-check-input"
            type="radio"
            name="metodoPago"
            id="pagoTransferencia"
            value="transferencia"
            checked={metodoPago === 'transferencia'}
            onChange={(e) => setMetodoPago(e.target.value)}
            />
            <label className="form-check-label" htmlFor="pagoTransferencia">
            Transferencia bancaria
            </label>
        </div>

        <div className="form-check">
            <input
            className="form-check-input"
            type="radio"
            name="metodoPago"
            id="pagoMercadoLibre"
            value="mercadolibre"
            checked={metodoPago === 'mercadolibre'}
            onChange={(e) => setMetodoPago(e.target.value)}
            />
            <label className="form-check-label" htmlFor="pagoMercadoLibre">
            Pago por Mercado Libre
            </label>
        </div>

        {metodoPago === 'transferencia' && (
            <div className="mt-3 alert alert-info">
            Realiza tu transferencia a: <br />
            <strong>Banco Estado</strong><br />
            Cuenta: 1234567890<br />
            Titular: FERREMAS SPA<br />
            Email: pagos@ferremas.cl
            </div>
        )}

        {metodoPago === 'mercadolibre' && (
            <div className="mt-3 alert alert-warning">
            Serás redirigido a la plataforma de Mercado Libre al finalizar tu pedido.
            </div>
        )}
        </div>
    );
};

export default PasoMetodoPago;
