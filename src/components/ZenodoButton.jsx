import { ExternalLink } from "lucide-react";

export default function ZenodoButton({ link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-gray-100 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center p-6 border border-gray-200"
    >
      <img
        src="src/assets/zenodo.png"
        alt="Zenodo"
        className="w-28 h-28 object-contain mb-4 transition-transform duration-300 group-hover:scale-110"
      />
      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 flex items-center gap-2">
        Acessar no Zenodo <ExternalLink className="w-5 h-5" />
      </h3>
    </a>
  );
}
