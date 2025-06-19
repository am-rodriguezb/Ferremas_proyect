// src/components/LoginModal.jsx
import React, { useState } from 'react';

const LoginModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('login');

    if (!isOpen) return null;

    return (
        <div className="login-modal" style={{ display: 'flex' }}>
        <div className="modal-content">
            <div className="modal-header">
            <h2 className="modal-title">Iniciar sesión</h2>
            <button className="close-modal" onClick={onClose}>&times;</button>
            </div>

            <div className="tabs">
            <button className={`tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>
                Iniciar Sesión
            </button>
            <button className={`tab ${activeTab === 'registro' ? 'active' : ''}`} onClick={() => setActiveTab('registro')}>
                Registrarse
            </button>
            </div>

            <div className={`tab-content ${activeTab === 'login' ? 'active' : ''}`} id="login-content">
            <div className="form-group">
                <label className="form-label">Usuario</label>
                <input className="form-input" type="text" />
            </div>
            <div className="form-group">
                <label className="form-label">Contraseña</label>
                <input className="form-input" type="password" />
            </div>
            <button className="form-submit">Entrar</button>
            </div>

            <div className={`tab-content ${activeTab === 'registro' ? 'active' : ''}`} id="registro-content">
            {/* Formulario de registro aquí */}
            <p>Formulario de registro (en desarrollo)</p>
            </div>
        </div>
        </div>
    );
};

export default LoginModal;