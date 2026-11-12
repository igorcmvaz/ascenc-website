import React, { useState, useMemo } from "react";
import PageLayout from "../components/PageLayout";
import TritonSubNav from "../components/TritonSubNav";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import rawPapers from "../data/tritonPapersData.json";
import {
  FileText,
  Search,
  ExternalLink,
  Copy,
  Check,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Droplet,
  Layers,
  Sparkles,
  Info,
  Calendar,
  History
} from "lucide-react";

function shortAuthors(authors) {
  if (!authors) return "";
  const parts = authors.split(";").map((s) => s.trim());
  return parts.length > 3 ? parts.slice(0, 3).join("; ") + " et al." : authors;
}

const TAG_MAP = {
  "Agua-Pluvial": { label: "Água Pluvial", color: "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800" },
  "Agua-Potavel": { label: "Água Potável", color: "bg-cyan-50 text-cyan-900 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800" },
  "Aproveitamento-agua-chuva": { label: "Aproveitamento Água de Chuva", color: "bg-sky-50 text-sky-900 border-sky-200 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800" },
  "Simulacao-Computacional": { label: "Simulação Computacional", color: "bg-slate-100 text-slate-800 border-slate-300 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700" },
  "ACV": { label: "Avaliação do Ciclo de Vida (ACV)", color: "bg-purple-50 text-purple-900 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800" },
  "CCV": { label: "Custo do Ciclo de Vida (CCV)", color: "bg-violet-50 text-violet-900 border-violet-200 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800" },
  "Mudancas-Climaticas": { label: "Mudanças Climáticas", color: "bg-rose-50 text-rose-900 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800" },
  "Pavimento-Permeavel": { label: "Pavimento Permeável", color: "bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800" },
  "Agua-Cinza": { label: "Água Cinza", color: "bg-teal-50 text-teal-900 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800" },
  "Reservatorio": { label: "Reservatório / Tanque", color: "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800" },
  "Precipitacao": { label: "Precipitação", color: "bg-indigo-50 text-indigo-900 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800" },
  "Escala-Urbana": { label: "Escala Urbana", color: "bg-slate-100 text-slate-800 border-slate-300 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700" },
  "Residencial-Unifamiliar": { label: "Residencial Unifamiliar", color: "bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800" },
  "Residencial-Multifamiliar": { label: "Residencial Multifamiliar", color: "bg-teal-50 text-teal-900 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800" },
  "Escola-Universidade": { label: "Escola / Universidade", color: "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800" },
  "Usos-Finais": { label: "Usos Finais", color: "bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800" },
  "Qualidade-Agua": { label: "Qualidade da Água", color: "bg-teal-50 text-teal-900 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800" },
  "Revisao-Literatura": { label: "Revisão de Literatura", color: "bg-zinc-100 text-zinc-800 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700" },
  "First-Flush": { label: "First-Flush", color: "bg-cyan-50 text-cyan-900 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800" },
};

export default function TritonPapers() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [toolFilter, setToolFilter] = useState("all"); // 'all' | 'triton' | 'netuno'
  const [copiedId, setCopiedId] = useState(null);
  const [copiedBib, setCopiedBib] = useState(false);
  const [collapsed, setCollapsed] = useState({
    // Inicia com os anos mais recentes abertos (2026, 2025, 2024, 2023)
    "2026": false,
    "2025": false,
    "2024": false,
    "2023": false,
  });

  // Lista única de tags presentes nos artigos
  const availableTags = useMemo(() => {
    const counts = {};
    rawPapers.forEach((p) => {
      (p.tags || []).forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([id, count]) => ({
        id,
        count,
        label: TAG_MAP[id]?.label || id,
      }))
      .sort((a, b) => b.count - a.count);
  }, []);

  // Filtro principal de artigos
  const filteredPapersByYear = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const result = {};

    rawPapers.forEach((paper) => {
      const year = paper.year || "Outros";
      const yearNum = parseInt(year, 10);

      // Filtro de Ferramenta (Triton 2026+ vs Netuno até 2025)
      if (toolFilter === "triton" && yearNum < 2026) return;
      if (toolFilter === "netuno" && yearNum >= 2026) return;

      // Filtro por Tag
      if (selectedTag !== "all") {
        if (!paper.tags || !paper.tags.includes(selectedTag)) return;
      }

      // Filtro por Texto da Busca
      if (q) {
        const inTitle = (paper.title || "").toLowerCase().includes(q);
        const inAuthors = (paper.authors || "").toLowerCase().includes(q);
        const inDetails = (paper.details || "").toLowerCase().includes(q);
        const inYear = (paper.year || "").includes(q);
        const inTags = (paper.tags || []).some((tag) =>
          (TAG_MAP[tag]?.label || tag).toLowerCase().includes(q)
        );
        if (!inTitle && !inAuthors && !inDetails && !inYear && !inTags) return;
      }

      if (!result[year]) result[year] = [];
      result[year].push(paper);
    });

    return result;
  }, [searchQuery, selectedTag, toolFilter]);

  const sortedYears = useMemo(() => {
    return Object.keys(filteredPapersByYear).sort(
      (a, b) => parseInt(b, 10) - parseInt(a, 10)
    );
  }, [filteredPapersByYear]);

  const totalResultsCount = useMemo(() => {
    return Object.values(filteredPapersByYear).reduce(
      (acc, list) => acc + list.length,
      0
    );
  }, [filteredPapersByYear]);

  const toggleYear = (year) => {
    setCollapsed((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  const expandAll = () => {
    const next = {};
    sortedYears.forEach((y) => (next[y] = false));
    setCollapsed(next);
  };

  const collapseAll = () => {
    const next = {};
    sortedYears.forEach((y) => (next[y] = true));
    setCollapsed(next);
  };

  const copyCitation = (paper) => {
    const citation = `${paper.authors}. ${paper.title}. ${paper.details}.${
      paper.doi ? ` DOI: ${paper.doi}` : ""
    }`;
    navigator.clipboard.writeText(citation);
    setCopiedId(paper.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyTritonBibtex = () => {
    const bib = `@software{vaz_ghisi_triton_2026,
  author       = {Vaz, Igor Catão Martins and Ghisi, Enedir},
  title        = {Triton: Computational Platform for Rainwater Harvesting Simulation in Buildings (Editions: Brasil, International, and Ibérica)},
  year         = {2026},
  version      = {0.1.0},
  organization = {Universidade Federal de Santa Catarina (UFSC)},
  address      = {Florianópolis, SC, Brazil},
  url          = {https://sustainability.ufsc.br/#/triton}
}`;
    navigator.clipboard.writeText(bib);
    setCopiedBib(true);
    setTimeout(() => setCopiedBib(false), 2000);
  };

  return (
    <PageLayout>
      <div className="space-y-6 max-w-5xl mx-auto pb-12">
        {/* Sub-navegação do Triton */}
        <TritonSubNav activeTab="artigos" />

        {/* ── HEADER DA PÁGINA (DESIGN LIMPO, CONSISTENTE COM O GES) ── */}
        <section className="relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 p-6 sm:p-8 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 text-xs font-black uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>Buscador Científico • Água de Chuva</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Artigos Científicos: Do Netuno ao Triton
            </h1>
            <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm font-medium leading-relaxed max-w-3xl">
              Mais de 20 anos de pesquisa pioneira e validação empírica em aproveitamento de água de chuva
              desenvolvidos pelo Grupo de Pesquisa Espaço Sustentável da Universidade Federal de Santa Catarina (UFSC).
            </p>
          </div>

          {/* ℹ️ BANNER EXPLICATIVO: NETUNO (ATÉ 2025) vs TRITON (2026+) */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-900 dark:text-zinc-100 font-extrabold">
              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Evolução das Ferramentas Computacionais do Grupo:</span>
            </div>
            <p className="text-slate-600 dark:text-zinc-300 leading-relaxed pl-6">
              • <strong>Artigos publicados até 2025:</strong> Utilizam como base computacional o software pioneiro{" "}
              <strong className="text-slate-800 dark:text-zinc-100">Netuno (versões 1, 2, 3 e 4)</strong> para simulação contínua diária com séries históricas pluviométricas.<br />
              • <strong>Artigos de 2026 em diante:</strong> Passam a empregar a nova plataforma computacional{" "}
              <strong className="text-blue-700 dark:text-blue-400">Triton (v0.1.0 Beta)</strong>, que expande o algoritmo com Avaliação do Ciclo de Vida (ACV), estruturas tarifárias dinâmicas e tomada de decisão multicritério (MCDA).
            </p>
          </div>

          <div className="pt-1 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={copyTritonBibtex}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
            >
              {copiedBib ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedBib ? "BibTeX Copiado!" : "Copiar Citação do Triton (BibTeX)"}</span>
            </button>
            <Link
              to="/netuno"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 font-semibold text-xs border border-slate-300 dark:border-zinc-700 transition-colors"
            >
              <History className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Ver Histórico do Netuno 4</span>
            </Link>
          </div>
        </section>

        {/* ── PAINEL DE BUSCA E FILTROS (SIMILAR AO DA PÁGINA GERAL DE ARTIGOS) ── */}
        <section className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 p-4 sm:p-5 shadow-sm space-y-4">
          {/* 1. Barra de Busca e Seletor de Tema */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Campo de Busca Textual */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por título, autor, periódico, ano..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Dropdown de Temas */}
            <div className="relative w-full sm:w-72">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 dark:text-zinc-100 appearance-none pr-9 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
              >
                <option value="all">Todos os Temas ({rawPapers.length} artigos)</option>
                {availableTags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.label} ({tag.count})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-500 dark:text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 2. Filtro Rápido por Ferramenta (Triton 2026+ vs Netuno até 2025) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-zinc-800/80">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-500 dark:text-zinc-400 font-bold mr-1">Filtrar por ferramenta:</span>

              <button
                type="button"
                onClick={() => setToolFilter("all")}
                className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  toolFilter === "all"
                    ? "bg-slate-900 text-white dark:bg-blue-600 dark:text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                Todas ({rawPapers.length})
              </button>

              <button
                type="button"
                onClick={() => setToolFilter("triton")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  toolFilter === "triton"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-blue-50 hover:bg-blue-100 text-blue-900 dark:bg-blue-950/60 dark:text-blue-300 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800"
                }`}
              >
                <Droplet className="w-3 h-3 text-blue-500 dark:text-blue-300" />
                <span>Triton (2026+)</span>
              </button>

              <button
                type="button"
                onClick={() => setToolFilter("netuno")}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  toolFilter === "netuno"
                    ? "bg-slate-800 text-white dark:bg-zinc-700 dark:text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700"
                }`}
              >
                <History className="w-3 h-3 text-slate-500 dark:text-zinc-400" />
                <span>Netuno 1 a 4 (até 2025)</span>
              </button>
            </div>

            {/* Ações de expansão de sanfona */}
            {sortedYears.length > 0 && (
              <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-zinc-400">
                <button
                  type="button"
                  onClick={expandAll}
                  className="hover:text-blue-600 dark:hover:text-blue-400 underline cursor-pointer"
                >
                  Expandir todos
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={collapseAll}
                  className="hover:text-blue-600 dark:hover:text-blue-400 underline cursor-pointer"
                >
                  Recolher todos
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── CONTAGEM DE RESULTADOS ── */}
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-zinc-400 px-1">
          <span>
            {totalResultsCount === 0
              ? "Nenhum artigo encontrado"
              : `Exibindo ${totalResultsCount} ${
                  totalResultsCount === 1 ? "artigo" : "artigos"
                } distribuídos em ${sortedYears.length} ${
                  sortedYears.length === 1 ? "ano" : "anos"
                }`}
          </span>
          {(searchQuery || selectedTag !== "all" || toolFilter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedTag("all");
                setToolFilter("all");
              }}
              className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Limpar todos os filtros ✕
            </button>
          )}
        </div>

        {/* ── LISTAGEM AGRUPADA POR ANO COM SANFONAS (ESTILO PAPERS.JSX) ── */}
        {totalResultsCount === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 border border-dashed border-slate-300 dark:border-zinc-700 rounded-3xl space-y-2">
            <p className="text-sm font-bold text-slate-800 dark:text-zinc-200">
              Nenhum artigo encontrado para os critérios de busca.
            </p>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Tente buscar por termos mais amplos ou selecione "Todos os Temas".
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedYears.map((year) => {
              const isOpen = !collapsed[year];
              const papersInYear = filteredPapersByYear[year];
              const isTritonEra = parseInt(year, 10) >= 2026;

              return (
                <div
                  key={year}
                  className="border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs bg-white dark:bg-zinc-900 transition-all"
                >
                  {/* Cabeçalho da Sanfona do Ano */}
                  <button
                    type="button"
                    onClick={() => toggleYear(year)}
                    className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 bg-slate-50 hover:bg-slate-100/90 dark:bg-zinc-800/70 dark:hover:bg-zinc-800 transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2.5 h-6 rounded-full inline-block ${
                          isTritonEra ? "bg-blue-600" : "bg-slate-400 dark:bg-zinc-600"
                        }`}
                      />
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-slate-900 dark:text-white">
                          {year}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
                          ({papersInYear.length}{" "}
                          {papersInYear.length === 1 ? "artigo" : "artigos"})
                        </span>
                      </div>

                      {/* Badge da Ferramenta correspondente ao ano */}
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          isTritonEra
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                            : "bg-slate-200/80 text-slate-700 dark:bg-zinc-700 dark:text-zinc-300"
                        }`}
                      >
                        {isTritonEra ? "Triton (Nova Ferramenta)" : "Netuno 4"}
                      </span>
                    </div>

                    <span className="text-slate-500 dark:text-zinc-400">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </span>
                  </button>

                  {/* Conteúdo Aberto dos Artigos do Ano */}
                  {isOpen && (
                    <div className="px-4 sm:px-5 py-2 divide-y divide-slate-100 dark:divide-zinc-800/80">
                      {papersInYear.map((paper, idx) => {
                        const authorsFormatted = shortAuthors(paper.authors);
                        const isCopied = copiedId === paper.id;

                        return (
                          <div
                            key={paper.id || idx}
                            className="py-4 hover:bg-slate-50/60 dark:hover:bg-zinc-800/40 rounded-xl px-2 transition-colors space-y-2"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              {/* Badge da Ferramenta no Artigo */}
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                                    isTritonEra
                                      ? "bg-blue-50 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                                      : "bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700"
                                  }`}
                                >
                                  {isTritonEra ? "Triton" : "Netuno 4"}
                                </span>

                                <span className="text-xs font-bold text-slate-500 dark:text-zinc-400">
                                  {paper.details}
                                </span>
                              </div>

                              {/* Botão de Copiar Citação */}
                              <button
                                type="button"
                                onClick={() => copyCitation(paper)}
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
                                title="Copiar citação ABNT"
                              >
                                {isCopied ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                                <span>{isCopied ? "Copiado!" : "Copiar citação"}</span>
                              </button>
                            </div>

                            {/* Título do Artigo */}
                            <div>
                              {paper.doi ? (
                                <a
                                  href={paper.doi}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm font-black text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug"
                                >
                                  {paper.title}
                                </a>
                              ) : (
                                <span className="text-sm font-black text-slate-900 dark:text-white leading-snug">
                                  {paper.title}
                                </span>
                              )}
                            </div>

                            {/* Autores */}
                            <p className="text-xs text-slate-600 dark:text-zinc-300 font-medium">
                              {authorsFormatted}
                            </p>

                            {/* Tags Temáticas */}
                            {(paper.tags || []).length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {(paper.tags || []).map((tagId) => {
                                  const tagMeta = TAG_MAP[tagId];
                                  const isTagActive = selectedTag === tagId;
                                  return (
                                    <button
                                      key={tagId}
                                      type="button"
                                      onClick={() =>
                                        setSelectedTag(isTagActive ? "all" : tagId)
                                      }
                                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                                        tagMeta?.color ||
                                        "bg-slate-100 text-slate-700 border-slate-200 dark:bg-zinc-800 dark:text-zinc-300"
                                      } ${
                                        isTagActive
                                          ? "ring-2 ring-blue-500 font-black"
                                          : "hover:opacity-80"
                                      }`}
                                    >
                                      #{tagMeta?.label || tagId}
                                    </button>
                                  );
                                })}
                              </div>
                            )}

                            {/* Link do DOI */}
                            {paper.doi && (
                              <div className="pt-1">
                                <a
                                  href={paper.doi}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                  <BookOpen className="w-3.5 h-3.5" />
                                  <span>
                                    {paper.doi.includes("doi.org")
                                      ? `DOI: ${paper.doi
                                          .replace("https://doi.org/", "")
                                          .replace("http://dx.doi.org/", "")}`
                                      : "Acessar publicação"}
                                  </span>
                                  <ExternalLink className="w-3 h-3 opacity-70" />
                                </a>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ── CARD COMO CITAR O TRITON E O NETUNO ── */}
        <section className="p-6 rounded-3xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-4">
          <h3 className="font-black text-slate-900 dark:text-white text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Como Citar o Triton e o Netuno em Trabalhos Acadêmicos</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 space-y-1.5">
              <span className="font-black text-blue-700 dark:text-blue-300 uppercase tracking-wider text-[11px]">
                Citação do Triton (2026 em diante)
              </span>
              <p className="font-mono text-slate-800 dark:text-zinc-200 leading-relaxed text-[11px]">
                Vaz, I. C. M., & Ghisi, E. (2026). <em>Triton: Computational Platform for Rainwater Harvesting Simulation in Buildings (Editions: Brasil, International, and Ibérica)</em> (Version 0.1.0) [Computer software]. Universidade Federal de Santa Catarina (UFSC), Florianópolis, SC, Brazil.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 space-y-1.5">
              <span className="font-black text-slate-700 dark:text-zinc-300 uppercase tracking-wider text-[11px]">
                Citação do Netuno 4 (2014–2025)
              </span>
              <p className="font-mono text-slate-800 dark:text-zinc-200 leading-relaxed text-[11px]">
                Ghisi, E., & Cordova, M. M. (2014). <em>Netuno: Aproveitamento de água pluvial em edificações</em> (Versão 4.0) [Computer software]. Universidade Federal de Santa Catarina (UFSC), Florianópolis, SC, Brasil.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
