import { useState } from "react";
import { Link } from "react-router-dom"; // 🔹 Importa Link
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Sobre", path: "/about" },
    { name: "Artigos", path: "/papers" },
    { name: "Ferramentas", path: "/tools" },
    { name: "Equipe", path: "/team" },
    { name: "Contato", path: "/contact" },
  ];

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="w-full max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/ASCENC_lateral.png" alt="Logo ASCENC" className="h-10 w-auto" />
          <span className="text-xl font-bold text-gray-800">ASCENC</span>
        </Link>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-6 ml-auto">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path} // 🔹 Usa "to" em vez de "href"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Botão Mobile */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Mobile */}
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
        </div>
      )}
    </header>
  );
}
