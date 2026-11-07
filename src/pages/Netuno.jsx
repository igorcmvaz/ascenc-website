import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import {
  Download,
  FileText,
  FolderArchive,
  Settings,
  Globe,
  Sparkles,
  ArrowRight,
  Info,
  History,
  HardDriveDownload,
  Copy,
  Check
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Netuno() {
  const { t } = useTranslation();
  const [copiedBib, setCopiedBib] = useState(false);

  const netunoCitation = `@manual{netuno4,
  title = {Netuno: Aproveitamento de Água Pluvial em Edificações - Versão 4.0},
  author = {Ghisi, Enedir and Cordova, Marcelo Marcel},
  organization = {Laboratório de Eficiência Energética em Edificações, UFSC},
  address = {Florianópolis, SC},
  year = {2014}
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(netunoCitation);
    setCopiedBib(true);
    setTimeout(() => setCopiedBib(false), 2200);
  };

  return (
    <PageLayout title={t("netuno.title", "Netuno")}>
      <div className="space-y-8 max-w-5xl mx-auto pb-12">

        {/* ── 🚀 BANNER COMPACTO: TRANSIÇÃO PARA O TRITON ── */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-4 sm:p-5 border border-blue-400/30 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-400/20 text-blue-200 border border-blue-400/30 text-[11px] font-black uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-blue-300" />
              <span>{t("netuno.transition_badge", "Nova Geração Disponível")}</span>
            </div>
            <h2 className="text-base sm:text-lg font-black tracking-tight text-white">
              {t("netuno.transition_title", "Conheça o Triton — O Sucessor Oficial do Netuno")}
            </h2>
            <p className="text-xs text-blue-200 max-w-2xl">
              {t(
                "netuno.transition_desc",
                "Plataforma computacional modernizada com edições Brasil (BRL), Ibérica (IBE) e Internacional (INT), integrando simulação contínua, engenharia econômica, ACV e decisão multicritério."
              )}
            </p>
          </div>
          <Link
            to="/triton"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-blue-50 font-black text-xs shadow-md transition-all shrink-0"
          >
            <span>{t("netuno.transition_btn", "Acessar o Triton")}</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
          </Link>
        </div>

        {/* ── 🌊 APRESENTAÇÃO DO NETUNO 4 ── */}
        <section className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="p-3 bg-blue-50 dark:bg-slate-800 rounded-2xl border border-blue-200 dark:border-slate-700 shrink-0 flex items-center justify-center w-20 h-20">
            <img
              src="./assets/icons/netuno.ico"
              alt="Netuno Logo"
              className="w-14 h-14 object-contain filter drop-shadow-sm"
            />
          </div>

          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900 text-[11px] font-black uppercase tracking-wider">
                {t("netuno.badge_version", "Versão 4.0 • Desktop Estável")}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-zinc-300 text-[11px] font-bold border border-slate-200 dark:border-slate-700">
                <Globe className="w-3 h-3 text-blue-600 shrink-0" />
                <span>{t("netuno.language_pt", "Disponível em Português")}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Netuno 4
            </h1>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-zinc-300 font-medium">
              {t(
                "netuno.description_full",
                "O Netuno é o software pioneiro da UFSC para estimar o potencial de economia de água potável em edificações residenciais e comerciais por meio do aproveitamento de água de chuva. Utiliza o método de simulação diária com séries históricas pluviométricas para o dimensionamento de reservatórios e análise de viabilidade para demandas não potáveis (bacias sanitárias, rega, lavagens e resfriamento evaporativo)."
              )}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-[11px] text-slate-500 dark:text-zinc-400 font-semibold border-t border-slate-100 dark:border-slate-800">
              <div>
                <strong className="text-slate-800 dark:text-white">{t("netuno.author_label", "Autoria:")}</strong>{" "}
                {t("netuno.authors", "Prof. Enedir Ghisi e Eng. Marcelo Marcel Cordova")}
              </div>
              <div>
                <strong className="text-slate-800 dark:text-white">{t("netuno.inst_label", "Instituição:")}</strong>{" "}
                {t("netuno.institution", "UFSC")}
              </div>
              <div>
                <strong className="text-slate-800 dark:text-white">{t("netuno.year_label", "Ano da Versão 4:")}</strong>{" "}
                {t("netuno.year_val", "2014")}
              </div>
            </div>
          </div>
        </section>

        {/* ── 📥 SEÇÃO DE DOWNLOADS COMPACTA ── */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <HardDriveDownload className="w-5 h-5 text-emerald-600" />
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              {t("netuno.downloads_title", "Arquivos de Download (Netuno 4)")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* 1. SETUP NETUNO 4 */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-indigo-400 transition-colors group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 flex items-center justify-center border border-indigo-200 dark:border-indigo-800">
                    <Settings className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-900 dark:text-indigo-300">
                    ~3.0 MB
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                    {t("netuno.setup_title", "Setup Netuno 4")}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 dark:text-zinc-500">
                    SetupNetuno4_ptbr.zip
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                  {t(
                    "netuno.setup_desc",
                    "Instalador oficial para Microsoft Windows (compatível com Windows 7, 8, 10 e 11). Inclui o executável e assistente guiado em português."
                  )}
                </p>
              </div>

              <div className="pt-4 mt-2">
                <a
                  href="./netuno/SetupNetuno4_ptbr.zip"
                  download
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t("netuno.setup_btn", "Baixar Instalador")}</span>
                </a>
              </div>
            </div>

            {/* 2. MANUAL DO USUÁRIO */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-blue-400 transition-colors group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center border border-blue-200 dark:border-blue-800">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300">
                    ~1.3 MB
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {t("netuno.manual_title", "Manual do Usuário")}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 dark:text-zinc-500">
                    Manual-Netuno-4.pdf
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                  {t(
                    "netuno.manual_desc",
                    "Documentação técnica completa (edição Junho/2014). Apresenta as equações de balanço de massa, entrada de dados e interpretação gráfica."
                  )}
                </p>
              </div>

              <div className="pt-4 mt-2">
                <a
                  href="./netuno/Manual-Netuno-4_Junho2014.pdf"
                  download
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t("netuno.manual_btn", "Baixar Manual (PDF)")}</span>
                </a>
              </div>
            </div>

            {/* 3. ARQUIVOS DE APOIO */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-cyan-400 transition-colors group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 flex items-center justify-center border border-cyan-200 dark:border-cyan-800">
                    <FolderArchive className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-900 dark:text-cyan-300">
                    ~29 KB
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-cyan-600 transition-colors">
                    {t("netuno.support_title", "Arquivos de Apoio")}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 dark:text-zinc-500">
                    Arquivos-de-apoio.rar
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                  {t(
                    "netuno.support_desc",
                    "Séries históricas de chuva formatadas e dados de exemplo para reproduzir diretamente os exercícios demonstrados no manual do usuário."
                  )}
                </p>
              </div>

              <div className="pt-4 mt-2">
                <a
                  href="./netuno/Arquivos-de-apoio-ao-Manual-Netuno.rar"
                  download
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white font-extrabold text-xs shadow-sm transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t("netuno.support_btn", "Baixar Apoio (.rar)")}</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ── 🛠️ GUIA DE INSTALAÇÃO & HISTÓRICO DAS VERSÕES 1, 2 E 3 (LADO A LADO) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Instruções Rápidas de Instalação */}
          <section className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                {t("netuno.install_guide_title", "Como Instalar e Utilizar")}
              </h3>
            </div>
            <ol className="space-y-2 text-xs text-slate-600 dark:text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                <span>{t("netuno.install_step1", "Extraia o arquivo SetupNetuno4_ptbr.zip em uma pasta local.")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                <span>{t("netuno.install_step2", "Execute o Setup.exe e siga o assistente de instalação.")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                <span>{t("netuno.install_step3", "Consulte o Manual em PDF para estruturar a série pluviométrica da sua cidade.")}</span>
              </li>
            </ol>
          </section>

          {/* Memória Histórica Netuno 1, 2 e 3 */}
          <section className="bg-amber-50/50 dark:bg-amber-950/20 p-5 rounded-2xl border border-amber-200 dark:border-amber-900/50 space-y-2">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                {t("netuno.legacy_box_title", "Netuno 1, 2 e 3 (Modelagem em Planilhas)")}
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
              {t(
                "netuno.legacy_box_desc",
                "As versões 1, 2 e 3 (anos 2000 a 2013) foram desenvolvidas em planilhas Excel/VBA pelo Prof. Enedir Ghisi e equipe da UFSC. Serviram de alicerce para os primeiros algoritmos de aproveitamento de água de chuva no Brasil, sendo consolidadas no Netuno 4 e sucedidas pelo Triton."
              )}
            </p>
          </section>
        </div>

        {/* ── 📖 CITAÇÃO ACADÊMICA COMPACTA ── */}
        <section className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-zinc-400">
              {t("netuno.citation_title", "Como Citar o Netuno")}
            </span>
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[11px] font-bold hover:bg-blue-100 transition-colors"
            >
              {copiedBib ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>{t("netuno.copied", "Copiado!")}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>{t("netuno.copy_bibtex", "Copiar BibTeX")}</span>
                </>
              )}
            </button>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-[10px] overflow-x-auto border border-slate-800 leading-tight">
            <pre className="whitespace-pre">{netunoCitation}</pre>
          </div>
        </section>

      </div>
    </PageLayout>
  );
}
