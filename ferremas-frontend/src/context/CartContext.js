import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    // Inicializa el carrito desde localStorage, o como array vacío
    const [carrito, setCarrito] = useState(() => {
        const guardado = localStorage.getItem('carrito');
        return guardado ? JSON.parse(guardado) : [];
    });

    // Guarda el carrito en localStorage cada vez que cambia
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    const agregarAlCarrito = (producto) => {
        setCarrito((prev) => {
            const existe = prev.find((p) => p.producto_id === producto.producto_id);
            if (existe) {
                return prev.map((p) =>
                    p.producto_id === producto.producto_id
                        ? { ...p, cantidad: p.cantidad + 1 }
                        : p
                );
            }
            return [...prev, { ...producto, cantidad: 1 }];
        });
    };

    const quitarDelCarrito = (producto_id) => {
        setCarrito((prev) => prev.filter((p) => p.producto_id !== producto_id));
    };

    const vaciarCarrito = () => setCarrito([]);

    const incrementarCantidad = (producto_id) => {
        setCarrito((prev) =>
            prev.map((p) =>
                p.producto_id === producto_id ? { ...p, cantidad: p.cantidad + 1 } : p
            )
        );
    };

    const disminuirCantidad = (producto_id) => {
        setCarrito((prev) =>
            prev
                .map((p) =>
                    p.producto_id === producto_id
                        ? { ...p, cantidad: p.cantidad - 1 }
                        : p
                )
                .filter((p) => p.cantidad > 0)
        );
    };

    return (
        <CartContext.Provider
            value={{
                carrito,
                agregarAlCarrito,
                quitarDelCarrito,
                vaciarCarrito,
                incrementarCantidad,
                disminuirCantidad,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
