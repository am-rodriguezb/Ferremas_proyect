import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SidebarAdmin = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/admin/dashboard', label: 'Dashboard' },
        { path: '/admin/resumen', label: 'Resumen de Pedidos' },
        { path: '/admin/factura', label: 'Buscar Factura' },
        { path: '/admin/usuarios', label: 'Usuarios' },
        { path: '/admin/sucursales', label: 'Sucursales' },
    ];

    return (
        <div className="bg-light p-3 vh-100 border-end" style={{ minWidth: '220px' }}>
            <h5 className="text-center mb-4">Panel Admin</h5>
            <div className="list-group">
                {menuItems.map(item => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`list-group-item list-group-item-action${location.pathname === item.path ? ' active fw-bold' : ''}`}
                    >
                        {item.label}
                    </Link>
                ))}
                <Link to="/" className="list-group-item list-group-item-action text-danger">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
};

export default SidebarAdmin;