// src/components/ProductCard.jsx
import React from 'react';
import '../css/principal.css';

const ProductCard = ({ nombre, descripcion, precio, imagen, onAddToCart }) => {
    return (
        <div className="card h-100 shadow-sm border-0 product-card">
            {/* Contenedor de imagen con overlay */}
            <div className="position-relative overflow-hidden rounded-top">
                <img
                    src={imagen || 'https://via.placeholder.com/300x250?text=Producto'}
                    alt={nombre}
                    className="card-img-top product-image"
                />
            </div>
            
            <div className="card-body d-flex flex-column p-3">
                {/* Nombre del producto */}
                <h6 className="card-title mb-2 text-dark fw-normal product-title">
                    {nombre}
                </h6>
                {/* Descripción del producto */}
                {descripcion && (
                    <p className="product-description mb-2 text-muted" style={{ fontSize: '0.93rem', minHeight: '2.1em' }}>
                        {descripcion}
                    </p>
                )}
                {/* Precio */}
                <div className="mb-3">
                    <span className="h5 fw-bold text-dark mb-0">
                        ${precio?.toLocaleString() || '0'}
                    </span>
                </div>
                {/* Botones de acción - carrito y favoritos lado a lado */}
                <div className="mt-auto d-flex gap-2 align-items-center">
                    <button 
                        className="btn btn-primary btn-circle rounded-circle add-to-cart-btn-small"
                        onClick={onAddToCart}
                        style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <i className="bi bi-cart-plus"></i>
                    </button>
                    <button 
                        className="btn btn-outline-secondary btn-circle rounded-circle heart-btn-bottom"
                        style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <i className="bi bi-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
