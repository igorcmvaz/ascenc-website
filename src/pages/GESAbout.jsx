import PageLayout from "../components/PageLayout";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Globe2,
  Award,
  BookOpen,
  Thermometer,
  Zap,
  Sun,
  CloudRain,
  Flame,
  Wind,
  RefreshCw,
  Droplet,
  ExternalLink,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function GESAbout() {
  const { t } = useTranslation();

  const researchLinesData = [
    { id: 1, icon: Thermometer, color: "text-amber-600 bg-amber-100 border-amber-300" },
    { id: 2, icon: Zap, color: "text-yellow-600 bg-yellow-100 border-yellow-300" },
    { id: 3, icon: Sun, color: "text-amber-500 bg-amber-100 border-amber-300" },
    { id: 4, icon: CloudRain, color: "text-blue-600 bg-blue-100 border-blue-300" },
    { id: 5, icon: Flame, color: "text-orange-600 bg-orange-100 border-orange-300" },
    { id: 6, icon: Wind, color: "text-teal-600 bg-teal-100 border-teal-300" },
    { id: 7, icon: RefreshCw, color: "text-emerald-600 bg-emerald-100 border-emerald-300" },
    { id: 8, icon: Droplet, color: "text-cyan-600 bg-cyan-100 border-cyan-300" },
    { id: 9, icon: CloudRain, color: "text-indigo-600 bg-indigo-100 border-indigo-300" },
  ];

  return (
    <PageLayout fullWidth noPadding>
      <div className="w-full space-y-10 pb-16">
        
        {/* 🌿 HERO SECTION (MATCHING HOME SPACING) */}
        <section className="relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-16 border-b border-emerald-100 dark:border-zinc-800 bg-transparent">
          <div className="max-w-6xl mx-auto px-4 text-center space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 text-xs font-bold tracking-wider uppercase border border-emerald-300/60 dark:border-emerald-800/50 shadow-sm mt-2">
              <img src="./assets/logos/ufsc.png" alt="UFSC" className="w-4 h-4 object-contain animate-pulse dark:hidden" />
              <img src="./assets/logos/ufsc_escuro.png" alt="UFSC" className="w-4 h-4 object-contain animate-pulse hidden dark:block" />
              <span>sustainability.ufsc.br</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-zinc-50 max-w-4xl mx-auto leading-[1.15]">
              <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
                {t("ges_home.about_title")}
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-800 dark:text-zinc-200 max-w-4xl mx-auto font-medium leading-relaxed text-justify sm:text-center">
              {t("ges_home.about_desc")}
            </p>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4">
              <div className="bg-white dark:bg-slate-200 p-3.5 rounded-xl border border-emerald-200 dark:border-slate-300 shadow-sm flex flex-col items-center text-center space-y-1">
                <div className="p-1.5 bg-emerald-100 text-emerald-900 rounded-lg border border-emerald-300">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span className="font-black text-lg text-slate-900">UFSC</span>
                <span className="text-[11px] text-slate-800 font-extrabold leading-tight">{t("ges_home.civil_eng")}</span>
              </div>
              
              <div className="bg-white dark:bg-slate-200 p-3.5 rounded-xl border border-emerald-200 dark:border-slate-300 shadow-sm flex flex-col items-center text-center space-y-1">
                <div className="p-1.5 bg-amber-100 text-amber-900 rounded-lg border border-amber-300">
                  <Award className="w-4 h-4" />
                </div>
                <span className="font-black text-lg text-slate-900">CNPq 1A</span>
                <span className="text-[11px] text-slate-800 font-extrabold leading-tight">{t("ges_home.productivity")}</span>
              </div>

              <div className="bg-white dark:bg-slate-200 p-3.5 rounded-xl border border-emerald-200 dark:border-slate-300 shadow-sm flex flex-col items-center text-center space-y-1">
                <div className="p-1.5 bg-teal-100 text-teal-900 rounded-lg border border-teal-300">
                  <Globe2 className="w-4 h-4" />
                </div>
                <span className="font-black text-lg text-slate-900">6+</span>
                <span className="text-[11px] text-slate-800 font-extrabold leading-tight">{t("ges_home.axes_count")}</span>
              </div>

              <div className="bg-white dark:bg-slate-200 p-3.5 rounded-xl border border-emerald-200 dark:border-slate-300 shadow-sm flex flex-col items-center text-center space-y-1">
                <div className="p-1.5 bg-blue-100 text-blue-900 rounded-lg border border-blue-300">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="font-black text-lg text-slate-900">100+</span>
                <span className="text-[11px] text-slate-800 font-extrabold leading-tight">{t("ges_home.publications")}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 👨‍🏫 COORDINATOR SPOTLIGHT - PROF. ENEDIR GHISI */}
        <section className="max-w-6xl mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-300 dark:border-emerald-700/60 bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/90 dark:from-zinc-900 dark:via-zinc-900/95 dark:to-emerald-950/40 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Photo & Academic Links */}
              <div className="md:col-span-4 flex flex-col items-center text-center space-y-3">
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-emerald-500/80 shadow-xl">
                  <img
                    src="./assets/team/enedirghisi.png"
                    alt="Enedir Ghisi"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-0.5">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-zinc-50">
                    Prof. Enedir Ghisi
                  </h3>
                  <p className="text-xs font-bold text-emerald-800 dark:text-emerald-400">
                    {t("ges_home.coordinator_role")}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  <a
                    href="http://lattes.cnpq.br/0067772895372542"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-colors"
                  >
                    <span>Lattes</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://orcid.org/0000-0001-5918-6397"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow transition-colors"
                  >
                    <span>ORCID</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.researchgate.net/profile/Enedir-Ghisi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow transition-colors"
                  >
                    <span>ResearchGate</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Biography & Research Focus */}
              <div className="md:col-span-8 space-y-3">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-black tracking-wide uppercase shadow-sm">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    <span>{t("ges_home.scientific_leadership")}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-zinc-50">
                    {t("ges_home.coordinator_title")}
                  </h2>
                  <p className="text-xs font-extrabold text-emerald-800 dark:text-emerald-400">
                    {t("ges_home.coordinator_subtitle")}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-medium text-justify">
                  {t("ges_home.coordinator_desc")}
                </p>

                <div className="pt-2 border-t border-emerald-100 dark:border-zinc-800 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-0.5 bg-emerald-100/90 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 rounded-full text-[11px] font-bold border border-emerald-300 dark:border-emerald-800">
                    {t("ges_home.tag_energy")}
                  </span>
                  <span className="px-2.5 py-0.5 bg-blue-100/90 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 rounded-full text-[11px] font-bold border border-blue-300 dark:border-blue-800">
                    {t("ges_home.tag_rainwater")}
                  </span>
                  <span className="px-2.5 py-0.5 bg-teal-100/90 dark:bg-teal-950/80 text-teal-900 dark:text-teal-300 rounded-full text-[11px] font-bold border border-teal-300 dark:border-teal-800">
                    {t("ges_home.tag_lca")}
                  </span>
                  <span className="px-2.5 py-0.5 bg-amber-100/90 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 rounded-full text-[11px] font-bold border border-amber-300 dark:border-amber-800">
                    {t("ges_home.tag_thermal")}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 🧩 RESEARCH LINES (CONDENSED & ORGANIZED GRID) */}
        <section className="max-w-6xl mx-auto px-4 space-y-4">
          <div className="text-left space-y-1">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-zinc-100 flex items-center gap-2.5">
              <span className="w-6 h-1 bg-emerald-600 rounded-full inline-block" />
              {t("ges_research.lines_title")}
            </h2>
            <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium">
              {t("ges_home.lines_subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {researchLinesData.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className="group bg-white dark:bg-slate-200 py-3 px-4 rounded-xl border border-emerald-200 dark:border-slate-300 hover:border-emerald-500 shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-3"
                >
                  <div className={`p-2 rounded-lg shrink-0 border ${item.color} group-hover:scale-105 transition-transform duration-200`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-slate-900 text-xs sm:text-sm leading-snug">
                    {t(`ges_research.line${item.id}`)}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* 🔗 DIRECT ACTION BANNER */}
        <section className="max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-r from-emerald-800 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <h3 className="text-xl font-black">{t("ges_home.banner_title")}</h3>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
                {t("ges_home.banner_desc")}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Link
                to="/papers"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-emerald-900 font-black text-xs sm:text-sm shadow-md hover:bg-emerald-50 hover:-translate-y-0.5 transition-all"
              >
                <span>{t("ges_home.view_papers")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700/80 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm border border-emerald-500 shadow-md hover:-translate-y-0.5 transition-all"
              >
                <span>{t("ges_home.view_projects")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
