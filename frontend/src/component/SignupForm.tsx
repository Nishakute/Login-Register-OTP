import React, { useState, CSSProperties } from "react";
import axios from "axios";
import image from "../Assets/singup.jpg";
import { useNavigate } from "react-router-dom";


const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [Printemail,setPrintemail]=useState('');


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    contactMode: "",
    email: "",
  });

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1: Details, Step 2: OTP Verification
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); // Loading indicator

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOtpRequest = async () => {
    if (!formData.email) {
      setError("Email is required to send OTP.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("https://login-register-otp-production.up.railway.app/send-otp", {
        email: formData.email,
      });
      if (response.status === 200) {
        setStep(2); // Proceed to OTP verification
        setError("");
        setSuccess("OTP sent successfully to your email.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send OTP.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      // Step 1: Request OTP
      handleOtpRequest();
      return;
    }

    // Step 2: OTP Verification and Registration
    if (!otp) {
      setError("Please enter the OTP to proceed.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const data = {
        fname: formData.firstName,
        lname: formData.lastName,
        contact: formData.contactMode,
        email: formData.email,
        password: formData.password,
        otp,
      };
      const Printemail =formData.email;
      const response = await axios.post("https://login-register-otp-production.up.railway.app/user/register", data);
      if (response.status === 201) {
        setSuccess("User registered successfully!");
        setError("");
        setStep(1);
        setFormData({
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
          contactMode: "",
          email: "",
        });
        setOtp("");
        console.log("Hiii",Printemail)
        navigate("/dashboard",{ state: { email: Printemail } })
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.imageContainer}>
        <img src={image} alt="Signup Illustration" style={styles.image} />
      </div>
      <div style={styles.container}>
        <h2 style={styles.heading}>
          Let Us Know <span style={{ color: "red" }}>!</span>
        </h2>
        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
        {success && <div style={{ color: "green", marginBottom: "10px" }}>{success}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          {step === 1 && (
            <>
              <div style={styles.formGroup}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <input
                  type="password"
                  name="password"
                  placeholder="Set Password"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Retype Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <select
                  name="contactMode"
                  value={formData.contactMode}
                  onChange={handleChange}
                  style={styles.input}
                  required
                >
                  <option value="" disabled>
                    Contact mode
                  </option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </select>
              </div>
              <button
                type="button"
                style={styles.button}
                onClick={handleOtpRequest}
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <div style={styles.formGroup}>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? "Verifying..." : "Verify & Register"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

// Styles
const styles: { [key: string]: CSSProperties } = {
    wrapper: {
      display: 'flex', 
      alignItems: 'center', // Center items vertically
      justifyContent: 'space-between', // Distribute space between items
      gap: '20px', // Space between the image and form
      padding: '20px',
    },
    imageContainer: {
      flex: 1, 
      textAlign: 'center',
    },
    image: {
      width: '100%', // Make the image responsive
      maxWidth: '550px',
      borderRadius: '8px',
      
    },
    container: {
      flex: 1, 
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column', // Stack form inputs vertically
      gap: '15px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      borderTop:'none'
    },
    button: {
      padding: '10px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#5a38fd',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
  };
  

export default SignupForm;
