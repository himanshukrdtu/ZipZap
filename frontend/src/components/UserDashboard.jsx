  
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserDashboard.css';

function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    axios
      .get('https://render-zipzap-backend-deployment.onrender.com/api/v1/product/getAllProducts')
      .then(response => {
        if (isMounted) {
          setProducts(response.data.products);
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError('Failed to load products');
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item._id === product._id);
    if (existingItem) {
       
      const updatedCart = cartItems.map(item =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const goToCart = () => {
    navigate('/cart');   
  };

  if (loading) return <p className="loading">Loading products…</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      <div style={{ textAlign: "right", margin: "10px" }}>
        <button className="go-to-cart-btn" onClick={goToCart}>Go to Cart ({cartItems.length})</button>
      </div>

      <div className="products-container">
        {products.map(p => (
          <div className="product-card" key={p._id}>
            <img
              src={p.imageUrl || 'https://via.placeholder.com/300x200'}
              alt={p.name}
              className="product-image"
            />
            <div className="product-details">
              <h3 className="product-name">{p.name}</h3>
              <p className="product-weight">{p.weight}</p>
              <p className="product-price">₹{p.price}</p>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(p)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
