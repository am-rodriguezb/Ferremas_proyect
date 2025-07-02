// 📁 components/ProductGrid.jsx
import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ productos, onAddToCart }) => {
    if (!productos || productos.length === 0) return (
        <div className="text-center py-5">
            <h5>No hay productos para mostrar.</h5>
        </div>
    );

    return (
        <section className="products-section" id="productos">
            <div className="container">
                <h2 className="section-title">Todos los Productos</h2>
                <div className="row">
                    {productos.map((prod) => (
                        <div className="col-12 col-sm-6 col-md-3 mb-4" key={prod.producto_id}>
                            <ProductCard
                                nombre={prod.nombre_producto}
                                descripcion={prod.descripcion}
                                precio={prod.precio}
                                imagen={prod.url_imagen}
                                onAddToCart={() => onAddToCart(prod)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;