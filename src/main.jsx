import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom"; // MUDOU BrowserRouter -> HashRouter
import About from "./pages/About";
import "./index.css";
import Home from "./pages/Home";
import Papers from "./pages/Papers";
import Tools from "./pages/Tools";
import Team from "./pages/Team";
import Contact from "./pages/Contact";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/papers" element={<Papers />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
