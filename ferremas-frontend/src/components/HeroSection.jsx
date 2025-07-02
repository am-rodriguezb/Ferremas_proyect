// 📁 components/HeroSection.jsx
import React from 'react';

const HeroSection = () => {
    return (
        <section className="hero-section">
            <div className="container">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Construye tus <span style={{ color: 'var(--primary)' }}>sueños</span>
                    </h1>
                    <p className="hero-subtitle">
                        Encuentra las mejores herramientas y materiales para dar vida a tus proyectos.
                    </p>
                    <button className="btn-hero">Explorar</button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;