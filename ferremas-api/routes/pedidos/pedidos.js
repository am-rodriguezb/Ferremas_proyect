const express = require("express");
const router = express.Router();
const pedidosController = require("../../controllers/pedidos/pedidosController");
const { verifyToken, permitRole } = require("../../middleware/authMiddleware");

router.get("/", pedidosController.getAll);
router.get("/:id", pedidosController.getById);
router.post("/", pedidosController.create);
router.put("/:id", pedidosController.update);
router.delete("/:id", pedidosController.delete); // cancelación
router.post("/crear-con-detalles", pedidosController.crearPedidoConDetalles);
router.put(
    "/confirmar/:id",
    verifyToken,
    permitRole("Administrador", "Vendedor"),
    pedidosController.confirmarPedidoPorId // Debes crear este handler
);
router.put(
    "/asignar-bodeguero",
    verifyToken,
    permitRole("Administrador", "Vendedor"),
    pedidosController.asignarBodeguero
);

module.exports = router;
