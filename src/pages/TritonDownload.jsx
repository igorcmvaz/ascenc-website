import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Download,
  ExternalLink,
  Code2,
  AlertCircle,
  BookOpen,
  Copy,
  Check,
  ArrowLeft,
  Mail,
  FileText
} from "lucide-react";

const ZENODO_URL = "https://zenodo.org/records/23402916";
const DOI_URL = "https://doi.org/10.5281/zenodo.23402916";
const GITHUB_URL = "https://github.com/igorcmvaz/triton";

export default function TritonDownload() {
  const { t } = useTranslation();
  const [copiedBib, setCopiedBib] = useState(false);
  const [copiedTextCite, setCopiedTextCite] = useState(false);

  const savedUser = (() => {
    try {
      const raw = window.sessionStorage.getItem("triton_user_request");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const selectedEdition =
    savedUser?.edition || "Todas as Edições (Brasil, Ibérica e Internacional)";
  const userName = savedUser?.name || "";

  const editionsFiles = [
    {
      id: "Triton Brasil (BRL)",
      label: t("triton.dl_ed_brl_label", "Edição Brasil (BRL)"),
      badge: t("triton.dl_ed_brl_badge", "R$ • ABNT NBR 15527"),
      installer: "Triton_Brasil_Setup_v0.1.0.exe",
      manual: "Manual_Triton_Brasil_v0.1.0.pdf",
      icon: "./assets/triton/triton-brl.png",
      details: t(
        "triton.dl_ed_brl_details",
        "Tarifas de 652 municípios brasileiros e séries CLIMBra (histórico + SSP2-4.5 / SSP5-8.5)."
      ),
    },
    {
      id: "Triton Ibérica (IBE)",
      label: t("triton.dl_ed_ibe_label", "Edição Ibérica (IBE)"),
      badge: t("triton.dl_ed_ibe_badge", "€ • EN 16941-1 (PT & ES)"),
      installer: "Triton_Iberica_Setup_v0.1.0.exe",
      manual: "Manual_Triton_Iberica_v0.1.0_PT.pdf",
      icon: "./assets/triton/triton-prt.png",
      details: t(
        "triton.dl_ed_ibe_details",
        "Tarifários ERSAR (Portugal) e Espanha em Euros (€) e séries Iberia01, ERA5 e E-OBS."
      ),
    },
    {
      id: "Triton Internacional (INT)",
      label: t("triton.dl_ed_int_label", "Edição Internacional (INT)"),
      badge: t("triton.dl_ed_int_badge", "Global • ISO 14040/14044"),
      installer: "Triton_Internacional_Setup_v0.1.0.exe",
      manual: "Manual_Triton_Internacional_v0.1.0_EN.pdf",
      icon: "./assets/triton/triton-int.png",
      details: t(
        "triton.dl_ed_int_details",
        "Interface em inglês, suporte a qualquer moeda/tarifa local e importação universal via CSV."
      ),
    },
  ];

  const textCitation = `Vaz, I. C. M., & Ghisi, E. (2026). Triton: Computational Platform for Rainwater Harvesting Simulation in Buildings (Editions: Brasil, International, and Ibérica) (Version 0.1.0) [Computer software]. Zenodo. https://doi.org/10.5281/zenodo.23402916`;

  const bibtexCitation = `@software{vaz_ghisi_triton_2026,
  author       = {Vaz, Igor Catão Martins and Ghisi, Enedir},
  title        = {Triton: Computational Platform for Rainwater Harvesting Simulation in Buildings (Editions: Brasil, International, and Ibérica)},
  year         = {2026},
  publisher    = {Zenodo},
  version      = {0.1.0},
  doi          = {10.5281/zenodo.23402916},
  url          = {https://doi.org/10.5281/zenodo.23402916}
}`;

  const copyBibToClipboard = () => {
    navigator.clipboard.writeText(bibtexCitation);
    setCopiedBib(true);
    setTimeout(() => setCopiedBib(false), 2200);
  };

  const copyTextCiteToClipboard = () => {
    navigator.clipboard.writeText(textCitation);
    setCopiedTextCite(true);
    setTimeout(() => setCopiedTextCite(false), 2200);
  };

  return (
    <PageLayout>
      <div className="space-y-6 max-w-4xl mx-auto pb-10">
        {/* Topo de confirmação */}
        <section className="rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-500/80 dark:border-emerald-500/50 p-6 sm:p-8 shadow-lg space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="inline-block text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  {t("triton.access_unlocked_badge", "Acesso Liberado • v0.1.0 Beta")}
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {userName
                    ? `${t("triton.access_hello", "Olá")}, ${userName}! ${t("triton.access_ready", "Aqui estão os links oficiais do Triton")}`
                    : t("triton.access_title", "Repositórios Oficiais do Triton (Zenodo & GitHub)")}
                </h1>
              </div>
            </div>

            <Link
              to="/triton"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors self-start sm:self-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t("triton.back_to_triton", "Voltar à página do Triton")}</span>
            </Link>
          </div>

          {/* Dois cards principais: Zenodo e GitHub */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ZENODO */}
            <div className="rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/25 border-2 border-emerald-500/70 p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-600 text-white uppercase">
                    {t("triton.zenodo_card_pill", "Zenodo • Instaladores & Manuais")}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-emerald-800 dark:text-emerald-300">
                    DOI: 10.5281/zenodo.23402916
                  </span>
                </div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  {t("triton.zenodo_card_title", "Baixar Instalador (.exe) e Manual (.pdf)")}
                </h2>
                <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">
                  {t(
                    "triton.zenodo_card_desc",
                    "As 3 edições do Triton (Brasil, Ibérica e Internacional) estão hospedadas juntas na mesma página oficial do Zenodo. Ao abrir o link, baixe o instalador e o manual respectivos da edição que você vai utilizar."
                  )}
                </p>
              </div>

              <a
                href={ZENODO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md hover:shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                <span>{t("triton.open_zenodo_btn", "Acessar Página do Triton no Zenodo")}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* GITHUB */}
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-slate-900 dark:bg-slate-700 text-white uppercase">
                    {t("triton.github_card_pill", "GitHub • Código-Fonte & Issues")}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-zinc-400">
                    MIT License • v0.1.0
                  </span>
                </div>
                <h2 className="text-lg font-black text-slate-900 dark:text-white">
                  {t("triton.github_card_title", "Repositório Oficial no GitHub")}
                </h2>
                <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">
                  {t(
                    "triton.github_card_desc",
                    "Acesse o código-fonte completo (Electron + React + Python/FastAPI), acompanhe as atualizações das releases e reporte sugestões ou problemas técnicos."
                  )}
                </p>
              </div>

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-black text-sm shadow-md transition-all"
              >
                <Code2 className="w-4 h-4" />
                <span>{t("triton.open_github_btn", "Acessar Repositório no GitHub")}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Guia rápido: qual arquivo baixar no Zenodo para cada edição */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>
                {t(
                  "triton.which_file_title",
                  "Qual arquivo baixar dentro do Zenodo para cada versão:"
                )}
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {editionsFiles.map((item) => {
                const isSelected =
                  selectedEdition === item.id ||
                  selectedEdition.includes("Todas") ||
                  selectedEdition.includes("All") ||
                  selectedEdition.includes("全部");
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl p-4 border transition-all ${
                      selectedEdition === item.id
                        ? "bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-500 ring-1 ring-emerald-500/40"
                        : isSelected
                        ? "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                        : "bg-slate-50/70 dark:bg-slate-900/50 border-slate-200/70 dark:border-slate-800/70 opacity-85"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-9 h-9 object-contain shrink-0"
                      />
                      <div>
                        <h4 className="text-xs font-black text-slate-900 dark:text-white">
                          {item.label}
                        </h4>
                        <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400">
                          {item.badge}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 text-[11px] font-mono bg-slate-100 dark:bg-slate-800/80 p-2 rounded-lg text-slate-800 dark:text-zinc-200">
                      <div className="truncate" title={item.installer}>
                        📦 {item.installer}
                      </div>
                      <div className="truncate" title={item.manual}>
                        📘 {item.manual}
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-zinc-400 mt-2 leading-snug">
                      {item.details}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Aviso sobre tarifas, precipitação e colaboração no detalhamento */}
          <div className="rounded-2xl bg-amber-50/90 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/70 p-4 flex flex-col sm:flex-row items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-xs text-slate-800 dark:text-zinc-200 leading-relaxed">
              <p className="font-black text-amber-950 dark:text-amber-200">
                {t(
                  "triton.feedback_box_title",
                  "Colaboração na Versão Beta: Tarifas, Precipitação e Detalhamento por Modelo"
                )}
              </p>
              <p>
                {t(
                  "triton.feedback_box_desc",
                  "A estruturação e correção de tarifas de água/esgoto, as séries de precipitação e os parâmetros normativos são específicos de cada modelo regional (Brasil, Ibérica e Internacional). Caso você identifique algum erro ou oportunidade de melhoria no detalhamento da sua versão, sua colaboração apontando essas correções é muito bem-vinda!"
                )}
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href="mailto:igorcmvaz@gmail.com?subject=Feedback%20Detalhamento%20Triton%20v0.1.0"
                  className="inline-flex items-center gap-1.5 font-black text-amber-900 dark:text-amber-300 underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>igorcmvaz@gmail.com</span>
                </a>
                <a
                  href={`${GITHUB_URL}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-black text-amber-900 dark:text-amber-300 underline"
                >
                  <span>{t("triton.open_github_issue", "Abrir Issue no GitHub")}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Como Citar Completo */}
        <section className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                {t("triton.citation_title", "Como Citar o Triton")}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyTextCiteToClipboard}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-zinc-200 text-xs font-bold transition-colors cursor-pointer"
              >
                {copiedTextCite ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>
                  {copiedTextCite
                    ? t("triton.copied", "Copiado!")
                    : t("triton.copy_reference", "Copiar Texto")}
                </span>
              </button>
              <button
                type="button"
                onClick={copyBibToClipboard}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold transition-colors cursor-pointer"
              >
                {copiedBib ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>
                  {copiedBib
                    ? t("triton.copied", "Copiado!")
                    : t("triton.copy_bibtex", "Copiar BibTeX")}
                </span>
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/70 text-xs text-slate-700 dark:text-zinc-300 leading-relaxed select-all">
            Vaz, I. C. M., &amp; Ghisi, E. (2026).{" "}
            <em>
              Triton: Computational Platform for Rainwater Harvesting Simulation in Buildings (Editions: Brasil, International, and Ibérica)
            </em>{" "}
            (Version 0.1.0) [Computer software]. Zenodo.{" "}
            <a
              href={DOI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 dark:text-emerald-400 underline font-semibold"
            >
              https://doi.org/10.5281/zenodo.23402916
            </a>
          </div>

          <pre className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono text-[11px] overflow-x-auto leading-relaxed select-all">
            {bibtexCitation}
          </pre>
        </section>
      </div>
    </PageLayout>
  );
}
