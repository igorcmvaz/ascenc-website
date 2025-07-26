export default function ToolCard({ icon, title, description, iframe }) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-md mb-6">
      <div className="flex items-center gap-3 mb-3">
        {icon && <img src={icon} alt={title} className="w-12 h-auto" />}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-700 text-justify mb-4">{description}</p>
      {iframe && (
        <div className="aspect-video">
          <iframe
            src={iframe}
            className="w-full h-full rounded-md border"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}
