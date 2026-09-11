import PageLayout from "../components/PageLayout";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, FileText, Sparkles, ExternalLink } from "lucide-react";

export default function GESHome() {
  const { t } = useTranslation();

  return (
    <PageLayout fullWidth noPadding>
      <div className="w-full space-y-12 pb-16">
        
        {/* 🌿 HERO SECTION */}
        <section className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-16 border-b border-emerald-100 dark:border-zinc-800 bg-transparent">
          
          <div className="max-w-6xl mx-auto px-4 text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 text-xs font-bold tracking-wider uppercase border border-emerald-300/60 dark:border-emerald-800/50 shadow-sm mt-2">
              <img src="./assets/logos/ufsc.png" alt="UFSC" className="w-4 h-4 object-contain animate-pulse" />
              <span>sustainability.ufsc.br</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-zinc-50 max-w-4xl mx-auto leading-[1.15]">
              <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
                {t("ges_home.title")}
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-800 dark:text-zinc-200 max-w-2xl mx-auto font-bold leading-relaxed">
              {t("ges_home.subtitle")}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto pt-4">
              {/* Card 1: ASCENC */}
              <Link
                to="/ascenc"
                className="group flex items-start gap-3.5 p-4 bg-white dark:bg-slate-200 backdrop-blur-md rounded-2xl border border-emerald-200 dark:border-slate-300 hover:border-emerald-500 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-left"
              >
                <div className="p-2 bg-emerald-100 rounded-xl shrink-0 flex items-center justify-center w-10 h-10 group-hover:scale-105 transition-transform duration-300 border border-emerald-300">
                  <img src="./assets/logos/ascenc.png" alt="ASCENC" className="w-6 h-6 object-contain" />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <h3 className="font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors flex items-center gap-1 text-sm">
                    {t("ges_home.ascenc_card_title")}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                  <p className="text-xs text-slate-800 leading-snug font-bold">
                    {t("ges_home.ascenc_card_desc")}
                  </p>
                </div>
              </Link>

              {/* Card 2: Netuno */}
              <Link
                to="/netuno"
                className="group flex items-start gap-3.5 p-4 bg-white dark:bg-slate-200 backdrop-blur-md rounded-2xl border border-emerald-200 dark:border-slate-300 hover:border-blue-500 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-left"
              >
                <div className="p-2 bg-blue-100 rounded-xl shrink-0 flex items-center justify-center w-10 h-10 group-hover:scale-105 transition-transform duration-300 border border-blue-300">
                  <img src="./assets/icons/netuno.ico" alt="Netuno" className="w-6 h-6 object-contain" />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <h3 className="font-extrabold text-slate-900 group-hover:text-blue-800 transition-colors flex items-center gap-1 text-sm">
                    Netuno
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                  <p className="text-xs text-slate-800 leading-snug font-bold">
                    {t("ges_home.netuno_card_desc")}
                  </p>
                </div>
              </Link>

              {/* Card 3: PAIC-ACV */}
              <Link
                to="/ascenc/paicacv"
                className="group flex items-start gap-3.5 p-4 bg-white dark:bg-slate-200 backdrop-blur-md rounded-2xl border border-emerald-200 dark:border-slate-300 hover:border-amber-500 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-left"
              >
                <div className="p-2 bg-amber-100 rounded-xl shrink-0 flex items-center justify-center w-10 h-10 group-hover:scale-105 transition-transform duration-300 border border-amber-300">
                  <img src="./assets/tools/paicacv.png" alt="PAIC-ACV" className="w-6 h-6 object-contain" />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <h3 className="font-extrabold text-slate-900 group-hover:text-amber-800 transition-colors flex items-center gap-1 text-sm">
                    {t("ges_home.paicacv_card_title") || "PAIC-ACV"}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                  <p className="text-xs text-slate-800 leading-snug font-bold">
                    {t("ges_home.paicacv_card_desc")}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 📄 FEATURED NEW MANUSCRIPT */}
        <section className="max-w-6xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-300 dark:border-emerald-700/60 bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/90 dark:from-zinc-900 dark:via-zinc-900/95 dark:to-emerald-950/40 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Top decorative accent */}
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Header Badge & Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-black tracking-wide uppercase shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>{t("ges_home.featured_badge")}</span>
                </div>
                <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {t("ges_home.featured_journal")}
                </span>
              </div>

              {/* Grid content: Left info, Right Graphical Abstract */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-3">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-zinc-50 flex items-start gap-2.5">
                    <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
                    <span>{t("ges_home.featured_title")}</span>
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 font-medium leading-relaxed">
                    {t("ges_home.featured_desc")}
                  </p>

                  <div className="pt-2">
                    <p className="text-xs text-slate-700 dark:text-zinc-300 font-semibold">
                      <span className="font-extrabold text-slate-900 dark:text-zinc-100">{t("ges_home.authors")}</span> Lucas Niehuns Antunes, Taylana Piccinini Scolaro, Enedir Ghisi
                    </p>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 font-semibold font-mono mt-0.5">
                      DOI: 10.1016/j.scitotenv.2026.182179
                    </p>
                  </div>
                </div>

                {/* Graphical Abstract preview */}
                <div className="lg:col-span-5">
                  <a
                    href="https://doi.org/10.1016/j.scitotenv.2026.182179"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative overflow-hidden rounded-2xl border border-emerald-200 dark:border-emerald-800/60 bg-white dark:bg-zinc-950/70 p-2 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all duration-300"
                    title="Graphical Abstract (Science of the Total Environment)"
                  >
                    <div className="relative overflow-hidden rounded-xl bg-slate-50">
                      <img
                        src="./assets/papers/graphical_abstract_182179.png"
                        alt="Graphical Abstract - Full life cycle assessment of permeable pavements"
                        className="w-full h-auto object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="bg-slate-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-md shadow-lg flex items-center gap-1.5">
                          <ExternalLink className="w-3.5 h-3.5" /> Graphical Abstract
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Bottom Action Area */}
              <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-emerald-100 dark:border-zinc-800">
                <div className="text-xs text-slate-600 dark:text-zinc-400 font-medium flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Science of the Total Environment • Vol. 1049, 182179 (2026)</span>
                </div>
                
                <a
                  href="https://doi.org/10.1016/j.scitotenv.2026.182179"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-md hover:shadow-emerald-500/25 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 shrink-0"
                >
                  <span>{t("ges_home.featured_cta")}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </PageLayout>
  );
}


