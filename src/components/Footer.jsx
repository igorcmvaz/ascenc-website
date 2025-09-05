import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer 
      className="bg-gray-100 text-gray-700 py-6 shadow-[0_-4px_6px_rgba(0,0,0,0.1)] 
                 dark:bg-zinc-800 dark:text-zinc-300 dark:shadow-none dark:border-t 
                 dark:border-zinc-700 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Texto à esquerda */}
        <div className="text-sm text-center md:text-left">
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
