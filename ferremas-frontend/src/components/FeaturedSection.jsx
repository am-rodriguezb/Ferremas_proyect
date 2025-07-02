// 📁 components/FeaturedSection.jsx
import React from 'react';
import ProductCard from './ProductCard';

const FeaturedSection = ({ productos, onAddToCart }) => {
    return (
        <section className="products-section" id="nuevos">
            <div className="container">
                <h2 className="section-title">Nuevos Productos</h2>
                <div className="row">
                    {productos.map((prod) => (
                        <div className="col-12 col-sm-6 col-md-3 mb-4" key={prod.producto_id}>
                            <ProductCard {...prod} onAddToCart={() => onAddToCart(prod)} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedSection;