import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignupForm from './component/SignupForm';
import SignIn from './component/SigninForm';
import Dashboard from './component/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
    </div>
  </Router>
  );
}

export default App;
