import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom"; // Usando HashRouter
import "./index.css";
import GESHome from "./pages/GESHome";
import GESContact from "./pages/GESContact";
import Home from "./pages/Home";
import About from "./pages/About";
import Papers from "./pages/Papers";
import Tools from "./pages/Tools";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Partners from "./pages/Partners";
import Projects from "./pages/Projects";
import PAIMT from "./pages/paimt";
import PAIMP from "./pages/paimp";
import PAIMAA from "./pages/paimaa";
import PAICACV from "./pages/paicacv";
import PAIMRWH from "./pages/paimrwh";
import Netuno from "./pages/Netuno";
import ScrollToTop from "./components/ScrollToTop";

// Importante: inicializar o i18n
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <ScrollToTop />
      <Routes>
        {/* 🏢 Portal routes */}
        <Route path="/" element={<GESHome />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<GESContact />} />
        <Route path="/netuno" element={<Netuno />} />
        <Route path="/papers" element={<Papers />} />
        <Route path="/partners" element={<Partners />} />

        {/* 🌿 ASCENC sub-site routes */}
        <Route path="/ascenc" element={<Home />} />
        <Route path="/ascenc/about" element={<About />} />
        <Route path="/ascenc/tools" element={<Tools />} />
        <Route path="/ascenc/contact" element={<Contact />} />
        <Route path="/ascenc/paimt" element={<PAIMT />} />
        <Route path="/ascenc/paimp" element={<PAIMP />} />
        <Route path="/ascenc/paimaa" element={<PAIMAA />} />
        <Route path="/ascenc/paicacv" element={<PAICACV />} />
        <Route path="/ascenc/paimrwh" element={<PAIMRWH />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
