export default function TeamMemberCard({ image, name, role, orcid, researchgate }) {
  return (
    <div className="bg-gray-100 rounded-xl p-1 text-center shadow-md flex flex-col justify-between h-full">
      {/* Parte superior (imagem e texto) */}
      <div>
        <img
          src={image}
          alt={name}
          className="w-28 h-28 object-cover rounded-full mx-auto mb-3"
        />
        <h5 className="text-lg font-semibold">{name}</h5>
        <p className="text-gray-700 text-sm mb-2">{role}</p>
      </div>

      {/* Parte inferior (ORCID e ResearchGate) */}
      <div className="mt-3 flex items-center justify-center gap-4">
        {orcid && (
          <a href={orcid} target="_blank" rel="noopener noreferrer">
            <img
              src="./assets/orcid.png"
              alt="ORCID"
              className="w-9 hover:scale-110 transition-transform"
            />
          </a>
        )}
        {researchgate && (
          <a href={researchgate} target="_blank" rel="noopener noreferrer">
            <img
              src="./assets/ResearchGate_icon.png"
              alt="ResearchGate"
              className="w-9 hover:scale-110 transition-transform"
            />
          </a>
        )}
      </div>
    </div>
  );
}
