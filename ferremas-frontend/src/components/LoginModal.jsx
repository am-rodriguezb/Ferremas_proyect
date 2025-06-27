// src/components/LoginModal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginModal = ({ isOpen, onClose }) => {
    const [identificador, setIdentificador] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('http://localhost:4000/api/clientes/login', {
                identificador,
                password
            });

            const { token, perfil, username, user_id } = res.data;

            if (perfil && perfil !== 'Cliente') {
                setError('Solo los clientes pueden iniciar sesión desde aquí.');
                return;
            }

            // Guarda en localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('perfil', perfil); // para verificar si es 'Cliente'
            localStorage.setItem('username', username); // para mostrar saludo


            onClose(); // Cierra modal
            window.location.reload(); // Refresca para que el Home se actualice
        } catch (err) {
            setError('Credenciales incorrectas o usuario no encontrado');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="login-modal-overlay" style={overlayStyles}>
            <div className="login-modal-content p-4 rounded shadow" style={modalStyles}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="m-0">Iniciar sesión</h4>
                    <button onClick={onClose} className="btn-close"></button>
                </div>

                {error && <div className="alert alert-danger py-2">{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Usuario o Correo</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre de usuario o correo"
                            value={identificador}
                            onChange={(e) => setIdentificador(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword((prev) => !prev)}
                                tabIndex={-1}
                                aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                            >
                                {showPassword ? (
                                    <i className="bi bi-eye-slash"></i>
                                ) : (
                                    <i className="bi bi-eye"></i>
                                )}
                            </button>
                        </div>
                    </div>

                    <button className="btn btn-primary w-100">Entrar</button>
                </form>

                <p className="mt-3 text-center">
                    ¿No tienes cuenta?{' '}
                    <button
                        className="btn btn-link p-0"
                        onClick={() => {
                            onClose();
                            navigate('/registro');
                        }}
                    >
                        Regístrate aquí
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginModal;

const overlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalStyles = {
    backgroundColor: '#fff',
    color: '#000',
    width: '100%',
    maxWidth: '400px',
};
