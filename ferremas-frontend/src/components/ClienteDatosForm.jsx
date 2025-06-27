// src/components/ClienteDatosForm.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClienteDatosForm = ({ datosCliente, modoEdicion, setModoEdicion }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        correo: '',
        region_id: '',
        comuna_id: '',
        telefono: ''
    });
    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);

    useEffect(() => {
        if (datosCliente) {
            setFormData({
                nombre: datosCliente.nombre,
                apellido: datosCliente.apellido,
                direccion: datosCliente.direccion,
                correo: datosCliente.correo || '',
                region_id: datosCliente.region_id || '',
                comuna_id: datosCliente.comuna_id || '',
                telefono: datosCliente.telefono
            });
        }
    }, [datosCliente]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/regiones')
            .then(res => setRegiones(res.data))
            .catch(err => console.error('Error cargando regiones', err));
    }, []);

    useEffect(() => {
        if (formData.region_id) {
            axios.get(`http://localhost:4000/api/comunas/${formData.region_id}`)
                .then(res => setComunas(res.data))
                .catch(err => console.error('Error cargando comunas', err));
        } else {
            setComunas([]);
        }
    }, [formData.region_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleGuardar = async () => {
        const { nombre, apellido, direccion, correo, telefono, region_id, comuna_id } = formData;

        // Validación de campos vacíos
        if (!nombre || !apellido || !direccion || !correo || !telefono || !region_id || !comuna_id) {
            alert('Por favor, completa todos los campos obligatorios');
            return;
        }

        // Validación de correo
        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoRegex.test(correo)) {
            alert('Por favor, ingresa un correo electrónico válido');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:4000/api/clientes/perfil', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Datos actualizados correctamente');
            setModoEdicion(false);
        } catch (err) {
            console.error('Error al actualizar:', err);
            alert('Error al actualizar datos. Revisa los campos e inténtalo nuevamente.');
        }
    };

    return (
        <div className="p-4 border rounded bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Dirección de entrega</h5>
                {!modoEdicion && (
                    <button className="btn btn-outline-secondary" onClick={() => setModoEdicion(true)}>
                        <i className="bi bi-pencil"></i> Editar
                    </button>
                )}
            </div>

            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Nombre</label>
                    <input
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="form-control"
                        disabled={!modoEdicion}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Apellido</label>
                    <input
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        className="form-control"
                        disabled={!modoEdicion}
                    />
                </div>

                <div className="col-md-12">
                    <label className="form-label">Dirección</label>
                    <input
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        className="form-control"
                        disabled={!modoEdicion}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Región</label>
                    <select
                        name="region_id"
                        value={formData.region_id}
                        onChange={handleChange}
                        className="form-select"
                        disabled={!modoEdicion}
                    >
                        <option value="">Seleccione una región</option>
                        {regiones.map(r => (
                            <option key={r.region_id} value={r.region_id}>{r.nombre_region}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Comuna</label>
                    <select
                        name="comuna_id"
                        value={formData.comuna_id}
                        onChange={handleChange}
                        className="form-select"
                        disabled={!modoEdicion || !formData.region_id}
                    >
                        <option value="">Seleccione una comuna</option>
                        {comunas.map(c => (
                            <option key={c.comuna_id} value={c.comuna_id}>{c.nombre_comuna}</option>
                        ))}
                    </select>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Teléfono</label>
                    <input
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="form-control"
                        disabled={!modoEdicion}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Correo</label>
                    <input
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        className="form-control"
                        disabled={!modoEdicion}
                        type="email"
                    />
                </div>
            </div>

            {modoEdicion && (
                <button className="btn btn-success mt-3" onClick={handleGuardar}>
                    Guardar cambios
                </button>
            )}
        </div>
    );
};

export default ClienteDatosForm;
