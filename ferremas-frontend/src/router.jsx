// src/router.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/cliente/Home';
// aquí luego puedes importar otras vistas como Login, AdminDashboard, etc.

const AppRouter = () => {
    return (
        <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            {/* aquí luego irán las demás rutas por rol */}
        </Routes>
        </Router>
    );
};

export default AppRouter;
