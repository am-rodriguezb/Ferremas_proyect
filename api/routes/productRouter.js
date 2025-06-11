const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.get('/producto', controller.getAllProducts);

module.exports = router;
