import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./styles/register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/register", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Registered successfully:");
        navigate("/");
      } else {
        console.error("Registration failed: " + response.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="register-container">
      <h1>Registration</h1>
      <form>
        <label>Name:</label>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <br />
        <label>Email:</label>
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <br />
        <label>Password:</label>
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <br />
        <button type="submit" onClick={handleSubmit} className="submit-button">
          Sign Up
        </button>
      </form>
      <div>
        <button className="link-button">
          <Link to="/">Go To Login Page</Link>
        </button>
      </div>
    </div>
  );
};

export default Register;
