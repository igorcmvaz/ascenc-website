import { useState } from "react";
import PageLayout from "../components/PageLayout";
import { useTranslation } from "react-i18next";
import { Clock, CheckCircle2, Users, Landmark, Tag, ArrowRight, UserCheck, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import initialProjectsData from "../data/projectsData.json";

function ProjectCard({ proj, isOngoing, getLocalizedField, t, titleMinHeightClass, subtitleMinHeightClass }) {
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isMembersExpanded, setIsMembersExpanded] = useState(false);

  const title = getLocalizedField(proj, "titulo");
  const subtitle = getLocalizedField(proj, "subtitulo");
  const description = getLocalizedField(proj, "descricao");
  const rawKeywords = getLocalizedField(proj, "keywords");
  const keywordsList = rawKeywords.split(",").map(k => k.trim()).filter(Boolean);

  const borderClass = isOngoing
    ? "border-emerald-200 dark:border-slate-300"
    : "border-slate-300 dark:border-slate-300";

  const badgeClass = isOngoing
    ? "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
    : "bg-slate-200 text-slate-800 border-slate-300";

  return (
    <div className={`group bg-white dark:bg-slate-200 p-6 rounded-3xl border ${borderClass} shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between`}>
      <div className="space-y-4">
        {/* Status Badge + Period */}
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${badgeClass}`}>
            {isOngoing ? t("ges_research.status_active", "Em andamento") : t("ges_research.status_completed", "Concluído")}
          </span>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-700 flex items-center gap-1">
            <Clock className={`w-3.5 h-3.5 ${isOngoing ? "text-emerald-700" : "text-slate-600"}`} />
            {proj.periodo}
          </span>
        </div>

        {/* Dynamic Group-based Title Box */}
        <div className={`${titleMinHeightClass} flex items-start`}>
          <h3 className="text-lg font-black text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
            {title}
          </h3>
        </div>

        {/* Dynamic Group-based Subtitle Box */}
        {subtitleMinHeightClass !== "hidden" && (
          <div className={`${subtitleMinHeightClass} flex items-start border-t border-slate-100 pt-2`}>
            <p className="text-xs text-slate-700 font-bold leading-snug line-clamp-2">
              {subtitle || "\u00A0"}
            </p>
          </div>
        )}

        {/* Description (2 lines default + Expand Toggle) */}
        <div className="space-y-1.5 pt-1">
          <p className={`text-xs text-slate-800 font-semibold leading-relaxed transition-all duration-200 ${isDescExpanded ? "" : "line-clamp-2"}`}>
            {description}
          </p>
          {description.length > 90 && (
            <button
              onClick={() => setIsDescExpanded(!isDescExpanded)}
              className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 dark:text-emerald-800 hover:text-emerald-900 transition-colors cursor-pointer mt-0.5"
            >
              <span>{isDescExpanded ? t("projects.show_less", "Mostrar menos") : t("projects.show_more", "Ler mais")}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDescExpanded ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>

        {/* Metadata Details */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-300 space-y-2 text-xs text-slate-800 font-bold">
          {/* Coordenador */}
          {proj.coordenador && (
            <div className="flex items-start gap-1.5">
              <UserCheck className={`w-4 h-4 shrink-0 mt-0.5 ${isOngoing ? "text-emerald-800" : "text-slate-600"}`} />
              <div>
                <span className="text-slate-500 font-bold">{t("projects.coordinator", "Coordenador")}: </span>
                <span>{proj.coordenador}</span>
              </div>
            </div>
          )}

          {/* Integrantes / Membros (2 lines default + Expand Toggle) */}
          {proj.membros && (
            <div className="flex items-start gap-1.5">
              <Users className={`w-4 h-4 shrink-0 mt-0.5 ${isOngoing ? "text-emerald-800" : "text-slate-600"}`} />
              <div className="flex-1 min-w-0 space-y-1">
                <p className={`font-semibold text-slate-700 leading-snug ${isMembersExpanded ? "" : "line-clamp-2"}`}>
                  <span className="text-slate-500 font-bold">{t("projects.members", "Integrantes")}: </span>
                  {proj.membros}
                </p>
                {proj.membros.length > 60 && (
                  <button
                    onClick={() => setIsMembersExpanded(!isMembersExpanded)}
                    className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 dark:text-emerald-800 hover:text-emerald-900 transition-colors cursor-pointer mt-0.5"
                  >
                    <span>{isMembersExpanded ? t("projects.show_less", "Mostrar menos") : t("projects.show_more", "Ler mais")}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMembersExpanded ? "rotate-180" : ""}`} />
                  </button>
                )}
              </div>
            </div>
          )}


          {/* Financiamento / Funding */}
          {proj.financiamento && (
            <div className="flex items-start gap-1.5">
              <Landmark className={`w-4 h-4 shrink-0 mt-0.5 ${isOngoing ? "text-amber-700" : "text-slate-600"}`} />
              <div>
                <span className="text-slate-500 font-bold">{t("projects.funding", "Financiamento")}: </span>
                <span className="font-extrabold text-slate-900">{proj.financiamento}</span>
              </div>
            </div>
          )}
        </div>

        {/* Keywords */}
        {keywordsList.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
            {keywordsList.map((tag, i) => (
              <span key={i} className={`text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md border ${
                isOngoing ? "bg-emerald-50 text-emerald-900 border-emerald-200" : "bg-slate-100 text-slate-800 border-slate-300"
              }`}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {proj.link && (
        <div className="pt-4 border-t border-slate-200 dark:border-slate-300 mt-4">
          <Link
            to={proj.link}
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 hover:text-emerald-900 transition-colors"
          >
            {t("ges_home.access_button", "Acessar")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const { t, i18n } = useTranslation();

  const projects = initialProjectsData || [];

  const getLocalizedField = (proj, field) => {
    const lang = i18n.language || "en";
    let langCode = "en";
    if (lang.startsWith("pt")) langCode = "pt";
    else if (lang.startsWith("es")) langCode = "es";
    else if (lang.startsWith("zh")) langCode = "zh";

    return (
      proj[`${field}_${langCode}`] ||
      proj[`${field}_en`] ||
      proj[`${field}_pt`] ||
      proj[field] ||
      ""
    );
  };

  const ongoingProjects = projects.filter(p => p.status === "em_andamento");
  const completedProjects = projects.filter(p => p.status === "finalizado");

  // Dynamic min-height calculations based on longest title / subtitle in each group
  const getGroupTitleMinHeight = (groupProjects) => {
    let maxChars = 0;
    groupProjects.forEach(p => {
      const titleText = getLocalizedField(p, "titulo");
      if (titleText.length > maxChars) maxChars = titleText.length;
    });

    if (maxChars <= 35) return "min-h-[1.75rem]"; // 1 line
    if (maxChars <= 75) return "min-h-[3.25rem]"; // 2 lines
    if (maxChars <= 115) return "min-h-[4.75rem]"; // 3 lines
    return "min-h-[6.25rem]"; // 4 lines
  };

  const getGroupSubtitleMinHeight = (groupProjects) => {
    let maxChars = 0;
    groupProjects.forEach(p => {
      const subtitleText = getLocalizedField(p, "subtitulo");
      if (subtitleText.length > maxChars) maxChars = subtitleText.length;
    });

    if (maxChars === 0) return "hidden";
    if (maxChars <= 45) return "min-h-[1.5rem]"; // 1 line
    return "min-h-[2.5rem]"; // 2 lines
  };

  const ongoingTitleHeight = getGroupTitleMinHeight(ongoingProjects);
  const ongoingSubtitleHeight = getGroupSubtitleMinHeight(ongoingProjects);

  const completedTitleHeight = getGroupTitleMinHeight(completedProjects);
  const completedSubtitleHeight = getGroupSubtitleMinHeight(completedProjects);

  return (
    <PageLayout title={t("projects.title", "Projetos de Pesquisa")}>
      <div className="max-w-6xl mx-auto space-y-12 pb-8">
        
        {/* Intro */}
        <p className="text-center text-slate-800 dark:text-zinc-200 max-w-2xl mx-auto font-bold text-lg leading-relaxed">
          {t("projects.subtitle", "Conheça nossas iniciativas de pesquisa em andamento e finalizadas")}
        </p>

        {/* ── GRUPO 1: PROJETOS EM ANDAMENTO ── */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 border-b border-emerald-200 dark:border-zinc-800 pb-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 rounded-xl border border-emerald-300 dark:border-emerald-800">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-zinc-100 tracking-tight">
              {t("projects.ongoing", "Projetos em Andamento")}
            </h2>
            <span className="text-xs font-black bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 px-2.5 py-0.5 rounded-full ml-auto">
              {ongoingProjects.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {ongoingProjects.map((proj) => (
              <ProjectCard
                key={proj.id}
                proj={proj}
                isOngoing={true}
                getLocalizedField={getLocalizedField}
                t={t}
                titleMinHeightClass={ongoingTitleHeight}
                subtitleMinHeightClass={ongoingSubtitleHeight}
              />
            ))}
          </div>
        </section>

        {/* ── GRUPO 2: PROJETOS FINALIZADOS ── */}
        <section className="space-y-6 pt-6">
          <div className="flex items-center gap-3 border-b border-emerald-200 dark:border-zinc-800 pb-3">
            <div className="p-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl border border-slate-300 dark:border-slate-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-zinc-100 tracking-tight">
              {t("projects.completed", "Projetos Finalizados")}
            </h2>
            <span className="text-xs font-black bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-2.5 py-0.5 rounded-full ml-auto">
              {completedProjects.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {completedProjects.map((proj) => (
              <ProjectCard
                key={proj.id}
                proj={proj}
                isOngoing={false}
                getLocalizedField={getLocalizedField}
                t={t}
                titleMinHeightClass={completedTitleHeight}
                subtitleMinHeightClass={completedSubtitleHeight}
              />
            ))}
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
