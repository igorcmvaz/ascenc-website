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
  TrendingUp,
  Droplet,
  CloudRain,
  Leaf
} from "lucide-react";

export default function TritonPapers() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [copiedId, setCopiedId] = useState(null);
  const [copiedBib, setCopiedBib] = useState(false);
  const [visibleCount, setVisibleCount] = useState(15);

  const categories = [
    { id: "all", label: "Todos os Artigos", icon: FileText, count: rawPapers.length },
    { id: "dimensionamento", label: "Dimensionamento & Tanques", icon: Droplet },
    { id: "economia", label: "Viabilidade Econômica", icon: TrendingUp },
    { id: "acv", label: "Ciclo de Vida (ACV) & Carbono", icon: Leaf },
    { id: "clima", label: "Mudanças Climáticas & Chuva", icon: CloudRain },
  ];

  const filteredPapers = useMemo(() => {
    const sorted = [...rawPapers].sort((a, b) => parseInt(b.year || "0") - parseInt(a.year || "0"));

    return sorted.filter((p) => {
      if (selectedCategory === "dimensionamento") {
        const text = (p.title + " " + (p.tags || []).join(" ")).toLowerCase();
        if (!text.includes("dimensionamento") && !text.includes("reservatorio") && !text.includes("sizing") && !text.includes("tank") && !text.includes("simulacao")) {
          return false;
        }
      } else if (selectedCategory === "economia") {
        const text = (p.title + " " + (p.tags || []).join(" ")).toLowerCase();
        if (!text.includes("economic") && !text.includes("viabilidade") && !text.includes("custo") && !text.includes("cost") && !text.includes("tarif")) {
          return false;
        }
      } else if (selectedCategory === "acv") {
        const text = (p.title + " " + (p.tags || []).join(" ")).toLowerCase();
        if (!text.includes("acv") && !text.includes("lca") && !text.includes("carbon") && !text.includes("ciclo") && !text.includes("life cycle")) {
          return false;
        }
      } else if (selectedCategory === "clima") {
        const text = (p.title + " " + (p.tags || []).join(" ")).toLowerCase();
        if (!text.includes("clima") && !text.includes("climate") && !text.includes("precipita") && !text.includes("rainfall")) {
          return false;
        }
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = (p.title || "").toLowerCase().includes(q);
        const inAuthors = (p.authors || "").toLowerCase().includes(q);
        const inDetails = (p.details || "").toLowerCase().includes(q);
        const inYear = (p.year || "").includes(q);
        return inTitle || inAuthors || inDetails || inYear;
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

  const copyCitation = (paper) => {
    const citation = `${paper.authors}. ${paper.title}. ${paper.details}.${paper.doi ? ` DOI: ${paper.doi}` : ""}`;
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
  address      = {Florianópolis, SC, Brazil}
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

        {/* ── HEADER DA SEÇÃO DE ARTIGOS ── */}
        <section className="relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 p-6 sm:p-8 border border-slate-200 dark:border-zinc-800 shadow-sm">
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-800 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80 text-xs font-black uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>Base Científica & Validação Empírica</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Artigos Científicos sobre Aproveitamento de Água de Chuva
            </h1>
            <p className="text-slate-600 dark:text-zinc-300 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
              O Triton e seu predecessor Netuno são respaldados por mais de 20 anos de pesquisa empírica
              e simulações contínuas realizadas pelo Grupo de Pesquisa Espaço Sustentável da UFSC,
              com dezenas de publicações em periódicos de alto impacto internacional.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={copyTritonBibtex}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
              >
                {copiedBib ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBib ? "BibTeX Copiado!" : "Copiar BibTeX do Triton"}</span>
              </button>
              <Link
                to="/papers"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 font-semibold text-xs border border-slate-300 dark:border-zinc-700 transition-colors"
              >
                <span>Ver Todos os Artigos do GES</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── ARTIGO DE DESTAQUE RECENTE (2026) ── */}
        <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 shadow-xs space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-600 text-white uppercase tracking-wider">
              Destaque 2026 • Mudanças Climáticas
            </span>
            <span className="text-xs text-blue-900 dark:text-blue-300 font-bold">
              Water (MDPI), v. 18, p. 792, 2026
            </span>
          </div>
          <h3 className="text-base font-black text-slate-900 dark:text-white">
            Projected Climate Change Impacts on Rainwater Harvesting in Brazilian Single-Family Houses
          </h3>
          <p className="text-xs text-slate-600 dark:text-zinc-300">
            <strong>Autores:</strong> VAZ, I. C. M.; TESTON, A.; RODRIGUES, E. M. S.; GHISI, E.; BALLARIN, A. S.; BRANDÃO, A. R. A.
          </p>
          <div className="pt-1 flex items-center gap-3">
            <a
              href="http://dx.doi.org/10.3390/w18070792"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <span>Acessar no periódico (Open Access)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* ── BARRA DE BUSCA E FILTROS ── */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título, autor, periódico ou ano..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs transition-all"
            />
          </div>

          {/* Categorias / Tags */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setVisibleCount(15);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? "bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                      : "bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── LISTA DE ARTIGOS ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 font-semibold px-1">
            <span>Mostrando {Math.min(visibleCount, filteredPapers.length)} de {filteredPapers.length} artigos encontrados</span>
          </div>

          <div className="space-y-3">
            {filteredPapers.slice(0, visibleCount).map((paper) => {
              const isCopied = copiedId === paper.id;
              return (
                <div
                  key={paper.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs hover:border-blue-400 dark:hover:border-blue-500 transition-all space-y-2 group"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/80">
                        {paper.year}
                      </span>
                      <span className="text-xs font-bold text-slate-500 dark:text-zinc-400 truncate max-w-[280px] sm:max-w-md">
                        {paper.details}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyCitation(paper)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
                      title="Copiar citação ABNT"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? "Citação copiada" : "Copiar citação"}</span>
                    </button>
                  </div>

                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {paper.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-zinc-300 line-clamp-2">
                    {paper.authors}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-zinc-800">
                    <div className="flex flex-wrap gap-1">
                      {(paper.tags || []).slice(0, 4).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {paper.doi && (
                      <a
                        href={paper.doi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
                      >
                        <span>Acessar DOI</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botão Carregar Mais */}
          {visibleCount < filteredPapers.length && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 15)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
              >
                Carregar mais artigos ({filteredPapers.length - visibleCount} restantes)
              </button>
            </div>
          )}
        </div>

        {/* ── CARD COMO CITAR O TRITON ── */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
          <h3 className="font-black text-slate-900 dark:text-white text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Como Citar o Triton em Trabalhos Acadêmicos</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
            Se você utilizar o Triton em dissertações, teses, artigos ou relatórios de consultoria técnica, cite a ferramenta como:
          </p>
          <div className="p-3 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 font-mono text-xs text-slate-800 dark:text-zinc-200 leading-relaxed">
            Vaz, I. C. M., & Ghisi, E. (2026). Triton: Computational Platform for Rainwater Harvesting Simulation in Buildings (Editions: Brasil, International, and Ibérica) (Version 0.1.0) [Computer software]. Universidade Federal de Santa Catarina (UFSC), Florianópolis, SC, Brazil.
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
