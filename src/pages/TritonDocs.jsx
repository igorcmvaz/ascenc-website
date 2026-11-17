import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import TritonSubNav from "../components/TritonSubNav";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";
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
      title: t("triton_docs.tab_balanco", "Balanço Hídrico Diário"),
      icon: Droplet,
      badge: t("triton_docs.tab_balanco_badge", "Simulação Contínua"),
    },
    {
      id: "economia",
      title: t("triton_docs.tab_economia", "Engenharia Econômica"),
      icon: TrendingUp,
      badge: t("triton_docs.tab_economia_badge", "VPL, TIR & Tarifas"),
    },
    {
      id: "acv",
      title: t("triton_docs.tab_acv", "Ciclo de Vida (ACV)"),
      icon: Leaf,
      badge: t("triton_docs.tab_acv_badge", "Pegada de Carbono"),
    },
    {
      id: "mcda",
      title: t("triton_docs.tab_mcda", "Decisão Multicritério (MCDA)"),
      icon: Layers,
      badge: t("triton_docs.tab_mcda_badge", "4 Métodos"),
    },
    {
      id: "instalacao",
      title: t("triton_docs.tab_instalacao", "Instalação & Guia de Uso"),
      icon: Terminal,
      badge: t("triton_docs.tab_instalacao_badge", "Windows & Python"),
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
              <span>{t("triton_docs.badge", "Documentação Técnica Oficial")}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {t("triton_docs.title", "Documentação do Triton")}
            </h1>
            <p className="text-slate-600 dark:text-zinc-300 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
              {t("triton_docs.subtitle", "Consulte a fundamentação matemática, equações do balanço hídrico diário (Yield-After-Spillage), modelagem tarifária escalonada, ACV cradle-to-grave e os manuais técnicos de cada edição.")}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/triton#download"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                <span>{t("triton_docs.btn_request_manuals", "Solicitar Manuais & Instalador")}</span>
              </Link>
              <a
                href="https://github.com/igorcmvaz/triton"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 font-semibold text-xs sm:text-sm border border-slate-300 dark:border-zinc-700 transition-colors"
              >
                <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t("triton_docs.btn_github", "Código-fonte no GitHub")}</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>
        </section>

        {/* ── CARTÕES DOS MANUAIS TÉCNICOS POR EDIÇÃO ── */}
        <section className="space-y-3">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>{t("triton_docs.manuals_section_title", "Manuais Técnicos por Edição (PDF)")}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Manual Brasil */}
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {t("triton_docs.manual_brl_badge", "Edição Brasil")}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-zinc-500 font-bold">{t("triton_docs.manual_brl_pages", "138 páginas")}</span>
                </div>
                <h3 className="font-black text-sm text-slate-900 dark:text-white">
                  {t("triton_docs.manual_brl_title", "Manual Triton Brasil (BRL)")}
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  {t("triton_docs.manual_brl_desc", "Calibração das tarifas de água e esgoto de 652 cidades, séries CLIMBra (histórico e projeções CMIP6), ABNT NBR 15527 e NBR 5626.")}
                </p>
              </div>
              <Link
                to="/triton#download"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 pt-2 border-t border-slate-100 dark:border-zinc-800"
              >
                <span>{t("triton_docs.btn_request_pdf", "Solicitar PDF do Manual")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Manual Ibérica */}
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-rose-50 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                    {t("triton_docs.manual_ibe_badge", "Edição Ibérica")}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-zinc-500 font-bold">{t("triton_docs.manual_ibe_pages", "124 páginas")}</span>
                </div>
                <h3 className="font-black text-sm text-slate-900 dark:text-white">
                  {t("triton_docs.manual_ibe_title", "Manual Triton Ibérica (IBE)")}
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  {t("triton_docs.manual_ibe_desc", "Redação em Português Europeu, tarifários ERSAR e municípios espanhóis em Euros (€), séries Iberia01 / E-OBS e norma EN 16941-1.")}
                </p>
              </div>
              <Link
                to="/triton#download"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 dark:text-rose-400 pt-2 border-t border-slate-100 dark:border-zinc-800"
              >
                <span>{t("triton_docs.btn_request_pdf", "Solicitar PDF do Manual")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Manual Internacional */}
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    {t("triton_docs.manual_int_badge", "Edição Global")}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-zinc-500 font-bold">{t("triton_docs.manual_int_pages", "116 pages")}</span>
                </div>
                <h3 className="font-black text-sm text-slate-900 dark:text-white">
                  {t("triton_docs.manual_int_title", "Triton International User Manual (INT)")}
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  {t("triton_docs.manual_int_desc", "Redação em Inglês, flexível para qualquer país e moeda, importação aberta de arquivos CSV de precipitação e conformidade ISO 14040/14044.")}
                </p>
              </div>
              <Link
                to="/triton#download"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 pt-2 border-t border-slate-100 dark:border-zinc-800"
              >
                <span>{t("triton_docs.btn_request_pdf", "Solicitar PDF do Manual")}</span>
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

          {/* 1. Balanço hídrico diário */}
          {activeSection === "balanco" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                  {t("triton_docs.bal_kicker")}
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">{t("triton_docs.bal_title")}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                  <Trans i18nKey="triton_docs.bal_intro" components={{ b: <strong /> }} />
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                    <Droplet className="w-3.5 h-3.5 text-blue-500" />
                    {t("triton_docs.bal_mass_title")}
                  </h4>
                  <div className="font-mono text-xs p-3 rounded-xl bg-slate-100 text-slate-900 dark:bg-zinc-950 dark:text-emerald-400 border border-slate-200 dark:border-zinc-800 overflow-x-auto">
                    V_t = min(V_max, V_{"{t-1}"} + Q_in,t) - Y_t
                  </div>
                  <ul className="text-xs text-slate-600 dark:text-zinc-300 space-y-1 pt-1 list-disc list-inside">
                    <li><strong>V_t:</strong> {t("triton_docs.bal_vt")}</li>
                    <li><strong>Q_in,t:</strong> {t("triton_docs.bal_qin")}</li>
                    <li><strong>Y_t:</strong> {t("triton_docs.bal_yt")}</li>
                    <li><strong>V_max:</strong> {t("triton_docs.bal_vmax")}</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    {t("triton_docs.ff_title")}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                    <Trans i18nKey="triton_docs.ff_desc" components={{ b: <strong /> }} />
                  </p>
                  <div className="font-mono text-xs p-3 rounded-xl bg-slate-100 text-slate-900 dark:bg-zinc-950 dark:text-emerald-400 border border-slate-200 dark:border-zinc-800 overflow-x-auto">
                    Q_in,t = max(0, P_t - FF) × A × C
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400">{t("triton_docs.ff_note")}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-blue-900 dark:text-blue-300">
                  {t("triton_docs.tanks_title")}
                </h4>
                <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">
                  <Trans i18nKey="triton_docs.tanks_desc" components={{ b: <strong /> }} />
                </p>
              </div>
            </div>
          )}

          {/* 2. Engenharia econômica */}
          {activeSection === "economia" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                  {t("triton_docs.eco_kicker")}
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">{t("triton_docs.eco_title")}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                  <Trans i18nKey="triton_docs.eco_intro" components={{ b: <strong /> }} />
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  ["npv", "VPL = Σ FC_t / (1 + i)^t − I_0"],
                  ["irr", "VPL(TIR) = 0"],
                  ["lcow", "LCOW = (I_0 + Σ C_t/(1+i)^t) / Σ W_t/(1+i)^t"],
                ].map(([chave, formula]) => (
                  <div key={chave} className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-1.5">
                    <span className="text-xs font-black text-slate-900 dark:text-white">{t(`triton_docs.${chave}_title`)}</span>
                    <div className="font-mono text-xs p-2 rounded-xl bg-slate-100 text-slate-900 dark:bg-zinc-950 dark:text-emerald-400 border border-slate-200 dark:border-zinc-800 overflow-x-auto">
                      {formula}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-zinc-400 pt-1">{t(`triton_docs.${chave}_desc`)}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
                  {t("triton_docs.tariff_title")}
                </h4>
                <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">
                  <Trans i18nKey="triton_docs.tariff_desc" components={{ b: <strong /> }} />
                </p>
              </div>
            </div>
          )}

          {/* 3. Avaliação do ciclo de vida */}
          {activeSection === "acv" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase text-teal-600 dark:text-teal-400 tracking-wider">
                  {t("triton_docs.lca_kicker")}
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">{t("triton_docs.lca_title")}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                  <Trans i18nKey="triton_docs.lca_intro" components={{ b: <strong /> }} />
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-2">
                  <h4 className="text-xs font-black uppercase text-slate-800 dark:text-zinc-200">{t("triton_docs.lca_emb_title")}</h4>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">{t("triton_docs.lca_emb_desc")}</p>
                  <ul className="text-xs text-slate-600 dark:text-zinc-300 space-y-1 list-disc list-inside">
                    {["lca_item1", "lca_item2", "lca_item3", "lca_item4"].map((chave) => (
                      <li key={chave}>{t(`triton_docs.${chave}`)}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-2">
                  <h4 className="text-xs font-black uppercase text-slate-800 dark:text-zinc-200">{t("triton_docs.lca_avoid_title")}</h4>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">{t("triton_docs.lca_avoid_desc")}</p>
                  <div className="font-mono text-xs p-3 rounded-xl bg-slate-100 text-slate-900 dark:bg-zinc-950 dark:text-teal-300 border border-slate-200 dark:border-zinc-800 overflow-x-auto">
                    CO2_net = Σ (W_saved × EF_supply) − (E_materials + E_pumping)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. Decisão multicritério */}
          {activeSection === "mcda" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase text-purple-600 dark:text-purple-400 tracking-wider">
                  {t("triton_docs.mcda_kicker")}
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">{t("triton_docs.mcda_title")}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">{t("triton_docs.mcda_intro")}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  ["1. TOPSIS", "topsis_desc"],
                  ["2. VIKOR", "vikor_desc"],
                  ["3. SMAA-VIKOR", "smaa_desc"],
                  ["4. PROMETHEE II", "promethee_desc"],
                ].map(([nome, chave]) => (
                  <div key={chave} className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-1.5">
                    <span className="text-xs font-black text-purple-700 dark:text-purple-300">{nome}</span>
                    <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">{t(`triton_docs.${chave}`)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Instalação e uso */}
          {activeSection === "instalacao" && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                  {t("triton_docs.inst_kicker")}
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">{t("triton_docs.inst_title")}</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                  <Trans i18nKey="triton_docs.inst_intro" components={{ b: <strong /> }} />
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-emerald-600" />
                    {t("triton_docs.inst_exe_title")}
                  </h4>
                  <ol className="text-xs text-slate-600 dark:text-zinc-300 space-y-2 list-decimal list-inside">
                    {["inst_step1", "inst_step2", "inst_step3", "inst_step4"].map((chave) => (
                      <li key={chave}>{t(`triton_docs.${chave}`)}</li>
                    ))}
                  </ol>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-blue-600" />
                    {t("triton_docs.inst_py_title")}
                  </h4>
                  <div className="font-mono text-[11px] p-3 rounded-xl bg-slate-100 text-slate-900 dark:bg-zinc-950 dark:text-emerald-400 border border-slate-200 dark:border-zinc-800 space-y-1 overflow-x-auto">
                    <p className="text-slate-500 dark:text-zinc-500">{t("triton_docs.inst_py_c1")}</p>
                    <p>git clone https://github.com/igorcmvaz/triton.git</p>
                    <p>cd triton/triton_brl</p>
                    <p className="text-slate-500 dark:text-zinc-500 pt-1">{t("triton_docs.inst_py_c2")}</p>
                    <p>pip install -r requirements.txt</p>
                    <p>python main.py</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-indigo-500" />
                  {t("triton_docs.csv_title")}
                </h4>
                <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                  <Trans i18nKey="triton_docs.csv_desc" components={{ b: <strong /> }} />
                </p>
                <div className="font-mono text-xs p-3 rounded-xl bg-slate-100 text-slate-900 dark:bg-zinc-950 dark:text-emerald-400 border border-slate-200 dark:border-zinc-800 overflow-x-auto">
                  {t("triton_docs.csv_header")}<br />
                  14,2<br />
                  0<br />
                  32,6
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── CHAMADA PARA DOWNLOAD OU SUPORTE ── */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-black text-slate-900 dark:text-white text-base">{t("triton_docs.cta_title")}</h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400">{t("triton_docs.cta_desc")}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/triton#download"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t("triton_docs.cta_download")}</span>
            </Link>
            <Link
              to="/triton/contato"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-100 font-bold text-xs border border-slate-200 dark:border-zinc-700 transition-colors"
            >
              <span>{t("triton_docs.cta_contact")}</span>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
