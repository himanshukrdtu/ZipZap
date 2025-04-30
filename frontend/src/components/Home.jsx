import React from 'react';
import './Home.css';
import { useUser } from "../context/UserContext";
import logo from '../assets/logo.png'; 

 
const Home = () => {
  const { user } = useUser();  

  return (
    <div className="home-container">
      <h1 className="welcome-title">
        <span className='yellow'>Welcome to</span>  
        <img src={logo} alt="ZipZap" className="logo-image" /> 
        <span className='green'>Your Instant Delivery Solution!</span>
      </h1>
      <p className="intro-paragraph">
        At ZipZap, we understand that time is of the essence. In today’s fast-paced world, we believe that your products should reach you in the blink of an eye. Our cutting-edge system connects you to the nearest Dark Store, ensuring that your order is fulfilled and dispatched in the shortest time possible. With real-time updates, quick delivery executives, and an easy-to-use interface for store operators, ZipZap makes online shopping faster and more efficient than ever before.
      </p>
    </div>
  );
};

export default Home;

 
