/* AddProduct.jsx */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

function AddProduct() {
  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

     
    if (!name || !weight || price === '' || !category) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!imageFile) {
      setError('Please select an image file.');
      return;
    }

     
    const formData = new FormData();
    formData.append('name', name);
    formData.append('weight', weight);
    formData.append('price', parseFloat(price));
    if (discount) formData.append('discount', discount);
    if (deliveryTime) formData.append('deliveryTime', deliveryTime);
    formData.append('category', category);
    formData.append('stock', stock ? parseInt(stock, 10) : 0);
    formData.append('images', imageFile);  

    try {
      const response = await fetch('https://render-zipzap-backend-deployment.onrender.com/api/v1/product/new', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess('Product added successfully!');
        
        setName('');
        setWeight('');
        setPrice('');
        setDiscount('');
        setDeliveryTime('');
        setCategory('');
        setStock('');
        setImageFile(null);
        
        
      } else {
        setError(data.message || 'Failed to add product.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="add-product-container">
      <h1 className="add-product-title">Add New Product</h1>
      <form onSubmit={handleSubmit} className="add-product-form" encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            className="form-input"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight *</label>
          <input
            type="text"
            id="weight"
            className="form-input"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price *</label>
          <input
            type="number"
            id="price"
            className="form-input"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="discount">Discount</label>
          <input
            type="text"
            id="discount"
            className="form-input"
            value={discount}
            onChange={e => setDiscount(e.target.value)}
            placeholder="e.g. 10% discount"
          />
        </div>
        <div className="form-group">
          <label htmlFor="deliveryTime">Delivery Time</label>
          <input
            type="text"
            id="deliveryTime"
            className="form-input"
            value={deliveryTime}
            onChange={e => setDeliveryTime(e.target.value)}
            placeholder="e.g. 30 min"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <input
            type="text"
            id="category"
            className="form-input"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            className="form-input"
            value={stock}
            onChange={e => setStock(e.target.value)}
            min="0"
          />
        </div>
        <div className="form-group">
          <label htmlFor="images">Product Image *</label>
          <input
            type="file"
            id="images"
            accept="image/*"
            className="form-input"
            onChange={handleFileChange}
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
