export default function TeamMemberCard({ image, name, role, orcid, researchgate, lattes }) {
  return (
    <div className="bg-white dark:bg-slate-200 p-4 rounded-xl border border-slate-300 dark:border-slate-300 flex items-center gap-4 shadow-md hover:shadow-lg transition-shadow duration-300 h-full text-left">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 object-cover rounded-full shrink-0 border border-slate-300"
      />
      <div className="flex-1 min-w-0">
        <h5 className="text-base font-extrabold text-slate-900 truncate leading-snug">{name}</h5>
        <p className="text-slate-700 text-xs font-bold mt-0.5 mb-1.5 truncate">{role}</p>
        
        {/* Links */}
        <div className="flex items-center gap-2">
          {orcid && (
            <a href={orcid} target="_blank" rel="noopener noreferrer" className="shrink-0">
              <img
                src="./assets/icons/orcid.png"
                alt="ORCID"
                className="w-7 h-7 hover:scale-110 transition-transform"
              />
            </a>
          )}
          {researchgate && (
            <a href={researchgate} target="_blank" rel="noopener noreferrer" className="shrink-0">
              <img
                src="./assets/icons/ResearchGate_icon.png"
                alt="ResearchGate"
                className="w-7 h-7 hover:scale-110 transition-transform"
              />
            </a>
          )}
          {lattes && (
            <a href={lattes} target="_blank" rel="noopener noreferrer" className="shrink-0">
              <img
                src="./assets/icons/lattes.png"
                alt="Lattes"
                className="w-7 h-7 hover:scale-110 transition-transform"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}