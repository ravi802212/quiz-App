import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserLogin from './Component/UserLogin';
import UserSignup from './Component/UserSignup'
import UserDashboard from './Component/UserDashboard';
import Home from './Component/Home';
import Admin from './Component/Admin'; // Import Admin component
import Dashboard from './Component/Dashboard';

const App = () => {
  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/userdashboard" element={<UserDashboard />} /> 
        </Routes>
      </div>
    </Router>
  );
};



export default App;
