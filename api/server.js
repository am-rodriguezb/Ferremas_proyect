const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api', productRoutes); // tus rutas inician con /api

app.listen(4000, () => console.log('API corriendo en puerto 4000'));
