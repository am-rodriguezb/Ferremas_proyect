export const purchaseTicket = async ({ items }) => {
    try {
        const response = await fetch('http://localhost:4000/api/mercado_pago/preference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ items }),
        });
        if (!response.ok) throw new Error('Error al crear preferencia');
        return await response.json();
    } catch (error) {
        console.error('Error purchasing ticket:', error);
        throw error;
    }
};
