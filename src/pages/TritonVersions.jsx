import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import TritonSubNav from "../components/TritonSubNav";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Layers,
  History,
  Globe,
  Download,
  Code2,
  ExternalLink,
  Sparkles,
  Bug,
  RefreshCw,
  PlusCircle,
  Calendar,
  GitBranch,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function TritonVersions() {
  const { t } = useTranslation();

  // Controla quais versões estão abertas no Changelog.
  // A versão atual (0.1.0) inicia aberta; as versões anteriores iniciam colapsadas.
  const [openVersions, setOpenVersions] = useState({
    "0.1.0": true,
  });

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

  // Versionamento individual de cada aplicativo / edição
  const appVersions = [
    {
      id: "brl",
      name: "Triton Brasil",
      editionCode: "BRL",
      flag: "🇧🇷",
      version: "0.1.0-BRL",
      status: t("triton_versions.v010_status", "Lançamento Oficial"),
      statusColor: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
      date: t("triton_versions.v010_date", "Março de 2026"),
      installerName: "Triton-Brasil-Setup-v0.1.0.exe",
      currency: t("triton_versions.currency_brl_val", "Real Brasileiro (R$)"),
      standards: t("triton_versions.standards_brl_val", "ABNT NBR 15527:2019 e NBR 5626"),
      databaseInfo: t("triton_versions.app_brl_db", "652 municípios brasileiros com séries pluviométricas auditadas e projeções climáticas CLIMBra até 2100 (SSP2-4.5 e SSP5-8.5)."),
      tariffInfo: t("triton_versions.app_brl_tariff", "Estruturas tarifárias em cascata (blocos de consumo residencial, comercial, público e industrial) com tarifa mínima e fator de esgoto."),
      githubUrl: "https://github.com/igorcmvaz/triton",
    },
    {
      id: "ibe",
      name: "Triton Ibérica",
      editionCode: "IBE",
      flag: "🇵🇹",
      version: "0.1.0-IBE",
      status: t("triton_versions.v010_status", "Lançamento Oficial"),
      statusColor: "bg-rose-50 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800",
      date: t("triton_versions.v010_date", "Março de 2026"),
      installerName: "Triton-Iberica-Setup-v0.1.0.exe",
      currency: t("triton_versions.currency_ibe_val", "Euro (€)"),
      standards: t("triton_versions.standards_ibe_val", "Norma Europeia EN 16941-1"),
      databaseInfo: t("triton_versions.app_ibe_db", "Séries meteorológicas oficiais E-OBS, Iberia01 e reanálise ERA5 mapeadas por concelho (Portugal) e província/município (Espanha)."),
      tariffInfo: t("triton_versions.app_ibe_tariff", "Modelos tarifários regulados pela ERSAR (Portugal) e autarquias espanholas, com tarifas fixas e escalões volumétricos em Euros."),
      githubUrl: "https://github.com/igorcmvaz/triton",
    },
    {
      id: "int",
      name: "Triton Internacional",
      editionCode: "INT",
      flag: "🌐",
      version: "0.1.0-INT",
      status: t("triton_versions.v010_status", "Lançamento Oficial"),
      statusColor: "bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      date: t("triton_versions.v010_date", "Março de 2026"),
      installerName: "Triton-International-Setup-v0.1.0.exe",
      currency: t("triton_versions.currency_int_val", "Moeda Livre ($, €, £, R$, ¥...)"),
      standards: t("triton_versions.standards_int_val", "ISO 14040/14044 (ACV) e Padrões Internacionais"),
      databaseInfo: t("triton_versions.app_int_db", "Módulo aberto e universal para importação de qualquer série histórica diária de chuva em formato tabular CSV padronizado."),
      tariffInfo: t("triton_versions.app_int_tariff", "Motor de parametrização tarifária customizável para qualquer modelo internacional (taxas fixas, volumétricas lineares ou em blocos)."),
      githubUrl: "https://github.com/igorcmvaz/triton",
    },
  ];

  // Histórico de Versões e Changelog
  const versionsChangelog = [
    {
      version: "0.2.0",
      displayTitle: "Triton v0.2.0",
      status: t("triton_versions.v020_status", "Em desenvolvimento"),
      statusColor: "bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800",
      badge: t("triton_versions.v020_badge", "Planejada"),
      date: t("triton_versions.v020_date", "Previsto para 2026/2027"),
      githubUrl: "https://github.com/igorcmvaz/triton",
      isLatest: false,
      summary: t("triton_versions.v020_summary", "Expansão da cobertura de municípios brasileiros, suporte a simulação horária e novos pacotes instaladores nativos."),
      changes: {
        added: [
          "Exportação direta de relatórios técnicos completos e gráficos em alta resolução (vetorial SVG e PNG 300 DPI).",
          "Suporte a séries de precipitação em passo de tempo sub-diário (horário e 15 minutos).",
          "Pacotes instaladores pré-compilados para distribuições Linux (Debian/Ubuntu) e macOS (Apple Silicon)."
        ],
        changed: [
          "Expansão do banco de dados tarifário para mais de 1.000 municípios brasileiros auditados.",
          "Novo painel comparativo lado a lado de múltiplos cenários de demanda de água não potável."
        ],
        fixed: [
          "Otimização na carga de séries pluviométricas diárias muito longas (50+ anos) no banco SQLite local.",
          "Correção de arredondamento em faixas tarifárias progressivas de alta granularidade."
        ]
      }
    },
    {
      version: "0.1.0",
      displayTitle: "Triton v0.1.0 Beta",
      status: t("triton_versions.v010_status", "Lançamento Oficial"),
      statusColor: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
      badge: t("triton_versions.v010_badge", "Versão Atual (Beta)"),
      date: t("triton_versions.v010_date", "Março de 2026"),
      githubUrl: "https://github.com/igorcmvaz/triton",
      isLatest: true,
      summary: t("triton_versions.v010_summary", "Primeira versão pública e lançamento oficial da plataforma computacional Triton na UFSC, marcando a transição do Netuno para uma arquitetura moderna, integrada e multiplataforma."),
      launchHighlights: [
        {
          title: "Balanço Hídrico Diário YAS",
          desc: "Implementação completa do algoritmo contínuo Yield-After-Spillage com suporte a reservatório inferior e superior e first-flush configurável."
        },
        {
          title: "Engenharia Econômica Integrada",
          desc: "Cálculo automatizado de VPL, TIR, Payback Descontado e LCOW considerando estruturas tarifárias escalonadas de concessionárias."
        },
        {
          title: "Módulo de Avaliação do Ciclo de Vida (ACV)",
          desc: "Quantificação cradle-to-grave de pegada de carbono (kg CO₂eq) e energia embutida dos reservatórios e componentes do sistema."
        },
        {
          title: "Tomada de Decisão Multicritério (MCDA)",
          desc: "Integração nativa de 4 métodos consagrados de decisão: TOPSIS, VIKOR, SMAA-VIKOR e PROMETHEE II para ranqueamento ótimo de capacidades."
        }
      ],
      changes: {
        added: [
          "Lançamento das 3 edições independentes: Triton Brasil, Triton Ibérica e Triton Internacional.",
          "Banco de dados SQLite embutido com séries históricas e projeções climáticas CLIMBra até 2100 para o Brasil.",
          "Tarifários auditados de 652 municípios brasileiros (água, esgoto e taxa de disponibilidade).",
          "Séries pluviométricas e estruturas tarifárias reguladas de Portugal (ERSAR) e Espanha.",
          "Módulo de importação aberta de arquivos CSV de precipitação para qualquer localidade global.",
          "Interface gráfica nativa em PySide6/Qt com suporte a temas Claro e Escuro.",
          "Sistema de internacionalização multilíngue (Português do Brasil, Português Europeu, Inglês, Espanhol e Chinês)."
        ],
        changed: [
          "Migração integral da base legada em Delphi (Netuno 4) para arquitetura modular orientada a objetos em Python 3.12+.",
          "Unificação dos cálculos de balanço hídrico, viabilidade financeira e sustentabilidade ambiental em um único fluxo de trabalho."
        ],
        fixed: [
          "Eliminação de restrições de memória de versões de 32 bits, permitindo simular séries pluviométricas de 100+ anos instantaneamente."
        ]
      }
    },
    {
      version: "4.0",
      displayTitle: "Netuno 4.0",
      status: t("triton_versions.v40_status", "Versão Anterior"),
      statusColor: "bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 border-slate-200 dark:border-zinc-700",
      badge: t("triton_versions.v40_badge", "Desktop (2014)"),
      date: "2014",
      internalLink: "/netuno",
      isLatest: false,
      summary: t("triton_versions.v40_summary", "Software autônomo compilado em Delphi para Windows, consolidando-se como a principal ferramenta computacional para dimensionamento de reservatórios pluviais no Brasil por mais de uma década."),
      changes: {
        added: [
          "Interface gráfica desktop autônoma para Windows (sem dependência do Microsoft Excel).",
          "Banco com séries pluviométricas diárias de estações meteorológicas das principais capitais e cidades brasileiras.",
          "Geração automatizada de curvas de potencial de economia de água potável vs. capacidade do reservatório.",
          "Instalador executável distribuído livremente pelo LabEEE/UFSC."
        ],
        changed: [
          "Migração da estrutura baseada em macros VBA para executável compilado em Delphi.",
          "Aprimoramento do algoritmo Yield-After-Spillage para suporte a múltiplos cenários de consumo."
        ],
        fixed: [
          "Resolução de incompatibilidades decorrentes de atualizações do Microsoft Office em sistemas operacionais modernos."
        ]
      }
    },
    {
      version: "1.0-3.0",
      displayTitle: "Netuno Versões 1, 2 e 3",
      status: t("triton_versions.v123_status", "Versões Pioneiras"),
      statusColor: "bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 border-slate-200 dark:border-zinc-700",
      badge: t("triton_versions.v123_badge", "Planilhas (2000s–2012)"),
      date: "2000s–2012",
      internalLink: "/netuno",
      isLatest: false,
      summary: t("triton_versions.v123_summary", "Modelagem pioneira do balanço hídrico diário em planilhas eletrônicas com macros VBA e primeiras análises de viabilidade econômica considerando tarifas de água e esgoto."),
      changes: {
        added: [
          "Primeira modelagem computacional do balanço hídrico diário contínuo pelo método da simulação para água de chuva no Brasil.",
          "Análises de potencial de economia em Florianópolis e diversas capitais brasileiras.",
          "Cálculo inicial de tempo de retorno do investimento (Payback simples)."
        ],
        changed: [
          "Evolução das primeiras rotinas em Lotus 1-2-3 e Excel 97/2000 para planilhas automatizadas com VBA."
        ],
        fixed: [
          "Refinamentos na lógica de transbordamento (spillage) e atendimento simultâneo de demandas sanitárias."
        ]
      }
    }
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
              <span>{t("triton_versions.btn_download", "Download (v0.1.0 Beta)")}</span>
            </Link>
          </div>
        </section>

        {/* ── 🚀 VERSIONAMENTO DE CADA APLICATIVO (EDIÇÕES REGIONAIS) ── */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>{t("triton_versions.apps_title", "Versionamento por Aplicativo (Edições Regionais)")}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              {t("triton_versions.apps_desc", "Cada aplicativo do ecossistema Triton possui seu próprio pacote instalador, banco de dados regional e especificações normativas.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {appVersions.map((app) => (
              <div
                key={app.id}
                className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between space-y-4 transition-all hover:border-blue-300 dark:hover:border-blue-800"
              >
                <div className="space-y-3">
                  {/* Cabeçalho do Aplicativo */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{app.flag}</span>
                      <div>
                        <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                          {app.name}
                        </h3>
                        <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-zinc-400">
                          {app.version}
                        </span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${app.statusColor}`}>
                      {app.status}
                    </span>
                  </div>

                  {/* Informações Técnicas do Aplicativo */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-zinc-800 text-xs text-slate-600 dark:text-zinc-300">
                    <div>
                      <strong className="text-slate-900 dark:text-white font-extrabold block text-[11px]">
                        {t("triton_versions.rainfall_base", "Base Pluviométrica:")}
                      </strong>
                      <span className="text-[11px] leading-relaxed">{app.databaseInfo}</span>
                    </div>

                    <div>
                      <strong className="text-slate-900 dark:text-white font-extrabold block text-[11px]">
                        {t("triton_versions.tariff_structure", "Estrutura Tarifária:")}
                      </strong>
                      <span className="text-[11px] leading-relaxed">{app.tariffInfo}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] pt-1 text-slate-500 dark:text-zinc-400 font-medium">
                      <span><strong>{t("triton_versions.standards_label", "Norma:")}</strong> {app.standards}</span>
                      <span><strong>{t("triton_versions.currency_label", "Moeda:")}</strong> {app.currency}</span>
                    </div>
                  </div>
                </div>

                {/* Ações do Aplicativo */}
                <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between gap-2">
                  <a
                    href={app.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400 transition-colors"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>{t("triton_versions.view_github", "Ver no GitHub")}</span>
                  </a>

                  <Link
                    to="/triton"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
                  >
                    <span>{t("triton_versions.download_btn", "Download")}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
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
                  <span>{t("triton_versions.tag_changed", "Modificado")}</span>
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
                  {/* Cabeçalho da Versão (Clicável para expandir/colapsar) */}
                  <div
                    onClick={() => toggleVersion(ver.version)}
                    className="w-full text-left p-5 sm:p-6 bg-slate-50/70 hover:bg-slate-100/80 dark:bg-zinc-800/40 dark:hover:bg-zinc-800/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                          {ver.displayTitle}
                        </span>
                        <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${ver.statusColor}`}>
                          {ver.status}
                        </span>
                        {ver.badge && (
                          <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 dark:bg-blue-900/60 dark:text-blue-200 border border-blue-200 dark:border-blue-700">
                            {ver.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 font-semibold">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{ver.date}</span>
                        {!isOpen && (
                          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-bold ml-1">
                            {t("triton_versions.click_details", "• Clique para ver detalhes")}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Ações e Botão Chevron */}
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
                      {ver.internalLink && (
                        <Link
                          to={ver.internalLink}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 font-bold text-xs border border-slate-300 dark:border-zinc-700 shadow-xs transition-all"
                        >
                          <History className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>{t("triton_versions.v40_page_link", "Página Netuno")}</span>
                        </Link>
                      )}

                      <div className="p-1 rounded-lg text-slate-500 dark:text-zinc-400">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Conteúdo Expansível da Versão */}
                  {isOpen && (
                    <div className="p-6 space-y-6 border-t border-slate-100 dark:border-zinc-800">
                      {/* Resumo Direto */}
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-medium">
                        {ver.summary}
                      </p>

                      {/* Destaques de Lançamento (apenas para v0.1.0) */}
                      {ver.launchHighlights && (
                        <div className="space-y-3 pt-2">
                          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-400">
                            <Sparkles className="w-4 h-4" />
                            <span>{t("triton_versions.modules_title", "Módulos e Recursos do Lançamento:")}</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {ver.launchHighlights.map((hl, i) => (
                              <div
                                key={i}
                                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-1"
                              >
                                <span className="font-extrabold text-xs text-slate-900 dark:text-white block">
                                  • {hl.title}
                                </span>
                                <p className="text-[11px] text-slate-600 dark:text-zinc-300 leading-relaxed">
                                  {hl.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Bloco de Alterações Detalhadas (Adicionado / Modificado / Corrigido) */}
                      <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-zinc-800">
                        {/* 1. O que foi Adicionado */}
                        {ver.changes.added && ver.changes.added.length > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 dark:text-emerald-300">
                              <PlusCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              <span>{t("triton_versions.tag_added", "Adicionado")} ({ver.changes.added.length})</span>
                            </div>
                            <ul className="space-y-1.5 pl-6 list-disc text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                              {ver.changes.added.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* 2. O que foi Modificado */}
                        {ver.changes.changed && ver.changes.changed.length > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-xs font-extrabold text-blue-800 dark:text-blue-300">
                              <RefreshCw className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              <span>{t("triton_versions.tag_changed", "Modificado")} ({ver.changes.changed.length})</span>
                            </div>
                            <ul className="space-y-1.5 pl-6 list-disc text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                              {ver.changes.changed.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* 3. O que foi Corrigido */}
                        {ver.changes.fixed && ver.changes.fixed.length > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-800 dark:text-amber-300">
                              <Bug className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                              <span>{t("triton_versions.tag_fixed", "Corrigido")} ({ver.changes.fixed.length})</span>
                            </div>
                            <ul className="space-y-1.5 pl-6 list-disc text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                              {ver.changes.fixed.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
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
              <span>{t("triton_versions.matrix_title", "Matriz Comparativa das 3 Edições (v0.1.0)")}</span>
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
                  <td className="p-3.5">{t("triton_versions.modules_all_val", "YAS, 2 tanques, VPL, TIR, ACV, 4 MCDA")}</td>
                  <td className="p-3.5">{t("triton_versions.modules_all_val", "YAS, 2 tanques, VPL, TIR, ACV, 4 MCDA")}</td>
                  <td className="p-3.5">{t("triton_versions.modules_all_val", "YAS, 2 tanques, VPL, TIR, ACV, 4 MCDA")}</td>
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
                {t("triton_versions.timeline_t1_desc", "Refatoração em Python 3.12+ (PySide6, SQLite). Edições Brasil, Ibérica e Internacional integradas com balanço diário YAS, engenharia econômica completa, ACV e 4 métodos MCDA.")}
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
