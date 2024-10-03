import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import login from "../assets/login.jpeg";

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
     
      const response = await axios.get('http://localhost:3001/users');
      const users = response.data;

      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        alert('Login successful!');
        navigate('/UserDashboard'); 
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error connecting to the server');
    }
  };

  return (
    <div 
      className="flex items-center justify-center h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url(${login})` }} 
    >
      <div className="bg-white p-20  rounded shadow-md w-96 bg-opacity-60">
        <h2 className="text-2xl font-bold mb-4">User Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login 
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p className="mt-4 text-sm">
          Don't have an account? 
          <button
            onClick={() => navigate('/signup')} 
            className="text-blue-500 hover:underline ml-1"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
