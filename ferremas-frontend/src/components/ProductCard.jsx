// src/components/ProductCard.jsx
import React from 'react';
import '../css/principal.css'; // o el archivo CSS donde estás trabajando

const ProductCard = ({ nombre, precio, imagen, onAddToCart }) => {
    return (
        <div className="card h-100 shadow-sm">
        <img
            src={imagen || 'https://via.placeholder.com/300x200?text=Producto'}
            alt={nombre}
            className="card-img-top object-fit-cover"
            style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
            <h5 className="card-title">{nombre}</h5>
            <p className="card-text fw-bold text-primary">${precio?.toLocaleString() || '0'}</p>
            <button className="btn btn-outline-primary mt-auto" onClick={onAddToCart}>
            Agregar al carrito
            </button>
        </div>
        </div>
    );
};

export default ProductCard;
