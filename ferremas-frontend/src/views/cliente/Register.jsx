// src/views/cliente/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        direccion: '',
        telefono: '',
        region_id: '',
        comuna_id: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post('http://localhost:4000/api/clientes/register', form);
            alert('Registro exitoso');
            navigate('/'); // o redirigir a login
        } catch (err) {
            setError(err.response?.data?.message || 'Error al registrar');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            <h2 className="mb-4 text-center">Registrarse en FERREMAS</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre de usuario</label>
                    <input name="username" className="form-control" required onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input type="email" name="email" className="form-control" required onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" name="password" className="form-control" required onChange={handleChange} />
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Nombre</label>
                        <input name="first_name" className="form-control" required onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Apellido</label>
                        <input name="last_name" className="form-control" required onChange={handleChange} />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input name="direccion" className="form-control" required onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input name="telefono" className="form-control" required onChange={handleChange} />
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Región</label>
                        <input name="region_id" className="form-control" type="number" required onChange={handleChange} />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Comuna</label>
                        <input name="comuna_id" className="form-control" type="number" required onChange={handleChange} />
                    </div>
                </div>

                <button className="btn btn-primary w-100 mt-3">Registrarme</button>
            </form>
        </div>
    );
};

export default Register;
