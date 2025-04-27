import  { useState } from 'react';
import './Register.css';

function Register() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const userData = {
      fullname,
      email,
      phoneNumber,
      password
    };

    try {
      const response = await fetch('http://localhost:8000/api/v1/user/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration Successful!');
        setFullname('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Create an Account</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="fullname" className="form-label">Full Name</label>
          <input 
            type="text" 
            id="fullname" 
            className="form-input" 
            value={fullname} 
            onChange={(e) => setFullname(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            type="email" 
            id="email" 
            className="form-input" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
          <input 
            type="tel" 
            id="phoneNumber" 
            className="form-input" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
            required
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
          <input 
            type="password" 
            id="confirm-password" 
            className="form-input" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button type="submit" className="register-btn">Register</button>
      </form>
      <div className="login-link">
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}

export default Register;
