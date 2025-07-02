const db = require('../../database');

exports.generarFactura = async (req, res) => {
    const { pedido_id } = req.body;

    try {
        // Verificar si el pedido existe y está "listo"
        // Solo permite facturar si estado_actual = 2 (Aprobado por Vendedor)
        const [pedidos] = await db.query(
            `SELECT p.*, u.username AS nombre_cliente, s.nombre_sucursal
            FROM pedido p
            LEFT JOIN user u ON p.cliente_id = u.user_id
            LEFT JOIN sucursal s ON p.sucursal_id = s.sucursal_id
            WHERE p.pedido_id = ? AND p.estado_actual = 2`,
            [pedido_id]
        );

        if (pedidos.length === 0) {
            return res.status(400).json({ message: 'El pedido no está aprobado por vendedor o no existe.' });
        }

        // Verificar si ya existe una factura para este pedido
        const [facturasExistentes] = await db.query(
            `SELECT * FROM factura WHERE pedido_id = ?`,
            [pedido_id]
        );
        if (facturasExistentes.length > 0) {
            return res.status(400).json({ message: 'Ya existe una factura para este pedido.' });
        }

        const pedido = pedidos[0];
        const total = Number(pedido.total).toFixed(2);

        // Insertar factura (fecha de emisión automática con NOW())
        const [result] = await db.query(
            `INSERT INTO factura (pedido_id, cliente_id, total, tipo_entrega, fecha_emision)
            VALUES (?, ?, ?, ?, NOW())`,
            [pedido.pedido_id, pedido.cliente_id, total, pedido.tipo_entrega]
        );

        // Cambiar estado del pedido a "facturado" (ID 30002)
        await db.query(
            `UPDATE pedido SET estado_actual = ? WHERE pedido_id = ?`,
            [30002, pedido_id]
        );

        // Obtener detalles del pedido para mostrar en la respuesta
        const [detalles] = await db.query(
            `SELECT dp.producto_id, p.nombre_producto, dp.cantidad, dp.precio_unitario, dp.subtotal
            FROM detalle_pedido dp
            JOIN producto p ON dp.producto_id = p.producto_id
            WHERE dp.pedido_id = ?`,
            [pedido_id]
        );

        // Consultar la factura recién creada para obtener la fecha exacta
        const [factura] = await db.query(
            `SELECT * FROM factura WHERE factura_id = ?`,
            [result.insertId]
        );

        res.status(201).json({
            message: 'Factura generada con éxito',
            factura_id: result.insertId,
            pedido_id: pedido.pedido_id,
            cliente_id: pedido.cliente_id,
            nombre_cliente: pedido.nombre_cliente,
            sucursal: pedido.nombre_sucursal,
            total,
            tipo_entrega: pedido.tipo_entrega,
            fecha_emision: factura[0].fecha_emision,
            detalles
        });
    } catch (error) {
        console.error('Error al generar factura:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.getFacturaPorPedido = async (req, res) => {
    const { pedido_id } = req.params;

    try {
        // Obtener la factura asociada al pedido
        const [facturaRows] = await db.query(
            `SELECT f.*, c.nombre, c.apellido, c.correo, c.direccion
            FROM factura f
            JOIN cliente c ON f.cliente_id = c.cliente_id
            WHERE f.pedido_id = ?`,
            [pedido_id]
        );

        if (facturaRows.length === 0) {
            return res.status(404).json({ message: 'No se encontró factura para este pedido.' });
        }

        const factura = facturaRows[0];

        // Obtener detalles del pedido
        const [detalles] = await db.query(
            `SELECT dp.producto_id, p.nombre_producto, dp.cantidad, dp.precio_unitario, dp.subtotal
            FROM detalle_pedido dp
            JOIN producto p ON dp.producto_id = p.producto_id
            WHERE dp.pedido_id = ?`,
            [pedido_id]
        );

        res.json({
            factura_id: factura.factura_id,
            pedido_id: factura.pedido_id,
            fecha_emision: factura.fecha_emision,
            cliente: {
                nombre: factura.nombre,
                apellido: factura.apellido,
                correo: factura.correo,
                direccion: factura.direccion,
            },
            tipo_entrega: factura.tipo_entrega,
            total: Number(factura.total).toFixed(2),
            detalles
        });
    } catch (error) {
        console.error('Error al obtener factura:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};