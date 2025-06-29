// SDK de Mercado Pago
const { MercadoPagoConfig } = require('mercadopago');
const dotenv = require('dotenv');
dotenv.config();



const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

module.exports = client;

