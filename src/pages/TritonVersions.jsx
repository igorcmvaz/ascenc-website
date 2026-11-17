import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import TritonSubNav from "../components/TritonSubNav";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import versoesDoTriton from "../data/tritonVersions.json";
import {
  Layers,
  Globe,
  History,
  Download,
  Code2,
  ExternalLink,
  Bug,
  RefreshCw,
  PlusCircle,
  Calendar,
  GitBranch,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function TritonVersions() {
  const { t, i18n } = useTranslation();

  // As versões vêm de src/data/tritonVersions.json, gerado pela pipeline do Triton a partir do
  // CHANGELOG e das notas do site em quatro línguas. Não edite as versões aqui.
  const versionsChangelog = versoesDoTriton;
  const textoNaLingua = (valor) => {
    if (typeof valor === "string") return valor;
    const lingua = i18n.language || "en";
    return valor?.[lingua] ?? valor?.[lingua.split("-")[0]] ?? valor?.en ?? valor?.["pt-BR"] ?? "";
  };
  const versaoAtual = versionsChangelog.find((v) => v.isLatest)?.version;

  // A versão atual inicia aberta; as anteriores, recolhidas.
  const [openVersions, setOpenVersions] = useState(versaoAtual ? { [versaoAtual]: true } : {});

  const toggleVersion = (verKey) => {
    setOpenVersions((prev) => ({
      ...prev,
      [verKey]: !prev[verKey],
    }));
  };

  const expandAll = () => {
    const next = {};
    versionsChangelog.forEach((v) => (next[v.version] = true));
    setOpenVersions(next);
  };

  const collapseAll = () => {
    setOpenVersions({});
  };

  const listas = [
    { chave: "added", rotulo: t("triton_versions.tag_added", "Adicionado"), Icone: PlusCircle,
      cor: "text-emerald-800 dark:text-emerald-300", corIcone: "text-emerald-600 dark:text-emerald-400" },
    { chave: "changed", rotulo: t("triton_versions.tag_changed_results", "Muda resultados"), Icone: RefreshCw,
      cor: "text-blue-800 dark:text-blue-300", corIcone: "text-blue-600 dark:text-blue-400" },
    { chave: "fixed", rotulo: t("triton_versions.tag_fixed", "Corrigido"), Icone: Bug,
      cor: "text-amber-800 dark:text-amber-300", corIcone: "text-amber-600 dark:text-amber-400" },
  ];


  return (
    <PageLayout>
      <div className="space-y-8 max-w-5xl mx-auto pb-12">
        {/* Sub-navegação do Triton */}
        <TritonSubNav activeTab="versoes" />

        {/* ── HEADER DA PÁGINA (DESIGN LIMPO, ALINHADO AO GES) ── */}
        <section className="relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 p-6 sm:p-8 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 text-xs font-black uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>{t("triton_versions.header_badge", "Changelog & Ciclo de Lançamentos")}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {t("triton_versions.header_title", "Histórico de Versões e Atualizações do Triton")}
            </h1>
            <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm font-medium leading-relaxed max-w-3xl">
              {t("triton_versions.header_desc", "Consulte os detalhes técnicos de cada versão do Triton: notas de lançamento, novos recursos implementados, melhorias e correções. O código-fonte e os lançamentos oficiais são mantidos de forma aberta e auditável no GitHub.")}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/igorcmvaz/triton"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700 font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
            >
              <Code2 className="w-4 h-4" />
              <span>{t("triton_versions.btn_github", "Acessar Repositório no GitHub")}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <Link
              to="/triton"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t("triton_versions.btn_download", "Download (v0.2.0 Beta)")}</span>
            </Link>
          </div>
        </section>

        {/* ── DETALHES POR VERSÃO (CHANGELOG COM SANFONAS COLAPSÁVEIS) ── */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>{t("triton_versions.changelog_title", "Registro Geral de Mudanças (Changelog)")}</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                {t("triton_versions.changelog_desc", "Clique nas versões para expandir ou recolher as notas de lançamento e modificações.")}
              </p>
            </div>

            {/* Ações de Expandir/Recolher e Legenda */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-600 dark:text-zinc-400">
                <button
                  type="button"
                  onClick={expandAll}
                  className="hover:text-blue-600 dark:hover:text-blue-400 underline cursor-pointer"
                >
                  {t("triton_versions.expand_all", "Expandir todas")}
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={collapseAll}
                  className="hover:text-blue-600 dark:hover:text-blue-400 underline cursor-pointer"
                >
                  {t("triton_versions.collapse_all", "Recolher todas")}
                </button>
              </div>

              <div className="hidden lg:flex items-center gap-1.5 pl-2 border-l border-slate-200 dark:border-zinc-700">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800">
                  <PlusCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>{t("triton_versions.tag_added", "Adicionado")}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800">
                  <RefreshCw className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  <span>{t("triton_versions.tag_changed_results", "Muda resultados")}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-800">
                  <Bug className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span>{t("triton_versions.tag_fixed", "Corrigido")}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {versionsChangelog.map((ver) => {
              const isOpen = !!openVersions[ver.version];
              return (
                <div
                  key={ver.version}
                  className={`rounded-3xl border shadow-xs transition-all overflow-hidden bg-white dark:bg-zinc-900 ${
                    ver.isLatest
                      ? "border-blue-300 dark:border-blue-800/80 ring-1 ring-blue-200 dark:ring-blue-900/40"
                      : "border-slate-200 dark:border-zinc-800"
                  }`}
                >
                  {/* Cabeçalho da versão (clique para abrir ou recolher) */}
                  <div
                    onClick={() => toggleVersion(ver.version)}
                    className="w-full text-left p-5 sm:p-6 bg-slate-50/70 hover:bg-slate-100/80 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                          Triton v{ver.version} Beta
                        </span>
                        <span
                          className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${
                            ver.isLatest
                              ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                              : "bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 border-slate-200 dark:border-zinc-700"
                          }`}
                        >
                          {ver.isLatest
                            ? t("triton_versions.badge_current", "Versão atual")
                            : t("triton_versions.badge_previous", "Versão anterior")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 font-semibold">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{textoNaLingua(ver.date)}</span>
                        {!isOpen && (
                          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-bold ml-1">
                            {t("triton_versions.click_details", "• Clique para ver detalhes")}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {ver.githubUrl && (
                        <a
                          href={ver.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 font-bold text-xs border border-slate-300 dark:border-zinc-700 shadow-xs transition-all cursor-pointer"
                        >
                          <Code2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>GitHub</span>
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      )}
                      <div className="p-1 rounded-lg text-slate-500 dark:text-zinc-400">
                        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Conteúdo da versão */}
                  {isOpen && (
                    <div className="p-6 space-y-5 border-t border-slate-100 dark:border-zinc-800">
                      <p className="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-medium">
                        {textoNaLingua(ver.summary)}
                      </p>
                      <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-zinc-800">
                        {listas.map((lista) => {
                          const Icon = lista.Icone;
                          const itens = ver[lista.chave];
                          if (!itens || itens.length === 0) return null;
                          return (
                            <div key={lista.chave} className="space-y-2">
                              <div className={`flex items-center gap-1.5 text-xs font-extrabold ${lista.cor}`}>
                                <Icon className={`w-4 h-4 ${lista.corIcone}`} />
                                <span>{lista.rotulo}</span>
                              </div>
                              <ul className="space-y-1.5 pl-6 list-disc text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                                {itens.map((item, i) => (
                                  <li key={i}>{textoNaLingua(item)}</li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>


        {/* ── COMPARATIVO DETALHADO DAS 3 EDIÇÕES REGIONAIS ── */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>{t("triton_versions.matrix_title", "Matriz Comparativa das 3 Edições (v0.2.0)")}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              {t("triton_versions.matrix_desc", "Todas as três edições rodam sobre o mesmo motor computacional validado e são fornecidas com instalador e documentação técnica específicos.")}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs bg-white dark:bg-zinc-900">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-zinc-800/80 border-b border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300">
                  <th className="p-3.5 font-black">{t("triton_versions.th_resource", "Recurso / Parâmetro")}</th>
                  <th className="p-3.5 font-black text-emerald-700 dark:text-emerald-400">{t("triton_versions.th_brl", "🇧🇷 Triton Brasil (BRL)")}</th>
                  <th className="p-3.5 font-black text-rose-700 dark:text-rose-400">{t("triton_versions.th_ibe", "🇵🇹 Triton Ibérica (IBE)")}</th>
                  <th className="p-3.5 font-black text-blue-700 dark:text-blue-400">{t("triton_versions.th_int", "🌐 Triton Internacional (INT)")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-600 dark:text-zinc-300">
                <tr>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">{t("triton_versions.row_rain", "Base Pluviométrica")}</td>
                  <td className="p-3.5">{t("triton_versions.rain_brl_val", "CLIMBra (séries históricas + projeções SSP2-4.5 / SSP5-8.5 até 2100)")}</td>
                  <td className="p-3.5">{t("triton_versions.rain_ibe_val", "E-OBS, Iberia01 e ERA5 por concelho/município")}</td>
                  <td className="p-3.5">{t("triton_versions.rain_int_val", "Importação aberta de arquivos CSV de qualquer localidade")}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">{t("triton_versions.row_tariff", "Banco de Tarifas")}</td>
                  <td className="p-3.5">{t("triton_versions.tariff_brl_val", "652 municípios brasileiros auditados (água, esgoto e tarifa mínima)")}</td>
                  <td className="p-3.5">{t("triton_versions.tariff_ibe_val", "Tarifários regulados ERSAR (Portugal) e Espanha em Euros (€)")}</td>
                  <td className="p-3.5">{t("triton_versions.tariff_int_val", "Parametrização livre para qualquer moeda e estrutura em blocos")}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">{t("triton_versions.row_standards", "Normas Técnicas")}</td>
                  <td className="p-3.5">{t("triton_versions.standards_brl_val", "ABNT NBR 15527:2019 e NBR 5626")}</td>
                  <td className="p-3.5">{t("triton_versions.standards_ibe_val", "Norma Europeia EN 16941-1")}</td>
                  <td className="p-3.5">{t("triton_versions.standards_int_val", "Padrões internacionais e ISO 14040/14044 (ACV)")}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">{t("triton_versions.row_currency", "Moeda Nativa")}</td>
                  <td className="p-3.5">{t("triton_versions.currency_brl_val", "Real Brasileiro (R$)")}</td>
                  <td className="p-3.5">{t("triton_versions.currency_ibe_val", "Euro (€)")}</td>
                  <td className="p-3.5">{t("triton_versions.currency_int_val", "Qualquer símbolo monetário ($, €, £, R$, etc.)")}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">{t("triton_versions.row_languages", "Idiomas da Interface")}</td>
                  <td className="p-3.5">{t("triton_versions.lang_brl_val", "Português do Brasil")}</td>
                  <td className="p-3.5">{t("triton_versions.lang_ibe_val", "Português Europeu")}</td>
                  <td className="p-3.5">{t("triton_versions.lang_int_val", "Inglês, Português, Espanhol e Chinês")}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">{t("triton_versions.row_modules", "Módulos Inclusos")}</td>
                  <td className="p-3.5">{t("triton_versions.modules_all_val", "Balanço entre YAS e YBS, 2 tanques, VPL, TIR, ACV, 4 MCDA")}</td>
                  <td className="p-3.5">{t("triton_versions.modules_all_val", "Balanço entre YAS e YBS, 2 tanques, VPL, TIR, ACV, 4 MCDA")}</td>
                  <td className="p-3.5">{t("triton_versions.modules_all_val", "Balanço entre YAS e YBS, 2 tanques, VPL, TIR, ACV, 4 MCDA")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── ⏱️ LINHA DO TEMPO BEM ENXUTA (CONFORME REQUISITADO PELO USUÁRIO) ── */}
        <section className="space-y-3">
          <div className="space-y-1">
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>{t("triton_versions.timeline_title", "Linha do Tempo Histórica")}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              {t("triton_versions.timeline_desc", "Evolução das ferramentas de simulação e dimensionamento de reservatórios pluviais desenvolvidas pelo grupo na UFSC.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* 1. 2026 Triton em diante */}
            <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-900 dark:text-blue-300">
                  {t("triton_versions.timeline_t1_year", "2026 em diante")}
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
                  {t("triton_versions.timeline_t1_badge", "Triton")}
                </span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                {t("triton_versions.timeline_t1_title", "Plataforma Triton")}
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                {t("triton_versions.timeline_t1_desc", "Refatoração em Python 3.12+ (PySide6, SQLite). Edições Brasil, Ibérica e Internacional integradas com balanço diário entre YAS e YBS, engenharia econômica completa, ACV e 4 métodos MCDA.")}
              </p>
            </div>

            {/* 2. 2014 Versão 4 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 dark:text-white">
                  2014
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
                  {t("triton_versions.timeline_t2_badge", "Versão 4")}
                </span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                {t("triton_versions.timeline_t2_title", "Netuno 4.0")}
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                {t("triton_versions.timeline_t2_desc", "Software autônomo compilado em Delphi para Windows. Ampla consolidação acadêmica e profissional no dimensionamento de reservatórios pluviais no Brasil por mais de 10 anos.")}
              </p>
            </div>

            {/* 3. 2012 para antes Versões 1, 2 e 3 */}
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 dark:text-white">
                  {t("triton_versions.timeline_t3_year", "2012 para antes")}
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
                  {t("triton_versions.timeline_t3_badge", "Versões 1, 2 e 3")}
                </span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                {t("triton_versions.timeline_t3_title", "Netuno 1, 2 e 3")}
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                {t("triton_versions.timeline_t3_desc", "Modelagem pioneira do balanço hídrico diário em planilhas eletrônicas com macros VBA e primeiras análises de viabilidade econômica considerando tarifas de água e esgoto.")}
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
