import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';

import Footer from './components/Footer';
import Home from './components/Home';
 
import Register from './components/Register';
import Login from './components/Login';
 
function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
