import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";

// Modificado para aceitar iconLight e iconDark
export default function ToolButton({ title, to, iconLight, iconDark, isPlaceholder }) {
  const icon = iconLight || iconDark; // Pega um ícone padrão caso só um seja fornecido

  return (
    <Link
      to={to}
      className={`group rounded-xl shadow-md hover:shadow-2xl dark:hover:shadow-zinc-700 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center px-6 py-10 border 
                 ${isPlaceholder ? 'cursor-not-allowed bg-gray-50 dark:bg-zinc-800/50' : 'bg-gray-100 dark:bg-zinc-800'} 
                 border-gray-200 dark:border-zinc-700`}
    >
      {icon ? (
        <>
          {/* Imagem para o modo claro */}
          <img
            src={iconLight}
            alt={title}
            className="w-20 h-20 object-contain mb-4 transition-transform duration-300 group-hover:scale-110 dark:hidden"
          />
          {/* Imagem para o modo escuro */}
          <img
            src={iconDark}
            alt={title}
            className="w-20 h-20 object-contain mb-4 transition-transform duration-300 group-hover:scale-110 hidden dark:block"
          />
        </>
      ) : (
        <HelpCircle className="w-20 h-20 text-gray-400 dark:text-zinc-500 mb-4 transition-transform duration-300 group-hover:scale-110" />
      )}
      <h3 className={`text-lg font-semibold text-center 
                     ${isPlaceholder ? 'text-gray-400 dark:text-zinc-500' : 'text-gray-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white'}`}>
        {title}
      </h3>
    </Link>
  );
}