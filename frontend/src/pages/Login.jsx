import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'; // 🟢 Scoped login styles

const Login = ({ setLoggedIn }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem('token');
      const res = await axios.post('http://localhost:5000/api/auth/login', form);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      setLoggedIn(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Try again.');
    }
  };

  return (

    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2> Admin Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="login-input"
        />
        <input
          type="password"
          name="password"
          placeholder=" Password"
          value={form.password}
          onChange={handleChange}
          required
          className="login-input"
        />
        <button type="submit" className="login-btn">Login</button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
