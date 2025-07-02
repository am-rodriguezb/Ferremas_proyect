// src/components/LoginModal.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

        // 1. Intentar login como cliente
        try {
            const res = await axios.post('http://localhost:4000/api/clientes/login', {
                identificador,
                password
            });

            const { token, cliente_id, username, correo } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('perfil', 'Cliente');
            localStorage.setItem('username', username);
            localStorage.setItem('cliente_id', cliente_id);
            localStorage.setItem('correo', correo);
            localStorage.setItem('usuario', JSON.stringify({ username }));

            onClose();
            window.location.reload();
            return;
        } catch (err) {
            // Si el error es "Cliente no encontrado" o "Contraseña incorrecta", intentamos como admin
            if (
                err.response &&
                (err.response.data.message === 'Cliente no encontrado' ||
                err.response.data.message === 'Contraseña incorrecta')
            ) {
                // 2. Intentar login como administrador
                try {
                    const res = await axios.post('http://localhost:4000/api/auth/login', {
                        identificador,
                        password
                    });

                    const { token, perfil, user_id, username, email } = res.data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('perfil', perfil);
                    localStorage.setItem('username', username);
                    localStorage.setItem('user_id', user_id);
                    localStorage.setItem('email', email);
                    localStorage.setItem('usuario', JSON.stringify({ username }));

                    onClose();
                    if (perfil === 'Administrador') {
                        navigate('/admin/dashboard');
                    } else {
                        // Si no es admin, intentamos como empleado
                        try {
                            const res = await axios.post('http://localhost:4000/api/usuarios/login', {
                                identificador,
                                password
                            });

                            const { token, perfil, user_id, username, email } = res.data;
                            localStorage.setItem('token', token);
                            localStorage.setItem('perfil', perfil);
                            localStorage.setItem('username', username);
                            localStorage.setItem('user_id', user_id);
                            localStorage.setItem('email', email);
                            localStorage.setItem('usuario', JSON.stringify({ username }));

                            onClose();
                            if (perfil === 'Vendedor') {
                                navigate('/vendedor/dashboard');
                            } else if (perfil === 'Bodeguero') {
                                navigate('/bodega/dashboard');
                            } else if (perfil === 'Contador') {
                                navigate('/contador/dashboard');
                            } else {
                                setError('Perfil no reconocido.');
                            }
                            return;
                        } catch (err2) {
                            setError(
                                err2.response?.data?.message ||
                                'Credenciales inválidas o usuario no encontrado.'
                            );
                        }
                    }
                    return;
                } catch (errAdmin) {
                    // Si tampoco es admin, intentamos como empleado
                    try {
                        const res = await axios.post('http://localhost:4000/api/usuarios/login', {
                            identificador,
                            password
                        });

                        const { token, perfil, user_id, username, email } = res.data;
                        localStorage.setItem('token', token);
                        localStorage.setItem('perfil', perfil);
                        localStorage.setItem('username', username);
                        localStorage.setItem('user_id', user_id);
                        localStorage.setItem('email', email);
                        localStorage.setItem('usuario', JSON.stringify({ username }));

                        onClose();
                        if (perfil === 'Vendedor') {
                            navigate('/vendedor/dashboard');
                        } else if (perfil === 'Bodeguero') {
                            navigate('/bodega/dashboard');
                        } else if (perfil === 'Contador') {
                            navigate('/contador/dashboard');
                        } else {
                            setError('Perfil no reconocido.');
                        }
                        return;
                    } catch (err2) {
                        setError(
                            err2.response?.data?.message ||
                            'Credenciales inválidas o usuario no encontrado.'
                        );
                    }
                }
            } else {
                setError(
                    err.response?.data?.message ||
                    'Error al iniciar sesión.'
                );
            }
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
