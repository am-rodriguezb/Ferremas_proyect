const express = require('express');
const cors = require('cors');
const app = express();

// USUARIOS
app.use('/api/users', require('./routes/usuarios/users'));
app.use('/api/clientes', require('./routes/usuarios/clientes'));
app.use('/api/auth', require('./routes/usuarios/auth'));

// PRODUCTOS
app.use('/api/productos', require('./routes/productos/productos'));

// INVENTARIO
app.use('/api/inventario', require('./routes/inventario/inventario'));

// PEDIDOS
app.use('/api/pedidos', require('./routes/pedidos/pedidos'));
app.use('/api/detalle_pedido', require('./routes/pedidos/detallePedido'));
app.use('/api/estado_pedido', require('./routes/pedidos/historialEstado'));
app.use('/api/pagos', require('./routes/pedidos/pagos'));

// REPORTES
app.use('/api/reportes', require('./routes/reportes/reportes'));


app.use(cors());
app.use(express.json());


const PORT = 4000;
app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});
