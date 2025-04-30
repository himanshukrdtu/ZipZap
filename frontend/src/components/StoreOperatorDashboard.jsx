import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StoreOperatorDashboard.css';
import { useUser } from '../context/UserContext';

const orderStatusFlow = ['Preparing', 'Packed', 'Dispatched', 'Delivered'];

const StoreOperatorDashboard = () => {
  const { user } = useUser();   
  const operatorId = user?._id;   
  
  const [pendingOrders, setPendingOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!operatorId) {
      console.error('Operator ID is missing!');
      return;   
    }

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/v1/store/operator/${operatorId}/orders`,
          { withCredentials: true }
        );

        console.log('Fetched orders:', data); 

        const pending = [];
        const history = [];

        data.orders.forEach(order => {
          const formattedOrder = {
            id: order._id,
            customerName: order.user?.fullname || 'Unknown',
            items: order.orderItems.map(item => ({
              name: item.product?.name || 'Unknown Product',
              quantity: item.quantity,
            })),
            totalCost: order.totalPrice,
            address: `${order.shippingInfo.address}, ${order.shippingInfo.city}`,
            currentStatus: order.orderStatus,
          };

          if (order.orderStatus === 'Delivered') {
            history.push(formattedOrder);
          } else {
            pending.push(formattedOrder);
          }
        });

        setPendingOrders(pending);
        setOrderHistory(history);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch store orders:', error.response?.data || error.message || error);
        setLoading(false);
      }
    };

    fetchOrders(); 
  }, [operatorId]); 

  const updateOrderStatus = (orderId) => {
    setPendingOrders(prev =>
      prev.map(order => {
        if (order.id === orderId) {
          const currentIndex = orderStatusFlow.indexOf(order.currentStatus);
          const nextStatus = orderStatusFlow[currentIndex + 1] || order.currentStatus;
          return { ...order, currentStatus: nextStatus };
        }
        return order;
      })
    );
  };

  const handleButtonClick = (order, status) => {
    if (status === 'Delivered') {
      setPendingOrders(prev => prev.filter(o => o.id !== order.id));
      setOrderHistory(prev => [...prev, { ...order, currentStatus: 'Delivered' }]);

      axios.patch(`http://localhost:8000/api/v1/order/${order.id}/status`, {
        status: 'Delivered'
      })
      .then(response => {
        console.log('Order status updated:', response.data);
      })
      .catch(err => {
        console.error('Failed to update status on backend:', err.response?.data || err.message);
      })}
      
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="store-operator-dashboard">
      <h2>Pending Orders</h2>
      <div className="order-list">
        {pendingOrders.length > 0 ? (
          pendingOrders.map(order => {
            const currentIndex = orderStatusFlow.indexOf(order.currentStatus);
            return (
              <div key={order.id} className="order-card">
                <h3>Ordered By: {order.customerName}</h3>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={idx}>{item.name} - {item.quantity}</li>
                  ))}
                </ul>
                <p><strong>Total Cost:</strong> ₹{order.totalCost}</p>
                <p><strong>Address:</strong> {order.address}</p>

                <div className="order-actions">
                  {orderStatusFlow.map((status, idx) => (
                    <button
                      key={status}
                      onClick={() => handleButtonClick(order, status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <p className="status-text"><strong>Current Status:</strong> {order.currentStatus}</p>
              </div>
            );
          })
        ) : (
          <p>No pending orders!</p>
        )}
      </div>

      <h2>Order History</h2>
      <div className="order-list">
        {orderHistory.length > 0 ? (
          orderHistory.map(order => (
            <div key={order.id} className="order-card history-card">
              <h3>Ordered By: {order.customerName}</h3>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>{item.name} - {item.quantity}</li>
                ))}
              </ul>
              <p><strong>Total Cost:</strong> ₹{order.totalCost}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p className="status-text"><strong>Final Status:</strong> {order.currentStatus}</p>
            </div>
          ))
        ) : (
          <p>No orders delivered yet!</p>
        )}
      </div>
    </div>
  );
};

export default StoreOperatorDashboard;
