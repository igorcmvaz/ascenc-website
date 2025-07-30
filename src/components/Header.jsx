import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setMenuOpen(false);
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
    <header className="bg-white dark:bg-zinc-800 shadow-md fixed w-full z-50 dark:border-b dark:border-zinc-700 transition-colors duration-300">
      <div className="w-full max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          {/* Imagem para o modo claro (padrão) */}
          <img 
            src="./assets/ASCENC_lateral.png" 
            alt="Logo ASCENC" 
            className="h-10 w-auto dark:hidden" // Some no dark mode
          />
          {/* Imagem para o modo escuro */}
          <img 
            src="./assets/ASCENC_lateral_dark.png" // Assumindo este nome para o logo escuro
            alt="Logo ASCENC" 
            className="h-10 w-auto hidden dark:block" // Aparece apenas no dark mode
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 ml-auto">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-4 ml-4">
            <div className="flex gap-2 items-center">
              <button onClick={() => changeLanguage('pt-BR')} className={`text-sm font-medium ${i18n.language.startsWith('pt') ? 'text-black dark:text-white' : 'text-gray-500 dark:text-zinc-400 hover:text-black dark:hover:text-white'}`}>PT</button>
              <span className="text-gray-300 dark:text-zinc-600">|</span>
              <button onClick={() => changeLanguage('en')} className={`text-sm font-medium ${i18n.language === 'en' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-zinc-400 hover:text-black dark:hover:text-white'}`}>EN</button>
              <span className="text-gray-300 dark:text-zinc-600">|</span>
              <button onClick={() => changeLanguage('es')} className={`text-sm font-medium ${i18n.language === 'es' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-zinc-400 hover:text-black dark:hover:text-white'}`}>ES</button>
            </div>
            <ThemeSwitcher />
          </div>
        </nav>

        <button
          className="md:hidden text-gray-700 dark:text-zinc-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-800 shadow-lg">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block px-4 py-3 text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
           <div className="flex items-center justify-center gap-6 p-4 border-t border-gray-200 dark:border-zinc-700">
              <ThemeSwitcher /> 
              <div className="flex gap-4 items-center">
                <button onClick={() => changeLanguage('pt-BR')} className={`text-base font-medium ${i18n.language.startsWith('pt') ? 'text-black dark:text-white' : 'text-gray-500 dark:text-zinc-400'}`}>Português</button>
                <button onClick={() => changeLanguage('en')} className={`text-base font-medium ${i18n.language === 'en' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-zinc-400'}`}>English</button>
                <button onClick={() => changeLanguage('es')} className={`text-base font-medium ${i18n.language === 'es' ? 'text-black dark:text-white' : 'text-gray-500 dark:text-zinc-400'}`}>Español</button>
              </div>
          </div>
        </div>
      )}
    </header>
  );
}