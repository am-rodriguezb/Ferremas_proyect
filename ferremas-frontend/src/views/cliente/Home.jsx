// src/views/cliente/Home.jsx
import React, { useState } from 'react';
import '../../css/principal.css';
import LoginModal from '../../components/LoginModal';

const Home = () => {
    const [modalAbierto, setModalAbierto] = useState(false);

    return (
        <div className="contenedor-todo">
        <header className="encabezado">
            <h1 className="titulo">FERREMAS</h1>
            <nav className="menu">
            <a href="#">Inicio</a>
            <a href="#">Categorías</a>
            <a href="#">Productos</a>
            <a href="#">Ofertas</a>
            <a href="#">Carrito</a>
            <a href="#">Contacto</a>
            </nav>
        </header>

        <main className="contenido">
            <h2 className="subtitulo">Bienvenido a FERREMAS</h2>
            <p className="descripcion">
            Encuentra las mejores herramientas, materiales y productos para tus proyectos de construcción y hogar.
            </p>
            <div className="botones">
            <button className="boton">Ver Productos</button>
            <button className="boton" onClick={() => setModalAbierto(true)}>Iniciar Sesión</button>
            </div>
        </main>

        <footer className="pie">
            <p>© 2025 FERREMAS. Todos los derechos reservados.</p>
        </footer>

        {/* Aquí se muestra el modal */}
        <LoginModal isOpen={modalAbierto} onClose={() => setModalAbierto(false)} />
        </div>
    );
};

export default Home;

