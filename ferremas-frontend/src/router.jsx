// src/router.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/cliente/Home';
import Carrito from './views/cliente/Carrito';
import Checkout from './views/cliente/Checkout';
import Register from './views/cliente/Register';
import Confirmacion from './views/cliente/Confirmacion'; // <-- Agregado

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/confirmacion" element={<Confirmacion />} /> {/* <-- Agregado */}
                {/* aquí luego irán las demás rutas por rol */}
            </Routes>
        </Router>
    );
};

export default AppRouter;
