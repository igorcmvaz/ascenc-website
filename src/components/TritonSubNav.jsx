import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Home,
  BookOpen,
  FileText,
  Layers,
  MessageSquare
} from "lucide-react";

export default function TritonSubNav({ activeTab }) {
  const { t } = useTranslation();
  const location = useLocation();

  const currentPath = location.pathname;

  const navItems = [
    {
      id: "inicio",
      label: t("triton_nav.home", "Início"),
      path: "/triton",
      icon: Home,
      exact: true,
    },
    {
      id: "documentacao",
      label: t("triton_nav.docs", "Documentação"),
      path: "/triton/documentacao",
      icon: BookOpen,
      aliases: ["/triton/docs"],
    },
    {
      id: "artigos",
      label: t("triton_nav.papers", "Artigos"),
      path: "/triton/artigos",
      icon: FileText,
      aliases: ["/triton/papers"],
    },
    {
      id: "versoes",
      label: t("triton_nav.versions", "Versões"),
      path: "/triton/versoes",
      icon: Layers,
      aliases: ["/triton/versions"],
    },
    {
      id: "contato",
      label: t("triton_nav.contact", "Contato e Sugestões"),
      path: "/triton/contato",
      icon: MessageSquare,
      aliases: ["/triton/sugestoes"],
    },
  ];

  const isActive = (item) => {
    if (activeTab) return activeTab === item.id;
    if (item.exact) return currentPath === item.path;
    if (currentPath === item.path) return true;
    if (item.aliases && item.aliases.includes(currentPath)) return true;
    return false;
  };

  return (
    <nav className="w-full mb-6">
      <div className="flex items-center justify-center gap-1 sm:gap-2 p-1.5 bg-slate-100/90 dark:bg-zinc-800/80 rounded-2xl max-w-fit mx-auto border border-slate-200/80 dark:border-zinc-700/60 overflow-x-auto scrollbar-none shadow-xs">
        {navItems.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                active
                  ? "bg-white text-blue-800 shadow-sm border border-slate-200/60 dark:bg-zinc-900 dark:text-blue-400 dark:border-zinc-700 font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-700/50"
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${
                  active
                    ? "text-blue-700 dark:text-blue-400"
                    : "text-slate-400 dark:text-zinc-500"
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
