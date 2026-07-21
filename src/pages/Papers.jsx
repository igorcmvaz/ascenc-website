import { useState } from "react";
import PageLayout from "../components/PageLayout";
import { useTranslation } from "react-i18next";
import { ArrowRight, BookOpen, ChevronDown, ChevronUp, Search } from "lucide-react";

function parseCitation(paper) {
  return { articleTitle: paper.title, pubInfo: paper.details };
}

function shortAuthors(authors) {
  const parts = authors.split(";").map(s => s.trim());
  return parts.length > 3 ? parts.slice(0, 3).join("; ") + " et al." : authors;
}

const TAG_MAP = {
  "Agua-Pluvial": { label: "#Agua-Pluvial", color: "bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-100 dark:text-blue-950 dark:border-blue-300" },
  "Agua-Potavel": { label: "#Agua-Potavel", color: "bg-cyan-100 text-cyan-900 border-cyan-300 dark:bg-cyan-100 dark:text-cyan-950 dark:border-cyan-300" },
  "Agua-Cinza": { label: "#Agua-Cinza", color: "bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-100 dark:text-teal-950 dark:border-teal-300" },
  "Aquecimento-Agua": { label: "#Aquecimento-Agua", color: "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-100 dark:text-rose-950 dark:border-rose-300" },
  "Usos-Finais": { label: "#Usos-Finais", color: "bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-100 dark:text-indigo-950 dark:border-indigo-300" },
  "Conforto-Termico": { label: "#Conforto-Termico", color: "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-100 dark:text-amber-950 dark:border-amber-300" },
  "Eletricidade": { label: "#Eletricidade", color: "bg-yellow-200 text-yellow-950 border-yellow-400 dark:bg-yellow-200 dark:text-yellow-950 dark:border-yellow-400" },
  "Iluminacao": { label: "#Iluminacao", color: "bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-100 dark:text-orange-950 dark:border-orange-300" },
  "Sombreamento": { label: "#Sombreamento", color: "bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-100 dark:text-orange-950 dark:border-orange-300" },
  "Envoltoria": { label: "#Envoltoria", color: "bg-lime-100 text-lime-900 border-lime-300 dark:bg-lime-100 dark:text-lime-950 dark:border-lime-300" },
  "Pavimento-Permeavel": { label: "#Pavimento-Permeavel", color: "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-100 dark:text-emerald-950 dark:border-emerald-300" },
  "Telhado-Verde": { label: "#Telhado-Verde", color: "bg-green-100 text-green-900 border-green-300 dark:bg-green-100 dark:text-green-950 dark:border-green-300" },
  "Telhado-Frio": { label: "#Telhado-Frio", color: "bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-100 dark:text-sky-950 dark:border-sky-300" },
  "ACV": { label: "#ACV", color: "bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-100 dark:text-purple-950 dark:border-purple-300" },
  "CCV": { label: "#CCV", color: "bg-violet-100 text-violet-900 border-violet-300 dark:bg-violet-100 dark:text-violet-950 dark:border-violet-300" },
  "Mudancas-Climaticas": { label: "#Mudancas-Climaticas", color: "bg-red-100 text-red-900 border-red-300 dark:bg-red-100 dark:text-red-950 dark:border-red-300" },
  "Simulacao-Computacional": { label: "#Simulacao-Computacional", color: "bg-slate-200 text-slate-900 border-slate-400 dark:bg-slate-200 dark:text-slate-900 dark:border-slate-400" },
  "Comportamento-Usuario": { label: "#Comportamento-Usuario", color: "bg-pink-100 text-pink-900 border-pink-300 dark:bg-pink-100 dark:text-pink-950 dark:border-pink-300" },
  "Produtividade": { label: "#Produtividade", color: "bg-fuchsia-100 text-fuchsia-900 border-fuchsia-300 dark:bg-fuchsia-100 dark:text-fuchsia-950 dark:border-fuchsia-300" },
  "Qualidade-Ar": { label: "#Qualidade-Ar", color: "bg-cyan-100 text-cyan-900 border-cyan-300 dark:bg-cyan-100 dark:text-cyan-950 dark:border-cyan-300" },
  "Estudo-Campo": { label: "#Estudo-Campo", color: "bg-stone-200 text-stone-900 border-stone-400 dark:bg-stone-200 dark:text-stone-900 dark:border-stone-400" },
  "Revisao-Literatura": { label: "#Revisao-Literatura", color: "bg-zinc-200 text-zinc-900 border-zinc-400 dark:bg-zinc-200 dark:text-zinc-900 dark:border-zinc-400" },
  "Benchmarking": { label: "#Benchmarking", color: "bg-gray-200 text-gray-900 border-gray-400 dark:bg-gray-200 dark:text-gray-900 dark:border-gray-400" },
  "Demografia-Usuario": { label: "#Demografia-Usuario", color: "bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-100 dark:text-rose-950 dark:border-rose-300" },
  "Escala-Urbana": { label: "#Escala-Urbana", color: "bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-100 dark:text-blue-950 dark:border-blue-300" },
  "Residencial-Unifamiliar": { label: "#Residencial-Unifamiliar", color: "bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-100 dark:text-emerald-950 dark:border-emerald-300" },
  "Residencial-Multifamiliar": { label: "#Residencial-Multifamiliar", color: "bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-100 dark:text-teal-950 dark:border-teal-300" },
  "Comercial-Escritorio": { label: "#Comercial-Escritorio", color: "bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-100 dark:text-indigo-950 dark:border-indigo-300" },
  "Industrial-Servicos": { label: "#Industrial-Servicos", color: "bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-100 dark:text-orange-950 dark:border-orange-300" },
  "Escola-Universidade": { label: "#Escola-Universidade", color: "bg-lime-100 text-lime-900 border-lime-300 dark:bg-lime-100 dark:text-lime-950 dark:border-lime-300" },
  "Habitacao-Interesse-Social": { label: "#Habitacao-Interesse-Social", color: "bg-amber-200 text-amber-950 border-amber-400 dark:bg-amber-200 dark:text-amber-950 dark:border-amber-400" },
  "Equipamento-Hidrossanitario": { label: "#Equipamento-Hidrossanitario", color: "bg-cyan-100 text-cyan-900 border-cyan-300 dark:bg-cyan-100 dark:text-cyan-950 dark:border-cyan-300" },
};

function TagBadge({ tagId }) {
  const meta = TAG_MAP[tagId];
  if (!meta) return <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold border bg-slate-100 text-slate-800 border-slate-300 dark:border-zinc-700">{tagId}</span>;
  return (
    <span className={"inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold border transition-colors " + meta.color}>
      {meta.label}
    </span>
  );
}

function BarChart({ data }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const { t } = useTranslation();
  
  const width = 500;
  const height = 300;
  const paddingLeft = 40;
  const paddingRight = 15;
  const paddingTop = 20;
  const paddingBottom = 45;
  
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  
  const maxVal = Math.max(...data.map(d => d.totalCount), 1);
  const roundedMax = Math.ceil(maxVal / 5) * 5;
  
  const barSpacing = chartWidth / data.length;
  const barWidth = barSpacing * 0.7;

  const isFiltered = data.some(d => d.isFiltered);

  return (
    <div className="bg-white dark:bg-slate-50 border border-emerald-200 dark:border-slate-300 rounded-2xl p-4 shadow-md relative">
      <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-900 mb-1 flex items-center justify-between">
        <span>{t("papers.chart_bar_title", "Produção por Ano (Artigos)")}</span>
        {isFiltered && (
          <span className="text-[11px] text-emerald-800 dark:text-emerald-900 font-bold bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
            {t("papers.filter_active", "Filtro ativo")}
          </span>
        )}
      </h3>
      <p className="text-[11px] text-slate-600 mb-3 font-bold">
        {isFiltered
          ? t("papers.chart_bar_sub_filtered", "Fundo: Total | Destaque: Tema selecionado")
          : t("papers.chart_bar_sub", "Total de artigos por ano")}
      </p>

      <div className="relative">
        <svg viewBox={"0 0 " + width + " " + height} className="w-full h-auto overflow-visible">
          {[0, 1, 2, 3, 4, 5].map((tick, idx) => {
            const val = (roundedMax / 5) * tick;
            const y = height - paddingBottom - (val / roundedMax) * chartHeight;
            return (
              <g key={idx} className="opacity-50 dark:opacity-20">
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  className="text-slate-400 dark:text-zinc-600"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize={13}
                  className="fill-slate-900 dark:fill-slate-900 font-black"
                >
                  {Math.round(val)}
                </text>
              </g>
            );
          })}

          <line
            x1={paddingLeft}
            y1={height - paddingBottom}
            x2={width - paddingRight}
            y2={height - paddingBottom}
            stroke="currentColor"
            strokeWidth={1.5}
            className="text-slate-700 dark:text-slate-700"
          />

          {data.map((d, idx) => {
            const xCenter = paddingLeft + idx * barSpacing + barSpacing / 2;
            const totalBarHeight = (d.totalCount / roundedMax) * chartHeight;
            const selectedBarHeight = (d.selectedCount / roundedMax) * chartHeight;
            const yTotal = height - paddingBottom - totalBarHeight;
            const ySelected = height - paddingBottom - selectedBarHeight;
            
            return (
              <g key={idx}>
                {/* Background total bar */}
                <rect
                  x={xCenter - barWidth / 2}
                  y={yTotal}
                  width={barWidth}
                  height={Math.max(totalBarHeight, 2)}
                  rx={3}
                  className={isFiltered ? "fill-slate-300 dark:fill-slate-300 opacity-60" : "fill-emerald-600 dark:fill-emerald-600 opacity-90"}
                />

                {/* Foreground selected bar */}
                {isFiltered && d.selectedCount > 0 && (
                  <rect
                    x={xCenter - barWidth / 2}
                    y={ySelected}
                    width={barWidth}
                    height={Math.max(selectedBarHeight, 2)}
                    rx={3}
                    className={"fill-emerald-600 dark:fill-emerald-600 transition-all duration-150 cursor-pointer " + (
                      hoveredIdx === idx ? "opacity-100 brightness-110" : "opacity-95"
                    )}
                  />
                )}

                {/* Hit area for hover */}
                <rect
                  x={xCenter - barWidth / 2}
                  y={yTotal}
                  width={barWidth}
                  height={Math.max(totalBarHeight, 10)}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />

                <text
                  x={xCenter}
                  y={height - paddingBottom + 12}
                  transform={"rotate(-45 " + xCenter + " " + (height - paddingBottom + 12) + ")"}
                  textAnchor="end"
                  fontSize={12}
                  className="fill-slate-900 dark:fill-slate-900 font-black pointer-events-none"
                >
                  {d.year}
                </text>
              </g>
            );
          })}
        </svg>

        {hoveredIdx !== null && (
          <div
            className="absolute bg-gray-900/95 dark:bg-zinc-950/95 text-white text-sm px-3 py-2 rounded-lg shadow-md border border-gray-800 dark:border-zinc-800 pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-150 z-20"
            style={{
              left: ((paddingLeft + hoveredIdx * barSpacing + barSpacing / 2) / width) * 100 + "%",
              top: ((height - paddingBottom - (data[hoveredIdx].totalCount / roundedMax) * chartHeight) / height) * 100 - 2 + "%",
            }}
          >
            <div className="font-bold text-center text-sm">{data[hoveredIdx].year}</div>
            {data[hoveredIdx].isFiltered ? (
              <>
                <div className="text-xs text-emerald-400 font-bold text-center mt-0.5">
                  {t("papers.selected_theme_count", "Tema selecionado: {{count}} artigos", { count: data[hoveredIdx].selectedCount })}
                </div>
                <div className="text-[11px] text-gray-300 text-center font-medium">
                  {t("papers.total_in_year", "Total no ano: {{count}}", { count: data[hoveredIdx].totalCount })}
                </div>
              </>
            ) : (
              <div className="text-xs text-emerald-400 font-bold text-center">
                {t("papers.articles_count", "{{count}} artigos", { count: data[hoveredIdx].totalCount })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function CumulativeChart({ data }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const { t } = useTranslation();
  
  const width = 500;
  const height = 300;
  const paddingLeft = 40;
  const paddingRight = 15;
  const paddingTop = 20;
  const paddingBottom = 45;
  
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  
  const maxVal = Math.max(...data.map(d => d.totalCumulative), 1);
  const roundedMax = Math.ceil(maxVal / 50) * 50;
  
  const spacing = chartWidth / Math.max(data.length - 1, 1);
  const isFiltered = data.some(d => d.isFiltered);
  
  const totalPoints = data.map((d, idx) => {
    const x = paddingLeft + idx * spacing;
    const y = height - paddingBottom - (d.totalCumulative / roundedMax) * chartHeight;
    return { x, y };
  });

  const selectedPoints = data.map((d, idx) => {
    const x = paddingLeft + idx * spacing;
    const y = height - paddingBottom - (d.selectedCumulative / roundedMax) * chartHeight;
    return { x, y };
  });
  
  const totalLinePath = totalPoints.length > 0 
    ? "M " + totalPoints.map(p => p.x + " " + p.y).join(" L ")
    : "";
    
  const totalAreaPath = totalPoints.length > 0
    ? totalLinePath + " L " + totalPoints[totalPoints.length - 1].x + " " + (height - paddingBottom) + " L " + totalPoints[0].x + " " + (height - paddingBottom) + " Z"
    : "";

  const selectedLinePath = selectedPoints.length > 0 
    ? "M " + selectedPoints.map(p => p.x + " " + p.y).join(" L ")
    : "";
    
  const selectedAreaPath = selectedPoints.length > 0
    ? selectedLinePath + " L " + selectedPoints[selectedPoints.length - 1].x + " " + (height - paddingBottom) + " L " + selectedPoints[0].x + " " + (height - paddingBottom) + " Z"
    : "";

  return (
    <div className="bg-white dark:bg-slate-50 border border-emerald-200 dark:border-slate-300 rounded-2xl p-4 shadow-md relative">
      <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-900 mb-1 flex items-center justify-between">
        <span>{t("papers.chart_cum_title", "Produção Acumulada")}</span>
        {isFiltered && (
          <span className="text-[11px] text-teal-800 dark:text-teal-900 font-bold bg-teal-100 px-2 py-0.5 rounded-full border border-teal-300">
            {t("papers.lines_legend", "2 Linhas (Total / Tema)")}
          </span>
        )}
      </h3>
      <p className="text-[11px] text-slate-600 mb-3 font-bold">
        {isFiltered
          ? t("papers.chart_cum_sub_filtered", "Linha cinza: Total | Linha verde: Tema selecionado")
          : t("papers.chart_cum_sub", "Evolução acumulada total de artigos")}
      </p>

      <div className="relative">
        <svg viewBox={"0 0 " + width + " " + height} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="totalAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#64748b" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#64748b" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="selectedAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {[0, 1, 2, 3, 4, 5].map((tick, idx) => {
            const val = (roundedMax / 5) * tick;
            const y = height - paddingBottom - (val / roundedMax) * chartHeight;
            return (
              <g key={idx} className="opacity-50 dark:opacity-20">
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  className="text-slate-400 dark:text-zinc-600"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize={13}
                  className="fill-slate-900 dark:fill-slate-900 font-black"
                >
                  {Math.round(val)}
                </text>
              </g>
            );
          })}

          <line
            x1={paddingLeft}
            y1={height - paddingBottom}
            x2={width - paddingRight}
            y2={height - paddingBottom}
            stroke="currentColor"
            strokeWidth={1.5}
            className="text-slate-700 dark:text-slate-700"
          />

          {/* Background / Total Line & Area */}
          {totalAreaPath && (
            <path
              d={totalAreaPath}
              fill={isFiltered ? "url(#totalAreaGrad)" : "url(#selectedAreaGrad)"}
            />
          )}

          {totalLinePath && (
            <path
              d={totalLinePath}
              fill="none"
              stroke={isFiltered ? "#94a3b8" : "#10b981"}
              strokeWidth={isFiltered ? 2 : 2.5}
              strokeDasharray={isFiltered ? "4 3" : "none"}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Foreground / Selected Theme Line & Area (when filtering) */}
          {isFiltered && selectedAreaPath && (
            <path
              d={selectedAreaPath}
              fill="url(#selectedAreaGrad)"
            />
          )}

          {isFiltered && selectedLinePath && (
            <path
              d={selectedLinePath}
              fill="none"
              stroke="#10b981"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Interactive hover rects */}
          {totalPoints.map((p, idx) => (
            <rect
              key={idx}
              x={p.x - spacing / 2}
              y={paddingTop}
              width={spacing}
              height={chartHeight}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            />
          ))}

          {/* Year X Labels */}
          {data.map((d, idx) => {
            const x = paddingLeft + idx * spacing;
            return (
              <text
                key={idx}
                x={x}
                y={height - paddingBottom + 12}
                transform={"rotate(-45 " + x + " " + (height - paddingBottom + 12) + ")"}
                textAnchor="end"
                fontSize={12}
                className="fill-slate-900 dark:fill-slate-900 font-black pointer-events-none"
              >
                {d.year}
              </text>
            );
          })}

          {/* Hover highlight markers */}
          {hoveredIdx !== null && totalPoints[hoveredIdx] && (
            <g className="pointer-events-none">
              <line
                x1={totalPoints[hoveredIdx].x}
                y1={paddingTop}
                x2={totalPoints[hoveredIdx].x}
                y2={height - paddingBottom}
                stroke="#10b981"
                strokeWidth={1}
                strokeDasharray="2 2"
              />
              <circle
                cx={totalPoints[hoveredIdx].x}
                cy={totalPoints[hoveredIdx].y}
                r={5}
                fill={isFiltered ? "#94a3b8" : "#10b981"}
                className="stroke-white dark:stroke-zinc-950"
                strokeWidth={2}
              />
              {isFiltered && selectedPoints[hoveredIdx] && (
                <circle
                  cx={selectedPoints[hoveredIdx].x}
                  cy={selectedPoints[hoveredIdx].y}
                  r={6}
                  fill="#10b981"
                  className="stroke-white dark:stroke-zinc-950"
                  strokeWidth={2}
                />
              )}
            </g>
          )}
        </svg>

        {hoveredIdx !== null && totalPoints[hoveredIdx] && (
          <div
            className="absolute bg-gray-900/95 dark:bg-zinc-950/95 text-white text-sm px-3 py-2 rounded-lg shadow-md border border-gray-800 dark:border-zinc-800 pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-150 z-20"
            style={{
              left: (totalPoints[hoveredIdx].x / width) * 100 + "%",
              top: ((isFiltered ? selectedPoints[hoveredIdx].y : totalPoints[hoveredIdx].y) / height) * 100 - 2 + "%",
            }}
          >
            <div className="font-bold text-center text-sm">{data[hoveredIdx].year}</div>
            {data[hoveredIdx].isFiltered ? (
              <>
                <div className="text-xs text-emerald-400 font-bold text-center mt-0.5">
                  {t("papers.cum_theme", "Acumulado Tema: {{count}} (+{{yearCount}} no ano)", { count: data[hoveredIdx].selectedCumulative, yearCount: data[hoveredIdx].selectedCount })}
                </div>
                <div className="text-[11px] text-slate-300 text-center font-medium">
                  {t("papers.cum_total", "Acumulado Total: {{count}}", { count: data[hoveredIdx].totalCumulative })}
                </div>
              </>
            ) : (
              <>
                <div className="text-xs text-emerald-400 font-bold text-center">
                  {t("papers.cum_total", "Acumulado: {{count}}", { count: data[hoveredIdx].totalCumulative })}
                </div>
                <div className="text-[11px] text-gray-400 text-center font-medium">
                  {t("papers.in_year", "(+{{count}} no ano)", { count: data[hoveredIdx].totalCount })}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Papers() {
  const { t } = useTranslation();

  const allPapers = {
    "2026": [
        {
            "id": 1,
            "authors": "RIBEIRO, L. M. L.; SCOLARO, T. P.; Ghisi, Enedir",
            "title": "Assessing the energy performance of buildings based on LEED Certification: How suitable is the ASHRAE model for Brazilian climates?",
            "details": "ENERGY AND BUILDINGS, v. 351, p. 116766, 2026. Citações:2",
            "year": "2026",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2025.116766",
            "tags": [
                "Eletricidade",
                "Conforto-Termico",
                "Simulacao-Computacional"
            ]
        },
        {
            "id": 2,
            "authors": "BARBOSA, K. H.; SCOLARO, T. P.; GHISI, E.",
            "title": "A comparative analysis of thermal discomfort assessment approaches in residential buildings under different solar orientations and use patterns",
            "details": "Sustainability, v. 18, p. 892, 2026",
            "year": "2026",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/su18020892",
            "tags": [
                "Conforto-Termico",
                "Residencial-Unifamiliar",
                "Comportamento-Usuario"
            ]
        },
        {
            "id": 3,
            "authors": "MULLER, BEATRIZ BAYESTORFF; SCOLARO, T. P.; RUPP, R.F.; GHISI, E.",
            "title": "Thermal Discomfort Patterns in Office Buildings in a Humid Subtropical Climate Under Actual-Use Conditions",
            "details": "Buildings, v. 16, p. 934, 2026",
            "year": "2026",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/buildings16050934",
            "tags": [
                "Conforto-Termico",
                "Comercial-Escritorio",
                "Comportamento-Usuario",
                "Estudo-Campo"
            ]
        },
        {
            "id": 4,
            "authors": "BRANDÃO, ABDERRAMAN R. A.; CASTRO, MARIA A. R. A.; SÁNCHEZ, MATEO H.; GOMES, MARCUS N.; UCHÔA, JOSÉ GESCILAM S. M.; VAZ, IGOR C. M.; Ghisi, Enedir; ANACHE, JAMIL A. A.; WENDLAND, EDSON C.; OLIVEIRA, PAULO T. S.; MENDIONDO, EDUARDO M.; BALLARIN, ANDRÉ S.",
            "title": "Flood Event Escalation and Urban Drainage Design Implications Under Nonstationary Rainfall in São Paulo State, Brazil",
            "details": "Water, v. 18, p. 561, 2026",
            "year": "2026",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w18050561",
            "tags": [
                "Agua-Pluvial",
                "Escala-Urbana",
                "Mudancas-Climaticas"
            ]
        },
        {
            "id": 5,
            "authors": "ANTUNES, LUCAS NIEHUNS; SCOLARO, TAYLANA PICCININI; Ghisi, Enedir",
            "title": "Impacts of the operational phase on the life cycle cost of permeable pavements",
            "details": "SCIENCE OF THE TOTAL ENVIRONMENT, v. 1030, p. 181801, 2026",
            "year": "2026",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.scitotenv.2026.181801",
            "tags": [
                "Pavimento-Permeavel",
                "CCV"
            ]
        },
        {
            "id": 6,
            "authors": "ONEDA, T. M. S.; GHISI, E.",
            "title": "How Rainwater Harvesting Bridges the Water-Energy Nexus in Buildings: A Systematic Review",
            "details": "Water, v. 18, p. 1495, 2026",
            "year": "2026",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w18121495",
            "tags": [
                "Agua-Pluvial",
                "Eletricidade",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 7,
            "authors": "PINHO, MARIANA MINATI DE; GHISI, E.; RUPP, R.F.",
            "title": "The Influence of Thermal Disposition on the Thermal Comfort of Users of Mixed-Mode Buildings in a Subtropical Climate",
            "details": "Buildings, v. 16, p. 2515, 2026",
            "year": "2026",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/buildings16132515",
            "tags": [
                "Conforto-Termico",
                "Comportamento-Usuario",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 8,
            "authors": "VAZ, I. C. M.; TESTON, A.; RODRIGUES, EUGÉNIO MIGUEL DE SOUSA; GHISI, E.; BALLARIN, A. S.; BRANDÃO, ABDERRAMAN R. A.",
            "title": "Projected Climate Change Impacts on Rainwater Harvesting in Brazilian Single-Family Houses",
            "details": "Water, v. 18, p. 792, 2026",
            "year": "2026",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w18070792",
            "tags": [
                "Agua-Pluvial",
                "Mudancas-Climaticas",
                "Residencial-Unifamiliar"
            ]
        }
    ],
    "2025": [
        {
            "id": 9,
            "authors": "SOUZA, T. D.; ONEDA, T. M. S.; GHISI, E.",
            "title": "Usos finais da água em canteiros de obras: estudo de caso em Criciúma, SC",
            "details": "AMBIENTE CONSTRUÍDO (ONLINE), v. 25, p. e138746, 2025",
            "year": "2025",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212025000100812",
            "tags": [
                "Usos-Finais",
                "Agua-Potavel",
                "Industrial-Servicos"
            ]
        },
        {
            "id": 10,
            "authors": "TESTON, ANDREA; GHISI, E.; VAZ, I. C. M.; CARVALHO, J. W. L. T.; MAYER, D.; TEIXEIRA, C. A.",
            "title": "Water Balance Modeling as a Tool for Assessing the Inventory Flows of Urban Water Systems and Water Consumption in Buildings",
            "details": "JOURNAL OF WATER RESOURCES PLANNING AND MANAGEMENT, v. 151, p. 05024015, 2025. Citações:2",
            "year": "2025",
            "citations": "",
            "doi": "http://dx.doi.org/10.1061/JWRMD5.WRENG-6426",
            "tags": [
                "Agua-Potavel",
                "Escala-Urbana",
                "Simulacao-Computacional"
            ]
        },
        {
            "id": 11,
            "authors": "THIVES, L.P.; SCOLARO, T. P.; GHISI, E.",
            "title": "The influence of inequalities in electricity access on people's health in Brazil",
            "details": "PARC : PESQUISA EM ARQUITETURA E CONSTRUÇÃO, v. 16, p. e025009, 2025",
            "year": "2025",
            "citations": "",
            "doi": "http://dx.doi.org/10.20396/parc.v16i00.8675477",
            "tags": [
                "Eletricidade",
                "Demografia-Usuario",
                "Escala-Urbana"
            ]
        },
        {
            "id": 12,
            "authors": "RIBEIRO, L. M. L.; SCOLARO, T. P.; GHISI, E.",
            "title": "LEED Certification in Building Energy Efficiency: A Review of Its Performance Efficacy and Global Applicability",
            "details": "Sustainability, v. 17, p. 1876, 2025. Citações:12",
            "year": "2025",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/su17051876",
            "tags": [
                "Eletricidade",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 13,
            "authors": "VAZ, IGOR CATÃO MARTINS; Ghisi, Enedir; THIVES, LISEANE PADILHA; VIEIRA, Abel Silva; Rupp, Ricardo Forgiarini; SCHAEFER, ALINE; FLORES, RAFAEL ALMEIDA; BASTOS, MATHEUS BRUHNS; MARINOSKI, DEIVIS LUIS; SILVA, ARTHUR SANTOS; WEEBER, MAX; INVIDIATA, ANDREA",
            "title": "Dashboard for interpreting future climate files used in the simulation of buildings - An outdoor thermal comfort approach",
            "details": "ENERGY AND BUILDINGS, v. 326, p. 115059, 2025. Citações:1",
            "year": "2025",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2024.115059",
            "tags": [
                "Mudancas-Climaticas",
                "Simulacao-Computacional",
                "Conforto-Termico"
            ]
        },
        {
            "id": 14,
            "authors": "SCOLARO, T. P.; GHISI, E.",
            "title": "Life cycle integrated multi-criteria decision model for roof assessment",
            "details": "ENERGY AND BUILDINGS, v. 336, p. 115628, 2025. Citações:1",
            "year": "2025",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2025.115628",
            "tags": [
                "ACV",
                "Envoltoria"
            ]
        },
        {
            "id": 15,
            "authors": "ONEDA, T. M. S.; GHISI, E.",
            "title": "Analysing the water-energy nexus considering rainwater harvesting in buildings",
            "details": "Water, v. 17, p. 1037, 2025. Citações:2|3",
            "year": "2025",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w17071037",
            "tags": [
                "Agua-Pluvial",
                "Eletricidade"
            ]
        },
        {
            "id": 16,
            "authors": "FLORES, RAFAEL; Ghisi, Enedir",
            "title": "Development of a Fuzzy Indicator of Water Efficiency in Buildings",
            "details": "WATER RESOURCES MANAGEMENT, v. 39, p. 1827-1853, 2025. Citações:1",
            "year": "2025",
            "citations": "",
            "doi": "http://dx.doi.org/10.1007/s11269-024-04048-8",
            "tags": [
                "Agua-Potavel",
                "Benchmarking"
            ]
        },
        {
            "id": 17,
            "authors": "VAZ, I. C. M.; GHISI, E.; SCOLARO, T. P.; SCHAEFER, A.",
            "title": "Understanding the environmental impacts of residential water consumption in Brazil: Integrating the building stock with life cycle assessment",
            "details": "BUILDING AND ENVIRONMENT, v. 279, p. 113085, 2025. Citações:4",
            "year": "2025",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.buildenv.2025.113085",
            "tags": [
                "Agua-Potavel",
                "ACV",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 18,
            "authors": "VAZ, I. C. M.; SANTOS, V.; GIGLIO, T. G. F.; GHISI, E.",
            "title": "Water heating in Brazilian residential buildings: a comparison between electric showers and solar heating",
            "details": "AMBIENTE CONSTRUÍDO (ONLINE), v. 25, p. e145506, 2025",
            "year": "2025",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212025000100905",
            "tags": [
                "Aquecimento-Agua",
                "Eletricidade",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 19,
            "authors": "VAZ, IGOR CATÃO MARTINS; SCOLARO, TAYLANA PICCININI; Ghisi, Enedir",
            "title": "Understanding the environmental impact of residential electricity consumption in Brazil: integrating top-down and bottom-up approaches with Life Cycle Assessment",
            "details": "SCIENCE OF THE TOTAL ENVIRONMENT, v. 986, p. 179774, 2025",
            "year": "2025",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.scitotenv.2025.179774",
            "tags": [
                "Eletricidade",
                "ACV",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 20,
            "authors": "MAYKOT, J. K.; VAZ, I. C. M.; GHISI, E.",
            "title": "Characterisation of First Flush for Rainwater Harvesting Purposes in Buildings",
            "details": "Water, v. 17, p. 1772, 2025. Citações:2",
            "year": "2025",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w17121772",
            "tags": [
                "Agua-Pluvial"
            ]
        },
        {
            "id": 21,
            "authors": "SCOLARO, T. P.; GHISI, E.",
            "title": "Assessing the energy and economic performance of green and cool roofs: a life cycle approach",
            "details": "Sustainability, v. 17, p. 5782, 2025. Citações:1",
            "year": "2025",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/su17135782",
            "tags": [
                "Telhado-Verde",
                "Telhado-Frio",
                "CCV",
                "ACV",
                "Eletricidade"
            ]
        },
        {
            "id": 22,
            "authors": "THIVES, LISEANE P.; Ghisi, Enedir; JÚNIOR, JUAREZ J. THIVES",
            "title": "Current panorama of road cargo transport in Brazil",
            "details": "International Journal of Logistics Systems and Management, v. 51, p. 274-296, 2025",
            "year": "2025",
            "citations": "",
            "doi": "http://dx.doi.org/10.1504/ijlsm.2025.146710",
            "tags": [
                "Industrial-Servicos",
                "Escala-Urbana"
            ]
        },
        {
            "id": 23,
            "authors": "FIGUEROBA, C. M.; VAZ, I. C. M.; THIVES, L.P.; GHISI, E.",
            "title": "Technical and Economic Feasibility of Strategies to Reduce Potable Water Consumption in a Library",
            "details": "Water, v. 17, p. 2137, 2025",
            "year": "2025",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w17142137",
            "tags": [
                "Agua-Potavel",
                "CCV",
                "Industrial-Servicos"
            ]
        },
        {
            "id": 24,
            "authors": "MULLER, BEATRIZ BAYESTORFF; SCOLARO, TAYLANA PICCININI; Rupp, Ricardo Forgiarini; Ghisi, Enedir",
            "title": "Local thermal discomfort and self-assessed productivity of occupants in office buildings in a humid subtropical climate",
            "details": "ENERGY AND BUILDINGS, v. 347, p. 116416, 2025",
            "year": "2025",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2025.116416",
            "tags": [
                "Conforto-Termico",
                "Produtividade",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 25,
            "authors": "SILVA, H. I.; TESTON, ANDREA; VAZ, I. C. M.; GHISI, E.",
            "title": "Potable water savings potential through rainwater harvesting in a Brazilian fitness centre: a case study",
            "details": "Water, v. 17, p. 2748, 2025. Citações:1",
            "year": "2025",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w17182748",
            "tags": [
                "Agua-Pluvial",
                "Agua-Potavel",
                "Industrial-Servicos"
            ]
        },
        {
            "id": 26,
            "authors": "DELOWSKI, L. C.; VAZ, I. C. M.; GHISI, E.; THIVES, L.P.",
            "title": "The use of rainwater harvesting in a multifamily building",
            "details": "European Journal Of Sustainable Development, v. 14, p. 77-90, 2025",
            "year": "2025",
            "citations": "",
            "doi": "http://dx.doi.org/10.14207/ejsd.2025.v14n3p77",
            "tags": [
                "Agua-Pluvial",
                "Residencial-Multifamiliar"
            ]
        },
        {
            "id": 27,
            "authors": "SCOLARO, TAYLANA PICCININI; MARTINS VAZ, IGOR CATÃO; Ghisi, Enedir",
            "title": "Assessing thermal comfort in naturally ventilated residential buildings under current and projected regional climates in Brazil",
            "details": "ENERGY AND BUILDINGS, v. 349, p. 116566, 2025",
            "year": "2025",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2025.116566",
            "tags": [
                "Conforto-Termico",
                "Mudancas-Climaticas",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 28,
            "authors": "FRANCO, E.; GHISI, E.; VAZ, I. C. M.; THIVES, L.P.",
            "title": "Permeable Pavements: An Integrative Review of Technical and Environmental Contributions to Sustainable Cities",
            "details": "Water, v. 17, p. 3323, 2025. Citações:3",
            "year": "2025",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w17223323",
            "tags": [
                "Pavimento-Permeavel",
                "Revisao-Literatura"
            ]
        }
    ],
    "2024": [
        {
            "id": 29,
            "authors": "GHISI, E.; BAVARESCO, M. V.; SILVESTRE, A. G. C.",
            "title": "Avaliação do comportamento de usuários em escritórios compartilhados em Florianópolis: estudo de caso sobre janelas, luminárias e aparelhos de ar-condicionado",
            "details": "AMBIENTE CONSTRUÍDO (ONLINE), v. 24, p. e132319, 2024",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212024000100707",
            "tags": [
                "Comportamento-Usuario",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 30,
            "authors": "SCHAEFER, A.; ECCEL, J. V.; GHISI, E.",
            "title": "Finding patterns of occupant behaviour in actual data for thermal performance simulation: a case study in low-income houses",
            "details": "AMBIENTE CONSTRUÍDO (ONLINE), v. 24, p. e133438, 2024",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212024000100731",
            "tags": [
                "Comportamento-Usuario",
                "Habitacao-Interesse-Social"
            ]
        },
        {
            "id": 31,
            "authors": "CUSTODIO, D. A.; GHISI, E.",
            "title": "Potential for potable water savings using rainwater: a case study in a university building in Southern Brazil",
            "details": "Urban Water Journal, v. 21, p. 1-8, 2024. Citações:6|6",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.1080/1573062X.2023.2281307",
            "tags": [
                "Agua-Pluvial",
                "Agua-Potavel",
                "Escola-Universidade"
            ]
        },
        {
            "id": 32,
            "authors": "TESTON, A.; GHISI, E.; VAZ, I. C. M.; SCOLARO, T. P.; SEVERIS, R. M.",
            "title": "Modular life cycle assessment approach: Environmental impact of rainwater harvesting systems in urban water systems",
            "details": "SCIENCE OF THE TOTAL ENVIRONMENT, v. 908, p. 168281, 2024. Citações:12|13",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.scitotenv.2023.168281",
            "tags": [
                "ACV",
                "Agua-Pluvial"
            ]
        },
        {
            "id": 33,
            "authors": "SCOLARO, T. P.; REALI, J. P. G.; GHISI, E.; RUPP, R.F.",
            "title": "Influência do modo de operação e parâmetros antropométricos na produtividade autoavaliada em edifícios de escritórios",
            "details": "AMBIENTE CONSTRUÍDO (ONLINE), v. 24, p. e134303, 2024",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212024000100765",
            "tags": [
                "Produtividade",
                "Demografia-Usuario",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 34,
            "authors": "BAVARESCO, M.; GNECCO, V.; PIGLIAUTILE, I.; PISELLI, C.; BRACHT, M.; CUREAU, R.; DE SOUZA, L.; GERALDI, M.; VASQUEZ, N.G.; FABIANI, C.; GHISI, E.; LAMBERTS, R.; MELO, A.P.; PISELLO, A.L.",
            "title": "Multi-domain simulation for the holistic assessment of the indoor environment: A systematic review",
            "details": "JOURNAL OF BUILDING ENGINEERING, v. 84, p. 108612, 2024. Citações:17|19",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jobe.2024.108612",
            "tags": [
                "Simulacao-Computacional",
                "Revisao-Literatura",
                "Conforto-Termico"
            ]
        },
        {
            "id": 35,
            "authors": "DIAS, T. F.; GHISI, E.",
            "title": "Urban water consumption: a systematic literature review",
            "details": "Water, v. 16, p. 838, 2024. Citações:17|7",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w16060838",
            "tags": [
                "Agua-Potavel",
                "Escala-Urbana",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 36,
            "authors": "PIEROZAN, EDUARDO; PICCININI SCOLARO, TAYLANA; WATZKO, ELISE SOMMER; Ghisi, Enedir",
            "title": "Technical and Economic Feasibility of Multi-Family Social Housing and Nearly Zero-Energy Buildings in Southern Brazil",
            "details": "Sustainability, v. 16, p. 2608, 2024. Citações:3|4",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/su16072608",
            "tags": [
                "CCV",
                "Habitacao-Interesse-Social",
                "Residencial-Multifamiliar",
                "Eletricidade"
            ]
        },
        {
            "id": 37,
            "authors": "MELLER, B. J.; MARINOSKI, Deivis L; GÜTHS, Saulo; GHISI, E.",
            "title": "Comparison of methods to determine the solar heat gain coefficient of glazing",
            "details": "AMBIENTE CONSTRUÍDO (ONLINE), v. 24, p. e138257, 2024",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212024000100772",
            "tags": [
                "Envoltoria",
                "Eletricidade"
            ]
        },
        {
            "id": 38,
            "authors": "BORGERT, A. E.; GHISI, E.",
            "title": "The Impact of the Water Tariff on the Economic Feasibility of Rainwater Harvesting for Use in Residential Buildings",
            "details": "Water, v. 16, p. 1058, 2024. Citações:3",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w16071058",
            "tags": [
                "CCV",
                "Agua-Pluvial"
            ]
        },
        {
            "id": 39,
            "authors": "SCHAEFER, A.; SCOLARO, T. P.; GHISI, E.",
            "title": "Cluster analysis applied to obtaining reference models for building thermal performance studies",
            "details": "JOURNAL OF BUILDING ENGINEERING, v. 89, p. 109273, 2024. Citações:8|2",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jobe.2024.109273",
            "tags": [
                "Benchmarking",
                "Conforto-Termico"
            ]
        },
        {
            "id": 40,
            "authors": "CUSTODIO, D. A.; GHISI, E.; RUPP, R.F.",
            "title": "Thermal comfort in university classrooms in humid subtropical climate: Field study during all seasons",
            "details": "BUILDING AND ENVIRONMENT, v. 258, p. 111644, 2024. Citações:13|3",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.buildenv.2024.111644",
            "tags": [
                "Conforto-Termico",
                "Escola-Universidade",
                "Estudo-Campo"
            ]
        },
        {
            "id": 41,
            "authors": "MARTINS VAZ, IGOR CATÃO; ANTUNES, LUCAS NIEHUNS; Ghisi, Enedir; THIVES, LISEANE PADILHA",
            "title": "Life Cycle Assessment of Pervious Pavements: Integrative Review and Novel Ideas of Analysis",
            "details": "Water, v. 16, p. 1403, 2024. Citações:7|2",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w16101403",
            "tags": [
                "ACV",
                "Pavimento-Permeavel",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 42,
            "authors": "BILESIMO, T. L.; GHISI, E.",
            "title": "Utilisation of Machine Learning in Control Systems Based on the Preference of Office Users",
            "details": "Sustainability, v. 16, p. 4258, 2024. Citações:1",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/su16104258",
            "tags": [
                "Benchmarking",
                "Comportamento-Usuario",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 43,
            "authors": "GHISI, E.; FREITAS, D. A.",
            "title": "Economic feasibility of rainwater harvesting and greywater reuse in a multifamily building",
            "details": "Water, v. 16, p. 1580, 2024. Citações:3|1",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w16111580",
            "tags": [
                "CCV",
                "Agua-Pluvial",
                "Agua-Cinza",
                "Residencial-Multifamiliar"
            ]
        },
        {
            "id": 44,
            "authors": "PICCININI SCOLARO, TAYLANA; Ghisi, Enedir; SILVA, CRISTINA MATOS",
            "title": "Assessing the impact of evapotranspiration from green roofs on reducing surface temperatures",
            "details": "JOURNAL OF BUILDING ENGINEERING, v. 95, p. 110095, 2024. Citações:22|4",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jobe.2024.110095",
            "tags": [
                "Telhado-Verde",
                "Conforto-Termico"
            ]
        },
        {
            "id": 45,
            "authors": "VAZ, IGOR CATÃO MARTINS; VIANA, MARINA RIBEIRO; Ghisi, Enedir",
            "title": "Comparison of future weather files for Brazilian cities",
            "details": "E3S Web of Conferences, v. 546, p. 01017, 2024",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.1051/e3sconf/202454601017",
            "tags": [
                "Mudancas-Climaticas",
                "Simulacao-Computacional"
            ]
        },
        {
            "id": 46,
            "authors": "CUSTÓDIO, DIEGO ANTÔNIO; Ghisi, Enedir; FORGIARINI RUPP, RICARDO; LODETE BILÉSIMO, THAYANE",
            "title": "The influence of socioeconomic context on the thermal comfort of university students in a humid subtropical climate",
            "details": "ENERGY AND BUILDINGS, v. 319, p. 114556, 2024. Citações:1",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2024.114556",
            "tags": [
                "Demografia-Usuario",
                "Conforto-Termico",
                "Escola-Universidade"
            ]
        },
        {
            "id": 47,
            "authors": "OLIVEIRA, C. C.; VAZ, I. C. M.; GHISI, E.",
            "title": "Retrofit strategies to improve energy efficiency in buildings: An integrative review",
            "details": "ENERGY AND BUILDINGS, v. 321, p. 114624, 2024. Citações:52|30",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2024.114624",
            "tags": [
                "Eletricidade",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 48,
            "authors": "ONEDA, T. M. S.; GHISI, E.",
            "title": "Análise do sistema de aproveitamento de água pluvial a partir da medição dos usos finais de água",
            "details": "P@ranoá (UNB), v. 17, p. e53378, 2024",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.18830/1679-09442024v17e53378",
            "tags": [
                "Agua-Pluvial",
                "Usos-Finais"
            ]
        },
        {
            "id": 49,
            "authors": "FIATES, J. R.; GHISI, E.",
            "title": "Life Cycle Assessment of construction components of schools in southern Brazil",
            "details": "EUROPEAN JOURNAL OF SUSTAINABLE DEVELOPMENT, v. 13, p. 57-70, 2024",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.14207/ejsd.2024.v13n4p57",
            "tags": [
                "ACV",
                "Envoltoria",
                "Escola-Universidade"
            ]
        },
        {
            "id": 50,
            "authors": "SCOLARO, T. P.; GHISI, E.; SILVA, C. M.",
            "title": "Effectiveness of Cool and Green Roofs Inside and Outside Buildings in the Brazilian Context",
            "details": "Sustainability, v. 16, p. 8104, 2024. Citações:3",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/su16188104",
            "tags": [
                "Telhado-Frio",
                "Telhado-Verde"
            ]
        },
        {
            "id": 51,
            "authors": "BARBOSA, K. H.; SCOLARO, T. P.; GHISI, E.",
            "title": "Enhancing building sustainability: integrating user behaviour and solar orientation on the thermal performance of houses",
            "details": "Sustainability, v. 16, p. 8349, 2024. Citações:3",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/su16198349",
            "tags": [
                "Comportamento-Usuario",
                "Conforto-Termico",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 52,
            "authors": "VAZ, I. C. M.; GHISI, E.",
            "title": "Rainwater harvesting through roofs and stormwater harvesting through pervious pavements: A Life Cycle Assessment and decision-making comparison",
            "details": "JOURNAL OF CLEANER PRODUCTION, v. 476, p. 143782, 2024. Citações:8",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jclepro.2024.143782",
            "tags": [
                "Agua-Pluvial",
                "Pavimento-Permeavel",
                "ACV"
            ]
        },
        {
            "id": 53,
            "authors": "VAZ, I. C. M.; GHISI, E.; THIVES, L.P.",
            "title": "An Inventory Comparison of Harvesting Rainwater from Roofs and Stormwater from Pervious Pavements",
            "details": "Water Resources Management, v. -, p. ---, 2024",
            "year": "2024",
            "citations": "",
            "doi": "http://dx.doi.org/10.1007/s11269-024-04004-6",
            "tags": [
                "Agua-Pluvial",
                "Pavimento-Permeavel",
                "ACV"
            ]
        }
    ],
    "2023": [
        {
            "id": 54,
            "authors": "RIBEIRO, L. M. L.; GHISI, E.",
            "title": "Potencial de economia de água potável utilizando água da chuva: estudo de caso no Brasil",
            "details": "AMBIENTE CONSTRUÍDO (ONLINE), v. 23, p. 47-64, 2023",
            "year": "2023",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212023000200662",
            "tags": [
                "Agua-Pluvial",
                "Agua-Potavel"
            ]
        },
        {
            "id": 55,
            "authors": "CUSTODIO, D. A.; GHISI, E.",
            "title": "Impact of residential rainwater harvesting on stormwater runoff",
            "details": "JOURNAL OF ENVIRONMENTAL MANAGEMENT, v. 326, p. 116814, 2023. Citações:24|28",
            "year": "2023",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jenvman.2022.116814",
            "tags": [
                "Agua-Pluvial",
                "Escala-Urbana"
            ]
        },
        {
            "id": 56,
            "authors": "KLEIN, C. W.; MAYKOT, J. K.; GHISI, E.; THIVES, L.P.",
            "title": "Financial Feasibility of Harvesting Rainwater from Permeable Pavements: a Case Study in a City Square",
            "details": "Sci, v. 5, p. 1, 2023. Citações:2|2",
            "year": "2023",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/sci5010001",
            "tags": [
                "CCV",
                "Pavimento-Permeavel",
                "Agua-Pluvial"
            ]
        },
        {
            "id": 57,
            "authors": "ISTCHUK, R. N.; GHISI, E.",
            "title": "Influence of Design Variables on the Financial Feasibility of Rainwater Harvesting Systems",
            "details": "Water, v. 15, p. 1112, 2023. Citações:10|8",
            "year": "2023",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w15061112",
            "tags": [
                "CCV",
                "Agua-Pluvial"
            ]
        },
        {
            "id": 58,
            "authors": "PIEROZAN, E.; SCOLARO, T. P.; WATZKO, E. S.; GHISI, E.",
            "title": "Influência do padrão de uso e ocupação de habitações multifamiliares no consumo energético da edificação",
            "details": "AMBIENTE CONSTRUÍDO (ONLINE), v. 23, p. 43-61, 2023",
            "year": "2023",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212023000400690",
            "tags": [
                "Comportamento-Usuario",
                "Eletricidade",
                "Residencial-Multifamiliar"
            ]
        },
        {
            "id": 59,
            "authors": "VAZ, I. C. M.; GHISI, E.; SOUZA, J. C.",
            "title": "Potential use of rainwater as a tool for fire stations and firefighting: Literature review, environmental and cost assessments",
            "details": "SCIENCE OF THE TOTAL ENVIRONMENT, v. 898, p. 165510, 2023. Citações:5|5",
            "year": "2023",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.scitotenv.2023.165510",
            "tags": [
                "Agua-Pluvial",
                "ACV",
                "CCV",
                "Industrial-Servicos"
            ]
        },
        {
            "id": 60,
            "authors": "SANTOS, M. B.; SANTINI, N.; THIVES, L.P.; THIVES JUNIOR, J. J.; GHISI, E.",
            "title": "Identificação de emissões atmosféricas geradas em usinas de asfalto e proposição de protocolo de controle",
            "details": "Revista Ação Sustentável Global, v. 3, p. 83-111, 2023",
            "year": "2023",
            "citations": "",
            "doi": "https://sustentavelglobal.com/cvbeesi/includes/pt-br/conferencia.php?id=32&dia=26-05-2023",
            "tags": [
                "Escala-Urbana",
                "ACV"
            ]
        },
        {
            "id": 61,
            "authors": "SOUZA, L. P.; BAVARESCO, M. V.; GERALDI, M. S.; VAZ, C. E. V.; GHISI, E.",
            "title": "Climatic conditions as a guideline to mass customisation in Brazilian housing",
            "details": "PARC : PESQUISA EM ARQUITETURA E CONSTRUÇÃO, v. 14, p. e023022, 2023",
            "year": "2023",
            "citations": "",
            "doi": "http://dx.doi.org/10.20396/parc.v14i00.8672170",
            "tags": [
                "Mudancas-Climaticas",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 62,
            "authors": "VAZ, I. C. M.; ISTCHUK, R. N.; ONEDA, T. M. S.; GHISI, E.",
            "title": "Sustainable Rainwater Management and Life Cycle Assessment: Challenges and Perspectives",
            "details": "Sustainability, v. 15, p. 12133, 2023. Citações:10|9",
            "year": "2023",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/su151612133",
            "tags": [
                "Agua-Pluvial",
                "ACV"
            ]
        },
        {
            "id": 63,
            "authors": "REALI, J. P. G.; SCOLARO, T. P.; GHISI, E.; RUPP, R.F.",
            "title": "Relationship between self-assessed productivity, gender and age in mixed-mode and fully air-conditioned offices in Florianópolis, Brazil",
            "details": "Sustainability, v. 15, p. 12377, 2023. Citações:1",
            "year": "2023",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/su151612377",
            "tags": [
                "Produtividade",
                "Demografia-Usuario",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 64,
            "authors": "SCHAEFER, ALINE; SCOLARO, TAYLANA PICCININI; Ghisi, Enedir",
            "title": "Finding Patterns of Construction Systems in Low-Income Housing for Thermal and Energy Performance Evaluation through Cluster Analysis",
            "details": "Sustainability, v. 15, p. 12793, 2023. Citações:4|2",
            "year": "2023",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/su151712793",
            "tags": [
                "Benchmarking",
                "Habitacao-Interesse-Social"
            ]
        },
        {
            "id": 65,
            "authors": "SANGOI, J. M.; SCOLARO, T. P.; GHISI, E.",
            "title": "Water heating systems performance in multi-family residential buildings in Brazil",
            "details": "Water, v. 15, p. 3145, 2023. Citações:1",
            "year": "2023",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w15173145",
            "tags": [
                "Aquecimento-Agua",
                "Residencial-Multifamiliar"
            ]
        },
        {
            "id": 66,
            "authors": "THIVES, L.P.; GHISI, E.; LONGO, G.; HAMMES, G.; BELOTTO, T.",
            "title": "Performance of permeable pavement to filter stormwater runoff for non-potable uses in buildings",
            "details": "European Journal Of Sustainable Development, v. 12, p. 80-90, 2023. Citações:4",
            "year": "2023",
            "citations": "",
            "doi": "http://dx.doi.org/10.14207/ejsd.2023.v12n3p80",
            "tags": [
                "Pavimento-Permeavel",
                "Agua-Pluvial"
            ]
        }
    ],
    "2022": [
        {
            "id": 67,
            "authors": "IORIS, M. D.; GHISI, E.",
            "title": "Financial feasibility of implementing an automated system to save the cold potable water that would be wasted at the beginning of a hot shower",
            "details": "Urban Water Journal, v. 19, p. 22-31, 2022. Citações:3|4",
            "year": "2022",
            "citations": "",
            "doi": "http://dx.doi.org/10.1080/1573062X.2021.1949479",
            "tags": [
                "CCV",
                "Agua-Potavel",
                "Aquecimento-Agua"
            ]
        },
        {
            "id": 68,
            "authors": "GERALDI, M. S.; GHISI, E.",
            "title": "Data-driven framework towards realistic bottom-up energy benchmarking using an Artificial Neural Network",
            "details": "APPLIED ENERGY, v. 306, p. 117960, 2022. Citações:32|31",
            "year": "2022",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.apenergy.2021.117960",
            "tags": [
                "Benchmarking",
                "Eletricidade"
            ]
        },
        {
            "id": 69,
            "authors": "ANTUNES, L. N.; GHISI, E.; SOUZA, J. C.",
            "title": "Stormwater harvested from a permeable pavement for use in the fire extinguishing system and non-potable uses of a building: a case study",
            "details": "Urban Water Journal, v. 19, p. 433-440, 2022. Citações:4|4",
            "year": "2022",
            "citations": "",
            "doi": "http://dx.doi.org/10.1080/1573062X.2021.2016869",
            "tags": [
                "Pavimento-Permeavel",
                "Agua-Pluvial",
                "Industrial-Servicos"
            ]
        },
        {
            "id": 70,
            "authors": "THIVES, L.P.; GHISI, E.; THIVES JUNIOR, J. J.",
            "title": "Assessment of disposal and recycling of waste tyres in Brazil",
            "details": "CIÊNCIA E NATURA, v. 44, p. e11, 2022",
            "year": "2022",
            "citations": "",
            "doi": "http://dx.doi.org/10.5902/2179460X68822",
            "tags": [
                "ACV",
                "Escala-Urbana"
            ]
        },
        {
            "id": 71,
            "authors": "GERALDI, MATHEUS SOARES; Ghisi, Enedir",
            "title": "Integrating evidence-based thermal satisfaction in energy benchmarking: A data-driven approach for a whole-building evaluation",
            "details": "ENERGY, v. 244, p. 123161, 2022. Citações:15|18",
            "year": "2022",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.energy.2022.123161",
            "tags": [
                "Conforto-Termico",
                "Benchmarking",
                "Eletricidade"
            ]
        },
        {
            "id": 72,
            "authors": "FLORES, R. A.; GHISI, E.",
            "title": "Water benchmarking in buildings: a systematic review on methods and benchmarks for water conservation",
            "details": "Water, v. 14, p. 473, 2022. Citações:12|9",
            "year": "2022",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w14030473",
            "tags": [
                "Benchmarking",
                "Agua-Potavel",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 73,
            "authors": "THIVES, LISEANE PADILHA; GHISI, E.; THIVES JUNIOR, J. J.",
            "title": "Regional inequalities in electricity access versus quality of life in Brazil",
            "details": "AMBIENTE CONSTRUÍDO (ONLINE), v. 22, p. 47-65, 2022",
            "year": "2022",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212022000300609",
            "tags": [
                "Eletricidade",
                "Demografia-Usuario",
                "Escala-Urbana"
            ]
        },
        {
            "id": 74,
            "authors": "GERALDI, MATHEUS; BAVARESCO, M. V.; GNECCO, V. M.; AZEVEDO, L. D.; GHISI, E.; FOSSATI, Michele",
            "title": "Análise estatística da intensidade do uso de energia de edificações escolares no Brasil: proposição de benchmarking simplificado",
            "details": "Revista Sítio Novo, v. 6, p. 21-34, 2022",
            "year": "2022",
            "citations": "",
            "doi": "http://dx.doi.org/10.47236/2594-7036.2022.v7.i0.21-34p",
            "tags": [
                "Benchmarking",
                "Eletricidade",
                "Escola-Universidade"
            ]
        },
        {
            "id": 75,
            "authors": "SCOLARO, T. P.; GHISI, E.",
            "title": "Life cycle assessment of green roofs: A literature review of layers materials and purposes",
            "details": "SCIENCE OF THE TOTAL ENVIRONMENT, v. 829, p. 154650, 2022. Citações:49|50",
            "year": "2022",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.scitotenv.2022.154650",
            "tags": [
                "ACV",
                "Telhado-Verde",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 76,
            "authors": "FLORES, R. A.; GHISI, E.",
            "title": "Benchmarking water efficiency in public school buildings",
            "details": "Sustainability, v. 14, p. 3794, 2022. Citações:5|6",
            "year": "2022",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/su14073794",
            "tags": [
                "Benchmarking",
                "Agua-Potavel",
                "Escola-Universidade"
            ]
        },
        {
            "id": 77,
            "authors": "BAVARESCO, M. V.; KOUSIS, I.; PIGLIAUTILE, I.; PISELLO, A. L.; PISELLI, C.; GHISI, E.",
            "title": "Are years-long field studies about window operation efficient? a data-driven approach based on information theory and deep learning",
            "details": "ENERGY AND BUILDINGS, v. 268, p. 112197, 2022. Citações:4|5",
            "year": "2022",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2022.112197",
            "tags": [
                "Comportamento-Usuario",
                "Benchmarking"
            ]
        },
        {
            "id": 78,
            "authors": "THIVES, L.P.; GHISI, E.; THIVES JUNIOR, J. J.; VIEIRA, Abel Silva",
            "title": "Is asbestos still a problem in the world?",
            "details": "A current review. JOURNAL OF ENVIRONMENTAL MANAGEMENT, v. 319, p. 115716, 2022. Citações:82|81",
            "year": "2022",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jenvman.2022.115716",
            "tags": [
                "Envoltoria",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 79,
            "authors": "MAYKOT, J. K.; OLIVEIRA, C. C.; GHISI, E.; RUPP, R.F.",
            "title": "Influence of gender on thermal, air-movement, humidity and air-quality perception in mixed-mode and fully air-conditioned offices",
            "details": "Sustainability, v. 14, p. 9722, 2022. Citações:2|3",
            "year": "2022",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/su14159722",
            "tags": [
                "Demografia-Usuario",
                "Conforto-Termico",
                "Qualidade-Ar"
            ]
        },
        {
            "id": 80,
            "authors": "TESTON, A.; SCOLARO, T. P.; MAYKOT, J. K.; GHISI, E.",
            "title": "Comprehensive environmental assessment of rainwater harvesting systems: A literature review",
            "details": "Water, v. 14, p. 2716, 2022. Citações:42|40",
            "year": "2022",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w14172716",
            "tags": [
                "ACV",
                "Agua-Pluvial",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 81,
            "authors": "ISTCHUK, R. N.; GHISI, E.",
            "title": "Influence of rainfall time series indicators on the performance of residential rainwater harvesting systems",
            "details": "JOURNAL OF ENVIRONMENTAL MANAGEMENT, v. 323, p. 116163--, 2022. Citações:11|11",
            "year": "2022",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jenvman.2022.116163",
            "tags": [
                "Agua-Pluvial",
                "Mudancas-Climaticas"
            ]
        },
        {
            "id": 82,
            "authors": "THIVES, LISEANE P.; Ghisi, Enedir; THIVES JÚNIOR, JUAREZ J.",
            "title": "An outlook on the management of construction and demolition waste in Brazil",
            "details": "Cleaner Materials, v. 6, p. 100153, 2022. Citações:15|12",
            "year": "2022",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.clema.2022.100153",
            "tags": [
                "ACV",
                "Escala-Urbana"
            ]
        },
        {
            "id": 83,
            "authors": "ISTCHUK, R. N.; GHISI, E.",
            "title": "Financial feasibility analysis of residential rainwater harvesting in Maringá, Brazil",
            "details": "Sustainability, v. 14, p. 12859, 2022. Citações:4|4",
            "year": "2022",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/su141912859",
            "tags": [
                "CCV",
                "Agua-Pluvial"
            ]
        }
    ],
    "2021": [
        {
            "id": 84,
            "authors": "BAVARESCO, M. V.; CUCHIVAGUE, H. Y. O.; SCHINAZI, A.; GHISI, E.",
            "title": "Aspectos impactantes no desempenho energético de habitações de interesse social brasileiras: revisão de literatura",
            "details": "AMBIENTE CONSTRUÍDO (ONLINE), v. 21, p. 263-292, 2021",
            "year": "2021",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212021000100505",
            "tags": [
                "Eletricidade",
                "Habitacao-Interesse-Social",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 85,
            "authors": "BAVARESCO, M. V.; GHISI, E.",
            "title": "Monitoramento e modelagem da operação de elementos internos de sombreamento em escritórios: uma revisão de literatura",
            "details": "AMBIENTE CONSTRUÍDO (ONLINE), v. 21, p. 315-334, 2021",
            "year": "2021",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212021000100507",
            "tags": [
                "Sombreamento",
                "Comportamento-Usuario",
                "Revisao-Literatura",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 86,
            "authors": "GRANDO, F. O.; GHISI, E.",
            "title": "Assessment of public lighting systems considering mesopic vision",
            "details": "JOURNAL OF CLEANER PRODUCTION, v. 279, p. 123369--, 2021. Citações:6|7",
            "year": "2021",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jclepro.2020.123369",
            "tags": [
                "Iluminacao",
                "Escala-Urbana"
            ]
        },
        {
            "id": 87,
            "authors": "SILVA, A. S.; GHISI, E.",
            "title": "Evaluation of capabilities of different global sensitivity analysis techniques for building energy simulation: experiment on design variables",
            "details": "AMBIENTE CONSTRUÍDO (ONLINE), v. 21, p. 89-111, 2021",
            "year": "2021",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212021000200516",
            "tags": [
                "Simulacao-Computacional",
                "Eletricidade"
            ]
        },
        {
            "id": 88,
            "authors": "Rupp, Ricardo Forgiarini; ANDERSEN, RUNE KORSHOLM; TOFTUM, JØRN; Ghisi, Enedir",
            "title": "Occupant behaviour in mixed-mode office buildings in a subtropical climate: Beyond typical models of adaptive actions",
            "details": "BUILDING AND ENVIRONMENT, v. 190, p. 107541, 2021. Citações:34|39",
            "year": "2021",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.buildenv.2020.107541",
            "tags": [
                "Comportamento-Usuario",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 89,
            "authors": "BAVARESCO, M. V.; GHISI, E.; D'OCA, SIMONA; PISELLO, A. L.",
            "title": "Triggering occupant behaviour for energy sustainability: Exploring subjective and comfort-related drivers in Brazilian offices",
            "details": "Energy Research & Social Science, v. 74, p. 101959, 2021. Citações:46|30",
            "year": "2021",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.erss.2021.101959",
            "tags": [
                "Comportamento-Usuario",
                "Conforto-Termico",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 90,
            "authors": "THIVES, L.P.; GHISI, E.; THIVES JUNIOR, J. J.",
            "title": "Racial inequality related to transportation means in Brazil",
            "details": "INTERNATIONAL JOURNAL OF ENGINEERING RESEARCH AND APPLICATIONS (IJERA), v. 11, p. 24-37, 2021",
            "year": "2021",
            "citations": "",
            "doi": "http://dx.doi.org/10.9790/9622-1101052437",
            "tags": [
                "Demografia-Usuario",
                "Escala-Urbana"
            ]
        },
        {
            "id": 91,
            "authors": "BERTUZZI, G.; GHISI, E.",
            "title": "Potential for Potable Water Savings due to Rainwater Use in a Precast Concrete Factory",
            "details": "Water, v. 13, p. 448, 2021. Citações:6|6",
            "year": "2021",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w13040448",
            "tags": [
                "Agua-Pluvial",
                "Agua-Potavel",
                "Industrial-Servicos"
            ]
        },
        {
            "id": 92,
            "authors": "ROSA, G. C.; GHISI, E.",
            "title": "Water Quality and Financial Analysis of a System Combining Rainwater and Greywater in a House",
            "details": "Water, v. 13, p. 930, 2021. Citações:11|11",
            "year": "2021",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w13070930",
            "tags": [
                "Agua-Pluvial",
                "Agua-Cinza",
                "CCV"
            ]
        },
        {
            "id": 93,
            "authors": "OLIVEIRA, C. C.; Rupp, Ricardo Forgiarini; GHISI, E.",
            "title": "Influence of environmental variables on thermal comfort and air quality perception in office buildings in the humid subtropical climate zone of Brazil",
            "details": "ENERGY AND BUILDINGS, v. 243, p. 110982, 2021. Citações:25|28",
            "year": "2021",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2021.110982",
            "tags": [
                "Conforto-Termico",
                "Qualidade-Ar",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 94,
            "authors": "VAZ, I. C. M.; GHISI, E.; THIVES, L.P.",
            "title": "Stormwater Harvested from Permeable Pavements as a Means to Save Potable Water in Buildings",
            "details": "Water, v. 13, p. 1896, 2021. Citações:10|14",
            "year": "2021",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w13141896",
            "tags": [
                "Pavimento-Permeavel",
                "Agua-Pluvial",
                "Agua-Potavel"
            ]
        },
        {
            "id": 95,
            "authors": "GERALDI, M. S.; GNECCO, V. M.; BARZAN NETO, A.; MARTINS, B. A. M.; GHISI, E.; FOSSATI, Michele; MELO, Ana Paula; LAMBERTS, Roberto",
            "title": "Evaluating the impact of the shape of school reference buildings on bottom-up energy benchmarking",
            "details": "JOURNAL OF BUILDING ENGINEERING, v. 43, p. 103142, 2021. Citações:27|28",
            "year": "2021",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jobe.2021.103142",
            "tags": [
                "Benchmarking",
                "Eletricidade",
                "Escola-Universidade"
            ]
        },
        {
            "id": 96,
            "authors": "VAZ, I. C. M.; ANTUNES, L. N.; GHISI, E.; THIVES, L.P.",
            "title": "Permeable Pavements as a Means to Save Water in Buildings: State of the Art in Brazil",
            "details": "Sci, v. 3, p. 36, 2021. Citações:6",
            "year": "2021",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/sci3040036",
            "tags": [
                "Pavimento-Permeavel",
                "Agua-Potavel"
            ]
        },
        {
            "id": 97,
            "authors": "OLIVEIRA, C. C.; RUPP, R.F.; GHISI, E.",
            "title": "Assessment of air quality perception and its effects on users? thermal comfort in office buildings",
            "details": "Sci, v. 3, p. 47, 2021. Citações:8",
            "year": "2021",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/sci3040047",
            "tags": [
                "Qualidade-Ar",
                "Conforto-Termico",
                "Comercial-Escritorio"
            ]
        }
    ],
    "2020": [
        {
            "id": 98,
            "authors": "SILVA, A. S.; GHISI, E.",
            "title": "Estimating the sensitivity of design variables in the thermal and energy performance of buildings through a systematic procedure",
            "details": "JOURNAL OF CLEANER PRODUCTION, v. 244, p. 118753, 2020. Citações:33|32",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jclepro.2019.118753",
            "tags": [
                "Simulacao-Computacional",
                "Conforto-Termico",
                "Eletricidade"
            ]
        },
        {
            "id": 99,
            "authors": "BAVARESCO, M. V.; GHISI, E.",
            "title": "A low-cost framework to establish internal blind control patterns and enable simulation-based user-centric design",
            "details": "Journal of Building Engineering, v. 28, p. 101077--, 2020. Citações:11|9",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jobe.2019.101077",
            "tags": [
                "Sombreamento",
                "Comportamento-Usuario",
                "Simulacao-Computacional"
            ]
        },
        {
            "id": 100,
            "authors": "VAZ, I. C. M.; GHISI, E.; THIVES, L.P.",
            "title": "Life cycle energy assessment and economic feasibility of stormwater harvested from pervious pavements",
            "details": "WATER RESEARCH, v. 170, p. 115322, 2020. Citações:23|24",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.watres.2019.115322",
            "tags": [
                "ACV",
                "CCV",
                "Agua-Pluvial",
                "Pavimento-Permeavel"
            ]
        },
        {
            "id": 101,
            "authors": "BAVARESCO, M. V.; D'OCA, SIMONA; GHISI, E.; LAMBERTS, Roberto",
            "title": "Methods used in social sciences that suit energy research: A literature review on qualitative methods to assess the human dimension of energy use in buildings",
            "details": "ENERGY AND BUILDINGS, v. 209, p. 109702, 2020. Citações:60|61",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2019.109702",
            "tags": [
                "Comportamento-Usuario",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 102,
            "authors": "GERALDI, MATHEUS SOARES; Ghisi, Enedir",
            "title": "Building-level and Stock-level in contrast: a literature review of the energy performance of buildings during the operational stage",
            "details": "ENERGY AND BUILDINGS, v. 211, p. 109810--, 2020. Citações:92|96",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2020.109810",
            "tags": [
                "Eletricidade",
                "Escala-Urbana",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 103,
            "authors": "MAYKOT, J. K.; GHISI, E.",
            "title": "Assessment of a rainwater harvesting system in a multi-storey residential building in Brazil",
            "details": "Water, v. 12, p. 546, 2020. Citações:23|24",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w12020546",
            "tags": [
                "Agua-Pluvial",
                "Residencial-Multifamiliar"
            ]
        },
        {
            "id": 104,
            "authors": "SOUZA, T. D.; GHISI, E.",
            "title": "Harvesting rainwater from scaffolding platforms and walls to reduce potable water consumption at buildings construction sites",
            "details": "JOURNAL OF CLEANER PRODUCTION, v. 258, p. 120909, 2020. Citações:11|14",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jclepro.2020.120909",
            "tags": [
                "Agua-Pluvial",
                "Industrial-Servicos"
            ]
        },
        {
            "id": 105,
            "authors": "CUREAU, R. J.; GHISI, E.",
            "title": "Electricity savings by reducing water consumption in a whole city: a case study in Joinville, Southern Brazil",
            "details": "JOURNAL OF CLEANER PRODUCTION, v. 261, p. 121194, 2020. Citações:16|16",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jclepro.2020.121194",
            "tags": [
                "Agua-Potavel",
                "Eletricidade",
                "Escala-Urbana"
            ]
        },
        {
            "id": 106,
            "authors": "HAMMES, G.; GHISI, E.; THIVES, L.P.",
            "title": "Water end-uses and rainwater harvesting: a case study in Brazil",
            "details": "Urban Water Journal, v. 17, p. 177-183, 2020. Citações:18|20",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.1080/1573062X.2020.1748663",
            "tags": [
                "Usos-Finais",
                "Agua-Pluvial"
            ]
        },
        {
            "id": 107,
            "authors": "SANTOS, C.; IMTEAZ, M. A.; GHISI, E.; MATOS, C.",
            "title": "The effect of climate change on domestic Rainwater Harvesting",
            "details": "SCIENCE OF THE TOTAL ENVIRONMENT, v. 729, p. 138967, 2020. Citações:27|30",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.scitotenv.2020.138967",
            "tags": [
                "Mudancas-Climaticas",
                "Agua-Pluvial"
            ]
        },
        {
            "id": 108,
            "authors": "ANTUNES, LUCAS NIEHUNS; Ghisi, Enedir",
            "title": "Water and energy consumption in schools: case studies in Brazil",
            "details": "ENVIRONMENT, DEVELOPMENT AND SUSTAINABILITY, v. 22, p. 4225-4249, 2020. Citações:21|20",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.1007/s10668-019-00380-x",
            "tags": [
                "Agua-Potavel",
                "Eletricidade",
                "Escola-Universidade"
            ]
        },
        {
            "id": 109,
            "authors": "ROSA, G. C.; GHISI, E.",
            "title": "A modelling evaluation of a system combining rainwater and greywater for potable water savings",
            "details": "Urban Water Journal, v. 17, p. 283-291, 2020. Citações:10|8",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.1080/1573062X.2020.176406",
            "tags": [
                "Agua-Pluvial",
                "Agua-Cinza",
                "Simulacao-Computacional"
            ]
        },
        {
            "id": 110,
            "authors": "GERALDI, M. S.; GHISI, E.",
            "title": "Mapping the energy usage in Brazilian public schools",
            "details": "ENERGY AND BUILDINGS, v. 224, p. 110209, 2020. Citações:24|26",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2020.110209",
            "tags": [
                "Eletricidade",
                "Escola-Universidade",
                "Benchmarking"
            ]
        },
        {
            "id": 111,
            "authors": "BARRETO, L. S. S.; GHISI, E.; GODOI, C.; OLIVEIRA, F. J. S.",
            "title": "Reuse of ornamental rock solid waste for stabilization and solidification of galvanic solid waste: Optimization for sustainable waste management strategy",
            "details": "JOURNAL OF CLEANER PRODUCTION, v. 275, p. 122996, 2020. Citações:15|17",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jclepro.2020.122996",
            "tags": [
                "ACV",
                "Envoltoria"
            ]
        },
        {
            "id": 112,
            "authors": "BAVARESCO, M. V.; D'OCA, SIMONA; GHISI, E.; PISELLO, A. L.",
            "title": "Assessing underlying effects on the choices of adaptive behaviours in offices through an interdisciplinary framework",
            "details": "BUILDING AND ENVIRONMENT, v. 181, p. 107086--, 2020. Citações:16|21",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.buildenv.2020.107086",
            "tags": [
                "Comportamento-Usuario",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 113,
            "authors": "GHISI, E.; BELOTTO, T.; THIVES, LISEANE PADILHA",
            "title": "The use of Permeable Interlocking Concrete Pavement to filter stormwater for non-potable uses in buildings",
            "details": "Water, v. 12, p. 2045, 2020. Citações:15|16",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w12072045",
            "tags": [
                "Pavimento-Permeavel",
                "Agua-Pluvial"
            ]
        },
        {
            "id": 114,
            "authors": "ANTUNES, L. N.; GHISI, E.; SEVERIS, R. M.",
            "title": "Environmental assessment of a permeable pavement system used to harvest stormwater for non-potable water uses in a building",
            "details": "SCIENCE OF THE TOTAL ENVIRONMENT, v. 746, p. 141087--, 2020. Citações:30|39",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.scitotenv.2020.141087",
            "tags": [
                "ACV",
                "Pavimento-Permeavel",
                "Agua-Pluvial"
            ]
        },
        {
            "id": 115,
            "authors": "OLIVEIRA, CANDI CITADINI DE; Rupp, Ricardo Forgiarini; Ghisi, Enedir",
            "title": "Influência da umidade do ar no conforto térmico de usuários de edificações de escritórios em Florianópolis/SC",
            "details": "AMBIENTE CONSTRUÍDO (SÃO PAULO. IMPRESSO), v. 20, p. 7-21, 2020",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212020000400457",
            "tags": [
                "Conforto-Termico",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 116,
            "authors": "AZEVEDO, LETICIA DALPAZ DE; GERALDI, MATHEUS SOARES; Ghisi, Enedir",
            "title": "Avaliação do Ciclo de Vida de diferentes envoltórias para habitações de interesse social em Florianópolis",
            "details": "AMBIENTE CONSTRUÍDO (SÃO PAULO. IMPRESSO), v. 20, p. 123-141, 2020",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212020000400463",
            "tags": [
                "ACV",
                "Envoltoria",
                "Habitacao-Interesse-Social"
            ]
        },
        {
            "id": 117,
            "authors": "ANTUNES, L. N.; SYDNEY, C.; GHISI, E.; PHOENIX, V.; THIVES, L.P.; WHITE, C.; GARCIA, E. S. H.",
            "title": "Reduction of environmental impacts due to using permeable pavements to harvest stormwaterwa",
            "details": "Water, v. 12, p. 2840, 2020. Citações:16|19",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w12102840",
            "tags": [
                "ACV",
                "Pavimento-Permeavel",
                "Agua-Pluvial"
            ]
        },
        {
            "id": 118,
            "authors": "IORIS, M. D.; GHISI, E.",
            "title": "Saving cold drinking water in residential hot water distribution systems",
            "details": "REVISTA ELETRÔNICA EM GESTÃO, EDUCAÇÃO E TECNOLOGIA AMBIENTAL, v. 24, p. e4, 2020. Citações:1",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.5902/2236117062659",
            "tags": [
                "Agua-Potavel",
                "Aquecimento-Agua"
            ]
        },
        {
            "id": 119,
            "authors": "FREITAS, DOUGLAS ANCELMO; Ghisi, Enedir",
            "title": "Economic feasibility analysis of rainwater harvesting: a case study in Imbituba, Brazil",
            "details": "Urban Water Journal, v. 17, p. 1-7, 2020. Citações:10|9",
            "year": "2020",
            "citations": "",
            "doi": "http://dx.doi.org/10.1080/1573062x.2020.1846062",
            "tags": [
                "CCV",
                "Agua-Pluvial"
            ]
        }
    ],
    "2019": [
        {
            "id": 120,
            "authors": "RUPP, R.F.; GHISI, E.",
            "title": "Avaliação de modelos preditivos de conforto térmico em escritórios no clima subtropical brasileiro",
            "details": "AMBIENTE CONSTRUÍDO (ONLINE), v. 19, p. 91-107, 2019",
            "year": "2019",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212019000200310",
            "tags": [
                "Conforto-Termico",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 121,
            "authors": "AZEVEDO, L. D.; BORGERT, A. E.; VENDRAMI, J. M.; GHISI, E.",
            "title": "Tipos e eficiência de unidades de tratamento para água pluvial: revisão de literatura",
            "details": "AMBIENTE CONSTRUÍDO (ONLINE), v. 19, p. 207-231, 2019",
            "year": "2019",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212019000300334",
            "tags": [
                "Agua-Pluvial",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 122,
            "authors": "GERALDI, M. S.; GHISI, E.",
            "title": "Short-term instead of long-term rainfall time series in rainwater harvesting simulation in houses: An assessment using Bayesian Network",
            "details": "RESOURCES CONSERVATION AND RECYCLING, v. 144, p. 1-12, 2019. Citações:36|39",
            "year": "2019",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.resconrec.2019.01.017",
            "tags": [
                "Agua-Pluvial",
                "Simulacao-Computacional",
                "Benchmarking"
            ]
        },
        {
            "id": 123,
            "authors": "MARINOSKI, Ana Kelly; GHISI, E.",
            "title": "Environmental performance of hybrid rainwater-greywater systems in residential buildings",
            "details": "RESOURCES CONSERVATION AND RECYCLING, v. 144, p. 100-114, 2019. Citações:34|33",
            "year": "2019",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.resconrec.2019.01.035",
            "tags": [
                "ACV",
                "Agua-Pluvial",
                "Agua-Cinza"
            ]
        },
        {
            "id": 124,
            "authors": "GHISI, E.; MANOROV, T. C. S.; ANTUNES, L. N.; THIVES, L.P.",
            "title": "Electricity Savings Due to the Replacement of Fluorescent Lamps with LEDs in Classrooms",
            "details": "EUROPEAN JOURNAL OF SUSTAINABLE DEVELOPMENT, v. 8, p. 64-74, 2019. Citações:1",
            "year": "2019",
            "citations": "",
            "doi": "http://dx.doi.org/10.14207/ejsd.2019.v8n4p64",
            "tags": [
                "Iluminacao",
                "Eletricidade",
                "Escola-Universidade"
            ]
        },
        {
            "id": 125,
            "authors": "TEIXEIRA, CELIMAR AZAMBUJA; Ghisi, Enedir",
            "title": "Comparative Analysis of Granular and Membrane Filters for Rainwater Treatment",
            "details": "Water, v. 11, p. 1004, 2019. Citações:18|16",
            "year": "2019",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w11051004",
            "tags": [
                "Agua-Pluvial"
            ]
        },
        {
            "id": 126,
            "authors": "SANGOI, J. M.; GHISI, E.",
            "title": "Energy Efficiency of Water Heating Systems in Single-Family Dwellings in Brazil",
            "details": "Water, v. 11, p. 1068, 2019. Citações:13|14",
            "year": "2019",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w11051068",
            "tags": [
                "Aquecimento-Agua",
                "Eletricidade",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 127,
            "authors": "Rupp, Ricardo Forgiarini; KIM, JUNGSOO; Ghisi, Enedir; DE DEAR, RICHARD",
            "title": "Thermal sensitivity of occupants in different building typologies: the Griffiths Constant is a Variable",
            "details": "ENERGY AND BUILDINGS, v. 200, p. 11-20, 2019. Citações:72|80",
            "year": "2019",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2019.07.048",
            "tags": [
                "Conforto-Termico",
                "Comportamento-Usuario"
            ]
        },
        {
            "id": 128,
            "authors": "BAVARESCO, MATEUS VINÍCIUS; D'OCA, SIMONA; Ghisi, Enedir; LAMBERTS, Roberto",
            "title": "Technological innovations to assess and include the human dimension in the building-performance loop: A review",
            "details": "ENERGY AND BUILDINGS, v. 202, p. 109365--, 2019. Citações:41|46",
            "year": "2019",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2019.109365",
            "tags": [
                "Comportamento-Usuario",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 129,
            "authors": "CUSTODIO, D. A.; GHISI, E.",
            "title": "Assessing the Potential for Potable Water Savings in the Residential Sector of a City: A Case Study of Joinville City",
            "details": "Water, v. 11, p. 2074--, 2019. Citações:12|16",
            "year": "2019",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w11102074",
            "tags": [
                "Agua-Potavel",
                "Escala-Urbana"
            ]
        },
        {
            "id": 130,
            "authors": "CUREAU, R. J.; GHISI, E.",
            "title": "Reduction of potable water consumption and sewage generation in a city scale: a case study in Brazil",
            "details": "Water, v. 11, p. 2351, 2019. Citações:18|21",
            "year": "2019",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w11112351",
            "tags": [
                "Agua-Potavel",
                "Escala-Urbana"
            ]
        },
        {
            "id": 131,
            "authors": "GARCIA, EMMANUELLE S.H.; THIVES, LISEANE PADILHA; Ghisi, Enedir; ANTUNES, LUCAS NIEHUNS",
            "title": "Analysis of permeability reduction in drainage asphalt mixtures due to decrease in void volume",
            "details": "JOURNAL OF CLEANER PRODUCTION, v. 248, p. 119292--, 2019. Citações:37",
            "year": "2019",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jclepro.2019.119292",
            "tags": [
                "Pavimento-Permeavel"
            ]
        }
    ],
    "2018": [
        {
            "id": 132,
            "authors": "MARINOSKI, Ana Kelly; GHISI, E.",
            "title": "Avaliação de viabilidade ambiental e econômica de sistemas de aproveitamento de água pluvial em habitação de baixo padrão: estudo de caso em Florianópolis, SC",
            "details": "AMBIENTE CONSTRUÍDO (ONLINE), v. 18, p. 423-443, 2018",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212018000100230",
            "tags": [
                "ACV",
                "CCV",
                "Agua-Pluvial",
                "Habitacao-Interesse-Social"
            ]
        },
        {
            "id": 133,
            "authors": "MARINOSKI, Ana Kelly; RUPP, R.F.; GHISI, E.",
            "title": "Environmental benefit analysis of strategies for potable water savings in residential buildings",
            "details": "JOURNAL OF ENVIRONMENTAL MANAGEMENT, v. 206, p. 28-39, 2018. Citações:60|64",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jenvman.2017.10.004",
            "tags": [
                "ACV",
                "Agua-Potavel",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 134,
            "authors": "GHISI, E.; THIVES, L.P.; PAES, R. F. W.",
            "title": "Investment feasibility analysis of rainwater harvesting in a building in Brazil",
            "details": "Water Science and Technology-Water Supply, v. 18, p. 1497-1504, 2018. Citações:6|9",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.2166/ws.2017.218",
            "tags": [
                "CCV",
                "Agua-Pluvial"
            ]
        },
        {
            "id": 135,
            "authors": "MAYKOT, JÉSSICA KUNTZ; Rupp, Ricardo Forgiarini; Ghisi, Enedir",
            "title": "Assessment of gender on requirements for thermal comfort in office buildings located in the Brazilian humid subtropical climate",
            "details": "ENERGY AND BUILDINGS, v. 158, p. 1170-1183, 2018. Citações:31|34",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2017.11.036",
            "tags": [
                "Demografia-Usuario",
                "Conforto-Termico",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 136,
            "authors": "Rupp, Ricardo Forgiarini; DE DEAR, RICHARD; Ghisi, Enedir",
            "title": "Field study of mixed-mode office buildings in Southern Brazil using an adaptive thermal comfort framework",
            "details": "ENERGY AND BUILDINGS, v. 158, p. 1475-1486, 2018. Citações:93|95",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2017.11.047",
            "tags": [
                "Estudo-Campo",
                "Comercial-Escritorio",
                "Conforto-Termico"
            ]
        },
        {
            "id": 137,
            "authors": "GERALDI, M. S.; GHISI, E.",
            "title": "Assessment of the length of rainfall time series for rainwater harvesting in buildings",
            "details": "RESOURCES CONSERVATION AND RECYCLING, v. 133, p. 231-241, 2018. Citações:34|32",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.resconrec.2018.02.007",
            "tags": [
                "Agua-Pluvial",
                "Simulacao-Computacional"
            ]
        },
        {
            "id": 138,
            "authors": "THIVES, L.P.; GHISI, E.; BRECHT, D. G.; PIRES, D. M.",
            "title": "Filtering Capability of Porous Asphalt Pavements",
            "details": "Water, v. 10, p. 206, 2018. Citações:21|23",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w10020206",
            "tags": [
                "Pavimento-Permeavel",
                "Agua-Pluvial"
            ]
        },
        {
            "id": 139,
            "authors": "BAVARESCO, M. V.; GHISI, E.",
            "title": "Influence of user interaction with internal blinds on the energy efficiency of office buildings",
            "details": "ENERGY AND BUILDINGS, v. 166, p. 538-549, 2018. Citações:21|23",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2018.02.011",
            "tags": [
                "Sombreamento",
                "Comportamento-Usuario",
                "Eletricidade",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 140,
            "authors": "RUPP, R.F.; KIM, J.; DE DEAR, R.; GHISI, E.",
            "title": "Associations of occupant demographics, thermal history and obesity variables with their thermal comfort in air-conditioned and mixed-mode ventilation office buildings",
            "details": "BUILDING AND ENVIRONMENT, v. 135, p. 1-9, 2018. Citações:86|92",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.buildenv.2018.02.049",
            "tags": [
                "Demografia-Usuario",
                "Conforto-Termico",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 141,
            "authors": "BALVEDI, B. F.; BAVARESCO, M. V.; ROSA, A. S.; GHISI, E.",
            "title": "Identificação de perfis de comportamento do usuário para edificações residenciais multifamiliares e naturalmente ventiladas em Florianópolis",
            "details": "AMBIENTE CONSTRUÍDO (ONLINE), v. 18, p. 149-160, 2018",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212018000300273",
            "tags": [
                "Comportamento-Usuario",
                "Residencial-Multifamiliar"
            ]
        },
        {
            "id": 142,
            "authors": "MENEGATTI, M. C.; RUPP, R.F.; GHISI, E.",
            "title": "Influência do índice de massa corpórea e frequência de atividades físicas no conforto térmico humano: análise estatística de dados de estudo de campo com usuários de escritórios em Florianópolis, SC",
            "details": "AMBIENTE CONSTRUÍDO (ONLINE), v. 18, p. 119-133, 2018",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212018000300271",
            "tags": [
                "Demografia-Usuario",
                "Conforto-Termico"
            ]
        },
        {
            "id": 143,
            "authors": "TESTON, A.; GERALDI, M. S.; COLASIO, B. M.; GHISI, E.",
            "title": "Rainwater Harvesting in Buildings in Brazil: A Literature Review",
            "details": "Water, v. 10, p. 471, 2018. Citações:46|61",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w10040471",
            "tags": [
                "Agua-Pluvial",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 144,
            "authors": "INVIDIATA, ANDREA; LAVAGNA, MONICA; Ghisi, Enedir",
            "title": "Selecting design strategies using multi-criteria decision making to improve the sustainability of buildings",
            "details": "BUILDING AND ENVIRONMENT, v. 139, p. 58-68, 2018. Citações:122|138",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.buildenv.2018.04.041",
            "tags": [
                "ACV",
                "Envoltoria"
            ]
        },
        {
            "id": 145,
            "authors": "WEEBER, MAX; Ghisi, Enedir; SAUER, ALEXANDER",
            "title": "Applying Energy Building Simulation in the Assessment of Energy Efficiency Measures in Factories",
            "details": "PROCEDIA CIRP, v. 69, p. 336-341, 2018. Citações:14",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.procir.2017.11.148",
            "tags": [
                "Simulacao-Computacional",
                "Eletricidade",
                "Industrial-Servicos"
            ]
        },
        {
            "id": 146,
            "authors": "HAMMES, G.; THIVES, L.P.; GHISI, E.",
            "title": "Application of stormwater collected from porous asphalt pavements for non-potable uses in buildings",
            "details": "JOURNAL OF ENVIRONMENTAL MANAGEMENT, v. 222, p. 338-347, 2018. Citações:36|39",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jenvman.2018.05.094",
            "tags": [
                "Pavimento-Permeavel",
                "Agua-Pluvial"
            ]
        },
        {
            "id": 147,
            "authors": "BALVEDI, B. F.; GHISI, E.; LAMBERTS, Roberto",
            "title": "A review of occupant behaviour in residential buildings",
            "details": "ENERGY AND BUILDINGS, v. 174, p. 495-505, 2018",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2018.06.049",
            "tags": [
                "Comportamento-Usuario",
                "Residencial-Unifamiliar",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 148,
            "authors": "TESTON, A.; TEIXEIRA, C. A.; GHISI, E.; CARDOSO, E. B.",
            "title": "Impact of Rainwater Harvesting on the Drainage System: Case Study of a Condominium of Houses in Curitiba, Southern Brazil",
            "details": "Water, v. 10, p. 1100, 2018",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w10081100",
            "tags": [
                "Agua-Pluvial",
                "Residencial-Multifamiliar"
            ]
        },
        {
            "id": 149,
            "authors": "MAYKOT, J. K.; RUPP, R.F.; GHISI, E.",
            "title": "A field study about gender and thermal comfort temperatures in office buildings",
            "details": "ENERGY AND BUILDINGS, v. 178, p. 254-264, 2018",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2018.08.033",
            "tags": [
                "Demografia-Usuario",
                "Conforto-Termico",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 150,
            "authors": "ANTUNES, L. N.; GHISI, E.; THIVES, L.P.",
            "title": "Permeable Pavements Life Cycle Assessment: A Literature Review",
            "details": "Water, v. 10, p. 1575--, 2018",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w10111575",
            "tags": [
                "ACV",
                "Pavimento-Permeavel",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 151,
            "authors": "KALBUSCH, A.; GHISI, E.",
            "title": "Energy consumption in the life cycle of plumbing fixtures",
            "details": "Water Science and Technology-Water Supply, v. 19, p. ws2018053, 2018",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.2166/ws.2018.053",
            "tags": [
                "ACV",
                "Eletricidade",
                "Equipamento-Hidrossanitario"
            ]
        },
        {
            "id": 152,
            "authors": "VECHI, MARCEL; Ghisi, Enedir",
            "title": "Evaluation of Water Heating Systems Through Life Cycle Assessment",
            "details": "EUROPEAN JOURNAL OF SUSTAINABLE DEVELOPMENT, v. 7, p. 131-142, 2018",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.14207/ejsd.2018.v7n3p131",
            "tags": [
                "ACV",
                "Aquecimento-Agua"
            ]
        },
        {
            "id": 153,
            "authors": "THIVES, LISEANE PADILHA; Ghisi, Enedir; DA SILVA, NATÁLIA MATTOS",
            "title": "Potable Water Savings in Multifamily Buildings Using Stormwater Runoff from Impermeable Paved Streets",
            "details": "EUROPEAN JOURNAL OF SUSTAINABLE DEVELOPMENT, v. 7, p. 120-130, 2018",
            "year": "2018",
            "citations": "",
            "doi": "http://dx.doi.org/10.14207/ejsd.2018.v7n3p120",
            "tags": [
                "Agua-Potavel",
                "Agua-Pluvial",
                "Residencial-Multifamiliar"
            ]
        }
    ],
    "2017": [
        {
            "id": 154,
            "authors": "SILVA, A. S.; ALMEIDA, L. S. S.; GHISI, E.",
            "title": "Análise de incertezas físicas em simulação computacional de edificações residenciais",
            "details": "Ambiente Construído (Online), v. 17, p. 289-303, 2017",
            "year": "2017",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212017000100136",
            "tags": [
                "Simulacao-Computacional",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 155,
            "authors": "PEREIRA, Cláudia Donald; MARINOSKI, Deivis L; LAMBERTS, Roberto; GÜTHS, Saulo; GHISI, E.",
            "title": "Avaliação experimental do espectrômetro Alta II e sua aplicação na normatização brasileira",
            "details": "AMBIENTE CONSTRUÍDO (ONLINE), v. 17, p. 197-213, 2017",
            "year": "2017",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212017000400193",
            "tags": [
                "Envoltoria",
                "Benchmarking"
            ]
        },
        {
            "id": 156,
            "authors": "RUPP, R.F.; VECCHI, R.; ASMUS, B.; CANDIDO, C.; GHISI, E.",
            "title": "Conforto térmico humano em escritórios com sistema central de condicionamento artificial em clima subtropical úmido: estudos de campo vs. abordagem analítica",
            "details": "Ambiente Construído (Online), v. 17, p. 111-123, 2017",
            "year": "2017",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212017000100127",
            "tags": [
                "Conforto-Termico",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 157,
            "authors": "TEIXEIRA, C. A.; BUDEL, M. A.; CARVALHO, K. Q.; BEZERRA, S. M. C.; GHISI, E.",
            "title": "Estudo comparativo da qualidade da água da chuva coletada em telhado com telhas de concreto e em telhado verde para usos não potáveis",
            "details": "Ambiente Construído (Online), v. 17, p. 135-155, 2017",
            "year": "2017",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212017000200150",
            "tags": [
                "Agua-Pluvial",
                "Telhado-Verde"
            ]
        },
        {
            "id": 158,
            "authors": "NARDELLI, A.; DEUSCHLE, E.; AZEVEDO, L. D.; PESSOA, J. L. N.; GHISI, E.",
            "title": "Assessment of Light Emitting Diodes technology for general lighting: A critical review",
            "details": "RENEWABLE & SUSTAINABLE ENERGY REVIEWS, v. 75, p. 368-379, 2017",
            "year": "2017",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.rser.2016.11.002",
            "tags": [
                "Iluminacao",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 159,
            "authors": "THIVES, L.P.; GHISI, E.",
            "title": "Asphalt mixtures emission and energy consumption: A review",
            "details": "Renewable & Sustainable Energy Reviews, v. 72, p. 473-484, 2017",
            "year": "2017",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.rser.2017.01.087",
            "tags": [
                "Pavimento-Permeavel",
                "ACV",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 160,
            "authors": "CAMPISANO, A.; BUTLER, D.; WARD, S.; BURNS, M. J.; FRIEDLER, E.; DEBUSK, K.; FISHER-JEFFES, L. N.; GHISI, E.; RAHMAN, A.; FURUMAI, H.; HAN, M.",
            "title": "Urban rainwater harvesting systems: Research, implementation and future perspectives",
            "details": "Water Research (Oxford), v. 115, p. 195-209, 2017",
            "year": "2017",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.watres.2017.02.056",
            "tags": [
                "Agua-Pluvial",
                "Escala-Urbana",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 161,
            "authors": "RUPP, R.F.; GHISI, E.",
            "title": "Predicting thermal comfort in office buildings in a Brazilian temperate and humid climate",
            "details": "Energy and Buildings, v. 144, p. 152-166, 2017",
            "year": "2017",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2017.03.039",
            "tags": [
                "Conforto-Termico",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 162,
            "authors": "RUPP, R.F.; GHISI, E.",
            "title": "Assessing window area and potential for electricity savings by using daylighting and hybrid ventilation in office buildings in southern Brazil",
            "details": "SIMULATION-TRANSACTIONS OF THE SOCIETY FOR MODELING AND SIMULATION INTERNATIONAL, v. 93, p. 003754971770617-15, 2017",
            "year": "2017",
            "citations": "",
            "doi": "http://dx.doi.org/10.1177/0037549717706171",
            "tags": [
                "Envoltoria",
                "Iluminacao",
                "Eletricidade",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 163,
            "authors": "GERALDI, M. S.; GHISI, E.",
            "title": "Influence of the length of rainfall time series on rainwater harvesting systems: A case study in Berlin",
            "details": "RESOURCES CONSERVATION AND RECYCLING, v. 125, p. 169-180, 2017",
            "year": "2017",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.resconrec.2017.06.011",
            "tags": [
                "Agua-Pluvial",
                "Simulacao-Computacional"
            ]
        }
    ],
    "2016": [
        {
            "id": 164,
            "authors": "VIEIRA, Abel Silva; GHISI, E.",
            "title": "Water-energy nexus in houses in Brazil: comparing rainwater and gray water use with a centralized system",
            "details": "Water Science and Technology: Water Supply (Print), v. 16, p. 274-283, 2016",
            "year": "2016",
            "citations": "",
            "doi": "http://dx.doi.org/10.2166/ws.2015.137",
            "tags": [
                "Agua-Pluvial",
                "Agua-Cinza",
                "Eletricidade",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 165,
            "authors": "LOPES, A. C.; RUPP, R.F.; GHISI, E.",
            "title": "Assessment of the potential for potable water savings by using rainwater in houses in southern Brazil",
            "details": "Water Science and Technology: Water Supply (Print), v. 16, p. 533-541, 2016",
            "year": "2016",
            "citations": "",
            "doi": "http://dx.doi.org/10.2166/ws.2015.166",
            "tags": [
                "Agua-Potavel",
                "Agua-Pluvial",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 166,
            "authors": "MUNARIM, Ulisses; Ghisi, Enedir",
            "title": "Environmental feasibility of heritage buildings rehabilitation",
            "details": "Renewable & Sustainable Energy Reviews, v. 58, p. 235-249, 2016",
            "year": "2016",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.rser.2015.12.334",
            "tags": [
                "ACV"
            ]
        },
        {
            "id": 167,
            "authors": "SILVA, ARTHUR SANTOS; Ghisi, Enedir; LAMBERTS, Roberto",
            "title": "Performance evaluation of long-term thermal comfort indices in building simulation according to ashrae standard 55",
            "details": "Building and Environment, v. 102, p. 95-115, 2016",
            "year": "2016",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.buildenv.2016.03.004",
            "tags": [
                "Conforto-Termico",
                "Simulacao-Computacional"
            ]
        },
        {
            "id": 168,
            "authors": "ANTUNES, L. N.; THIVES, L.P.; GHISI, E.",
            "title": "Potential for Potable Water Savings in Buildings by Using Stormwater Harvested from Porous Pavements",
            "details": "Water, v. 8, p. 110, 2016",
            "year": "2016",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w8040110",
            "tags": [
                "Agua-Potavel",
                "Agua-Pluvial",
                "Pavimento-Permeavel"
            ]
        },
        {
            "id": 169,
            "authors": "SILVA, A. S.; GHISI, E.",
            "title": "Uncertainty analysis of daily potable water demand on the performance evaluation of rainwater harvesting systems in residential buildings",
            "details": "Journal of Environmental Management, v. 180, p. 82-93, 2016",
            "year": "2016",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jenvman.2016.05.028",
            "tags": [
                "Agua-Pluvial",
                "Agua-Potavel",
                "Simulacao-Computacional"
            ]
        },
        {
            "id": 170,
            "authors": "VIEIRA, Abel Silva; Ghisi, Enedir",
            "title": "Water-energy nexus in low-income houses in Brazil: the influence of integrated on-site water and sewage management strategies on the energy consumption of water and sewerage services",
            "details": "Journal of Cleaner Production, v. 133, p. 145-162, 2016",
            "year": "2016",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jclepro.2016.05.104",
            "tags": [
                "Agua-Potavel",
                "Eletricidade",
                "Habitacao-Interesse-Social"
            ]
        },
        {
            "id": 171,
            "authors": "INVIDIATA, ANDREA; Ghisi, Enedir",
            "title": "Life-cycle energy and cost analyses of window shading used to improve the thermal performance of houses",
            "details": "Journal of Cleaner Production, v. 133, p. 1371-1383, 2016",
            "year": "2016",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jclepro.2016.06.072",
            "tags": [
                "ACV",
                "CCV",
                "Sombreamento",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 172,
            "authors": "SILVA, A. S.; ALMEIDA, L. S. S.; GHISI, E.",
            "title": "Decision-making process for improving thermal and energy performance of residential buildings: A case study of constructive systems in Brazil",
            "details": "Energy and Buildings, v. 128, p. 270-286, 2016",
            "year": "2016",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2016.06.084",
            "tags": [
                "Envoltoria",
                "Eletricidade",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 173,
            "authors": "SCHAEFER, ALINE; Ghisi, Enedir",
            "title": "Method for obtaining reference buildings",
            "details": "Energy and Buildings, v. 128, p. 660-672, 2016",
            "year": "2016",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2016.07.001",
            "tags": [
                "Benchmarking",
                "Simulacao-Computacional"
            ]
        },
        {
            "id": 174,
            "authors": "INVIDIATA, A.; GHISI, E.",
            "title": "Impact of climate change on heating and cooling energy demand in houses in Brazil",
            "details": "Energy and Buildings, v. 130, p. 20-32, 2016",
            "year": "2016",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2016.07.067",
            "tags": [
                "Mudancas-Climaticas",
                "Eletricidade",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 175,
            "authors": "BRE, F.; SILVA, A. S.; GHISI, E.; FACHINOTTI, V. D.",
            "title": "Residential building design optimisation using sensitivity analysis and genetic algorithm",
            "details": "Energy and Buildings, v. 133, p. 853-866, 2016",
            "year": "2016",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2016.10.025",
            "tags": [
                "Simulacao-Computacional",
                "Envoltoria",
                "Residencial-Unifamiliar"
            ]
        }
    ],
    "2015": [
        {
            "id": 176,
            "authors": "KALBUSCH, ANDREZA; Ghisi, Enedir",
            "title": "Comparative life-cycle assessment of ordinary and water-saving taps",
            "details": "JOURNAL OF CLEANER PRODUCTION, v. 112, p. 4585-4593, 2015",
            "year": "2015",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jclepro.2015.06.075",
            "tags": [
                "ACV",
                "Equipamento-Hidrossanitario"
            ]
        }
    ],
    "2014": [
        {
            "id": 177,
            "authors": "RUPP, R.F.; GHISI, E.",
            "title": "What is the most adequate method to assess thermal comfort in hybrid commercial buildings located in hot-humid summer climate?",
            "details": "Renewable & Sustainable Energy Reviews, v. 29, p. 449-462, 2014",
            "year": "2014",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.rser.2013.08.102",
            "tags": [
                "Conforto-Termico",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 178,
            "authors": "SILVA, A. S.; LUIZ, F.; MANSUR, A. C.; VIEIRA, Abel Silva; SCHAEFER, A.; GHISI, E.",
            "title": "Knowing electricity end-uses to successfully promote energy efficiency in buildings: a case study in low-income houses in Southern Brazil",
            "details": "Journal of Sustainable Energy Planning and Management, v. 2, p. 7-18, 2014",
            "year": "2014",
            "citations": "",
            "doi": "http://dx.doi.org/10.5278/ijsepm.2014.2.2",
            "tags": [
                "Usos-Finais",
                "Eletricidade",
                "Habitacao-Interesse-Social"
            ]
        },
        {
            "id": 179,
            "authors": "SILVA, A. S.; GHISI, E.",
            "title": "Uncertainty analysis of the computer model in building performance simulation",
            "details": "Energy and Buildings, v. 76, p. 258-269, 2014",
            "year": "2014",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2014.02.070",
            "tags": [
                "Simulacao-Computacional"
            ]
        },
        {
            "id": 180,
            "authors": "VIEIRA, Abel Silva; BEAL, C. D.; GHISI, E.; STEWART, R. A.",
            "title": "Energy intensity of rainwater harvesting systems: A review",
            "details": "Renewable & Sustainable Energy Reviews, v. 34, p. 225-242, 2014",
            "year": "2014",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.rser.2014.03.012",
            "tags": [
                "Agua-Pluvial",
                "Eletricidade",
                "Revisao-Literatura"
            ]
        },
        {
            "id": 181,
            "authors": "SILVA, A. S.; GHISI, E.",
            "title": "Uncertainty analysis of user behaviour and physical parameters in residential building performance simulation",
            "details": "Energy and Buildings, v. 76, p. 381-391, 2014",
            "year": "2014",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2014.03.001",
            "tags": [
                "Comportamento-Usuario",
                "Simulacao-Computacional",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 182,
            "authors": "SILVA, A. S.; GHISI, E.",
            "title": "Análise comparativa dos resultados do desempenho térmico da envoltória de uma edificação residencial pelos métodos de simulação do RTQ-R e da NBR 15575-1",
            "details": "Ambiente Construído (Online), v. 14, p. 215-230, 2014",
            "year": "2014",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/S1678-86212014000100016",
            "tags": [
                "Conforto-Termico",
                "Envoltoria",
                "Simulacao-Computacional"
            ]
        },
        {
            "id": 183,
            "authors": "GHISI, E.; RUPP, R.F.; TRISKA, Y.",
            "title": "Comparing indicators to rank strategies to save potable water in buildings",
            "details": "Resources, Conservation and Recycling, v. 87, p. 137-144, 2014",
            "year": "2014",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.resconrec.2014.04.001",
            "tags": [
                "Agua-Potavel",
                "Benchmarking"
            ]
        },
        {
            "id": 184,
            "authors": "MARINOSKI, Ana Kelly; VIEIRA, Abel Silva; SILVA, A. S.; GHISI, E.",
            "title": "Water End-Uses in Low-Income Houses in Southern Brazil",
            "details": "Water, v. 6, p. 1985-1999, 2014",
            "year": "2014",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w6071985",
            "tags": [
                "Usos-Finais",
                "Agua-Potavel",
                "Habitacao-Interesse-Social"
            ]
        },
        {
            "id": 185,
            "authors": "BERWANGER, H.; GHISI, E.",
            "title": "Investment feasibility analysis of rainwater harvesting in the city of Itapiranga, Brazil",
            "details": "International Journal of Sustainable Human Development, v. 2, p. 104-114, 2014",
            "year": "2014",
            "citations": "",
            "doi": "https://www.researchgate.net/publication/289385211_Investment_feasibility_analysis_of_rainwater_harvesting_in_the_city_of_Itapiranga_Brazil",
            "tags": [
                "CCV",
                "Agua-Pluvial"
            ]
        },
        {
            "id": 186,
            "authors": "PEREIRA, Cláudia Donald; GHISI, E.; GÜTHS, Saulo",
            "title": "Comparação do desempenho térmico de revestimentos brancos",
            "details": "P@ranoá (UNB), p. 65-72, 2014",
            "year": "2014",
            "citations": "",
            "doi": "http://dx.doi.org/10.18830/issn.1679-0944.n12.2014.12295",
            "tags": [
                "Envoltoria",
                "Telhado-Frio"
            ]
        },
        {
            "id": 187,
            "authors": "SILVA, A. S.; LUIZ, F.; MANSUR, A. C.; GHISI, E.",
            "title": "Usos Finais de Eletricidade e Rotinas de Uso como Base para Estratégias de Eficiência Energética por Meio de Auditoria Residencial",
            "details": "P@ranoá (UNB), p. 85-93, 2014",
            "year": "2014",
            "citations": "",
            "doi": "http://dx.doi.org/10.18830/issn.1679-0944.n12.2014.12297",
            "tags": [
                "Usos-Finais",
                "Eletricidade",
                "Comportamento-Usuario"
            ]
        },
        {
            "id": 188,
            "authors": "SILVA, A. S.; SORGATO, M. J.; MAZZAFERRO, L.; MELO, Ana Paula; GHISI, E.",
            "title": "Incerteza do método de simulação da NBR 15575-1 para a avaliação do desempenho térmico de habitações",
            "details": "Ambiente Construído (Online), v. 14, p. 103-117, 2014",
            "year": "2014",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212014000400008",
            "tags": [
                "Simulacao-Computacional",
                "Conforto-Termico",
                "Residencial-Unifamiliar"
            ]
        }
    ],
    "2013": [
        {
            "id": 189,
            "authors": "PROENÇA, Lúcio Costa; Ghisi, Enedir",
            "title": "Assessment of Potable Water Savings in Office Buildings Considering Embodied Energy",
            "details": "Water Resources Management, v. 27, p. 581-599, 2013",
            "year": "2013",
            "citations": "",
            "doi": "http://dx.doi.org/10.1007/s11269-012-0203-1",
            "tags": [
                "Agua-Potavel",
                "ACV",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 190,
            "authors": "GHISI, E.; SCHONDERMARK, P. N.",
            "title": "Investment Feasibility Analysis of Rainwater Use in Residences",
            "details": "Water Resources Management, v. 27, p. 2555-2576, 2013",
            "year": "2013",
            "citations": "",
            "doi": "http://dx.doi.org/10.1007/s11269-013-0303-6",
            "tags": [
                "CCV",
                "Agua-Pluvial",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 191,
            "authors": "RUPP, R.F.; GHISI, E.",
            "title": "Potencial de economia de energia elétrica em edificações comerciais híbridas localizadas em Florianópolis, SC",
            "details": "Ambiente Construído (Online), v. 13, p. 143-160, 2013",
            "year": "2013",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212013000100010",
            "tags": [
                "Eletricidade",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 192,
            "authors": "VIEIRA, Abel Silva; GHISI, E.; WEEBER, M.",
            "title": "Self-cleaning filtration: A novel concept for rainwater harvesting systems",
            "details": "Resources, Conservation and Recycling, v. 78, p. 67-73, 2013",
            "year": "2013",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.resconrec.2013.06.008",
            "tags": [
                "Agua-Pluvial"
            ]
        },
        {
            "id": 193,
            "authors": "SILVA, A. S.; GHISI, E.",
            "title": "Análise de sensibilidade global dos parâmetros termofísicos de uma edificação residencial de acordo com o método de simulação do RTQ-R",
            "details": "Ambiente Construído (Online), v. 13, p. 135-148, 2013",
            "year": "2013",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212013000400010",
            "tags": [
                "Envoltoria",
                "Simulacao-Computacional",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 194,
            "authors": "Rupp, Ricardo Forgiarini; GHISI, E.",
            "title": "Potencial de economia de energia elétrica através do uso da luz natural e da ventilação híbrida em edifícios comerciais em Florianópolis",
            "details": "Ambiente Construído (Online), v. 13, p. 75-86, 2013",
            "year": "2013",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/S1678-86212013000400006",
            "tags": [
                "Iluminacao",
                "Eletricidade",
                "Comercial-Escritorio"
            ]
        }
    ],
    "2012": [
        {
            "id": 195,
            "authors": "GHISI, E.; CARDOSO, Karla Albino; Rupp, Ricardo Forgiarini",
            "title": "Short-term versus long-term rainfall time series in the assessment of potable water savings by using rainwater in houses",
            "details": "Journal of Environmental Management, v. 100, p. 109-119, 2012",
            "year": "2012",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.jenvman.2011.12.031",
            "tags": [
                "Agua-Pluvial",
                "Agua-Potavel",
                "Simulacao-Computacional"
            ]
        },
        {
            "id": 196,
            "authors": "SOUZA, E.L.; GHISI, E.",
            "title": "Potable Water Savings by Using Rainwater for Non-Potable Uses in Houses",
            "details": "Water, v. 4, p. 607-628, 2012",
            "year": "2012",
            "citations": "",
            "doi": "http://dx.doi.org/10.3390/w4030607",
            "tags": [
                "Agua-Potavel",
                "Agua-Pluvial",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 197,
            "authors": "KALBUSCH, A; GHISI, E.",
            "title": "Método para quantificação do consumo energético no ciclo de vida de equipamentos hidrossanitários",
            "details": "Ambiente Construído (Online), v. 12, p. 57-73, 2012",
            "year": "2012",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212012000300005",
            "tags": [
                "ACV",
                "Eletricidade",
                "Equipamento-Hidrossanitario"
            ]
        }
    ],
    "2011": [
        {
            "id": 198,
            "authors": "PROENÇA, Lúcio Costa; GHISI, E.; TAVARES, D. F.; COELHO, Gabriel Marcon",
            "title": "Potential for electricity savings by reducing potable water consumption in a city scale",
            "details": "Resources, Conservation and Recycling, v. 55, p. 960-965, 2011",
            "year": "2011",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.resconrec.2011.05.003",
            "tags": [
                "Eletricidade",
                "Agua-Potavel",
                "Escala-Urbana"
            ]
        },
        {
            "id": 199,
            "authors": "PEREIRA, Cláudia Donald; GHISI, E.",
            "title": "The influence of the envelope on the thermal performance of ventilated and occupied houses",
            "details": "Energy and Buildings, v. 43, p. 3391-3399, 2011",
            "year": "2011",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enbuild.2011.09.001",
            "tags": [
                "Envoltoria",
                "Conforto-Termico",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 200,
            "authors": "GHISI, E.; RUPP, R.F.; MUNARIM, Ulisses",
            "title": "Comparação de métodos para dimensionamento de reservatórios de água pluvial",
            "details": "Ambiente Construído (Online), v. 11, p. 47-64, 2011",
            "year": "2011",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212011000400005",
            "tags": [
                "Agua-Pluvial"
            ]
        },
        {
            "id": 201,
            "authors": "GHISI, E.; FASOLA, G.B.; MARINOSKI, Ana Kelly; BORINELLI, J.B.",
            "title": "Potencial de economia de água em duas escolas em Florianópolis, SC",
            "details": "Ambiente Construído (Online), v. 11, p. 65-78, 2011",
            "year": "2011",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/s1678-86212011000400006",
            "tags": [
                "Agua-Potavel",
                "Escola-Universidade"
            ]
        }
    ],
    "2010": [
        {
            "id": 202,
            "authors": "PROENÇA, Lúcio Costa; GHISI, E.",
            "title": "Water end-uses in Brazilian office buildings",
            "details": "Resources, Conservation and Recycling, v. 54, p. 489-500, 2010",
            "year": "2010",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.resconrec.2009.10.005",
            "tags": [
                "Usos-Finais",
                "Agua-Potavel",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 203,
            "authors": "RAMOS, Greici; GHISI, E.",
            "title": "Analysis of daylight calculated using the EnergyPlus programme",
            "details": "Renewable & Sustainable Energy Reviews, v. 14, p. 1948-1958, 2010",
            "year": "2010",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.rser.2010.03.040",
            "tags": [
                "Iluminacao",
                "Simulacao-Computacional"
            ]
        },
        {
            "id": 204,
            "authors": "GHISI, E.; RAMOS, Greici",
            "title": "Avaliação do cálculo da iluminação natural realizada pelo programa EnergyPlus",
            "details": "Ambiente Construído (Online), v. 10, p. 157-169, 2010",
            "year": "2010",
            "citations": "",
            "doi": "http://dx.doi.org/10.1590/S1678-86212010000200011",
            "tags": [
                "Iluminacao",
                "Simulacao-Computacional"
            ]
        },
        {
            "id": 205,
            "authors": "GHISI, E",
            "title": "Parameters Influencing the Sizing of Rainwater Tanks",
            "details": "Water Resources Management, v. 24, p. 2381-2403, 2010",
            "year": "2010",
            "citations": "",
            "doi": "http://dx.doi.org/10.1007/s11269-009-9557-4",
            "tags": [
                "Agua-Pluvial"
            ]
        }
    ],
    "2009": [
        {
            "id": 206,
            "authors": "PROENÇA, Lúcio Costa; GHISI, E.",
            "title": "Estimativa de usos finais de água em quatro edifícios de escritórios localizados em Florianópolis",
            "details": "Ambiente Construído (Online), v. 9, p. 95-108, 2009",
            "year": "2009",
            "citations": "",
            "doi": "https://seer.ufrgs.br/index.php/ambienteconstruido/article/view/7718",
            "tags": [
                "Usos-Finais",
                "Agua-Potavel",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 207,
            "authors": "GHISI, E.; TAVARES, D. F.; ROCHA, Vinicius Luis",
            "title": "Rainwater harvesting in petrol stations in Brasília: potential for potable water savings and investment feasibility analysis",
            "details": "Resources, Conservation and Recycling, v. 54, p. 79-85, 2009",
            "year": "2009",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.resconrec.2009.06.010",
            "tags": [
                "Agua-Pluvial",
                "CCV",
                "Industrial-Servicos"
            ]
        }
    ],
    "2008": [
        {
            "id": 208,
            "authors": "MARINOSKI, Ana Kelly; GHISI, E.",
            "title": "Aproveitamento de água pluvial para fins não potáveis em instituição de ensino: estudo de caso em Florianópolis - SC",
            "details": "Ambiente Construído (Online), v. 8, p. 67-84, 2008",
            "year": "2008",
            "citations": "",
            "doi": "https://seer.ufrgs.br/ambienteconstruido/article/view/5355",
            "tags": [
                "Agua-Pluvial",
                "Escola-Universidade"
            ]
        },
        {
            "id": 209,
            "authors": "PEÑA, Carolina Canella; GHISI, E.; PEREIRA, Cláudia Donald",
            "title": "Comparação entre necessidade e disponibilidade de vento e radiação solar para fins de análise bioclimática de edificações em Florianópolis",
            "details": "Ambiente Construído (Online), v. 8, p. 87-101, 2008",
            "year": "2008",
            "citations": "",
            "doi": "https://seer.ufrgs.br/index.php/ambienteconstruido/article/view/5379",
            "tags": [
                "Conforto-Termico",
                "Envoltoria"
            ]
        }
    ],
    "2007": [
        {
            "id": 210,
            "authors": "GHISI, E.; MASSIGNANI, Ricardo",
            "title": "Thermal performance of bedrooms in a multi-storey residential building in southern Brazil",
            "details": "Building and Environment, Inglaterra, v. 42, n.2, p. 730-742, 2007",
            "year": "2007",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.buildenv.2005.10.026",
            "tags": [
                "Conforto-Termico",
                "Residencial-Multifamiliar"
            ]
        },
        {
            "id": 211,
            "authors": "GHISI, E.; OLIVEIRA, Sulayre Mengotti",
            "title": "Potential for potable water savings by combining the use of rainwater and greywater in houses in southern Brazil",
            "details": "Building and Environment, Inglaterra, v. 42, p. 1731-1742, 2007",
            "year": "2007",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.buildenv.2006.02.001",
            "tags": [
                "Agua-Potavel",
                "Agua-Pluvial",
                "Agua-Cinza",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 212,
            "authors": "GHISI, E.; BRESSAN, Diego Lapolli; MARTINI, Maurício",
            "title": "Rainwater tank capacity and potential for potable water savings by using rainwater in the residential sector of southeastern Brazil",
            "details": "Building and Environment, v. 42, p. 1654-1666, 2007",
            "year": "2007",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.buildenv.2006.02.007",
            "tags": [
                "Agua-Pluvial",
                "Agua-Potavel",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 213,
            "authors": "GHISI, E.; FERREIRA, Daniel Fabricio",
            "title": "Potential for potable water savings by using rainwater and greywater in a multi-storey residential building in southern Brazil",
            "details": "Building and Environment, v. 42, p. 2512-2522, 2007",
            "year": "2007",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.buildenv.2006.07.019",
            "tags": [
                "Agua-Potavel",
                "Agua-Pluvial",
                "Agua-Cinza",
                "Residencial-Multifamiliar"
            ]
        },
        {
            "id": 214,
            "authors": "GHISI, E.; GOSCH, Samuel; LAMBERTS, Roberto",
            "title": "Electricity end-uses in the residential sector of Brazil",
            "details": "Energy Policy, v. 35, p. 4107-4120, 2007",
            "year": "2007",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.enpol.2007.02.020",
            "tags": [
                "Usos-Finais",
                "Eletricidade",
                "Residencial-Unifamiliar"
            ]
        }
    ],
    "2006": [
        {
            "id": 215,
            "authors": "GHISI, E.; MONTIBELLER, Andreza; SCHMIDT, Richard Williann",
            "title": "Potential for potable water savings by using rainwater: an analysis over 62 cities in southern Brazil",
            "details": "Building and Environment, Inglaterra, v. 41, n.2, p. 204-210, 2006",
            "year": "2006",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.buildenv.2005.01.014",
            "tags": [
                "Agua-Potavel",
                "Agua-Pluvial",
                "Escala-Urbana"
            ]
        },
        {
            "id": 216,
            "authors": "GHISI, E",
            "title": "Potential for potable water savings by using rainwater in the residential sector of Brazil.",
            "details": "Building and Environment, Inglaterra, v. 41, n.11, p. 1544-1550, 2006",
            "year": "2006",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.buildenv.2005.03.018",
            "tags": [
                "Agua-Potavel",
                "Agua-Pluvial",
                "Residencial-Unifamiliar"
            ]
        },
        {
            "id": 217,
            "authors": "KAMMERS, Pauline; GHISI, E.",
            "title": "Usos finais de água em edifícios públicos localizados em Florianópolis-SC",
            "details": "Ambiente Construído (Online), Porto Alegre, v. 6, n.1, p. 75-90, 2006",
            "year": "2006",
            "citations": "",
            "doi": "https://seer.ufrgs.br/index.php/ambienteconstruido/article/view/3681",
            "tags": [
                "Usos-Finais",
                "Agua-Potavel",
                "Comercial-Escritorio"
            ]
        },
        {
            "id": 218,
            "authors": "GHISI, E.; TINKER, John A",
            "title": "Evaluating the potential for energy savings on lighting by integrating fibre optics in buildings",
            "details": "Building and Environment, Inglaterra, v. 41, n.12, p. 1611-1621, 2006",
            "year": "2006",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.buildenv.2005.06.013",
            "tags": [
                "Iluminacao",
                "Eletricidade"
            ]
        }
    ],
    "2005": [
        {
            "id": 219,
            "authors": "GHISI, E.; TINKER, J.",
            "title": "An Ideal Window Area concept for energy efficient integration of daylight and artificial light in buildings",
            "details": "Building and Environment, Inglaterra, v. 40, n.1, p. 51-61, 2005",
            "year": "2005",
            "citations": "",
            "doi": "http://dx.doi.org/10.1016/j.buildenv.2004.04.004",
            "tags": [
                "Envoltoria",
                "Iluminacao",
                "Eletricidade"
            ]
        },
        {
            "id": 220,
            "authors": "GHISI, E.; TINKER, John A; IBRAHIM, Siti Halipah",
            "title": "Área de janela e dimensões de ambientes para iluminação natural e eficiência energética: literatura versus simulação computacional",
            "details": "Ambiente Construído (Online), Porto Alegre, v. 5, n.4, p. 81-93, 2005",
            "year": "2005",
            "citations": "",
            "doi": "https://seer.ufrgs.br/ambienteconstruido/article/view/3659",
            "tags": [
                "Envoltoria",
                "Iluminacao",
                "Eletricidade"
            ]
        }
    ],
    "2004": [
        {
            "id": 221,
            "authors": "GHISI, E.; TINKER, John A",
            "title": "Potencial de economia de energia em iluminação através da utilização de fibras ópticas",
            "details": "Ambiente Construído (Online), http://www.antac.org.br/, v. 4, n.3, p. 61-77, 2004",
            "year": "2004",
            "citations": "",
            "doi": "https://seer.ufrgs.br/index.php/ambienteconstruido/article/view/3560",
            "tags": [
                "Iluminacao",
                "Eletricidade"
            ]
        }
    ]
};

  // Sort years descending (most recent first)
  const sortedYears = Object.keys(allPapers).sort((a, b) => Number(b) - Number(a));

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [showAll, setShowAll] = useState(false);

    const tags = [
    { id: "all", name: t("papers.tag_all", "Todos os Temas") },
    { id: "Agua-Pluvial", name: t("papers.tag_Agua-Pluvial_full", "Aproveitamento de Água de Chuva") },
    { id: "Agua-Potavel", name: t("papers.tag_Agua-Potavel_full", "Usos Finais de Água Potável") },
    { id: "Agua-Cinza", name: t("papers.tag_Agua-Cinza_full", "Reúso de Água Cinza") },
    { id: "Aquecimento-Agua", name: t("papers.tag_Aquecimento-Agua_full", "Aquecimento de Água") },
    { id: "Usos-Finais", name: t("papers.tag_Usos-Finais_full", "Usos Finais de Energia e Água") },
    { id: "Conforto-Termico", name: t("papers.tag_Conforto-Termico_full", "Conforto Térmico") },
    { id: "Eletricidade", name: t("papers.tag_Eletricidade_full", "Eficiência Energética e Eletricidade") },
    { id: "Iluminacao", name: t("papers.tag_Iluminacao_full", "Iluminação Natural e Artificial") },
    { id: "Sombreamento", name: t("papers.tag_Sombreamento_full", "Dispositivos de Sombreamento") },
    { id: "Envoltoria", name: t("papers.tag_Envoltoria_full", "Desempenho da Envoltória") },
    { id: "Pavimento-Permeavel", name: t("papers.tag_Pavimento-Permeavel_full", "Pavimentos Permeáveis e Drenagem Urbana") },
    { id: "Telhado-Verde", name: t("papers.tag_Telhado-Verde_full", "Telhados Verdes") },
    { id: "Telhado-Frio", name: t("papers.tag_Telhado-Frio_full", "Telhados Frios (Cool Roofs)") },
    { id: "ACV", name: t("papers.tag_ACV_full", "Avaliação do Ciclo de Vida (ACV)") },
    { id: "CCV", name: t("papers.tag_CCV_full", "Custo do Ciclo de Vida (CCV)") },
    { id: "Mudancas-Climaticas", name: t("papers.tag_Mudancas-Climaticas_full", "Mudanças Climáticas") },
    { id: "Simulacao-Computacional", name: t("papers.tag_Simulacao-Computacional_full", "Simulação Computacional de Edificações") },
    { id: "Comportamento-Usuario", name: t("papers.tag_Comportamento-Usuario_full", "Comportamento do Usuário") },
    { id: "Produtividade", name: t("papers.tag_Produtividade_full", "Produtividade e Bem-Estar") },
    { id: "Qualidade-Ar", name: t("papers.tag_Qualidade-Ar_full", "Qualidade do Ar Interior") },
    { id: "Estudo-Campo", name: t("papers.tag_Estudo-Campo_full", "Estudos de Campo") },
    { id: "Revisao-Literatura", name: t("papers.tag_Revisao-Literatura_full", "Revisão de Literatura") },
    { id: "Benchmarking", name: t("papers.tag_Benchmarking_full", "Benchmarking e Indicadores de Desempenho") },
    { id: "Demografia-Usuario", name: t("papers.tag_Demografia-Usuario_full", "Fatores Demográficos e Comportamentais") },
    { id: "Escala-Urbana", name: t("papers.tag_Escala-Urbana_full", "Análise em Escala Urbana") },
    { id: "Residencial-Unifamiliar", name: t("papers.tag_Residencial-Unifamiliar_full", "Edificações Residenciais Unifamiliares") },
    { id: "Residencial-Multifamiliar", name: t("papers.tag_Residencial-Multifamiliar_full", "Edificações Residenciais Multifamiliares") },
    { id: "Comercial-Escritorio", name: t("papers.tag_Comercial-Escritorio_full", "Edificações Comerciais e Escritórios") },
    { id: "Industrial-Servicos", name: t("papers.tag_Industrial-Servicos_full", "Edificações Industriais e de Serviços") },
    { id: "Escola-Universidade", name: t("papers.tag_Escola-Universidade_full", "Edificações de Ensino e Universidades") },
    { id: "Habitacao-Interesse-Social", name: t("papers.tag_Habitacao-Interesse-Social_full", "Habitação de Interesse Social") },
    { id: "Equipamento-Hidrossanitario", name: t("papers.tag_Equipamento-Hidrossanitario_full", "Equipamentos Hidrossanitários") },
  ];

  const isFiltering = searchQuery.trim() !== "" || selectedTag !== "all";

  // Determine which years to display (show last 5 years by default unless showAll is true)
  const displayedYears = showAll
    ? sortedYears
    : sortedYears.filter(y => Number(y) >= 2022);

  // Filter papers
  const filteredPapers = {};
  let totalCount = 0;

  displayedYears.forEach(year => {
    const list = allPapers[year] || [];
    const matched = list.filter(p => {
      const matchesTag = selectedTag === "all" || (p.tags && p.tags.includes(selectedTag));
      const matchesSearch = searchQuery.trim() === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.tags || []).some(tag => {
          const tagMeta = tags.find(th => th.id === tag);
          return tagMeta && tagMeta.name.toLowerCase().includes(searchQuery.toLowerCase());
        });
      return matchesTag && matchesSearch;
    });
    if (matched.length > 0) {
      filteredPapers[year] = matched;
      totalCount += matched.length;
    }
  });

  const sortedFilteredYears = Object.keys(filteredPapers).sort((a, b) => Number(b) - Number(a));

  const [collapsed, setCollapsed] = useState(
    () => Object.fromEntries(sortedYears.map(y => [y, true]))
  );
  const toggle = (year) => setCollapsed(prev => ({ ...prev, [year]: !prev[year] }));
  const allOpen = displayedYears.every(y => !collapsed[y]);
  const toggleAll = () => {
    if (allOpen) setCollapsed(Object.fromEntries(sortedYears.map(y => [y, true])));
    else setCollapsed(Object.fromEntries(sortedYears.map(y => [y, false])));
  };

  const chartData = Object.entries(allPapers)
    .map(([year, list]) => {
      const selectedInYear = list.filter(p => {
        const matchesTag = selectedTag === "all" || (p.tags && p.tags.includes(selectedTag));
        const matchesSearch = searchQuery.trim() === "" ||
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.tags || []).some(tag => {
            const tagMeta = tags.find(th => th.id === tag);
            return tagMeta && tagMeta.name.toLowerCase().includes(searchQuery.toLowerCase());
          });
        return matchesTag && matchesSearch;
      });

      return {
        year: Number(year),
        totalCount: list.length,
        selectedCount: selectedInYear.length,
      };
    })
    .filter(d => !isNaN(d.year))
    .sort((a, b) => a.year - b.year);

  let runningTotal = 0;
  let runningSelected = 0;
  const processedData = chartData.map(d => {
    runningTotal += d.totalCount;
    runningSelected += d.selectedCount;
    return {
      year: d.year,
      totalCount: d.totalCount,
      selectedCount: d.selectedCount,
      totalCumulative: runningTotal,
      selectedCumulative: runningSelected,
      isFiltered: isFiltering,
    };
  });

  return (
    <PageLayout title={t('papers.title', 'Artigos Científicos')}>
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Search & Filter Panel */}
        <div className="bg-white dark:bg-slate-50 p-4 sm:p-5 rounded-2xl border border-emerald-200 dark:border-slate-300 space-y-4 shadow-md">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
              <input
                type="text"
                placeholder={t("papers.search_placeholder", "Buscar por título, autor, tema...")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 placeholder:text-slate-500 font-bold"
              />
            </div>

            {/* Tag Select */}
            <div className="relative">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full sm:w-72 px-3 py-2 bg-slate-50 dark:bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 appearance-none pr-9 font-bold"
              >
                {tags.map(th => (
                  <option key={th.id} value={th.id}>{th.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Subtitle + toggle all */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-700 dark:text-emerald-300 font-extrabold tracking-wide uppercase">
            {isFiltering
              ? t("papers.search_results", "Resultados da busca: {{count}} publicações", { count: totalCount })
              : showAll
              ? t("papers.all_results", "Todas as publicações: {{count}}", { count: totalCount })
              : t("papers.recent_results", "Publicações recentes (2022 em diante)")}
          </p>

          {sortedFilteredYears.length > 0 && (
            <button
              onClick={toggleAll}
              className="text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:underline cursor-pointer"
            >
              {allOpen ? t("papers.collapse_all", "Recolher todos") : t("papers.expand_all", "Expandir todos")}
            </button>
          )}
        </div>

        {totalCount === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-100 border border-dashed border-slate-300 rounded-2xl">
            <p className="text-slate-800 text-sm font-bold">
              {t("papers.no_results", "Nenhum artigo encontrado para os critérios de busca.")}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedFilteredYears.map((year) => {
              const isOpen = !collapsed[year];
              const papers = filteredPapers[year];
              return (
                <div key={year} className="border border-emerald-300 dark:border-slate-300 rounded-2xl overflow-hidden shadow-md">
                  <button
                    onClick={() => toggle(year)}
                    className="w-full flex items-center gap-2 px-4 py-3 bg-emerald-100/90 dark:bg-emerald-100 hover:bg-emerald-200/80 dark:hover:bg-emerald-200 transition-colors cursor-pointer"
                  >
                    <span className="w-2 h-5 bg-emerald-700 rounded-full inline-block shrink-0" />
                    <span className="text-lg font-black text-slate-900">{year}</span>
                    <span className="text-xs text-slate-800 ml-1 font-extrabold">
                      ({papers.length} {papers.length === 1 ? t("papers.pub_singular", "publicação") : t("papers.pub_plural", "publicações")})
                    </span>
                    <span className="ml-auto text-slate-800">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="bg-white dark:bg-slate-50 px-3 py-2 divide-y divide-slate-200">
                      {papers.map((paper, idx) => {
                        const { articleTitle, pubInfo } = parseCitation(paper);
                        const authors = shortAuthors(paper.authors);
                        return (
                          <div
                            key={idx}
                            className="py-3 px-3 hover:bg-emerald-50/60 dark:hover:bg-emerald-50/60 rounded-xl transition-colors duration-150"
                          >
                            {paper.doi ? (
                              <a href={paper.doi} target="_blank" rel="noopener noreferrer"
                                className="text-sm font-extrabold text-slate-900 hover:text-emerald-800 transition-colors leading-snug">
                                {articleTitle}
                              </a>
                            ) : (
                              <span className="text-sm font-extrabold text-slate-900 leading-snug">
                                {articleTitle}
                              </span>
                            )}
                            <p className="text-xs text-slate-800 mt-1 leading-snug font-bold">{authors}</p>
                            {pubInfo && (
                              <p className="text-xs text-slate-700 italic mt-0.5 leading-snug font-semibold">{pubInfo}</p>
                            )}
                            {(paper.tags || []).length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {(paper.tags || []).map(tagId => (
                                  <TagBadge key={tagId} tagId={tagId} />
                                ))}
                              </div>
                            )}
                            {paper.doi && (
                              <a href={paper.doi} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 dark:text-emerald-800 hover:underline mt-2.5">
                                <BookOpen className="w-3.5 h-3.5" />
                                {paper.doi.includes("doi.org")
                                  ? `DOI: ${paper.doi.replace("https://doi.org/", "").replace("http://dx.doi.org/", "")}`
                                  : "Ver publicação"}
                              </a>
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

        {/* Banner to archive / back link */}
        {!showAll && (
          <div className="bg-gray-50 dark:bg-zinc-800/10 border border-gray-200 dark:border-zinc-800/40 p-4 rounded-2xl text-center flex flex-col sm:flex-row items-center justify-center gap-3">
            <p className="text-sm text-black dark:text-zinc-200 font-bold">
              {t('papers.archive_hint', 'Procurando publicações anteriores?')}
            </p>
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-sm hover:shadow transition-all duration-200 text-sm cursor-pointer"
            >
              {t('papers.archive_link', 'Ver artigos anteriores (2021 e anteriores)')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {showAll && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(false)}
              className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              {t('papers.back_link', 'Voltar para artigos recentes')}
            </button>
          </div>
        )}

        {/* Gráficos de Produção */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 mt-4 border-t border-gray-150 dark:border-zinc-800/80">
          <BarChart data={processedData} />
          <CumulativeChart data={processedData} />
        </div>
      </div>
    </PageLayout>
  );
}
