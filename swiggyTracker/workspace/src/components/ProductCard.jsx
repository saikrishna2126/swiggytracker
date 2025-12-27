import React from 'react';

const ProductCard = ({ product, onDelete }) => {
    const isPriceDrop = product.currentPrice <= product.targetPrice;

    return (
        <div className="card animate-fade-in" style={{ borderLeft: isPriceDrop ? '4px solid var(--secondary-color)' : '4px solid var(--primary-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{product.name}</h3>
                    <a href={product.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textDecoration: 'underline' }}>
                        View on Swiggy
                    </a>
                </div>
                <button onClick={() => onDelete(product.id)} style={{ color: '#d32f2f', padding: '4px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', gap: '16px' }}>
                <div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Current Price</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: '700', color: isPriceDrop ? 'var(--secondary-color)' : 'var(--text-primary)' }}>
                        ₹{product.currentPrice}
                    </p>
                </div>
                <div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Target Price</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: '700' }}>₹{product.targetPrice}</p>
                </div>
            </div>

            {isPriceDrop && (
                <div style={{ marginTop: '12px', padding: '8px', background: '#e8f5e9', borderRadius: '4px', color: 'var(--secondary-color)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    Price drop detected!
                </div>
            )}

            <a href={product.url} target="_blank" rel="noopener noreferrer" className="btn" style={{ display: 'block', textAlign: 'center', marginTop: '16px', textDecoration: 'none', backgroundColor: 'var(--primary-color)', color: 'white' }}>
                Order Now on Swiggy
            </a>
        </div>
    );
};

export default ProductCard;
