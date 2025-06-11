const express = require('express');
const cors = require('cors');
const app = express();

const productRoutes = require('./routes/products');

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});
