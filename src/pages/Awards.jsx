import { useState } from "react";
import PageLayout from "../components/PageLayout";
import { useTranslation } from "react-i18next";
import { Award, Calendar, Building, ExternalLink, ChevronDown, Trophy } from "lucide-react";
import awardsData from "../data/awardsData.json";

export default function Awards() {
  const { t, i18n } = useTranslation();
  const [openSections, setOpenSections] = useState({
    enedir: false,
    liseane: false,
    igor: false,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getMemberData = (id) => {
    return awardsData.premios_e_reconhecimentos.find((m) => m.id === id);
  };

  const members = [
    { id: "enedir", name: "Enedir Ghisi" },
    { id: "liseane", name: "Liseane Padilha Thives" },
    { id: "igor", name: "Igor Catão Martins Vaz" },
  ];

  const currentLang = i18n.language.startsWith("pt")
    ? "pt"
    : i18n.language.startsWith("es")
    ? "es"
    : i18n.language.startsWith("zh")
    ? "zh"
    : "en";

  return (
    <PageLayout title={t("awards.title", "Prêmios e Reconhecimentos")}>
      <div className="max-w-4xl mx-auto space-y-6 pb-12">
        <p className="text-center text-slate-800 dark:text-zinc-200 max-w-2xl mx-auto font-bold text-lg leading-relaxed">
          {t("awards.subtitle", "Reconhecimentos e premiações concedidos aos pesquisadores do nosso grupo de pesquisa")}
        </p>

        <div className="space-y-4 pt-6">
          {members.map((member) => {
            const data = getMemberData(member.id);
            const isOpen = openSections[member.id];
            const awardsCount = data ? data.premios.length : 0;

            // Sort awards by year descending
            const sortedAwards = data
              ? [...data.premios].sort((a, b) => b.ano - a.ano)
              : [];

            return (
              <div
                key={member.id}
                className="border border-emerald-100 dark:border-zinc-800 bg-white dark:bg-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleSection(member.id)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 rounded-xl border border-emerald-100 dark:border-emerald-800">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-slate-900 group-hover:text-emerald-800 transition-colors">
                        {member.name}
                      </h2>
                      <span className="text-xs font-extrabold text-slate-500">
                        {awardsCount} {t("awards.count_label", "prêmios e reconhecimentos")}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-emerald-800" : ""
                    }`}
                  />
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="border-t border-emerald-50 dark:border-zinc-800 p-4 bg-slate-50/50 dark:bg-slate-300/40 animate-in fade-in slide-in-from-top-2 duration-200">
                    {sortedAwards.length === 0 ? (
                      <p className="text-xs font-semibold text-slate-500 italic">
                        {t("awards.no_awards", "Nenhum prêmio registrado.")}
                      </p>
                    ) : (
                      <div className="divide-y divide-slate-100 dark:divide-slate-200/50">
                        {sortedAwards.map((award, index) => (
                          <div key={index} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
                            {/* Year Pill */}
                            <span className="text-[11px] font-black text-emerald-800 bg-emerald-50/80 px-2 py-0.5 rounded border border-emerald-100 shrink-0">
                              {award.ano}
                            </span>
                            
                            {/* Content Column */}
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <h3 className="font-extrabold text-slate-900 text-xs leading-snug">
                                  {award[`titulo_${currentLang}`] || award.titulo}
                                </h3>
                                <span className="text-[9px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded border bg-slate-100 text-slate-800 border-slate-200">
                                  {award[`instituicao_${currentLang}`] || award.instituicao_concedente}
                                </span>
                              </div>

                              {(award[`detalhes_${currentLang}`] || award.detalhes) && (
                                <p className="text-[11px] text-slate-500 dark:text-slate-600 font-semibold leading-relaxed">
                                  {award[`detalhes_${currentLang}`] || award.detalhes}
                                </p>
                              )}

                              {award.link && (
                                <a
                                  href={award.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-emerald-700 hover:text-emerald-900 hover:underline cursor-pointer"
                                >
                                  <span>{t("awards.view_source", "Ver link / fonte")}</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}
