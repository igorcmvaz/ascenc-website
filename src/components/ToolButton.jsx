import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";

export default function ToolButton({ icon, title, to, isPlaceholder }) {
  return (
    <Link
      to={to}
      className="group bg-gray-100 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center px-6 py-10 border border-gray-200"
    >
      {icon ? (
        <img
          src={icon}
          alt={title}
          className="w-20 h-20 object-contain mb-4 transition-transform duration-300 group-hover:scale-110"
        />
      ) : (
        <HelpCircle className="w-20 h-20 text-gray-400 mb-4 transition-transform duration-300 group-hover:scale-110" />
      )}
      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 text-center">
        {title}
      </h3>
    </Link>
  );
}
