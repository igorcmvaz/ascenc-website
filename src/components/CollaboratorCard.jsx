import { Building2, ExternalLink, GraduationCap } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CollaboratorCard({ collaborator }) {
  const { t } = useTranslation();
  const { name, role, image, orcid, researchgate, lattes, scholar, areas = [] } = collaborator;

  const uniList = collaborator.universities && collaborator.universities.length > 0
    ? collaborator.universities
    : collaborator.university
    ? [collaborator.university]
    : [];

  const getTranslatedRole = (r) => {
    if (!r) return "";
    const cleanRole = r.trim();
    const translationKey = `roles.${cleanRole}`;
    const translated = t(translationKey);
    return translated !== translationKey ? translated : cleanRole;
  };

  const getTranslatedArea = (area) => {
    if (!area) return "";
    const cleanArea = area.trim();
    const tagTranslated = t(`tags.${cleanArea}`);
    if (tagTranslated !== `tags.${cleanArea}`) return tagTranslated;
    const areaTranslated = t(`areas.${cleanArea}`);
    if (areaTranslated !== `areas.${cleanArea}`) return areaTranslated;
    return cleanArea;
  };

  const getTranslatedUniName = (uni) => {
    if (!uni) return "";
    if (uni.key) {
      const key = `universities.${uni.key}.name`;
      const translated = t(key);
      if (translated !== key) return translated;
    }
    return uni.name || "";
  };

  return (
    <div className="bg-white dark:bg-slate-200 border border-slate-300 dark:border-slate-300 rounded-xl p-3.5 shadow-md hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-2.5 h-full group">
      {/* Topo: Avatar + Nome/Cargo/Links + Logos das Universidades */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-14 h-14 object-cover rounded-full border border-slate-300 shrink-0 group-hover:border-emerald-600 transition-colors shadow-sm"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-900 font-extrabold text-base shrink-0 shadow-sm">
              {name ? name.charAt(0) : "?"}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-extrabold text-slate-900 truncate leading-snug">
              {name}
            </h4>
            <p className="text-slate-700 text-[11px] font-bold truncate mt-0.5">
              {getTranslatedRole(role)}
            </p>

            {/* Links Acadêmicos */}
            <div className="flex items-center gap-2 mt-1.5">
              {orcid && (
                <a
                  href={orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-115 transition-transform shrink-0"
                  title="ORCID"
                >
                  <img src="./assets/icons/orcid.png" alt="ORCID" className="w-5.5 h-5.5" />
                </a>
              )}
              {researchgate && (
                <a
                  href={researchgate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-115 transition-transform shrink-0"
                  title="ResearchGate"
                >
                  <img
                    src="./assets/icons/ResearchGate_icon.png"
                    alt="ResearchGate"
                    className="w-5.5 h-5.5"
                  />
                </a>
              )}
              {lattes && (
                <a
                  href={lattes}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-115 transition-transform shrink-0"
                  title="Lattes"
                >
                  <img src="./assets/icons/lattes.png" alt="Lattes" className="w-5.5 h-5.5" />
                </a>
              )}
              {scholar && (
                <a
                  href={scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-115 transition-transform shrink-0 flex items-center justify-center w-5.5 h-5.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300 font-bold"
                  title="Google Scholar"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-blue-800" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Logos das Universidades / Instituições */}
        <div className="flex items-center gap-1 shrink-0">
          {uniList.map((uni, idx) => (
            uni.img ? (
              <a
                key={idx}
                href={uni.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 bg-white rounded-lg border border-slate-300 shrink-0 hover:scale-105 transition-transform"
                title={getTranslatedUniName(uni)}
              >
                <img
                  src={uni.img}
                  alt={getTranslatedUniName(uni)}
                  className="h-9 w-10 object-contain"
                />
              </a>
            ) : null
          ))}
        </div>
      </div>

      {/* Meio: Áreas de Atuação (Badges Compactas) */}
      <div className="space-y-1 flex-1">
        <div className="flex flex-wrap gap-1">
          {areas.map((area, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100/90 text-emerald-950 rounded-md border border-emerald-300/80"
            >
              {getTranslatedArea(area)}
            </span>
          ))}
        </div>
      </div>

      {/* Rodapé: Universidades Associadas */}
      <div className="pt-2 border-t border-slate-300 flex items-center justify-between gap-1 text-[11px]">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <Building2 className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
          <span className="font-extrabold text-slate-900 truncate">
            {uniList.map(u => getTranslatedUniName(u)).join(" / ")}
          </span>
        </div>
        {uniList.length === 1 && uniList[0]?.url && (
          <a
            href={uniList[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-emerald-800 transition-colors shrink-0"
            title={t('partners.visit_university', 'Visitar Universidade')}
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
