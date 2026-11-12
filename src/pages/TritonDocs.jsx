import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import TritonSubNav from "../components/TritonSubNav";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  BookOpen,
  FileText,
  Download,
  Code2,
  ExternalLink,
  Droplet,
  TrendingUp,
  Leaf,
  Layers,
  Terminal,
  ShieldCheck,
  Database,
  ArrowRight
} from "lucide-react";

export default function TritonDocs() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("balanco");

  const sections = [
    {
      id: "balanco",
      title: "Balanço Hídrico Diário",
      icon: Droplet,
      badge: "Simulação Contínua",
    },
    {
      id: "economia",
      title: "Engenharia Econômica",
      icon: TrendingUp,
      badge: "VPL, TIR & Tarifas",
    },
    {
      id: "acv",
      title: "Ciclo de Vida (ACV)",
      icon: Leaf,
      badge: "Pegada de Carbono",
    },
    {
      id: "mcda",
      title: "Decisão Multicritério (MCDA)",
      icon: Layers,
      badge: "4 Métodos",
    },
    {
      id: "instalacao",
      title: "Instalação & Guia de Uso",
      icon: Terminal,
      badge: "Windows & Python",
    },
  ];

  return (
    <PageLayout>
      <div className="space-y-6 max-w-5xl mx-auto pb-12">
        {/* Sub-navegação do Triton */}
        <TritonSubNav activeTab="documentacao" />

        {/* ── HEADER DA DOCUMENTAÇÃO (LEVE NO LIGHT, PROFUNDO NO DARK) ── */}
        <section className="relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 p-6 sm:p-8 border border-slate-200 dark:border-zinc-800 shadow-sm">
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 text-xs font-black uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Documentação Técnica Oficial</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Documentação do Triton
            </h1>
            <p className="text-slate-600 dark:text-zinc-300 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
              Consulte a fundamentação matemática, equações do balanço hídrico diário (Yield-After-Spillage),
              modelagem tarifária escalonada, ACV cradle-to-grave e os manuais técnicos de cada edição.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/triton#download"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Solicitar Manuais & Instalador</span>
              </Link>
              <a
                href="https://github.com/igorcmvaz/triton"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 font-semibold text-xs sm:text-sm border border-slate-300 dark:border-zinc-700 transition-colors"
              >
                <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Código-fonte no GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>
        </section>

        {/* ── CARTÕES DOS MANUAIS TÉCNICOS POR EDIÇÃO ── */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Manuais Técnicos por Edição (PDF)</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Manual Brasil */}
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    Edição Brasil
                  </span>
                  <span className="text-xs text-slate-400 dark:text-zinc-500 font-bold">138 páginas</span>
                </div>
                <h3 className="font-black text-sm text-slate-900 dark:text-white">
                  Manual Triton Brasil (BRL)
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Calibração das tarifas de água e esgoto de 652 cidades, séries CLIMBra (histórico e projeções CMIP6), ABNT NBR 15527 e NBR 5626.
                </p>
              </div>
              <Link
                to="/triton#download"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 pt-2 border-t border-slate-100 dark:border-zinc-800"
              >
                <span>Solicitar PDF do Manual</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Manual Ibérica */}
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                    Edição Ibérica
                  </span>
                  <span className="text-xs text-slate-400 dark:text-zinc-500 font-bold">124 páginas</span>
                </div>
                <h3 className="font-black text-sm text-slate-900 dark:text-white">
                  Manual Triton Ibérica (IBE)
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Redação em Português Europeu, tarifários ERSAR e municípios espanhóis em Euros (€), séries Iberia01 / E-OBS e norma EN 16941-1.
                </p>
              </div>
              <Link
                to="/triton#download"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 dark:text-rose-400 pt-2 border-t border-slate-100 dark:border-zinc-800"
              >
                <span>Solicitar PDF do Manual</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Manual Internacional */}
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    Edição Global
                  </span>
                  <span className="text-xs text-slate-400 dark:text-zinc-500 font-bold">116 pages</span>
                </div>
                <h3 className="font-black text-sm text-slate-900 dark:text-white">
                  Triton International User Manual (INT)
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  Redação em Inglês, flexível para qualquer país e moeda, importação aberta de arquivos CSV de precipitação e conformidade ISO 14040/14044.
                </p>
              </div>
              <Link
                to="/triton#download"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 pt-2 border-t border-slate-100 dark:border-zinc-800"
              >
                <span>Solicitar PDF do Manual</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── CONTEÚDO TÉCNICO INTERATIVO POR ABAS ── */}
        <section className="bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 p-5 sm:p-7 shadow-sm space-y-6">
          {/* Navegação entre seções da documentação */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-zinc-800 scrollbar-none">
            {sections.map((sec) => {
              const active = activeSection === sec.id;
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? "bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{sec.title}</span>
                </button>
              );
            })}
          </div>

          {/* 1. Balanço Hídrico Diário */}
          {activeSection === "balanco" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                  Algoritmo Fundamental
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Balanço Hídrico Contínuo Diário (Yield-After-Spillage)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                  O Triton realiza a simulação diária com passo de tempo de 24 horas ao longo de toda a série histórica ou projetada de precipitação pluviométrica.
                  A regra operacional padrão adotada é o modelo <strong>Yield-After-Spillage (YAS)</strong>, comprovadamente mais conservador e realista para edificações brasileiras e internacionais.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                    <Droplet className="w-3.5 h-3.5 text-blue-500" />
                    Balanço de Massa no Dia t
                  </h4>
                  <div className="font-mono text-xs p-3 rounded-xl bg-slate-100 text-slate-900 dark:bg-zinc-950 dark:text-emerald-400 border border-slate-200 dark:border-zinc-800 overflow-x-auto">
                    V_t = min(V_max, V_{"{t-1}"} + Q_in,t) - Y_t
                  </div>
                  <ul className="text-xs text-slate-600 dark:text-zinc-300 space-y-1 pt-1 list-disc list-inside">
                    <li><strong>V_t:</strong> Volume armazenado no final do dia t (litros ou m³)</li>
                    <li><strong>Q_in,t:</strong> Volume captado após desconto de first-flush e escoamento superficial (runoff)</li>
                    <li><strong>Y_t:</strong> Volume fornecido para atender as demandas não potáveis</li>
                    <li><strong>V_max:</strong> Capacidade útil do reservatório de armazenamento</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    Descarte de Primeiras Águas (First-Flush)
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                    O Triton permite configurar o dispositivo de descarte inicial tanto por <strong>volume absoluto fixo</strong> (litros) quanto por <strong>lâmina precipitada inicial</strong> (milímetros sobre a área de captação).
                  </p>
                  <div className="font-mono text-xs p-3 rounded-xl bg-slate-100 text-slate-900 dark:bg-zinc-950 dark:text-emerald-400 border border-slate-200 dark:border-zinc-800 overflow-x-auto">
                    Q_in,t = max(0, (P_t - FF) × A_cobertura × C_runoff × η_filtro)
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                    Onde FF é a lâmina de descarte (tipicamente 1 a 2 mm, conforme ABNT NBR 15527 e EN 16941-1).
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-blue-900 dark:text-blue-300">
                  Tanque Único vs. Dois Tanques (Cisterna + Reservatório Superior)
                </h4>
                <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">
                  Para edificações com alimentação por gravidade, o Triton modela a dinâmica de <strong>tanques duplos</strong>: uma cisterna inferior (armazenamento principal) e um reservatório superior com boia de nível e bomba de recalque. O cálculo computa com precisão o consumo de energia elétrica de bombeamento (kWh/ano) e o volume de água de chuva disponibilizado na rede predial.
                </p>
              </div>
            </div>
          )}

          {/* 2. Engenharia Econômica */}
          {activeSection === "economia" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                  Avaliação Financeira Realista
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Engenharia Econômica & Estrutura Tarifária
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                  Diferente de cálculos simplistas baseados em tarifa média fixa, o Triton implementa a <strong>fórmula exata de cobrança progressiva por blocos de consumo</strong> das concessionárias de saneamento.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-1.5">
                  <span className="text-xs font-black text-slate-900 dark:text-white">VPL (Valor Presente Líquido)</span>
                  <div className="font-mono text-xs p-2 rounded-xl bg-slate-100 text-slate-900 dark:bg-zinc-950 dark:text-emerald-400 border border-slate-200 dark:border-zinc-800">
                    VPL = ∑ [FC_t / (1 + i)^t] - I_0
                  </div>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 pt-1">
                    Fluxo de caixa descontado considerando inflação da tarifa de água, custos de energia e manutenção periódica.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-1.5">
                  <span className="text-xs font-black text-slate-900 dark:text-white">TIR & Payback Descontado</span>
                  <div className="font-mono text-xs p-2 rounded-xl bg-slate-100 text-slate-900 dark:bg-zinc-950 dark:text-emerald-400 border border-slate-200 dark:border-zinc-800">
                    VPL(TIR) = 0
                  </div>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 pt-1">
                    Determinação do tempo exato de retorno do investimento frente a uma taxa mínima de atratividade (TMA).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-1.5">
                  <span className="text-xs font-black text-slate-900 dark:text-white">LCOW (Custo Nivelado)</span>
                  <div className="font-mono text-xs p-2 rounded-xl bg-slate-100 text-slate-900 dark:bg-zinc-950 dark:text-emerald-400 border border-slate-200 dark:border-zinc-800">
                    LCOW = CAPEX + OPEX_VP / ∑ Água_t
                  </div>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 pt-1">
                    Custo nivelado por m³ de água pluvial produzida ao longo de 20 a 50 anos de vida útil do sistema.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
                  Tarifas Progressivas em Cascata (652 Municípios Cadastrados)
                </h4>
                <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">
                  A economia financeira gerada por um sistema de água de chuva reduz o volume consumido da concessionária nas <strong>faixas marginais mais caras</strong>. O Triton calcula a conta mensal de água e esgoto antes e depois do sistema, aplicando os decretos tarifários vigentes, tarifas mínimas e percentuais de esgotamento sanitário específicos da localidade.
                </p>
              </div>
            </div>
          )}

          {/* 3. Avaliação de Ciclo de Vida (ACV) */}
          {activeSection === "acv" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase text-teal-600 dark:text-teal-400 tracking-wider">
                  Sustentabilidade & Carbono
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Avaliação do Ciclo de Vida (ACV) Cradle-to-Grave
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                  O Triton é a primeira ferramenta de simulação contínua brasileira a integrar a <strong>pegada de carbono incorporada e operacional</strong> diretamente na tomada de decisão de dimensionamento.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-2">
                  <h4 className="text-xs font-black uppercase text-slate-800 dark:text-zinc-200">
                    Emissões Incorporadas da Infraestrutura
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                    Contabiliza as emissões de gases de efeito estufa (kg CO₂eq) associadas à extração de matéria-prima, fabricação e transporte de:
                  </p>
                  <ul className="text-xs text-slate-600 dark:text-zinc-300 space-y-1 list-disc list-inside">
                    <li>Reservatórios (Polietileno de alta densidade, concreto armado ou fibra)</li>
                    <li>Conjunto motobomba e pressurizador predial</li>
                    <li>Tubulações em PVC rígido e conexões hidráulicas</li>
                    <li>Filtros autolimpantes de primeiras águas</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-2">
                  <h4 className="text-xs font-black uppercase text-slate-800 dark:text-zinc-200">
                    Créditos Ambientais da Água Evitada
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                    A cada metro cúbico de água potável poupada da rede pública, evita-se a captação, tratamento químico intensivo e bombeamento das adutoras da concessionária:
                  </p>
                  <div className="font-mono text-xs p-3 rounded-xl bg-slate-100 text-slate-900 dark:bg-zinc-950 dark:text-teal-300 border border-slate-200 dark:border-zinc-800">
                    Balanço_CO2 = ∑ (Água_poupada × Fator_rede) - (Emissões_materiais + Emissões_bombeamento)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Decisão Multicritério (MCDA) */}
          {activeSection === "mcda" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase text-purple-600 dark:text-purple-400 tracking-wider">
                  Otimização de Projeto
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Tomada de Decisão Multicritério (4 Métodos)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                  Qual é o volume ideal de reservatório quando o maior retorno financeiro não coincide com a maior economia de água ou menor pegada de carbono?
                  O Triton resolve esse dilema com 4 métodos consagrados de Pesquisa Operacional e MCDA:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-1.5">
                  <span className="text-xs font-black text-purple-700 dark:text-purple-300">1. TOPSIS</span>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                    Classifica as alternativas pela proximidade geométrica da Solução Ideal Positiva e distância da Solução Ideal Negativa.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-1.5">
                  <span className="text-xs font-black text-purple-700 dark:text-purple-300">2. VIKOR</span>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                    Focado na determinação de uma solução de compromisso, ponderando a utilidade da maioria e o pesar do opositor.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-1.5">
                  <span className="text-xs font-black text-purple-700 dark:text-purple-300">3. SMAA-VIKOR</span>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                    Análise Estocástica de Aceitabilidade Multicritério acoplada ao VIKOR para cenários de pesos incertos ou preferências desconhecidas.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-1.5">
                  <span className="text-xs font-black text-purple-700 dark:text-purple-300">4. PROMETHEE II</span>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                    Método de sobreclassificação com fluxos de preferências líquidos positivos e negativos para ordenação completa de capacidades.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 5. Instalação & Guia de Uso */}
          {activeSection === "instalacao" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                  Guia Rápido
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Instalação e Execução
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                  O Triton está disponível tanto na forma de <strong>instalador compilado autônomo para Microsoft Windows (.exe)</strong> quanto em <strong>código-fonte aberto em Python 3.12+</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Instalador Windows */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-emerald-600" />
                    Instalador Desktop (.exe)
                  </h4>
                  <ol className="text-xs text-slate-600 dark:text-zinc-300 space-y-2 list-decimal list-inside">
                    <li>Solicite o acesso gratuito através da página oficial do portal UFSC.</li>
                    <li>Execute o instalador <code className="font-mono text-slate-800 dark:text-zinc-200 bg-slate-200 dark:bg-zinc-700 px-1 py-0.5 rounded">Triton_Brasil_Setup_v0.1.0.exe</code>.</li>
                    <li>Siga o assistente de instalação (compatível com Windows 10 e Windows 11).</li>
                    <li>O programa cria um atalho na Área de Trabalho e traz embutido o banco de dados de tarifas e chuvas.</li>
                  </ol>
                </div>

                {/* Executar a partir do código-fonte */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-blue-600" />
                    Executar via Python 3.12+
                  </h4>
                  <div className="font-mono text-[11px] p-3 rounded-xl bg-slate-100 text-slate-900 dark:bg-zinc-950 dark:text-emerald-400 border border-slate-200 dark:border-zinc-800 space-y-1">
                    <p className="text-slate-500 dark:text-zinc-500"># Clonar repositório e acessar edição</p>
                    <p>git clone https://github.com/igorcmvaz/triton.git</p>
                    <p>cd triton/triton_brl</p>
                    <p className="text-slate-500 dark:text-zinc-500 pt-1"># Instalar dependências e executar</p>
                    <p>pip install -r requirements.txt</p>
                    <p>python main.py</p>
                  </div>
                </div>
              </div>

              {/* Formatação CSV de chuva */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-indigo-500" />
                  Como importar séries de chuva personalizadas (.CSV)
                </h4>
                <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                  Para importar medições pluviométricas locais ou dados de pluviômetros próprios, estruture o arquivo CSV com codificação UTF-8 e duas colunas:
                </p>
                <div className="font-mono text-xs p-3 rounded-xl bg-slate-100 text-slate-900 dark:bg-zinc-950 dark:text-emerald-400 border border-slate-200 dark:border-zinc-800 overflow-x-auto">
                  data,precipitacao_mm<br />
                  2020-01-01,14.2<br />
                  2020-01-02,0.0<br />
                  2020-01-03,32.6
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── CARD DE CHAMADA PARA DOWNLOAD OU SUPORTE ── */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-black text-slate-900 dark:text-white text-base">
              Precisa do instalador ou tem dúvidas técnicas?
            </h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400">
              Solicite o acesso oficial ou entre em contato direto com a equipe de desenvolvimento da UFSC.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/triton#download"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Solicitar Download</span>
            </Link>
            <Link
              to="/triton/contato"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-100 font-bold text-xs border border-slate-200 dark:border-zinc-700 transition-colors"
            >
              <span>Contato & Sugestões</span>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
