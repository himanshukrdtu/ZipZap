import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();   

  const handleAddProduct = () => {
    navigate('/add-product');  
  };

  const handleAddStore = () => {
    navigate('/add-store'); 
  };

  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-title">Welcome, Admin</h1>
      <div className="admin-dashboard-actions">
        <button className="admin-dashboard-btn" onClick={handleAddProduct}>
          Add Product
        </button>
        <button className="admin-dashboard-btn" onClick={handleAddStore}>
          Add Store
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;
