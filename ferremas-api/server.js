const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createPreference } = require('./controllers/pedidos/mercado_pago_paymet');
const bodyParser = require('body-parser');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// RUTAS DE AUTENTICACIÓN Y USUARIOS
const authRoutes = require('./routes/usuarios/auth');               // login admin
const usuariosRoutes = require('./routes/usuarios/usuarioRoutes');       // login empleados
const userRoutes = require('./routes/usuarios/users');               // CRUD empleados (protegido)
const clientesRoutes = require('./routes/usuarios/clientes');       // login/register cliente

app.use('/api/auth', authRoutes);
app.use('/api/usuario', usuariosRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clientes', clientesRoutes);

// PRODUCTOS
app.use('/api/productos', require('./routes/productos/products'));
app.use('/api/categorias', require('./routes/productos/categoria'));

// INVENTARIO
app.use('/api/inventario', require('./routes/inventario/inventario'));

// PEDIDOS
app.use('/api/pedidos', require('./routes/pedidos/pedidos'));
app.use('/api/detalle_pedido', require('./routes/pedidos/detallePedido'));
app.use('/api/estado_pedido', require('./routes/pedidos/historialEstado'));
app.use('/api/pagos', require('./routes/pedidos/pagos'));

// REPORTES
app.use('/api/reportes', require('./routes/reportes/reportes'));

// COMUNAS Y REGIONES
app.use('/api', require('./routes/api/comunas'));

// MERCADO PAGO
app.post('/api/mercado_pago/preference', createPreference);

// FACTURAS (para /api/facturas)
app.use('/api/facturas', require('./routes/reportes/factura'));

// FACTURAS (para /api/reportes/factura)
const facturaRoutes = require('./routes/reportes/factura');
app.use('/api/reportes/factura', facturaRoutes);


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});
