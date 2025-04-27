import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext';  
import { UserProvider } from './context/UserContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <UserProvider>   
      <AuthProvider>  
        <App />
      </AuthProvider>
    </UserProvider>
    
  </StrictMode>
);
