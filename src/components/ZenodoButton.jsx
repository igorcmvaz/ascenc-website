import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next"; // Importar para traduzir o texto do botão

export default function ZenodoButton({ link }) {
  const { t } = useTranslation(); // Hook de tradução

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white dark:bg-slate-100 rounded-2xl shadow-md hover:shadow-xl 
                 transition-all duration-300 transform hover:-translate-y-1 
                 flex flex-col items-center p-6 border border-slate-200 dark:border-slate-300"
    >
      <img
        src="./assets/logos/zenodo.png"
        alt="Zenodo"
        className="w-28 h-28 object-contain mb-4 transition-transform duration-300 group-hover:scale-110"
      />
      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
        {/* Usando a chave de tradução para o botão */}
        {t('paimp.button')} no Zenodo <ExternalLink className="w-5 h-5 text-emerald-800" />
      </h3>
    </a>
  );
}