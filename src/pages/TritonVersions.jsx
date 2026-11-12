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
  CheckCircle2,
  AlertCircle,
  Bug,
  RefreshCw,
  PlusCircle,
  Calendar,
  GitBranch,
  ArrowRight
} from "lucide-react";

export default function TritonVersions() {
  const { t } = useTranslation();
  const [filterType, setFilterType] = useState("all"); // 'all' | '0.1.0' | '0.2.0'

  // Dados das Versões do Triton (Estrutura de Changelog)
  const versions = [
    {
      version: "0.2.0",
      status: "Em desenvolvimento",
      statusColor: "bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800",
      date: "Previsto para 2026/2027",
      githubUrl: "https://github.com/igorcmvaz/triton",
      summary: "Expansão da cobertura tarifária brasileira, suporte a passo de tempo horário e instaladores multiplataforma nativos.",
      changes: {
        added: [
          "Exportação direta de relatórios executivos e gráficos em alta resolução (vetorial SVG e PNG 300 DPI).",
          "Suporte a arquivos de precipitação com passo temporal sub-diário (horário e 15 minutos).",
          "Pacotes instaladores pré-compilados para distribuições Linux (Debian/Ubuntu) e macOS (Apple Silicon)."
        ],
        changed: [
          "Expansão do banco de dados tarifário para mais de 1.000 municípios brasileiros auditados.",
          "Otimização computacional do motor YAS com vetorização avançada em NumPy, reduzindo tempo de simulação para séries longas (50+ anos).",
          "Aprimoramento da interface gráfica Qt6 com suporte nativo a troca de temas claro/escuro."
        ],
        fixed: [
          "Ajuste na rotina de cálculo do LCOW para tarifas combinadas (comercial + residencial sob a mesma medição).",
          "Tratamento automático de dados faltantes ou nulos em séries históricas importadas via CSV.",
          "Correção de arredondamento em anos bissextos para séries climáticas centenárias."
        ]
      }
    },
    {
      version: "0.1.0",
      status: "Lançamento Oficial",
      statusColor: "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
      badge: "Versão Atual (Beta)",
      date: "Março de 2026",
      githubUrl: "https://github.com/igorcmvaz/triton",
      isLatest: true,
      summary: "Primeira versão pública e lançamento oficial da plataforma Triton na UFSC, marcando a transição do Netuno para uma arquitetura moderna, integrada e multiplataforma.",
      launchHighlights: [
        {
          title: "Motor de Simulação Diária (YAS)",
          desc: "Algoritmo Yield-After-Spillage com suporte a múltiplos tanques (inferior e superior), descarte automático do primeiro milímetro (first flush) e dimensionamento de reservatório por confiabilidade volumétrica."
        },
        {
          title: "Três Edições Regionais Integradas",
          desc: "Edição Brasil (BRL) com 652 cidades e projeções CLIMBra até 2100; Edição Ibérica (IBE) com dados de Portugal e Espanha em Euros (€); e Edição Internacional (INT) com importação aberta de arquivos CSV."
        },
        {
          title: "Engenharia Econômica Automatizada",
          desc: "Cálculo completo de VPL, TIR, Payback Simples e Descontado, Relação B/C e Custo Nivelado da Água (LCOW), considerando tarifas reais em blocos de consumo e esgoto."
        },
        {
          title: "Módulo de Avaliação do Ciclo de Vida (ACV)",
          desc: "Abordagem cradle-to-grave para quantificação de emissões de carbono (kg CO₂-eq) e consumo energético para reservatórios em PEAD, fibra de vidro e concreto."
        },
        {
          title: "Tomada de Decisão Multicritério (MCDA)",
          desc: "4 métodos matemáticos acoplados (TOPSIS, SAW, VIKOR e PROMETHEE II) para ranqueamento automatizado de alternativas de investimento."
        },
        {
          title: "Arquitetura Moderna em Python & Qt6",
          desc: "Desenvolvido em Python 3.12+ com interface PySide6/Qt6, manipulação eficiente com Pandas/NumPy, gráficos vetoriais Matplotlib e persistência local em SQLite."
        }
      ],
      changes: {
        added: [
          "Lançamento da plataforma computacional Triton v0.1.0 Beta para simulação e dimensionamento de reservatórios pluviais.",
          "Interface gráfica desktop desenvolvida com PySide6 (Qt6) e estilização moderna.",
          "Banco de dados SQLite embarcado com tarifas de 652 municípios brasileiros e séries de precipitação.",
          "Módulos integrados: Balanço Hídrico YAS, Engenharia Econômica, ACV Ambiental e MCDA (4 métodos).",
          "Instalador dedicado para Windows x64 com todas as dependências pré-configuradas."
        ],
        changed: [
          "Transição da base legada em Delphi (Netuno 4) para código moderno e auditável em Python 3.12+.",
          "Substituição de planilhas isoladas por fluxo integrado em janela única com navegação em abas.",
          "Aprimoramento do modelo de balanço hídrico para comportar perdas por evaporação e descarte inicial."
        ],
        fixed: [
          "Eliminação de restrições de memória de versões de 32 bits, permitindo simular séries pluviométricas de 100+ anos instantaneamente."
        ]
      }
    }
  ];

  // Linha do tempo histórica de evolução
  const historyTimeline = [
    {
      year: "2026",
      version: "Triton 0.1.0 Beta",
      badge: "Geração Atual",
      badgeColor: "bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      title: "Lançamento da Plataforma Triton",
      authors: "Igor Catão Martins Vaz & Prof. Enedir Ghisi",
      desc: "Refatoração arquitetural em Python 3.12+ (PySide6, NumPy, SQLite). Integração de 3 edições regionais, ACV cradle-to-grave, viabilidade econômica tarifária e 4 métodos MCDA.",
      active: true,
    },
    {
      year: "2014",
      version: "Netuno 4.0",
      badge: "Software Desktop",
      badgeColor: "bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 border-slate-200 dark:border-zinc-700",
      title: "Consolidação Nacional em Delphi",
      authors: "Prof. Enedir Ghisi e Eng. Marcelo Marcel Cordova",
      desc: "Software autônomo para Windows. Principal ferramenta computacional para dimensionamento de reservatórios pluviais no Brasil por mais de 10 anos.",
      active: false,
    },
    {
      year: "2011–2013",
      version: "Netuno 3.0",
      badge: "Planilhas Avançadas",
      badgeColor: "bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 border-slate-200 dark:border-zinc-700",
      title: "Análise Econômica & Simulações Urbanas",
      authors: "Prof. Enedir Ghisi e equipe LabEEE/UFSC",
      desc: "Primeiras rotinas de viabilidade econômica com fluxos de caixa e sensibilidade a tarifas municipais de água e esgoto.",
      active: false,
    },
    {
      year: "2000s–2006",
      version: "Netuno 1 & 2",
      badge: "Pioneirismo",
      badgeColor: "bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300 border-slate-200 dark:border-zinc-700",
      title: "Fundação do Modelo em VBA/Excel",
      authors: "Prof. Enedir Ghisi",
      desc: "Modelagem inicial do balanço hídrico diário Yield-After-Spillage em planilhas eletrônicas, fundamentando as primeiras publicações científicas nacionais sobre o tema.",
      active: false,
    },
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
              <span>Changelog & Ciclo de Lançamentos</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Histórico de Versões e Atualizações do Triton
            </h1>
            <p className="text-slate-600 dark:text-zinc-300 text-xs sm:text-sm font-medium leading-relaxed max-w-3xl">
              Consulte os detalhes técnicos de cada versão do Triton: notas de lançamento, novos recursos implementados, melhorias e correções. O código-fonte e os lançamentos oficiais são mantidos de forma aberta e auditável no GitHub.
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
              <span>Acessar Repositório no GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            <Link
              to="/triton"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Solicitar Download (v0.1.0 Beta)</span>
            </Link>
          </div>
        </section>

        {/* ── LEGENDA DE TIPOS DE MUDANÇA (PADRÃO CONVENTIONAL CHANGELOG) ── */}
        <section className="bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-slate-200 dark:border-zinc-800 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-bold text-slate-700 dark:text-zinc-300">
              Categorias de atualização em cada versão:
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100/80 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800">
                <PlusCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Adicionado / Lançamento</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-100/80 text-blue-900 dark:bg-blue-950/60 dark:text-blue-300 font-bold border border-blue-300 dark:border-blue-800">
                <RefreshCw className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Modificado / Melhorias</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-100/80 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-800">
                <Bug className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Corrigido / Correções</span>
              </span>
            </div>
          </div>
        </section>

        {/* ── DETALHES POR VERSÃO (FOCO PRINCIPAL REQUISITADO PELO USUÁRIO) ── */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Registro Detalhado por Versão</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Detalhes diretos sobre o que cada pacote entrega, módulos novos, alterações de algoritmo e correções de código.
            </p>
          </div>

          <div className="space-y-6">
            {versions.map((ver) => (
              <div
                key={ver.version}
                className={`rounded-3xl border shadow-sm transition-all overflow-hidden bg-white dark:bg-zinc-900 ${
                  ver.isLatest
                    ? "border-blue-300 dark:border-blue-800/80 ring-1 ring-blue-200 dark:ring-blue-900/40"
                    : "border-slate-200 dark:border-zinc-800"
                }`}
              >
                {/* Cabeçalho da Versão */}
                <div className="p-6 border-b border-slate-100 dark:border-zinc-800/80 bg-slate-50/70 dark:bg-zinc-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                        Triton v{ver.version}
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
                    </div>
                  </div>

                  {/* Link Rápido para o GitHub */}
                  <div>
                    <a
                      href={ver.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 font-bold text-xs border border-slate-300 dark:border-zinc-700 shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      <Code2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Ver no GitHub</span>
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  </div>
                </div>

                {/* Conteúdo da Versão */}
                <div className="p-6 space-y-6">
                  {/* Resumo Direto */}
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 leading-relaxed font-medium">
                    {ver.summary}
                  </p>

                  {/* Destaques de Lançamento (apenas para v0.1.0) */}
                  {ver.launchHighlights && (
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-400">
                        <Sparkles className="w-4 h-4" />
                        <span>Módulos e Recursos do Lançamento:</span>
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
                    {/* 1. O que foi Adicionado / Lançado */}
                    {ver.changes.added && ver.changes.added.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 dark:text-emerald-300">
                          <PlusCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span>Adicionado ({ver.changes.added.length})</span>
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
                          <span>Modificado / Aprimorado ({ver.changes.changed.length})</span>
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
                          <span>Corrigido ({ver.changes.fixed.length})</span>
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
              </div>
            ))}
          </div>
        </section>

        {/* ── COMPARATIVO DETALHADO DAS 3 EDIÇÕES REGIONAIS ── */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Comparativo das 3 Edições Regionais (v0.1.0)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Todas as três edições rodam sobre o mesmo motor computacional validado e são fornecidas com instalador e documentação técnica específicos.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs bg-white dark:bg-zinc-900">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-zinc-800/80 border-b border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300">
                  <th className="p-3.5 font-black">Recurso / Parâmetro</th>
                  <th className="p-3.5 font-black text-emerald-700 dark:text-emerald-400">🇧🇷 Triton Brasil (BRL)</th>
                  <th className="p-3.5 font-black text-rose-700 dark:text-rose-400">🇵🇹 Triton Ibérica (IBE)</th>
                  <th className="p-3.5 font-black text-blue-700 dark:text-blue-400">🌐 Triton Internacional (INT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-600 dark:text-zinc-300">
                <tr>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">Base Pluviométrica</td>
                  <td className="p-3.5">CLIMBra (séries históricas + projeções SSP2-4.5 / SSP5-8.5 até 2100)</td>
                  <td className="p-3.5">E-OBS, Iberia01 e ERA5 por concelho/município</td>
                  <td className="p-3.5">Importação aberta de arquivos CSV de qualquer localidade</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">Banco de Tarifas</td>
                  <td className="p-3.5">652 municípios brasileiros auditados (água, esgoto e tarifa mínima)</td>
                  <td className="p-3.5">Tarifários regulados ERSAR (Portugal) e Espanha em Euros (€)</td>
                  <td className="p-3.5">Parametrização livre para qualquer moeda e estrutura em blocos</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">Normas Técnicas</td>
                  <td className="p-3.5">ABNT NBR 15527:2019 e NBR 5626</td>
                  <td className="p-3.5">Norma Europeia EN 16941-1</td>
                  <td className="p-3.5">Padrões internacionais e ISO 14040/14044 (ACV)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">Moeda Nativa</td>
                  <td className="p-3.5">Real Brasileiro (R$)</td>
                  <td className="p-3.5">Euro (€)</td>
                  <td className="p-3.5">Qualquer símbolo monetário ($, €, £, R$, etc.)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">Idiomas da Interface</td>
                  <td className="p-3.5">Português do Brasil</td>
                  <td className="p-3.5">Português Europeu</td>
                  <td className="p-3.5">Inglês, Português, Espanhol e Chinês</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white">Módulos Inclusos</td>
                  <td className="p-3.5">YAS, 2 tanques, VPL, TIR, ACV, 4 MCDA</td>
                  <td className="p-3.5">YAS, 2 tanques, VPL, TIR, ACV, 4 MCDA</td>
                  <td className="p-3.5">YAS, 2 tanques, VPL, TIR, ACV, 4 MCDA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── LINHA DO TEMPO HISTÓRICA: DO NETUNO AO TRITON ── */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Legado e Ancestralidade (Netuno 1 a 4)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Mais de duas décadas de validação contínua e pioneirismo das ferramentas de simulação pluvial desenvolvidas pelo grupo na UFSC.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-zinc-800">
            {historyTimeline.map((item, idx) => (
              <div key={idx} className="relative space-y-2">
                <div
                  className={`absolute -left-6 sm:-left-8 top-1.5 w-5 h-5 rounded-full border-2 border-white dark:border-zinc-900 flex items-center justify-center shadow-xs ${
                    item.active ? "bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-900/50" : "bg-slate-300 dark:bg-zinc-700"
                  }`}
                />

                <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        {item.year}
                      </span>
                      <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                        {item.version}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
                      {item.authors}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
