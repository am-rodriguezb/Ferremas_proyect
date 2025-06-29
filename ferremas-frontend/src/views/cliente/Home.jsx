// src/views/cliente/Home.jsx
import React, { useState, useEffect } from 'react';
import '../../css/principal.css';
import LoginModal from '../../components/LoginModal';
import ProductCard from '../../components/ProductCard';
import axios from 'axios';
import { useCart } from '../../context/CartContext';



const Home = () => {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const { carrito, agregarAlCarrito } = useCart();

    // Nuevo estado para usuario
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuario');
        if (usuarioGuardado) {
            setUsuario(JSON.parse(usuarioGuardado));
        }
    }, []);

    useEffect(() => {
        const fetchProductos = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/productos');
            setProductos(res.data);
            console.log('Productos recibidos:', res.data);
        } catch (err) {
            console.error('Error al cargar productos:', err);
        }
        };
        fetchProductos();
    }, []);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/categorias');
                setCategorias(res.data);
                console.log('Categorías recibidas:', res.data);
            } catch (err) {
                console.error('Error al cargar categorías:', err);
            }
        };
        fetchCategorias();
    }, []);

    const productosFiltrados = productos.filter((prod) => {
        const coincideBusqueda = prod.nombre_producto.toLowerCase().includes(busqueda.toLowerCase());
        const coincideCategoria = categoriaSeleccionada ? prod.categoria === categoriaSeleccionada : true;
        return coincideBusqueda && coincideCategoria;
    });

    return (
        <>
        {/* NAVBAR Sticky con Bootstrap */}
        <header className="sticky-top bg-white shadow-sm">
            <div className="container-fluid px-4 py-2 d-flex justify-content-between align-items-center">
                <h2 className="m-0">FERREMAS</h2>
                <input
                    type="text"
                    className="form-control w-50 mx-3"
                    placeholder="¿Qué estás buscando?"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                {/* Aquí va el nuevo bloque */}
                <div className="d-flex gap-3">
                    {usuario ? (
                        <>
                            <span className="text-dark fw-semibold">Hola, {usuario.username}</span>
                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('usuario');
                                    window.location.reload();
                                }}
                            >
                                Cerrar sesión
                            </button>
                        </>
                    ) : (
                        <button className="btn btn-outline-secondary" onClick={() => setModalAbierto(true)}>
                            Iniciar sesión
                        </button>
                    )}
                    <a href="/carrito" className="position-relative text-decoration-none text-dark">
                        <i className="bi bi-cart fs-5"></i>
                        {carrito.length > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {carrito.reduce((total, p) => total + p.cantidad, 0)}
                            </span>
                        )}
                    </a>
                </div>
            </div>
            <nav className="border-top">
            <ul className="nav justify-content-center py-2 fw-semibold">
                <li className="nav-item"><a className="nav-link text-dark" href="#">Productos</a></li>
                <li className="nav-item"><a className="nav-link text-dark" href="#">Novedades</a></li>
                <li className="nav-item"><a className="nav-link text-dark" href="#">Ofertas</a></li>
                <li className="nav-item"><a className="nav-link text-dark" href="#">Contacto</a></li>
            </ul>
            </nav>
        </header>

        {/* HERO con Bootstrap */}
        <section className="hero text-white text-center py-5">
            <div className="container">
            <h1 className="display-4 fw-bold">Bienvenido a FERREMAS</h1>
            <p className="lead">
                Encuentra herramientas, materiales y soluciones para tus proyectos de construcción
            </p>
            <button className="btn btn-primary btn-lg mt-3">Ver productos</button>
            </div>
        </section>

        {/* CATEGORÍAS */}
        <section className="py-5 bg-light">
            <div className="container">
                <h2 className="text-center section-title mb-4">Categorías populares</h2>
                <div className="row text-center g-4">
                    {['Herramientas', 'Electricidad', 'Seguridad', 'Medición', 'Adhesivos'].map((cat, index) => (
                        <div
                            className={`col-6 col-md-4 col-lg-2`}
                            key={index}
                            style={{ cursor: 'pointer' }}
                            onClick={() => setCategoriaSeleccionada(cat)}
                        >
                            <img
                                src={`https://via.placeholder.com/100?text=${encodeURIComponent(cat)}`}
                                className="img-fluid mb-2"
                                alt={cat}
                                style={{
                                    border: categoriaSeleccionada === cat ? '3px solid #e63946' : '2px solid #ddd',
                                    borderRadius: '50%',
                                    transition: 'border 0.2s'
                                }}
                            />
                            <p
                                className={`text-dark fw-semibold ${categoriaSeleccionada === cat ? 'text-primary' : ''}`}
                            >
                                {cat}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <select
                className="form-select mt-3"
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
            >
                <option value="">Todas las categorías</option>
                {categorias.map(cat => (
                    <option key={cat.categoria_id} value={cat.nombre_categoria}>
                        {cat.nombre_categoria}
                    </option>
                ))}
            </select>
        </section>

        {/* PRODUCTOS DESTACADOS */}
        <section className="py-5">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {productosFiltrados.map((prod) => (
                    <div className="col" key={prod.producto_id}>
                        <ProductCard
                            nombre={prod.nombre_producto}
                            precio={prod.precio}
                            imagen={prod.url_imagen}
                            onAddToCart={() => agregarAlCarrito(prod)}
                        />
                    </div>
                ))}
            </div>
        </section>

        {/* FOOTER */}
        <footer className="footer mt-auto bg-dark text-light py-4">
            <div className="container text-center">
            <p className="mb-1">© 2025 FERREMAS - Todos los derechos reservados.</p>
            <p className="mb-0 small">Desarrollado con ❤️ usando React + Bootstrap 5</p>
            </div>
        </footer>

        <LoginModal isOpen={modalAbierto} onClose={() => setModalAbierto(false)} />
        </>
    );
};

export default Home;


