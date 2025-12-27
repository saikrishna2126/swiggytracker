import React, { useState, useEffect } from 'react';
import ProductCard from './components/ProductCard';
import AddProduct from './components/AddProduct';
import { fetchProductDetails } from './services/tracker';

function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('swiggy-tracker-products');
    return saved ? JSON.parse(saved) : [];
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    localStorage.setItem('swiggy-tracker-products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    // Check for price drops (simple polling simulation or just check on load)
    const interval = setInterval(() => {
      // Logic to auto-refresh prices could go here
    }, 60000);
    return () => clearInterval(interval);
  }, [products]);

  const handleAddProduct = async ({ url, itemName, targetPrice }) => {
    try {
      const details = await fetchProductDetails(url, itemName);
      const newProduct = {
        id: Date.now(),
        ...details,
        targetPrice,
        url // Ensure URL is saved
      };
      setProducts(prev => [...prev, newProduct]);
      setShowAddForm(false);

      // Check immediate price drop
      if (newProduct.currentPrice <= targetPrice) {
        new Notification("Price Drop Alert!", {
          body: `${newProduct.name} is now ₹${newProduct.currentPrice} (Target: ₹${targetPrice})`,
          icon: '/pwa-192x192.png'
        });
      }
    } catch (error) {
      alert("Failed to fetch product details. Please try again.");
    }
  };

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const requestNotificationPermission = () => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <div className="container">
      <header>
        <div className="logo">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" /></svg>
          SwiggyTracker
        </div>
        <button className="btn" style={{ width: 'auto', padding: '8px 16px', fontSize: '0.9rem' }} onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? 'Close' : 'Add Item'}
        </button>
      </header>

      <main>
        {showAddForm && (
          <div style={{ marginBottom: '20px' }}>
            <AddProduct onAdd={handleAddProduct} />
          </div>
        )}

        {products.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-secondary)' }}>
            <p>No items being tracked.</p>
            <p>Click "Add Item" to start tracking prices.</p>
          </div>
        ) : (
          products.map(product => (
            <ProductCard key={product.id} product={product} onDelete={handleDelete} />
          ))
        )}
      </main>

      <footer style={{ textAlign: 'center', color: '#999', fontSize: '0.8rem', padding: '20px' }}>
        <p>&copy; 2024 Swiggy Price Tracker PWA</p>
      </footer>
    </div>
  );
}

export default App;
