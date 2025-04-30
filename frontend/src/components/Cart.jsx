
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState('680f1513998428e03e17dd00');
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    phoneNo: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

   const haversineDistance = (lat1, lon1, lat2, lon2) => {
    console.log(lat1, lon1, lat2, lon2);
  const toRadians = angle => angle * (Math.PI / 180);
  const R = 6371;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const handlePlaceOrder = async () => {
  if (cartItems.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const { address, city, state, country, pincode, phoneNo } = shippingInfo;
  if (!address || !city || !state || !country || !pincode || !phoneNo) {
    alert('Please fill all shipping details.');
    return;
  }

  const orderItems = cartItems.map(item => ({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    image: item.imageUrl,
    product: item._id
  }));

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const orderData = {
    shippingInfo,
    orderItems,
    user: userId,
    totalPrice
  };

  try {
     
    const response = await axios.post('https://render-zipzap-backend-deployment.onrender.com/api/v1/order/create', orderData);
    const newOrder = response.data.order;
    const { latitude, longitude } = newOrder.shippingInfo;
    
     
    const storeRes = await axios.get('https://render-zipzap-backend-deployment.onrender.com/api/v1/store/get-allstores');
    const stores = storeRes.data.stores;
     
     
    let minDistance = Infinity;
    let nearestStore = null;

    stores.forEach(store => {
      const dist = haversineDistance(latitude, longitude, store.lat, store.lon);
      console.log(`Distance to store:${store.store_id}`, dist);
      if (dist < minDistance) {
        minDistance = dist;
       
        nearestStore = store;
      }
    });

    if (!nearestStore) {
      alert('No nearby store found.');
      return;
    }

     
    await axios.post('https://render-zipzap-backend-deployment.onrender.com/api/v1/store/add-order', {
      store_id: nearestStore.store_id,
      orderId: newOrder._id
    });

    
    alert(`Order placed successfully and assigned to store ${nearestStore.store_id}!`);
    localStorage.removeItem('cartItems');
    setCartItems([]);
    navigate('/');
  } catch (error) {
    console.error('Error placing order:', error);
    alert('Failed to place order.');
  }
};

  

  const handleQuantityChange = (productId, amount) => {
    const updatedCart = cartItems.map(item =>
      item._id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
  
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item._id} className="cart-item-row">
                <img src={item.imageUrl || 'https://via.placeholder.com/150'} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Weight: {item.weight}</p>
                  <p>Price: ₹{item.price}</p>
                  <p>
                    Quantity:
                    <button className="quantity-btn" onClick={() => handleQuantityChange(item._id, -1)}>-</button>
                    {item.quantity}
                    <button className="quantity-btn" onClick={() => handleQuantityChange(item._id, 1)}>+</button>
                  </p>
                  <button className="remove-btn" onClick={() => handleRemoveItem(item._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
  
         
          <div className="shipping-form">
            <h3>Shipping Address</h3>
            <input type="text" name="address" placeholder="Address" value={shippingInfo.address} onChange={handleShippingChange} />
            <input type="text" name="city" placeholder="City" value={shippingInfo.city} onChange={handleShippingChange} />
            <input type="text" name="state" placeholder="State" value={shippingInfo.state} onChange={handleShippingChange} />
            <input type="text" name="country" placeholder="Country" value={shippingInfo.country} onChange={handleShippingChange} />
            <input type="number" name="pincode" placeholder="Pincode" value={shippingInfo.pincode} onChange={handleShippingChange} />
            <input type="number" name="phoneNo" placeholder="Phone Number" value={shippingInfo.phoneNo} onChange={handleShippingChange} />
          </div>
  
          <div className="cart-summary">
            <h3>Total: ₹{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h3>
            <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
  
}

export default Cart;
