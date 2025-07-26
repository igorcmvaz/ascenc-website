export default function TeamMemberCard({ image, name, role, orcid }) {
  return (
    <div className="bg-gray-100 rounded-xl p-4 text-center shadow-md">
      <img
        src={image}
        alt={name}
        className="w-28 h-28 object-cover rounded-full mx-auto mb-3"
      />
      <h5 className="text-lg font-semibold">{name}</h5>
      <p className="text-gray-700 text-sm mb-2">{role}</p>
      {orcid && (
        <a href={orcid} target="_blank" rel="noopener noreferrer">
          <img
            src="/orcid.png"
            alt="ORCID"
            className="w-9 mx-auto hover:scale-110 transition-transform"
          />
        </a>
      )}
    </div>
  );
}
