

import React from 'react';
import { useLocation,useNavigate} from "react-router-dom";

const Dashboard = () => {

  const location = useLocation();
  const navigate = useNavigate();
 const email = location.state?.email;

 
console.log("Email---",email)
  // Handle Sign Out
  const handleSignOut = () => {
    navigate('/');
    alert('You have signed out!');
  };

  return (
    <div style={{  color: 'white', margin:'20px'}}>
      {/* Navbar Section */}
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: '#5A0F6C',
          color: 'white',
          padding: '10px 20px',
        }}
      >
        <span className="navbar-brand" style={{ color: 'white' }}>
          Dashboard
        </span>
        <div className="ml-auto d-flex justify-content-end" style={{ flexGrow: 1 }}>
          <button
            className="btn btn-outline-light"
            onClick={handleSignOut}
            style={{ color: 'white', borderColor: 'white' }}
          >
            Sign Out
          </button>
        </div>
      </nav>
    
      <div
        style={{
          marginTop: '50px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          maxWidth: '400px',
          margin: 'auto',
          textAlign: 'center',
          color:"black"
        }}
      >
          <h3>Welcome to the Dashboard</h3>
          {email}
        
      
      </div>
    </div>
  );
};

export default Dashboard;
