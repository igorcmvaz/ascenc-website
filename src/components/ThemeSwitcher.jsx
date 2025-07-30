import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeSwitcher() {
  // Lê o tema do localStorage ou usa 'light' como padrão
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  // Efeito para aplicar a classe no HTML e salvar no localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove a classe antiga antes de adicionar a nova, para garantir
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);

    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}