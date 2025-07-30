export default function UniversityCard({ name, description, img }) {
  return (
    <div className="text-center flex flex-col items-center">
      <p className="mb-2 font-medium text-gray-900 dark:text-zinc-100">{name}</p>
      <p className="text-sm text-gray-600 dark:text-zinc-400 mb-3">{description}</p>
      <img src={img} alt={name} className="max-h-28 object-contain" />
    </div>
  );
}