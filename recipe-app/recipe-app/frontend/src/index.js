import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Include the file extension explicitly
import "./index.css"; // Import global styles (if applicable)

// Create the root element and render the App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
