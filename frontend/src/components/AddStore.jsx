import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

function AddStore() {
  const [storeId, setStoreId] = useState('');
  const [address, setAddress] = useState('');
  const [operatorId, setOperatorId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!storeId || !address || !operatorId) {
      setError('Please fill in all fields.');
      return;
    }

    const body = {
      store_id: parseInt(storeId, 10),
      address,
      operatorId
    };

    try {
      const response = await fetch('http://localhost:8000/api/v1/store/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Store added successfully!');
        setStoreId('');
        setAddress('');
        setOperatorId('');
        
      } else {
        setError(data.message || 'Failed to add store.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="add-product-container">
      <h1 className="add-product-title">Add New Store</h1>
      <form onSubmit={handleSubmit} className="add-product-form">
        <div className="form-group">
          <label htmlFor="storeId">Store ID *</label>
          <input
            type="number"
            id="storeId"
            className="form-input"
            value={storeId}
            onChange={e => setStoreId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Store Address *</label>
          <input
            type="text"
            id="address"
            className="form-input"
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="operatorId">Operator ID *</label>
          <input
            type="text"
            id="operatorId"
            className="form-input"
            value={operatorId}
            onChange={e => setOperatorId(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button type="submit" className="submit-btn">Add Store</button>
      </form>
    </div>
  );
}

export default AddStore;
