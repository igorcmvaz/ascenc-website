import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Leaf, Droplet } from "lucide-react";
import { useTranslation } from "react-i18next";
import ThemeSwitcher from "./ThemeSwitcher";

const ascencTools = [
  { name: "PAIM-T",   path: "/ascenc/paimt",   active: true },
  { name: "PAIM-P",   path: "/ascenc/paimp",   active: true },
  { name: "PAIM-AA",  path: "/ascenc/paimaa",  active: true },
  { name: "PAIM-RWH", path: "/ascenc/paimrwh", active: true },
  { name: "PAIC-ACV", path: "/ascenc/paicacv", active: true },
  { name: "PAIM-ACV", path: "#",               active: false },
];

export default function Header() {
  const [menuOpen,        setMenuOpen]        = useState(false);
  const [ascencOpen,      setAscencOpen]      = useState(false);
  const [ascencMobOpen,   setAscencMobOpen]   = useState(false);
  const { t, i18n } = useTranslation();
  const location     = useLocation();
  const dropdownRef  = useRef(null);

  const changeLanguage = (lng) => { i18n.changeLanguage(lng); setMenuOpen(false); };

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setAscencOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setAscencOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  const isAscencActive = location.pathname.startsWith("/ascenc");

  const gesLinks = [
    { name: t("ges_header.home"),     path: "/" },
    { name: t("ges_header.projects"), path: "/projects" },
    { name: t("ges_header.papers"),   path: "/papers" },
    { name: t("ges_header.partners"), path: "/partners" },
    { name: t("ges_header.team"),     path: "/team" },
    { name: t("ges_header.contact"),  path: "/contact" },
  ];

  const ascencPages = [
    { name: "Home",               path: "/ascenc" },
    { name: t("header.about"),    path: "/ascenc/about" },
    { name: t("header.tools"),    path: "/ascenc/tools" },
  ];

  const langBtn = (code, label) => (
    <button
      key={code}
      onClick={() => changeLanguage(code)}
      className={`text-sm font-semibold transition-colors ${
        i18n.language === code || (code === "en" && !i18n.language.startsWith("pt") && !i18n.language.startsWith("es") && !i18n.language.startsWith("zh"))
          ? "text-emerald-800 dark:text-emerald-300 font-bold border-b-2 border-emerald-700 dark:border-emerald-400 pb-0.5"
          : "text-slate-700 dark:text-emerald-200 hover:text-emerald-800 dark:hover:text-emerald-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <header className="bg-white/95 dark:bg-[#161b18]/95 backdrop-blur-md shadow-sm fixed w-full z-50 border-b border-emerald-100 dark:border-[#2a3530] transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-1 bg-white rounded-xl shadow-sm border border-emerald-200 group-hover:scale-105 transition-transform duration-200 flex items-center justify-center w-9 h-9">
            <img src="./assets/logos/ufsc.png" alt="UFSC" className="w-7 h-7 object-contain" />
          </div>
          <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300 transition-colors duration-300">
            {t("ges_home.title")}
          </span>
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-6 ml-auto">

          {gesLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-slate-800 dark:text-zinc-200 hover:text-emerald-700 dark:hover:text-emerald-400 transition font-semibold text-sm"
            >
              {link.name}
            </Link>
          ))}

          {/* Netuno button */}
          <Link
            to="/netuno"
            className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg border transition-all duration-200
              ${location.pathname === "/netuno"
                ? "bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-300/80 dark:border-blue-700/50"
                : "text-blue-800 dark:text-blue-300 border-transparent hover:bg-blue-50/70 dark:hover:bg-blue-950/30"
              }`}
          >
            <Droplet className="w-3.5 h-3.5" />
            Netuno
          </Link>

          {/* ASCENC dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAscencOpen((v) => !v)}
              className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg border transition-all duration-200
                ${isAscencActive || ascencOpen
                  ? "bg-emerald-100/60 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-300/80 dark:border-emerald-800/60"
                  : "text-emerald-800 dark:text-emerald-400 border-transparent hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              ASCENC
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${ascencOpen ? "rotate-180" : ""}`} />
            </button>

            {ascencOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-[#1c231f] rounded-xl shadow-xl border border-emerald-100 dark:border-[#2f3d37] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">

                {/* Pages */}
                {ascencPages.map((p) => (
                  <Link
                    key={p.path}
                    to={p.path}
                    className="flex items-center px-4 py-2 text-sm font-semibold text-slate-800 dark:text-zinc-200 hover:bg-emerald-50 dark:hover:bg-zinc-700 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                  >
                    {p.name}
                  </Link>
                ))}

                {/* Divider + tools label */}
                <div className="my-1.5 mx-3 border-t border-emerald-100 dark:border-zinc-700" />
                <p className="px-4 pb-1 text-[10px] font-bold uppercase tracking-widest text-slate-700 dark:text-zinc-300">
                  {t("header.tools", "Ferramentas")}
                </p>

                {/* Tool links */}
                {ascencTools.map((tool) =>
                  tool.active ? (
                    <Link
                      key={tool.name}
                      to={tool.path}
                      className="flex items-center px-4 py-2 text-sm font-semibold text-slate-800 dark:text-zinc-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
                    >
                      {tool.name}
                    </Link>
                  ) : (
                    <span
                      key={tool.name}
                      className="flex items-center justify-between px-4 py-2 text-sm font-medium text-slate-400 dark:text-zinc-500 cursor-not-allowed select-none"
                    >
                      {tool.name}
                      <span className="text-[9px] font-semibold bg-slate-100 dark:bg-zinc-700 text-slate-500 dark:text-zinc-400 rounded px-1.5 py-0.5 uppercase tracking-wide">
                        dev
                      </span>
                    </span>
                  )
                )}
              </div>
            )}
          </div>

          {/* Lang + Theme */}
          <div className="flex items-center gap-4 ml-2">
            <div className="flex gap-2.5 items-center">
              {langBtn("en", "EN")}
              <span className="text-slate-300 dark:text-zinc-600">|</span>
              {langBtn("pt-BR", "PT")}
              <span className="text-slate-300 dark:text-zinc-600">|</span>
              {langBtn("es", "ES")}
              <span className="text-slate-300 dark:text-zinc-600">|</span>
              {langBtn("zh", "CN")}
            </div>
            <ThemeSwitcher />
          </div>
        </nav>

        {/* Hamburger button */}
        <button
          className="md:hidden text-gray-700 dark:text-zinc-300"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-800 shadow-lg border-t border-gray-100 dark:border-zinc-700">

          {gesLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block px-4 py-3 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700 font-medium border-b border-gray-50 dark:border-zinc-700/50 last:border-b-0"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Netuno mobile button */}
          <div className="border-b border-gray-50 dark:border-zinc-700/50">
            <Link
              to="/netuno"
              className="w-full flex items-center gap-2 px-4 py-3 text-blue-700 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <Droplet className="w-4 h-4" />
              Netuno
            </Link>
          </div>

          {/* ASCENC accordion */}
          <div className="border-b border-gray-50 dark:border-zinc-700/50">
            <button
              onClick={() => setAscencMobOpen((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-3 text-emerald-700 dark:text-emerald-400 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Leaf className="w-4 h-4" />
                ASCENC
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${ascencMobOpen ? "rotate-180" : ""}`} />
            </button>

            {ascencMobOpen && (
              <div className="bg-gray-50 dark:bg-zinc-900/50">
                {ascencPages.map((p) => (
                  <Link
                    key={p.path}
                    to={p.path}
                    className="block pl-10 pr-4 py-2.5 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {p.name}
                  </Link>
                ))}

                <div className="mx-4 my-1 border-t border-gray-200 dark:border-zinc-700" />
                <p className="pl-10 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-zinc-500">
                  {t("header.tools", "Ferramentas")}
                </p>

                {ascencTools.map((tool) =>
                  tool.active ? (
                    <Link
                      key={tool.name}
                      to={tool.path}
                      className="block pl-10 pr-4 py-2.5 text-sm text-gray-700 dark:text-zinc-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {tool.name}
                    </Link>
                  ) : (
                    <span
                      key={tool.name}
                      className="flex items-center justify-between pl-10 pr-4 py-2.5 text-sm text-gray-400 dark:text-zinc-600"
                    >
                      {tool.name}
                      <span className="text-[9px] font-semibold bg-gray-100 dark:bg-zinc-700 rounded px-1.5 py-0.5 uppercase tracking-wide">dev</span>
                    </span>
                  )
                )}
              </div>
            )}
          </div>

          {/* Lang + Theme */}
          <div className="flex items-center justify-center gap-6 p-4 border-t border-gray-200 dark:border-zinc-700">
            <ThemeSwitcher />
            <div className="flex gap-3 items-center flex-wrap justify-center">
              <button onClick={() => changeLanguage('en')}    className={`text-sm font-medium ${i18n.language === 'en'    ? 'text-black dark:text-white font-bold' : 'text-gray-500 dark:text-zinc-400'}`}>English</button>
              <button onClick={() => changeLanguage('pt-BR')} className={`text-sm font-medium ${i18n.language.startsWith('pt') ? 'text-black dark:text-white font-bold' : 'text-gray-500 dark:text-zinc-400'}`}>Português</button>
              <button onClick={() => changeLanguage('es')}    className={`text-sm font-medium ${i18n.language === 'es'    ? 'text-black dark:text-white font-bold' : 'text-gray-500 dark:text-zinc-400'}`}>Español</button>
              <button onClick={() => changeLanguage('zh')}    className={`text-sm font-medium ${i18n.language === 'zh'    ? 'text-black dark:text-white font-bold' : 'text-gray-500 dark:text-zinc-400'}`}>中文</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}