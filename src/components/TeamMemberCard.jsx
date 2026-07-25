import { Mail } from "lucide-react";

export default function TeamMemberCard({ image, name, role, orcid, researchgate, lattes, email }) {
  return (
    <div className="bg-white dark:bg-slate-200 p-2 sm:p-2.5 rounded-xl border border-slate-300 dark:border-slate-300 flex items-center gap-2 sm:gap-2.5 shadow-sm hover:shadow-md transition-shadow duration-300 h-full text-left">
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-11 h-11 sm:w-13 sm:h-13 object-cover rounded-full shrink-0 border border-slate-300 shadow-xs"
        />
      ) : (
        <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-900 font-extrabold text-base sm:text-lg shrink-0 shadow-xs">
          {name ? name.charAt(0) : "?"}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h5 className="text-xs sm:text-[13px] font-extrabold text-slate-900 truncate leading-tight" title={name}>{name}</h5>
        <p className="text-slate-600 text-[10px] sm:text-[11px] font-semibold mt-0 mb-1 truncate">{role}</p>
        
        {/* Links */}
        <div className="flex items-center gap-1.5">
          {orcid && (
            <a href={orcid} target="_blank" rel="noopener noreferrer" className="shrink-0" title="ORCID">
              <img
                src="./assets/icons/orcid.png"
                alt="ORCID"
                className="w-5 h-5 hover:scale-110 transition-transform"
              />
            </a>
          )}
          {researchgate && (
            <a href={researchgate} target="_blank" rel="noopener noreferrer" className="shrink-0" title="ResearchGate">
              <img
                src="./assets/icons/ResearchGate_icon.png"
                alt="ResearchGate"
                className="w-5 h-5 hover:scale-110 transition-transform"
              />
            </a>
          )}
          {lattes && (
            <a href={lattes} target="_blank" rel="noopener noreferrer" className="shrink-0" title="Lattes">
              <img
                src="./assets/icons/lattes.png"
                alt="Lattes"
                className="w-5 h-5 hover:scale-110 transition-transform"
              />
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 hover:scale-110 transition-transform" title={`E-mail: ${email}`}>
              <Mail className="w-2.5 h-2.5 text-emerald-800" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}