import React from "react";
import PageLayout from "../components/PageLayout";
import TritonSubNav from "../components/TritonSubNav";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Layers,
  Sparkles,
  History,
  CheckCircle2,
  Calendar,
  Globe,
  ArrowRight,
  Code2,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Download,
  GitBranch,
  Milestone
} from "lucide-react";

export default function TritonVersions() {
  const { t } = useTranslation();

  const timeline = [
    {
      year: "2026",
      version: "Triton 0.1.0 Beta",
      badge: "Geração Atual",
      badgeColor: "bg-blue-600 text-white",
      title: "Lançamento da Plataforma Triton",
      authors: "Igor Catão Martins Vaz & Prof. Enedir Ghisi",
      desc: "Refatoração arquitetural completa em Python 3.12+ (PySide6/Qt6, NumPy, Pandas, Matplotlib e SQLite). Introdução de 3 edições regionais (Brasil, Ibérica e Internacional), avaliação de ciclo de vida (ACV cradle-to-grave), engenharia econômica com tarifas reais e 4 métodos de decisão multicritério (MCDA).",
      active: true,
    },
    {
      year: "2014",
      version: "Netuno 4.0",
      badge: "Software Desktop",
      badgeColor: "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-zinc-200",
      title: "Consolidação e Ampla Adoção Nacional",
      authors: "Prof. Enedir Ghisi e Eng. Marcelo Marcel Cordova",
      desc: "Software compilado autônomo para Microsoft Windows em Delphi. Tornou-se a principal ferramenta computacional para dimensionamento de reservatórios pluviais no Brasil, utilizado em centenas de universidades, consultorias e artigos científicos.",
      active: false,
    },
    {
      year: "2011–2013",
      version: "Netuno 3.0",
      badge: "Planilhas Avançadas",
      badgeColor: "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-zinc-200",
      title: "Análise Econômica & Simulações Urbanas",
      authors: "Prof. Enedir Ghisi e equipe UFSC",
      desc: "Implementação das primeiras rotinas automatizadas de viabilidade econômica com fluxos de caixa e sensibilidade a tarifas de água e esgoto em cidades brasileiras.",
      active: false,
    },
    {
      year: "2000s–2006",
      version: "Netuno 1 & 2",
      badge: "Pioneirismo",
      badgeColor: "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-zinc-200",
      title: "Fundação do Modelo em Excel/VBA",
      authors: "Prof. Enedir Ghisi",
      desc: "Modelagem inicial do balanço hídrico diário Yield-After-Spillage em planilhas eletrônicas. Base para os artigos pioneiros sobre potencial de economia de água potável no sul e sudeste do Brasil.",
      active: false,
    },
  ];

  return (
    <PageLayout>
      <div className="space-y-6 max-w-5xl mx-auto pb-12">
        {/* Sub-navegação do Triton */}
        <TritonSubNav activeTab="versoes" />

        {/* ── HEADER DE VERSÕES ── */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 border border-blue-500/20 shadow-lg">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-black uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Ciclo de Vida & Edições</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Versões e Edições do Triton
            </h1>
            <p className="text-slate-300 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
              O Triton é projetado em três edições regionais coordenadas, compartilhando o mesmo núcleo computacional validado
              e expandindo o legado de mais de 20 anos da família de softwares Netuno.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <Link
                to="/triton#download"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Solicitar Versão v0.1.0 Beta</span>
              </Link>
              <Link
                to="/netuno"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-colors"
              >
                <History className="w-4 h-4 text-blue-400" />
                <span>Ver Página Histórica do Netuno 4</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── COMPARATIVO DETALHADO DAS 3 EDIÇÕES ── */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Comparativo das 3 Edições Regionais (v0.1.0)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Todas as três edições rodam sobre o mesmo motor computacional e são fornecidas com instalador e manual específicos.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <th className="p-3.5 font-black">Recurso / Parâmetro</th>
                  <th className="p-3.5 font-black text-emerald-700 dark:text-emerald-400">🇧🇷 Triton Brasil (BRL)</th>
                  <th className="p-3.5 font-black text-rose-700 dark:text-rose-400">🇵🇹 Triton Ibérica (IBE)</th>
                  <th className="p-3.5 font-black text-blue-700 dark:text-blue-400">🌐 Triton Internacional (INT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
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
              <span>Linha do Tempo e Evolução (2000s–2026)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Mais de duas décadas de aprimoramento contínuo das ferramentas de aproveitamento de água de chuva na UFSC.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative space-y-2">
                {/* Marcador na linha */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-1.5 w-5 h-5 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center shadow-sm ${
                    item.active ? "bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-900/50" : "bg-slate-400 dark:bg-slate-600"
                  }`}
                />

                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        {item.year}
                      </span>
                      <span className={`text-[11px] font-black px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                        {item.version}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {item.authors}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ROADMAP DE DESENVOLVIMENTO FUTURO ── */}
        <section className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Milestone className="w-5 h-5 text-emerald-600" />
              <span>Roadmap de Desenvolvimento</span>
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">2026–2027</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-black text-blue-600 dark:text-blue-400">v0.2.0 (Em breve)</span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Expansão da base de tarifas para 1.000 cidades brasileiras e suporte a simulações horárias de chuva.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-black text-emerald-600 dark:text-emerald-400">v0.3.0</span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Pacotes instaladores nativos para distribuições Linux (Debian/Ubuntu) e macOS (Apple Silicon).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-black text-purple-600 dark:text-purple-400">v1.0.0 Estável</span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Módulo acoplado de Drenagem Urbana Sustentável (SUDS), telhados verdes e exportação para BIM/IFC.
              </p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
