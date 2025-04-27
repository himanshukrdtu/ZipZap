import React, { useEffect } from 'react';
import './Home.css';  
import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";
import Cookies from 'js-cookie';  

const Home = () => {
  const { user, login } = useUser();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    
     
     const userFromStorage = localStorage.getItem('user'); 

    if (userFromStorage) {
     
      login(JSON.parse(userFromStorage));
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  console.log("user in home", user);

  return (
    <div className="home-container">
      <h1 className="welcome-title">Welcome to ZipZap – Your Instant Delivery Solution!</h1>
      <p className="intro-paragraph">
      At ZipZap, we understand that time is of the essence. In today’s fast-paced world, we believe that your products should reach you in the blink of an eye. Our cutting-edge system connects you to the nearest Dark Store, ensuring that your order is fulfilled and dispatched in the shortest time possible. With real-time updates, quick delivery executives, and an easy-to-use interface for store operators, ZipZap makes online shopping faster and more efficient than ever before. From the moment you place your order to the moment it reaches your door, we ensure that every step is handled with speed and precision. Experience delivery like never before – Fast, Reliable, and ZipZap!
      </p>
    </div>
  );
};

export default Home;
