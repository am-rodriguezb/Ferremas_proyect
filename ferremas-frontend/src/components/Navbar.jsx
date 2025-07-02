// 📁 components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ usuario, carrito, setModalAbierto, busqueda, setBusqueda, setUsuario }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        setUsuario(null);
        window.location.reload(); // Opcional: recarga para limpiar todo el estado
    };

    return (
        <header className="navbar-ferremas sticky-top">
            <div className="container-fluid px-4 py-3">
                <div className="row align-items-center w-100">
                    <div className="col-auto">
                        <h1 className="navbar-brand-ferremas mb-0">FERREMAS</h1>
                    </div>

                    <div className="col">
                        <div className="search-container mx-auto">
                            <input
                                type="text"
                                className="form-control search-input"
                                placeholder="¿Qué herramienta necesitas hoy?"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                            <button className="search-btn">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </div>

                    <div className="col-auto">
                        <div className="user-section">
                            {usuario ? (
                                <>
                                    <span className="user-greeting">
                                        <i className="bi bi-person-circle me-2"></i>
                                        Hola, {usuario.username}
                                    </span>
                                    <button
                                        className="btn btn-logout"
                                        onClick={handleLogout}
                                    >
                                        <i className="bi bi-box-arrow-right me-1"></i>
                                        Salir
                                    </button>
                                </>
                            ) : (
                                <button className="btn btn-login" onClick={() => setModalAbierto(true)}>
                                    <i className="bi bi-person me-2"></i>
                                    Ingresar
                                </button>
                            )}

                            <div className="cart-icon" onClick={() => navigate('/carrito')} style={{ cursor: 'pointer' }}>
                                <i className="bi bi-cart3"></i>
                                {carrito.length > 0 && (
                                    <span className="cart-badge">
                                        {carrito.reduce((total, p) => total + p.cantidad, 0)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="nav-categories">
                <div className="container">
                    <ul className="nav justify-content-center">
                        <li className="nav-item">
                            <a className="nav-link" href="#productos">
                                <i className="bi bi-tools me-2"></i>Herramientas
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#ofertas">
                                <i className="bi bi-lightning me-2"></i>Ofertas
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#nuevos">
                                <i className="bi bi-star me-2"></i>Nuevos
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#servicios">
                                <i className="bi bi-gear me-2"></i>Servicios
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contacto">
                                <i className="bi bi-telephone me-2"></i>Contacto
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;











