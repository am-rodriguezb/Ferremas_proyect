// src/components/admin/AdminSidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/admin/dashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
        { path: '/admin/pedidos', icon: 'bi-list-check', label: 'Pedidos' },
        { path: '/admin/factura', icon: 'bi-file-earmark-text', label: 'Facturas' },
        { path: '/admin/reportes', icon: 'bi-graph-up', label: 'Reportes' },
        { path: '/admin/usuarios', icon: 'bi-people', label: 'Usuarios' },
        { path: '/admin/sucursales', icon: 'bi-building', label: 'Sucursales' },
    ];

    return (
        <div className="bg-dark text-white vh-100 p-3" style={{ minWidth: '220px' }}>
            <h5 className="mb-4">FERREMAS - Admin</h5>
            <ul className="nav flex-column">
                {menuItems.map((item) => (
                    <li className="nav-item mb-2" key={item.path}>
                        <Link
                            to={item.path}
                            className={`nav-link text-white d-flex align-items-center gap-2 ${
                                location.pathname === item.path ? 'active fw-bold bg-secondary rounded px-2' : ''
                            }`}
                        >
                            <i className={`bi ${item.icon}`}></i>
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminSidebar;
