import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import logo from '../assets/logo.png';  
import './Header.css';

function Header() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
     
    const savedUser = localStorage.getItem("user");
    setIsLoggedIn(!!savedUser);
  }, [user]); 
   

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    logout();  
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search for:', searchQuery);
  };

  return (
    <header className="Header">
      <nav className="nav-links">
       
        
         
        {!isLoggedIn && (
          <>
            <div className="logo">
              <img src={logo} alt="ZipZap" className="logo-image" />
            </div>
            <div className="user-actions">
              <button><Link to="/login">Login</Link></button>
              <button><Link to="/register">Register</Link></button>
            </div>
          </>
        )}

        
        {isLoggedIn && user?.role === 'user' && (
          <>
            <div 
              className="logo" 
              onClick={() => navigate('/user-dashboard')}
              style={{ cursor: 'pointer' }}
            >
              <img src={logo} alt="ZipZap" className="logo-image" />
            </div>
            <div className="search-bar">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                />
              </form>
            </div>
            <div className="user-actions">
              <span>Hi, {user?.fullname}</span>
              <button onClick={() => navigate('/cart')}>Go to Cart</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </>
        )}

        {isLoggedIn && user?.role === 'admin' && (
          <>
            <img src={logo} alt="ZipZap" className="logo-image" />
            <div className="middle dashboard">
              <Link to="/admin-dashboard">Dashboard</Link>
            </div>
            <div className="user-actions">
              <span>Hi Admin, {user?.fullname}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </>
        )}

        {isLoggedIn && user?.role === 'store_operator' && (
          <>
            <div 
              className="logo" 
              onClick={() => navigate('/store-dashboard')}
              style={{ cursor: 'pointer' }}
            >
              <img src={logo} alt="ZipZap" className="logo-image" />
            </div>
            
            <div className="user-actions">
              <span>Hi Operator, {user?.fullname}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
