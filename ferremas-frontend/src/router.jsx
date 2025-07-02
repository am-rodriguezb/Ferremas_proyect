// src/router.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/cliente/Home';
import Carrito from './views/cliente/Carrito';
import Checkout from './views/cliente/Checkout';
import Register from './views/cliente/Register';
import Confirmacion from './views/cliente/Confirmacion'; // <-- Agregado
import ComprobantePago from './views/cliente/ComprobantePago';
import FacturaAdmin from './views/admin/FacturaAdmin';
import Dashboard from './views/admin/Dashboard';
import ResumenPedidosAdmin from './views/admin/ResumenPedidosAdmin'; // <-- Nuevo import
import UsuariosAdmin from './views/admin/Usuario';
import SucursalesAdmin from './views/admin/Sucursales';
import FacturaGenerada from './views/admin/FacturaGenerada';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/registro" element={<Register />} />
                <Route path="/confirmacion" element={<Confirmacion />} /> {/* <-- Agregado */}
                <Route path="/comprobante" element={<ComprobantePago />} />
                <Route path="/admin/factura" element={<FacturaAdmin />} />
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/resumen" element={<ResumenPedidosAdmin />} /> {/* <-- Nueva ruta */}
                <Route path="/admin/usuarios" element={<UsuariosAdmin />} />
                <Route path="/admin/sucursales" element={<SucursalesAdmin />} />
                <Route path="/admin/factura-generada" element={<FacturaGenerada />} />
                <Route path="/admin/pedidos" element={<ResumenPedidosAdmin />} />
                {/* aquí luego irán las demás rutas por rol */}
            </Routes>
        </Router>
    );
};

export default AppRouter;
