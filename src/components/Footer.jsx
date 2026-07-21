import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer 
      className="bg-white/90 text-slate-800 py-6 border-t border-emerald-100 
                 dark:bg-[#121614] dark:text-zinc-200 dark:border-t 
                 dark:border-[#2a3530] transition-colors duration-300 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Texto à esquerda */}
        <div className="text-sm font-semibold text-center md:text-left">
          {t("footer.rights")}
        </div>

        {/* FlagCounter à direita */}
        <div className="flex justify-center md:justify-end">
          <a href="https://info.flagcounter.com/6IyZ">
            <img
              src="https://s01.flagcounter.com/count/6IyZ/bg_F3F4F6/txt_000000/border_F3F4F6/columns_7/maxflags_7/viewers_3/labels_0/pageviews_0/flags_0/percent_0/"
              alt="Flag Counter"
              border="0"
              className="h-10"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
