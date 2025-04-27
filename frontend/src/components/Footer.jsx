import React from 'react';
import './Footer.css';  

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <p>&copy; 2025 Himanshu Kumar. All Rights Reserved.</p>
      </div>
      <div>
        <a href="https://www.linkedin.com/in/himanshu" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a> 
        |
        <a href="mailto:himanshu@example.com" target="_blank" rel="noopener noreferrer">
          Email
        </a>
      </div>
    </footer>
  );
};

export default Footer;
