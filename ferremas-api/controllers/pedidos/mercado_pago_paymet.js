const { Preference } = require('mercadopago');
const client = require("../../create_preference/preference");

const preference = new Preference(client);

const createPreference = async (req, res) => {
    try {
        const { items } = req.body;

        const mpPayload = {
            items,
            back_urls: {
            success: "https://1e57-2800-150-143-d2b-f97d-6ec0-d493-f257.ngrok-free.app/comprobante",
            failure: "https://1e57-2800-150-143-d2b-f97d-6ec0-d493-f257.ngrok-free.app/comprobante",
            pending: "https://1e57-2800-150-143-d2b-f97d-6ec0-d493-f257.ngrok-free.app/comprobante"
            },
            auto_return: "approved"
        };

        

        const response = await preference.create({ body: mpPayload });

        res.status(200).json({ init_point: response.init_point });
    } catch (error) {
        console.error("Error creating preference:", error);
        res.status(500).json({ error: "Error creating preference" });
    }
};

module.exports = { createPreference };