import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "./Login.css";

function Login() {
  const { user, login } = useUser();
  const { setIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,  
        }
      );

      const data = response.data;

      if (response.status === 200) {
        
        localStorage.setItem("user", JSON.stringify(data.user));

        login(data.user);  

        setIsLoggedIn(true);
        alert("Login successful!");
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("Network error or server not responding");
    }
  };

  useEffect(() => {
    console.log("Updated user in context:", user);
  }, [user]);

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-btn">Login</button>
      </form>
      <div className="signup-link">
        <p>Don't have an account? <a href="/register">Sign up</a></p>
      </div>
    </div>
  );
}

export default Login;
