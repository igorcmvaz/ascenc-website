import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Home,
  BookOpen,
  FileText,
  Layers,
  MessageSquare,
  Download,
  ExternalLink,
  Droplet,
  Sparkles
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
    <div className="w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 rounded-2xl p-2 sm:p-2.5 shadow-sm mb-6 transition-all">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Marca & Versão */}
        <div className="flex items-center gap-2.5 shrink-0 px-2">
          <Link
            to="/triton"
            className="flex items-center gap-2 group hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 flex items-center justify-center p-1 shadow-sm group-hover:scale-105 transition-transform">
              <img
                src="./assets/triton/triton-brl.png"
                alt="Triton"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-base text-slate-900 dark:text-white tracking-tight leading-none">
                  Triton
                </span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  v0.1.0 Beta
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold leading-tight">
                UFSC • Água de Chuva
              </span>
            </div>
          </Link>
        </div>

        {/* 5 Abas de Navegação */}
        <nav className="flex items-center gap-1 overflow-x-auto w-full md:w-auto py-1 md:py-0 px-1 scrollbar-none">
          {navItems.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  active
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30 dark:bg-blue-500 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/80"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? "text-white" : "text-slate-400 dark:text-slate-400"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Ações Rápidas (Download & GitHub) */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <Link
            to="/triton#download"
            onClick={(e) => {
              if (currentPath === "/triton") {
                e.preventDefault();
                const el = document.getElementById("triton-download-form");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm hover:shadow transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t("triton_nav.btn_download", "Baixar Beta")}</span>
          </Link>
          <a
            href="https://github.com/igorcmvaz/triton"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
            title="GitHub"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  );
}
