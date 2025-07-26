import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "Sobre", href: "#sobre" },
    { name: "Artigos", href: "#artigos" },
    { name: "Ferramentas", href: "#ferramentas" },
    { name: "Equipe", href: "#equipe" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="w-full max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <img src="/ASCENC_lateral.png" alt="Logo ASCENC" className="h-10 w-auto" />
        </a>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-6 ml-auto">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              {link.name}
            </a>
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
            <a
              key={link.name}
              href={link.href}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
