import React from 'react';
import '../css/Footer.css'

const Footer = () => (
    <footer className="footer-section bg-dark text-light pt-5 pb-3 mt-auto">
        <div className="container">
            <div className="row g-4">
                <div className="col-lg-4">
                    <h3 className="footer-brand">FERREMAS</h3>
                    <p className="footer-text">
                        Tu ferretería de confianza desde 1995. Calidad, variedad y los mejores precios
                        para profesionales y aficionados del bricolaje.
                    </p>
                    <div className="footer-social">
                        <a href="#" className="social-link me-2">
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a href="#" className="social-link me-2">
                            <i className="bi bi-instagram"></i>
                        </a>
                        <a href="#" className="social-link me-2">
                            <i className="bi bi-twitter"></i>
                        </a>
                        <a href="#" className="social-link">
                            <i className="bi bi-youtube"></i>
                        </a>
                    </div>
                </div>

                <div className="col-lg-2 col-md-6">
                    <h5 className="mb-4">Productos</h5>
                    <ul className="list-unstyled">
                        <li><a href="#" className="text-light text-decoration-none opacity-75">Herramientas</a></li>
                        <li><a href="#" className="text-light text-decoration-none opacity-75">Electricidad</a></li>
                        <li><a href="#" className="text-light text-decoration-none opacity-75">Seguridad</a></li>
                        <li><a href="#" className="text-light text-decoration-none opacity-75">Construcción</a></li>
                    </ul>
                </div>

                <div className="col-lg-2 col-md-6">
                    <h5 className="mb-4">Servicios</h5>
                    <ul className="list-unstyled">
                        <li><a href="#" className="text-light text-decoration-none opacity-75">Delivery</a></li>
                        <li><a href="#" className="text-light text-decoration-none opacity-75">Instalación</a></li>
                        <li><a href="#" className="text-light text-decoration-none opacity-75">Asesoría</a></li>
                        <li><a href="#" className="text-light text-decoration-none opacity-75">Garantías</a></li>
                    </ul>
                </div>

                <div className="col-lg-4">
                    <h5 className="mb-4">Contacto</h5>
                    <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-geo-alt me-3 fs-5"></i>
                        <span>Av. Principal 1234, Puerto Montt</span>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-telephone me-3 fs-5"></i>
                        <span>+56 65 234 5678</span>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <i className="bi bi-envelope me-3 fs-5"></i>
                        <span>contacto@ferremas.cl</span>
                    </div>
                    <div className="d-flex align-items-center">
                        <i className="bi bi-clock me-3 fs-5"></i>
                        <span>Lun - Sáb: 8:00 - 20:00</span>
                    </div>
                </div>
            </div>

            <div className="footer-bottom text-center mt-4">
                <p className="mb-1">© 2025 FERREMAS - Todos los derechos reservados</p>
                <p className="mb-0">
                    <i className="bi bi-heart-fill text-danger me-2"></i>
                    Desarrollado con React + Bootstrap 5
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;