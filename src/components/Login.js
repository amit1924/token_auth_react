// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import "./styles/login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8000/login", {
//         email,
//         password,
//       });

//       if (response.status === 200) {
//         // Assuming the server responds with a token in the "token" field
//         const { token } = response.data;

//         // Store the token in localStorage or handle it as needed
//         localStorage.setItem("token", token);

//         console.log("Login successfully:", response.data);

//         await navigate("/dashboard");
//       } else {
//         console.error("Failed to send data. Status:", response.status);
//       }
//     } catch (error) {
//       alert("email or password is wrong");
//       console.error("Error:", error.message);
//     }
//   };

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./AuthContext";
import "./styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token } = response.data;

        // Use the login function to set the token
        login(token);

        console.log("Login successfully:", response.data);

        navigate("/dashboard");
      } else {
        console.error("Failed to send data. Status:", response.status);
      }
    } catch (error) {
      alert("email or password is wrong");
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form>
        <label>Email:</label>
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter your email address"
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
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
        />
        <br />
        <button type="submit" onClick={handleSubmit} className="submit-button">
          Login
        </button>
      </form>

      <button className="link-button">
        <Link
          to="/register"
          style={{ textDecoration: "none", backgroundColor: "blue" }}
        >
          Go To Register Page
        </Link>
      </button>
    </div>
  );
};

export default Login;
