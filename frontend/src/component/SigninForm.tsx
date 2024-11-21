import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import image from '../Assets/singin.jpg';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      // Make the POST request to the login endpoint
      const response = await axios.post("http://localhost:5001/user/login", {
        email,
        password,
      });
  
      // Handle successful login
      if (response.status === 200) {
        const { token, message } = response.data;
  
        // Save the token in localStorage or sessionStorage
        localStorage.setItem("token", token);
  
        setError(""); // Clear any existing errors
        alert(message || "Login successful!"); // Show success message
  
        // Redirect to the dashboard or another page
        //navigate("/dashboard");
        navigate('/dashboard', { state: { email:email } });
      }
    } catch (err: any) {
      // Handle errors
      if (err.response) {
        // Errors returned from the server
        const errorMessage = err.response.data?.message || "Invalid login credentials.";
        alert(errorMessage);
      } else if (err.request) {
        // No response received from the server
        alert("Server is not responding. Please try again later.");
      } else {
        // Any other error
        alert("An error occurred. Please try again.");
      }
    }
  };
  

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "20px",
      }}
    >
      <div
        className="row shadow-lg bg-white rounded"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        <div
          className="col-md-6 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "#f2f2f2" }}
        >
          <img
            src={image}
            alt="Sign-In Illustration"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="col-md-6 p-5">
          <h2 className="mb-4 text-center" style={{ color: "#5A5A5A" }}>
            Sign In
          </h2>
          {error && (
            <div
              className="alert alert-danger"
              role="alert"
              style={{ fontSize: "14px" }}
            >
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-grid gap-3">
              <button type="submit" className="btn btn-primary w-100">
                Sign In
              </button>
              <Link to="/signup">
                <button
                  type="button"
                  className="btn btn-light w-100"
                  style={{
                    color: "blue",
                    borderColor: "#d3d3d3",
                  }}
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
