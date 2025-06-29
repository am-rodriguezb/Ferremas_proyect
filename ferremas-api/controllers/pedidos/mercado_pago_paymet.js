const { Preference } = require('mercadopago');
const client = require("../../create_preference/preference");

const preference = new Preference(client);

const createPreference = async (req, res) => {
    try {
        const { items } = req.body;

        const mpPayload = {
            items,
            back_urls: {
                success: "https://www.google.com",
                failure: "https://www.google.com",
                pending: "https://www.google.com"
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