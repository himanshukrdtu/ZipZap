import { createContext, useContext, useState, useEffect } from "react";

 
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

   
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");  
    }
  }, [user]);

  const login = (userData) => {
    
    setUser(userData);
  };

  const logout = () => {
   
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");   
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

 
export const useUser = () => useContext(UserContext);
