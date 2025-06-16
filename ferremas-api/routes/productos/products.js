const express = require('express');
const router = express.Router();
const controller = require('../../controllers/productos/productController');


router.get('/', controller.getAll);            // GET /api/productos
router.get('/:id', controller.getById);        // GET /api/productos/:id
router.post('/', controller.create);           // POST /api/productos
router.put('/:id', controller.update);         // PUT /api/productos/:id
router.delete('/:id', controller.delete);      // DELETE /api/productos/:id

module.exports = router;
