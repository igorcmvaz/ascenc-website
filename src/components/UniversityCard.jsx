export default function UniversityCard({ name, description, img, url }) {
  return (
    <div className="text-center flex flex-col items-center justify-between h-full space-y-2">
      <div>
        <p className="mb-1 font-extrabold text-xs md:text-sm text-slate-900 leading-snug">{name}</p>
        <p className="text-[10px] md:text-xs text-slate-700 mb-1 leading-relaxed font-bold">{description}</p>
      </div>
      {url ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-200 block shrink-0">
          <img src={img} alt={name} className="max-h-20 md:max-h-24 object-contain cursor-pointer" />
        </a>
      ) : (
        <img src={img} alt={name} className="max-h-20 md:max-h-24 object-contain shrink-0" />
      )}
    </div>
  );
}