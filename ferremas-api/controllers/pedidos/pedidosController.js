const db = require("../../database");

// Obtener todos los pedidos
exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query(`
        SELECT p.*, 
                c.username AS cliente,
                v.username AS vendedor,
                b.username AS bodeguero,
                s.nombre_sucursal,
                e.nombre_estado
        FROM pedido p
        LEFT JOIN user c ON p.cliente_id = c.user_id
        LEFT JOIN user v ON p.vendedor_id = v.user_id
        LEFT JOIN user b ON p.bodeguero_id = b.user_id
        LEFT JOIN sucursal s ON p.sucursal_id = s.sucursal_id
        LEFT JOIN estado e ON p.estado_actual = e.estado_id
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obtener pedido por ID
exports.getById = async (req, res) => {
    try {
        const [rows] = await db.query(
        `
        SELECT * FROM pedido WHERE pedido_id = ?
        `,
        [req.params.id]
        );

        if (rows.length === 0)
        return res.status(404).json({ error: "Pedido no encontrado" });

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Crear pedido
exports.create = async (req, res) => {
    try {
        const {
        cliente_id,
        vendedor_id,
        bodeguero_id,
        tipo_entrega,
        sucursal_id,
        direccion_envio,
        estado_actual,
        total,
        observaciones,
        } = req.body;

        const [result] = await db.query(
        `
        INSERT INTO pedido (cliente_id, vendedor_id, bodeguero_id, tipo_entrega,
                            sucursal_id, direccion_envio, estado_actual, total, observaciones)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
            cliente_id,
            vendedor_id,
            bodeguero_id,
            tipo_entrega,
            sucursal_id,
            direccion_envio,
            estado_actual || 1,
            total,
            observaciones,
        ]
        );

        res
        .status(201)
        .json({ message: "Pedido creado", pedido_id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Actualizar pedido
exports.update = async (req, res) => {
    try {
        const [result] = await db.query(
        `
        UPDATE pedido SET ? WHERE pedido_id = ?
        `,
        [req.body, req.params.id]
        );

        res.json({ message: "Pedido actualizado", cambios: result.affectedRows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar/cancelar pedido
exports.delete = async (req, res) => {
    try {
        const [result] = await db.query(
        `
        DELETE FROM pedido WHERE pedido_id = ?
        `,
        [req.params.id]
        );

        if (result.affectedRows === 0)
        return res.status(404).json({ error: "Pedido no encontrado" });

        res.json({ message: "Pedido eliminado" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.crearPedidoConDetalles = async (req, res) => {
    const {
        cliente_id,
        vendedor_id,
        bodeguero_id,
        tipo_entrega,
        sucursal_id,
        direccion_envio,
        total,
        productos, // array de { producto_id, cantidad, precio_unitario }
        observaciones = ''
    } = req.body;

    const conn = await db.getConnection();
    await conn.beginTransaction();

    if (!['Retiro en tienda', 'Despacho a domicilio'].includes(tipo_entrega)) {
        return res.status(400).json({ message: 'Tipo de entrega inválido' });
    }
    
    try {
        // Insertar el pedido
        const ESTADO_PENDIENTE = 1; // O usa la consulta dinámica si prefieres

        const [pedidoResult] = await conn.query(
            `INSERT INTO pedido (cliente_id, vendedor_id, bodeguero_id, tipo_entrega, sucursal_id, direccion_envio, total, estado_actual, fecha, observaciones)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)`,
            [cliente_id, vendedor_id, bodeguero_id, tipo_entrega, sucursal_id, direccion_envio, total, ESTADO_PENDIENTE, observaciones]
        );

        const pedido_id = pedidoResult.insertId;

        // Insertar los detalles del pedido
        for (const prod of productos) {
            await conn.query(
                `INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad, precio_unitario)
                VALUES (?, ?, ?, ?)`,
                [
                    pedido_id,
                    prod.producto_id,
                    prod.cantidad,
                    prod.precio_unitario
                ]
            );
        }

        await conn.commit();
        res.status(201).json({ message: 'Pedido registrado con éxito', pedido_id });
    } catch (error) {
        await conn.rollback();
        console.error('Error al registrar el pedido:', error);
        res.status(500).json({ message: 'Error al registrar el pedido', error: error.message });
        res.status(500).json({ message: 'Error al registrar el pedido', error });
    } finally {
        conn.release();
    }
};

exports.confirmarPedido = async (req, res) => {
    const { pedido_id, vendedor_id } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE pedido SET estado_actual = 'confirmado', vendedor_id = ? WHERE pedido_id = ? AND estado_actual = 'pendiente'`,
            [vendedor_id, pedido_id]
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'No se pudo confirmar. El pedido ya está confirmado o no existe.' });
        }

        res.json({ message: 'Pedido confirmado con éxito' });
    } catch (err) {
        console.error('Error al confirmar pedido:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.asignarBodeguero = async (req, res) => {
    const { pedido_id, bodeguero_id } = req.body;

    try {
        const [result] = await db.query(
            `UPDATE pedido SET bodeguero_id = ? WHERE pedido_id = ? AND estado_actual = 'confirmado'`,
            [bodeguero_id, pedido_id]
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'No se pudo asignar. El pedido no está confirmado o no existe.' });
        }

        res.json({ message: 'Bodeguero asignado correctamente al pedido.' });
    } catch (error) {
        console.error('Error al asignar bodeguero:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Confirmar pedido (cambiar a estado_id 2)
exports.confirmarPedidoPorId = async (req, res) => {
    const pedido_id = req.params.id;
    try {
        await db.query(
            "UPDATE pedido SET estado_actual = ? WHERE pedido_id = ?",
            [2, pedido_id] // 2 = 'Aprobado por Vendedor'
        );
        res.json({ message: 'Pedido confirmado' });
    } catch (err) {
        console.error('Error al confirmar pedido:', err);
        res.status(500).json({ message: 'Error al confirmar pedido' });
    }
};






