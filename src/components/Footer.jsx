export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Logo e Nome */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="ASCENC Logo" className="h-8 w-auto" />
          <span className="text-lg font-semibold text-white">ASCENC</span>
        </div>

        {/* Links do Footer */}
        <nav className="flex flex-wrap justify-center gap-4 text-sm">
          <a href="#home" className="hover:text-white transition">Home</a>
          <a href="#sobre" className="hover:text-white transition">Sobre</a>
          <a href="#artigos" className="hover:text-white transition">Artigos</a>
          <a href="#ferramentas" className="hover:text-white transition">Ferramentas</a>
          <a href="#equipe" className="hover:text-white transition">Equipe</a>
          <a href="#contato" className="hover:text-white transition">Contato</a>
        </nav>

        {/* Direitos Autorais */}
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} ASCENC. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
