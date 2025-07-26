import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import About from "./pages/About";
import "./index.css";
import Home from "./pages/Home";
import Papers from "./pages/Papers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/papers" element={<Papers />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
