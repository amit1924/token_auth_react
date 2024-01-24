import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AuthProvider } from "./components/AuthContext"; // Import named export

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      {" "}
      {/* Use AuthProvider here */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
