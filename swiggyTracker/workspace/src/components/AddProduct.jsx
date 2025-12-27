
import React, { useState } from 'react';

const AddProduct = ({ onAdd }) => {
    const [url, setUrl] = useState('');
    const [itemName, setItemName] = useState('');
    const [targetPrice, setTargetPrice] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url || !targetPrice || !itemName) return;

        setLoading(true);
        // Simulate fetching logic for now, or use a callback
        await onAdd({ url, itemName, targetPrice: Number(targetPrice) });
        setLoading(false);
        setUrl('');
        setItemName('');
        setTargetPrice('');
    };

    return (
        <form onSubmit={handleSubmit} className="card animate-fade-in">
            <h3 style={{ marginBottom: '16px' }}>Track New Item</h3>

            <div className="input-group">
                <label htmlFor="url">Swiggy Restaurant URL</label>
                <input
                    type="url"
                    id="url"
                    placeholder="https://www.swiggy.com/restaurants/..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor="itemName">Item Name (Exact or Partial)</label>
                <input
                    type="text"
                    id="itemName"
                    placeholder="e.g. Chicken Bucket"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    required
                />
            </div>

            <div className="input-group">
                <label htmlFor="price">Target Price (₹)</label>
                <input
                    type="number"
                    id="price"
                    placeholder="e.g. 150"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    required
                />
            </div>

            <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Adding...' : 'Start Tracking'}
            </button>
        </form>
    );
};

export default AddProduct;
