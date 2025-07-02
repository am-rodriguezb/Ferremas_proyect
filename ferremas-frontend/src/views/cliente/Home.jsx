// src/views/cliente/Home.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import LoginModal from '../../components/LoginModal';
import ProductGrid from '../../components/ProductGrid';
import axios from 'axios';
import { useCart } from '../../context/CartContext';
import '../../css/principal.css';
import Footer from '../../components/Footer';

const Home = () => {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const { carrito, agregarAlCarrito } = useCart();
    const [usuario, setUsuario] = useState(null);
    const [carritoAbierto, setCarritoAbierto] = useState(false);

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
            <Navbar
                usuario={usuario}
                carrito={carrito}
                setModalAbierto={setModalAbierto}
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setUsuario={setUsuario}
                onCartClick={() => setCarritoAbierto(true)} // NUEVO
            />
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
                <ProductGrid
                    productos={productosFiltrados}
                    onAddToCart={agregarAlCarrito}
                />
            </section>

            {/* FOOTER */}
                <Footer />

            <LoginModal isOpen={modalAbierto} onClose={() => setModalAbierto(false)} />

            {carritoAbierto && (
                <div className="modal-carrito">
                    {/* Aquí tu componente o contenido del carrito */}
                    <button onClick={() => setCarritoAbierto(false)}>Cerrar</button>
                    {/* Lista de productos del carrito */}
                </div>
            )}
        </>
    );
};

export default Home;


