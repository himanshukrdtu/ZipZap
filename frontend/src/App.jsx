/* App.js (Routing Setup) */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
 
import UserDashboard from './components/UserDashboard';
import AddProduct from './components/AddProduct';
 
import { useUser } from './context/UserContext';
import AddStore from './components/AddStore';
import Cart from './components/Cart';
import StoreOperatorDashboard from './components/StoreOperatorDashboard'; 
function App() {
  const { user } = useUser();

  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        

        {/* Admin Routes */}
        {user && user.role === 'admin' && (
          <>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/add-store" element={<AddStore />} />
          </>
        )}

        {/* Store Operator Routes */}
        {user && user.role === 'store_operator' && (
        <Route path="/store-dashboard" element={<StoreOperatorDashboard />} />
        )}
       

        {/* Regular User Routes */}
        {user && user.role === 'user' && (
  <>
    <Route path="/user-dashboard" element={<UserDashboard />} />
    <Route path="/cart" element={<Cart />} />
  </>
)}

        {/* Catch-all for unauthenticated users */}
        {!user && <Route path="*" element={<Navigate to="/login" />} />}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
