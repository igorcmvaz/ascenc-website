import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const links = [
    { name: t("header.home"), path: "/" },
    { name: t("header.about"), path: "/about" },
    { name: t("header.papers"), path: "/papers" },
    { name: t("header.tools"), path: "/tools" },
    { name: t("header.team"), path: "/team" },
    { name: t("header.contact"), path: "/contact" },
  ];

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="w-full max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src="./assets/ASCENC_lateral.png" alt="Logo ASCENC" className="h-10 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-6 ml-auto">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {link.name}
            </Link>
          ))}
          {/* Seletor de Idiomas */}
          <div className="flex gap-2 ml-4">
              <button onClick={() => changeLanguage('pt-BR')} className={`text-sm font-medium ${i18n.language.startsWith('pt') ? 'text-blue-600' : 'text-gray-500'}`}>PT</button>
              <span className="text-gray-300">|</span>
              <button onClick={() => changeLanguage('en')} className={`text-sm font-medium ${i18n.language === 'en' ? 'text-blue-600' : 'text-gray-500'}`}>EN</button>
              <span className="text-gray-300">|</span>
              <button onClick={() => changeLanguage('es')} className={`text-sm font-medium ${i18n.language === 'es' ? 'text-blue-600' : 'text-gray-500'}`}>ES</button>
          </div>
        </nav>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
           <div className="flex gap-4 p-4 justify-center">
              <button onClick={() => changeLanguage('pt-BR')} className={`text-base font-medium ${i18n.language.startsWith('pt') ? 'text-blue-600' : 'text-gray-500'}`}>Português</button>
              <span className="text-gray-300">|</span>
              <button onClick={() => changeLanguage('en')} className={`text-base font-medium ${i18n.language === 'en' ? 'text-blue-600' : 'text-gray-500'}`}>English</button>
              <span className="text-gray-300">|</span>
              <button onClick={() => changeLanguage('es')} className={`text-base font-medium ${i18n.language === 'es' ? 'text-blue-600' : 'text-gray-500'}`}>Español</button>
          </div>
        </div>
      )}
    </header>
  );
}