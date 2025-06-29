export const purchaseTicket = async ({ items }) => {
    try {
        const response = await fetch('http://localhost:4000/api/mercado_pago/preference', {
            method: 'POST',
            body: JSON.stringify({ items }),
        });
        return response;
    } catch (error) {
        console.error('Error purchasing ticket:', error);
        throw error;
    }
};
