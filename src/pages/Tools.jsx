import PageLayout from "../components/PageLayout";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle } from "lucide-react";

export default function Tools() {
  const { t } = useTranslation();

  const tools = [
    {
      title: t('tools.paimt'),
      desc: t('tools.desc_paimt'),
      to: "/ascenc/paimt",
      iconLight: "./assets/tools/paimt.png",
      iconDark: "./assets/tools/paimt_dark.png",
    },
    {
      title: t('tools.paimp'),
      desc: t('tools.desc_paimp'),
      to: "/ascenc/paimp",
      iconLight: "./assets/tools/paimp.png",
      iconDark: "./assets/tools/paimp_dark.png",
    },
    {
      title: t('tools.paimaa'),
      desc: t('tools.desc_paimaa'),
      to: "/ascenc/paimaa",
      iconLight: "./assets/tools/paimaa.png",
      iconDark: "./assets/tools/paimaa_dark.png",
    },
    {
      title: t('tools.paimrwh'),
      desc: t('tools.desc_paimrwh'),
      to: "/ascenc/paimrwh",
      iconLight: "./assets/tools/paimdu.png",
      iconDark: "./assets/tools/paimdu_dark.png",
    },
    {
      title: t('tools.paicacv'),
      desc: t('tools.desc_paicacv'),
      to: "/ascenc/paicacv",
      iconLight: "./assets/tools/paicacv.png",
      iconDark: "./assets/tools/paicacv_dark.png",
    },
    {
      title: t('tools.paimacv'),
      desc: t('tools.desc_paimacv'),
      to: "#",
      iconLight: "./assets/tools/paimacv.png",
      iconDark: "./assets/tools/paimacv_dark.png",
      isPlaceholder: true,
    },
  ];

  return (
    <PageLayout title={t('tools.title')}>
      <div className="max-w-4xl mx-auto space-y-8 mt-4">
        {/* Introductory Explanation */}
        <div className="bg-white dark:bg-slate-200 border border-emerald-100 dark:border-slate-300 rounded-2xl p-6 shadow-sm">
          <p className="text-slate-800 dark:text-slate-800 leading-relaxed text-base sm:text-lg font-bold text-justify">
            {t('tools.intro')}
          </p>
        </div>

        {/* Compact List of Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tools.map((tool, index) => {
            const isDev = tool.isPlaceholder;
            const content = (
              <div className="flex items-start gap-4 p-5 h-full">
                {/* Small icon */}
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white shadow-sm border border-slate-200 dark:border-slate-200 flex items-center justify-center shrink-0">
                  <img
                    src={tool.iconLight}
                    alt={tool.title}
                    className="w-9 h-9 object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-900 flex items-center gap-2">
                      {tool.title}
                      {isDev && (
                        <span className="text-[10px] font-semibold bg-slate-200 text-slate-700 rounded-md px-2 py-0.5 uppercase tracking-wide">
                          dev
                        </span>
                      )}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-700 mt-1.5 leading-relaxed font-normal">
                      {tool.desc}
                    </p>
                  </div>

                  {!isDev && (
                    <div className="mt-4 flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 dark:text-emerald-800 group-hover:translate-x-1 transition-transform">
                      <span>{t('tools.access')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
            );

            if (isDev) {
              return (
                <div
                  key={index}
                  className="border border-slate-300 bg-white dark:bg-slate-200 rounded-3xl opacity-60 cursor-not-allowed select-none"
                >
                  {content}
                </div>
              );
            }

            return (
              <Link
                key={index}
                to={tool.to}
                className="group border border-emerald-200 dark:border-slate-300 hover:border-emerald-500 bg-white dark:bg-slate-200 rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}