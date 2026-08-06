import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom"; // Usando HashRouter
import "./index.css";
import ScrollToTop from "./components/ScrollToTop";

// Lazy loading pages for code-splitting
const GESHome = lazy(() => import("./pages/GESHome"));
const GESAbout = lazy(() => import("./pages/GESAbout"));
const GESContact = lazy(() => import("./pages/GESContact"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Papers = lazy(() => import("./pages/Papers"));
const Tools = lazy(() => import("./pages/Tools"));
const Team = lazy(() => import("./pages/Team"));
const Contact = lazy(() => import("./pages/Contact"));
const Partners = lazy(() => import("./pages/Partners"));
const Projects = lazy(() => import("./pages/Projects"));
const Awards = lazy(() => import("./pages/Awards"));
const PAIMT = lazy(() => import("./pages/paimt"));
const PAIMP = lazy(() => import("./pages/paimp"));
const PAIMAA = lazy(() => import("./pages/paimaa"));
const PAICACV = lazy(() => import("./pages/paicacv"));
const PAIMRWH = lazy(() => import("./pages/paimrwh"));
const Netuno = lazy(() => import("./pages/Netuno"));
const NetunoV123 = lazy(() => import("./pages/NetunoV123"));
const NetunoV5 = lazy(() => import("./pages/NetunoV5"));

// Importante: inicializar o i18n
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <ScrollToTop />
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-500">Carregando...</div>}>
        <Routes>
          {/* 🏢 Portal routes */}
          <Route path="/" element={<GESHome />} />
          <Route path="/about" element={<GESAbout />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<GESContact />} />
          <Route path="/netuno" element={<Netuno />} />
          <Route path="/netuno/v123" element={<NetunoV123 />} />
          <Route path="/netuno/v5" element={<NetunoV5 />} />
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
      </Suspense>
    </HashRouter>
  </React.StrictMode>
);
