import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next"; // Importar para traduzir o texto do botão

export default function ZenodoButton({ link }) {
  const { t } = useTranslation(); // Hook de tradução

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-gray-100 dark:bg-zinc-800 rounded-xl shadow-md hover:shadow-2xl 
                 dark:hover:shadow-zinc-700 transition-all duration-300 transform hover:-translate-y-1 
                 flex flex-col items-center p-6 border border-gray-200 dark:border-zinc-700"
    >
      {/* Imagem para o modo claro */}
      <img
        src="./assets/zenodo.png"
        alt="Zenodo"
        className="w-28 h-28 object-contain mb-4 transition-transform duration-300 group-hover:scale-110 dark:hidden"
      />
      {/* Imagem para o modo escuro */}
      <img
        src="./assets/zenodo_dark.png" 
        alt="Zenodo"
        className="w-28 h-28 object-contain mb-4 transition-transform duration-300 group-hover:scale-110 hidden dark:block"
      />
      <h3 className="text-lg font-semibold text-gray-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white flex items-center gap-2">
        {/* Usando a chave de tradução para o botão */}
        {t('paimp.button')} no Zenodo <ExternalLink className="w-5 h-5" />
      </h3>
    </a>
  );
}