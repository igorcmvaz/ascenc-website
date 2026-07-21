import PageLayout from "../components/PageLayout";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Leaf, Users, Mail, GraduationCap, Globe2, Thermometer, CloudRain, Droplets, Zap, Wind, RefreshCw, CheckCircle2 } from "lucide-react";

export default function GESHome() {
  const { t } = useTranslation();

  return (
    <PageLayout fullWidth noPadding>
      <div className="w-full space-y-16 pb-16">
        
        {/* 🌿 HERO SECTION */}
        <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 border-b border-emerald-100 dark:border-zinc-800 bg-transparent">
          
          <div className="max-w-6xl mx-auto px-4 text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 text-xs font-bold tracking-wider uppercase border border-emerald-300/60 dark:border-emerald-800/50 shadow-sm">
              <img src="./assets/logos/ufsc.png" alt="UFSC" className="w-4 h-4 object-contain animate-pulse dark:hidden" />
              <img src="./assets/logos/ufsc_escuro.png" alt="UFSC" className="w-4 h-4 object-contain animate-pulse hidden dark:block" />
              <span>sustainability.ufsc.br</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-zinc-50 max-w-4xl mx-auto leading-[1.1] pb-1">
              <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
                {t("ges_home.title")}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-800 dark:text-zinc-200 max-w-2xl mx-auto font-bold leading-relaxed">
              {t("ges_home.subtitle")}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto pt-6">
              {/* Card 1: ASCENC */}
              <Link
                to="/ascenc"
                className="group flex items-start gap-4 p-5 bg-white dark:bg-slate-200 backdrop-blur-md rounded-2xl border border-emerald-200 dark:border-slate-300 hover:border-emerald-500 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
              >
                <div className="p-2.5 bg-emerald-100 rounded-xl shrink-0 flex items-center justify-center w-12 h-12 group-hover:scale-105 transition-transform duration-300 border border-emerald-300">
                  <img src="./assets/logos/ascenc.png" alt="ASCENC" className="w-7 h-7 object-contain" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 group-hover:text-emerald-800 transition-colors flex items-center gap-1">
                    {t("ges_home.ascenc_card_title")}
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                  <p className="text-xs text-slate-800 leading-relaxed font-bold">
                    {t("ges_home.ascenc_card_desc")}
                  </p>
                </div>
              </Link>

              {/* Card 2: Netuno */}
              <Link
                to="/netuno"
                className="group flex items-start gap-4 p-5 bg-white dark:bg-slate-200 backdrop-blur-md rounded-2xl border border-emerald-200 dark:border-slate-300 hover:border-emerald-500 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left"
              >
                <div className="p-2.5 bg-blue-100 rounded-xl shrink-0 flex items-center justify-center w-12 h-12 group-hover:scale-105 transition-transform duration-300 border border-blue-300">
                  <img src="./assets/icons/netuno.ico" alt="Netuno" className="w-7 h-7 object-contain" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 group-hover:text-blue-800 transition-colors flex items-center gap-1">
                    Netuno
                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                  <p className="text-xs text-slate-800 leading-relaxed font-bold">
                    {t("ges_home.netuno_card_desc")}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* 📚 ABOUT SECTION */}
        <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100 flex items-center gap-3">
              <span className="w-8 h-1 bg-emerald-600 rounded-full inline-block" />
              {t("ges_home.about_title")}
            </h2>
            <p className="text-lg text-slate-800 dark:text-zinc-200 leading-relaxed text-justify font-bold">
              {t("ges_home.about_desc")}
            </p>
          </div>
          
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-200 p-6 rounded-2xl border border-emerald-200 dark:border-slate-300 shadow-md flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl border border-emerald-300">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-black text-2xl text-slate-900">UFSC</span>
              <span className="text-xs text-slate-800 font-extrabold">Universidade Federal de Santa Catarina</span>
            </div>
            
            <div className="bg-white dark:bg-slate-200 p-6 rounded-2xl border border-emerald-200 dark:border-slate-300 shadow-md flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-teal-100 text-teal-900 rounded-xl border border-teal-300">
                <Globe2 className="w-6 h-6" />
              </div>
              <span className="font-black text-2xl text-slate-900">6+</span>
              <span className="text-xs text-slate-800 font-extrabold">Eixos Temáticos</span>
            </div>
          </div>
        </section>

        {/* 🧩 RESEARCH LINES */}
        <section className="max-w-6xl mx-auto px-4 space-y-8">
          <div className="text-left space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100 flex items-center gap-3">
              <span className="w-8 h-1 bg-emerald-600 rounded-full inline-block" />
              {t("ges_research.lines_title")}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white dark:bg-slate-200 p-4 rounded-xl border border-emerald-200 dark:border-slate-300 hover:border-emerald-500 shadow-sm transition duration-300"
              >
                <div className="p-1.5 bg-emerald-600/10 text-emerald-800 rounded-lg shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-slate-900 text-sm">
                  {t(`ges_research.line${i}`)}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 🎴 NAVIGATION CARDS */}
        <section className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* CARD 1: ASCENC */}
            <div className="group bg-white dark:bg-slate-200 p-8 rounded-3xl border border-emerald-200 dark:border-slate-300 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 hover:border-emerald-500">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center border border-emerald-300 group-hover:scale-105 transition-transform duration-300">
                  <img src="./assets/logos/ascenc.png" alt="ASCENC" className="w-7 h-7 object-contain" />
                </div>
                <h3 className="text-xl font-black text-slate-900">{t("ges_home.ascenc_card_title")}</h3>
                <p className="text-sm text-slate-800 leading-relaxed font-bold">
                  {t("ges_home.ascenc_card_desc")}
                </p>
              </div>
              <div className="pt-6">
                <Link
                  to="/ascenc"
                  className="inline-flex items-center gap-1.5 text-sm font-extrabold text-emerald-800 hover:text-emerald-900 transition-colors duration-200"
                >
                  {t("ges_home.access_button")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* CARD 2: EQUIPE */}
            <div className="group bg-white dark:bg-slate-200 p-8 rounded-3xl border border-emerald-200 dark:border-slate-300 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 hover:border-teal-500">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-900 flex items-center justify-center font-bold border border-teal-300">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900">{t("ges_home.team_card_title")}</h3>
                <p className="text-sm text-slate-800 leading-relaxed font-bold">
                  {t("ges_home.team_card_desc")}
                </p>
              </div>
              <div className="pt-6">
                <Link
                  to="/team"
                  className="inline-flex items-center gap-1.5 text-sm font-extrabold text-teal-800 hover:text-teal-900 transition-colors duration-200"
                >
                  {t("ges_home.access_button")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* CARD 3: CONTATO */}
            <div className="group bg-white dark:bg-slate-200 p-8 rounded-3xl border border-emerald-200 dark:border-slate-300 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 hover:border-indigo-500">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-bold border border-indigo-300">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900">{t("ges_home.contact_card_title")}</h3>
                <p className="text-sm text-slate-800 leading-relaxed font-bold">
                  {t("ges_home.contact_card_desc")}
                </p>
              </div>
              <div className="pt-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-extrabold text-indigo-800 hover:text-indigo-900 transition-colors duration-200"
                >
                  {t("ges_home.access_button")}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </PageLayout>
  );
}
