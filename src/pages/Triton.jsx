import React, { useState, useRef, useEffect } from "react";
import PageLayout from "../components/PageLayout";
import TritonWorldMinimap from "../components/TritonWorldMinimap";
import TritonSubNav from "../components/TritonSubNav";
import {
  sendRegistrationToServer,
  sendTritonActivity,
  fetchTritonActivitySummary,
} from "../utils/tritonCrypto";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import {
  Globe,
  Sparkles,
  Layers,
  TrendingUp,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Mail,
  Compass,
  Droplet,
  Send,
  History,
  Download,
  BookOpen,
  Heart,
  Code2,
  ExternalLink,
  FileText,
  MessageSquare
} from "lucide-react";

export const TRITON_CONFIG = {
  version: "0.1.0",
  authorEmail: "igorcmvaz@gmail.com",
  releases: {
    brl: {
      id: "Triton Brasil (BRL)",
      installer: "Triton_Brasil_Setup_v0.1.0.exe",
      manual: "Manual_Triton_Brasil_v0.1.0.pdf",
      icon: "./assets/triton/triton-brl.png",
    },
    ibe: {
      id: "Triton Ibérica (IBE)",
      installer: "Triton_Iberica_Setup_v0.1.0.exe",
      manual: "Manual_Triton_Iberica_v0.1.0_PT.pdf",
      icon: "./assets/triton/triton-prt.png",
    },
    int: {
      id: "Triton Internacional (INT)",
      installer: "Triton_Internacional_Setup_v0.1.0.exe",
      manual: "Manual_Triton_Internacional_v0.1.0_EN.pdf",
      icon: "./assets/triton/triton-int.png",
    },
  },
};

export function buildReplyEmailTemplate(name, edition) {
  const recipientName = name?.trim() || "Pesquisador(a) / Projetista";

  if (edition === "Triton Brasil (BRL)") {
    return `Olá, ${recipientName}!

Obrigado pelo seu interesse no Triton (v0.1.0 Beta), o sucessor oficial do software Netuno desenvolvido na UFSC.

Segue o link de acesso ao repositório oficial no Zenodo:
[INSERIR LINK DO ZENODO AQUI]

📦 QUAL ARQUIVO BAIXAR NO ZENODO:
No link do Zenodo estão reunidas as três edições da plataforma (Brasil, Ibérica e Internacional). Para a sua solicitação, baixe especificamente os arquivos correspondentes à Edição Brasil:
• Instalador: Triton_Brasil_Setup_v0.1.0.exe
• Manual Técnico: Manual_Triton_Brasil_v0.1.0.pdf

🔍 COLABORAÇÃO E REVISÃO DO DETALHAMENTO (VERSÃO BETA):
A calibração das tarifas de água e esgoto (652 municípios), as séries de precipitação (CLIMBra / CMIP6) e os detalhes normativos (ABNT NBR 15527, NBR 5626 e Portaria GM/MS 888/2021) são específicos do modelo da Edição Brasil. Portanto, caso você identifique qualquer erro, tarifa desatualizada ou ponto de melhoria no detalhamento da sua cidade ou simulação, sua contribuição apontando esses ajustes por e-mail (igorcmvaz@gmail.com) será muito bem-vinda!

 COMO CITAR:
Vaz, I. C. M., & Ghisi, E. (2026). Triton: Computational Platform for Rainwater Harvesting Simulation in Buildings (Version 0.1.0) [Computer software]. Universidade Federal de Santa Catarina (UFSC), Florianópolis, SC, Brasil.

Atenciosamente,
Igor Catão Martins Vaz & Prof. Enedir Ghisi
Grupo de Pesquisa Espaço Sustentável — UFSC`;
  }

  if (edition === "Triton Ibérica (IBE)") {
    return `Olá, ${recipientName}!

Obrigado pelo seu interesse no Triton (v0.1.0 Beta), o sucessor oficial do software Netuno desenvolvido na UFSC.

Segue o link de acesso ao repositório oficial no Zenodo:
[INSERIR LINK DO ZENODO AQUI]

📦 QUAL FICHEIRO TRANSFERIR (BAIXAR) NO ZENODO:
No link do Zenodo encontram-se reunidas as três edições da plataforma (Brasil, Ibérica e Internacional). Para o seu pedido, transfira especificamente os ficheiros correspondentes à Edição Ibérica:
• Instalador: Triton_Iberica_Setup_v0.1.0.exe
• Manual Técnico: Manual_Triton_Iberica_v0.1.0_PT.pdf

🔍 COLABORAÇÃO E REVISÃO DO DETALHAMENTO (VERSÃO BETA):
A estruturação e correção de tarifários de água e saneamento (ERSAR em Portugal e municípios espanhóis em Euros), as séries de precipitação diária por concelho/município (Iberia01, ERA5 e E-OBS) e os detalhes normativos (EN 16941-1) são específicos do modelo da Edição Ibérica. Portanto, a sua colaboração é muito importante: caso identifique algum erro ou necessidade de ajuste nos tarifários, na precipitação ou no detalhamento técnico, por favor avise-nos respondendo a este e-mail (igorcmvaz@gmail.com).

📖 COMO CITAR:
Vaz, I. C. M., & Ghisi, E. (2026). Triton: Computational Platform for Rainwater Harvesting Simulation in Buildings (Version 0.1.0) [Computer software]. Universidade Federal de Santa Catarina (UFSC), Florianópolis, SC, Brasil.

Com os melhores cumprimentos,
Igor Catão Martins Vaz & Prof. Enedir Ghisi
Grupo de Pesquisa Espaço Sustentável — UFSC`;
  }

  if (edition === "Triton Internacional (INT)") {
    return `Olá, ${recipientName}! / Hello, ${recipientName}!

Obrigado pelo seu interesse no Triton (v0.1.0 Beta) / Thank you for your interest in Triton (v0.1.0 Beta), the official successor to Netuno developed at UFSC.

Segue o link de acesso ao repositório oficial no Zenodo / Here is the official Zenodo repository link:
[INSERIR LINK DO ZENODO AQUI / INSERT ZENODO LINK HERE]

📦 QUAL ARQUIVO BAIXAR / WHICH FILE TO DOWNLOAD ON ZENODO:
As três edições (Brasil, Ibérica e Internacional) estão hospedadas juntas na mesma página do Zenodo. Baixe especificamente os arquivos correspondentes à Edição Internacional:
• Installer: Triton_Internacional_Setup_v0.1.0.exe
• User Manual: Manual_Triton_Internacional_v0.1.0_EN.pdf

🔍 COLABORAÇÃO NO DETALHAMENTO / MODEL FEEDBACK (BETA):
A parametrização de tarifas, precipitação (CSV) e detalhes operacionais são específicos de cada modelo e dos estudos de caso incluídos. Portanto, você pode ajudar no aprimoramento da ferramenta apontando eventuais erros ou sugestões no detalhamento diretamente para este e-mail (igorcmvaz@gmail.com).

📖 COMO CITAR / HOW TO CITE:
Vaz, I. C. M., & Ghisi, E. (2026). Triton: Computational Platform for Rainwater Harvesting Simulation in Buildings (Version 0.1.0) [Computer software]. Federal University of Santa Catarina (UFSC), Florianópolis, SC, Brazil.

Atenciosamente / Best regards,
Igor Catão Martins Vaz & Prof. Enedir Ghisi
Universidade Federal de Santa Catarina (UFSC)`;
  }

  return `Olá, ${recipientName}!

Obrigado pelo seu interesse no Triton (v0.1.0 Beta), o sucessor oficial do software Netuno desenvolvido na UFSC.

Segue o link de acesso ao repositório oficial no Zenodo:
[INSERIR LINK DO ZENODO AQUI]

📦 QUAIS ARQUIVOS BAIXAR NO ZENODO:
As três edições do Triton estão reunidas nessa mesma página do Zenodo. Ao acessar, baixe o instalador (.exe) e o manual (.pdf) respectivos da edição que você for utilizar:
1. Edição Brasil (BRL): Triton_Brasil_Setup_v0.1.0.exe + Manual_Triton_Brasil_v0.1.0.pdf
2. Edição Ibérica (IBE): Triton_Iberica_Setup_v0.1.0.exe + Manual_Triton_Iberica_v0.1.0_PT.pdf
3. Edição Internacional (INT): Triton_Internacional_Setup_v0.1.0.exe + Manual_Triton_Internacional_v0.1.0_EN.pdf

🔍 COLABORAÇÃO E REVISÃO DO DETALHAMENTO (VERSÃO BETA):
A correção e calibração de tarifas de água/esgoto, séries de precipitação e detalhes técnicos/normativos são específicas de cada modelo regional (Brasil com CLIMBra e 652 municípios; Ibérica com Iberia01/E-OBS e tarifários ERSAR; Internacional com séries abertas). Portanto, caso você encontre algum erro ou ponto de melhoria nas tarifas, dados de chuva ou no detalhamento do modelo, sua ajuda apontando essas correções por e-mail (igorcmvaz@gmail.com) será muito bem-vinda!

📖 COMO CITAR:
Vaz, I. C. M., & Ghisi, E. (2026). Triton: Computational Platform for Rainwater Harvesting Simulation in Buildings (Version 0.1.0) [Computer software]. Universidade Federal de Santa Catarina (UFSC), Florianópolis, SC, Brasil.

Atenciosamente,
Igor Catão Martins Vaz & Prof. Enedir Ghisi
Grupo de Pesquisa Espaço Sustentável — UFSC`;
}

export default function Triton() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [copiedBib, setCopiedBib] = useState(false);
  const [copiedTextCite, setCopiedTextCite] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const formRef = useRef(null);
  const nameInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    edition: "Todas as Edições (Brasil, Ibérica e Internacional)",
    purpose: "Pesquisa Acadêmica",
  });
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [likesCount, setLikesCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(() => {
    try {
      return window.localStorage.getItem("triton_liked_v1") === "1";
    } catch {
      return false;
    }
  });
  const [liking, setLiking] = useState(false);

  useEffect(() => {
    let active = true;
    fetchTritonActivitySummary().then((summary) => {
      if (active && typeof summary?.likesCount === "number") {
        setLikesCount(summary.likesCount);
      }
    });

    // Registra a abertura da página uma vez por sessão para acompanhamento no painel
    try {
      if (!window.sessionStorage.getItem("triton_viewed_session_v1")) {
        window.sessionStorage.setItem("triton_viewed_session_v1", "1");
        sendTritonActivity("view");
      }
    } catch {
      sendTritonActivity("view");
    }

    return () => {
      active = false;
    };
  }, []);

  const handleLikeClick = async () => {
    if (liking) return;
    setLiking(true);
    setHasLiked(true);
    setLikesCount((prev) => prev + 1);
    try {
      window.localStorage.setItem("triton_liked_v1", "1");
    } catch {
      // ignore
    }
    try {
      await sendTritonActivity("like");
    } finally {
      setLiking(false);
    }
  };

  const textCitation = `Vaz, I. C. M., & Ghisi, E. (2026). Triton: Computational Platform for Rainwater Harvesting Simulation in Buildings (Editions: Brasil, International, and Ibérica) (Version 0.1.0) [Computer software]. Universidade Federal de Santa Catarina (UFSC), Florianópolis, SC, Brazil.`;

  const bibtexCitation = `@software{vaz_ghisi_triton_2026,
  author       = {Vaz, Igor Catão Martins and Ghisi, Enedir},
  title        = {Triton: Computational Platform for Rainwater Harvesting Simulation in Buildings (Editions: Brasil, International, and Ibérica)},
  year         = {2026},
  version      = {0.1.0},
  organization = {Universidade Federal de Santa Catarina (UFSC)},
  address      = {Florianópolis, SC, Brazil}
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

  const scrollToForm = (selectedEdition) => {
    if (selectedEdition) {
      setFormData((prev) => ({ ...prev, edition: selectedEdition }));
    }
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 450);
    }
  };

  const scrollToPartnershipForm = () => {
    setFormData((prev) => ({
      ...prev,
      edition: "Triton Internacional (INT)",
      purpose: "Propor Parceria / Nova Edição Regional",
    }));
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 450);
    }
  };

  const copyPartnerEmail = () => {
    navigator.clipboard.writeText(TRITON_CONFIG.authorEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUnlockAccess = async (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    if (submitStatus === "submitting") return;
    setSubmitStatus("submitting");

    try {
      window.sessionStorage.setItem(
        "triton_user_request",
        JSON.stringify(formData)
      );
    } catch {
      // ignore storage errors
    }

    const payloadObj = {
      name: formData.name,
      email: formData.email,
      institution: formData.institution,
      edition: formData.edition,
      purpose: formData.purpose,
      timestamp: new Date().toISOString(),
    };

    // Plano B blindado com dupla redundância: envia para os dois canais no servidor antes de redirecionar
    try {
      await sendRegistrationToServer(payloadObj);
    } catch {
      // ignore
    }

    // Plano A: dispara o e-mail em segundo plano via AJAX (sem travar a página caso o FormSubmit dê erro 522)
    fetch("https://formsubmit.co/ajax/igorcmvaz@gmail.com", {
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `Novo Pedido de Download do Triton (${formData.edition}) - ${formData.name || "Visitante"}`,
        _captcha: "false",
        _template: "table",
        name: formData.name,
        email: formData.email,
        institution: formData.institution,
        edition: formData.edition,
        purpose: formData.purpose,
      }),
    }).catch(() => {});

    // Abre o e-mail direcionado para igorcmvaz@gmail.com com o pedido de download preenchido
    const subject = encodeURIComponent(
      `Pedido de Download do Triton (${formData.edition}) - ${formData.name}`
    );
    const body = encodeURIComponent(
      `Olá, Igor!\n\nGostaria de solicitar o link de download do instalador (.exe) e manual (.pdf) do Triton v0.1.0 Beta.\n\n• Nome: ${formData.name}\n• E-mail: ${formData.email}\n• Instituição / Empresa: ${formData.institution}\n• Edição Desejada: ${formData.edition}\n• Finalidade: ${formData.purpose}\n\nObrigado(a)!`
    );
    window.location.href = `mailto:${TRITON_CONFIG.authorEmail}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      navigate("/triton/download");
    }, 300);
  };

  return (
    <PageLayout>
      <div className="space-y-8 max-w-5xl mx-auto pb-10">
        {/* ── 🧭 SUB-NAVEGAÇÃO OFICIAL DO TRITON ── */}
        <TritonSubNav activeTab="inicio" />

        {/* ── 🚀 HERO: CLEAN NO LIGHT MODE, AZUL PROFUNDO NO DARK MODE ── */}
        <section className="relative overflow-hidden rounded-3xl bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 text-slate-900 dark:text-white p-6 sm:p-8 border border-slate-200/90 dark:border-blue-500/30 shadow-lg">
          <div className="hidden dark:block absolute -top-20 -right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="hidden dark:block absolute -bottom-20 -left-20 w-72 h-72 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            {/* Logo Principal */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-blue-400/40 p-3 flex items-center justify-center shadow-md">
                <img
                  src={TRITON_CONFIG.releases.brl.icon}
                  alt="Triton Logo"
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Texto enxuto e direto */}
            <div className="space-y-3 flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-400/30 text-xs font-extrabold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t("triton.successor", "Sucessor Oficial do Netuno")}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-blue-500/20 dark:text-blue-300 border border-amber-200 dark:border-blue-400/30 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t("triton.badge", "v0.1.0 Beta • Gratuito")}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                {t(
                  "triton.title",
                  "Triton: Simulação e Dimensionamento de Água da Chuva"
                )}
              </h1>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base font-medium leading-relaxed max-w-2xl">
                {t(
                  "triton.hero_desc",
                  "Dimensione reservatórios, avalie a viabilidade econômica (VPL, TIR, Payback), pegada de carbono (ACV) e decisão multicritério em poucos cliques."
                )}
              </p>

              {/* CTA Principal Chamativo */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <button
                  type="button"
                  onClick={() => scrollToForm("Todas as Edições (Brasil, Ibérica e Internacional)")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group"
                >
                  <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{t("triton.btn_request_access", "Download")}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <a
                  href="https://github.com/igorcmvaz/triton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-100 font-bold text-xs sm:text-sm border border-slate-300 dark:border-zinc-700 shadow-xs hover:-translate-y-0.5 transition-all"
                >
                  <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{t("triton.open_github_btn", "Repositório no GitHub")}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <button
                  type="button"
                  onClick={handleLikeClick}
                  disabled={liking}
                  className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl font-black text-xs sm:text-sm border transition-all cursor-pointer shadow-sm hover:-translate-y-0.5 ${
                    hasLiked
                      ? "bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950/70 dark:hover:bg-rose-900/70 dark:text-rose-300 dark:border-rose-700"
                      : "bg-white hover:bg-rose-50 text-slate-800 hover:text-rose-700 border-slate-200 hover:border-rose-300 dark:bg-slate-800 dark:hover:bg-rose-950/60 dark:text-slate-100 dark:hover:text-rose-300 dark:border-slate-700"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 transition-transform ${
                      hasLiked
                        ? "fill-rose-500 text-rose-500 scale-110"
                        : "text-rose-500"
                    }`}
                  />
                  <span>
                    {hasLiked
                      ? t("triton.btn_liked", "Obrigado por curtir!")
                      : t("triton.btn_like", "Curtir o Triton")}
                  </span>
                  <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[11px] font-black bg-rose-100 text-rose-800 dark:bg-rose-900/80 dark:text-rose-200">
                    {likesCount}
                  </span>
                </button>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold pt-1">
                {t("triton.authors_short", "UFSC • Igor Catão Martins Vaz & Prof. Enedir Ghisi")}
              </p>
            </div>
          </div>
        </section>

        {/* ── 🌍 ESCOLHA SUA EDIÇÃO (KISS: DIRETO AO PONTO) ── */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-600 dark:text-blue-400" />
              {t("triton.editions_title", "Escolha a sua Edição")}
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">
              {t("triton.editions_subtitle", "Instalador Windows (.exe) + Manual Técnico (.pdf)")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* 🇧🇷 BRASIL */}
            <div
              onClick={() => scrollToForm("Triton Brasil (BRL)")}
              className="cursor-pointer bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200/90 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 p-1.5 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
                    <img
                      src={TRITON_CONFIG.releases.brl.icon}
                      alt="Triton Brasil"
                      className="w-12 h-12 object-contain group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                    {t("triton.edition_brl_badge", "Brasil • R$")}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Triton Brasil
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 mt-1 font-medium">
                    {t("triton.desc_brl", "Pronto para normas, clima e tarifas das concessionárias brasileiras.")}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700 dark:text-zinc-300 pt-2 border-t border-slate-100 dark:border-slate-800 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t("triton.brl_feat1", "Chuva CLIMBra (histórico e futuro)")}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t("triton.brl_feat2", "Tarifas de 652 cidades brasileiras")}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t("triton.brl_feat3", "ABNT NBR 15527 & NBR 5626")}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4">
                <span className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 group-hover:bg-emerald-700 text-white font-black text-xs shadow-sm transition-all">
                  <Download className="w-3.5 h-3.5" />
                  <span>{t("triton.request_edition_brl", "Baixar Edição Brasil")}</span>
                </span>
              </div>
            </div>

            {/* 🇵🇹 IBÉRICA */}
            <div
              onClick={() => scrollToForm("Triton Ibérica (IBE)")}
              className="cursor-pointer bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200/90 dark:border-slate-800 hover:border-rose-500 dark:hover:border-rose-500 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/40 p-1.5 flex items-center justify-center border border-rose-200 dark:border-rose-800">
                    <img
                      src={TRITON_CONFIG.releases.ibe.icon}
                      alt="Triton Ibérica"
                      className="w-12 h-12 object-contain group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-300">
                    {t("triton.edition_ibe_badge", "Ibérica • €")}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    Triton Ibérica
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 mt-1 font-medium">
                    {t("triton.desc_ibe", "Calibrado para Portugal e Península Ibérica em Português Europeu.")}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700 dark:text-zinc-300 pt-2 border-t border-slate-100 dark:border-slate-800 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{t("triton.ibe_feat1", "Precipitação E-OBS & Iberia01")}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{t("triton.ibe_feat2", "Tarifários ERSAR em Euros (€)")}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{t("triton.ibe_feat3", "Norma Europeia EN 16941-1")}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4">
                <span className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-600 group-hover:bg-rose-700 text-white font-black text-xs shadow-sm transition-all">
                  <Download className="w-3.5 h-3.5" />
                  <span>{t("triton.request_edition_ibe", "Baixar Edição Ibérica")}</span>
                </span>
              </div>
            </div>

            {/* 🌐 INTERNACIONAL */}
            <div
              onClick={() => scrollToForm("Triton Internacional (INT)")}
              className="cursor-pointer bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200/90 dark:border-slate-800 hover:border-sky-500 dark:hover:border-sky-500 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-sky-50 dark:bg-sky-950/40 p-1.5 flex items-center justify-center border border-sky-200 dark:border-sky-800">
                    <img
                      src={TRITON_CONFIG.releases.int.icon}
                      alt="Triton Internacional"
                      className="w-12 h-12 object-contain group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-300">
                    {t("triton.edition_int_badge", "Global • 4 Idiomas")}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                    Triton International
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-300 mt-1 font-medium">
                    {t("triton.desc_int", "Versão global flexível para qualquer país, moeda e base climática.")}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700 dark:text-zinc-300 pt-2 border-t border-slate-100 dark:border-slate-800 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>{t("triton.int_feat1", "Importação livre de chuva (CSV)")}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>{t("triton.int_feat2", "Qualquer moeda e tarifa")}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>{t("triton.int_feat3", "Inglês, Português, Espanhol e Chinês")}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4">
                <span className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-600 group-hover:bg-sky-700 text-white font-black text-xs shadow-sm transition-all">
                  <Download className="w-3.5 h-3.5" />
                  <span>{t("triton.request_edition_int", "Baixar Edição Global")}</span>
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* ── ⚡ 4 PILARES RÁPIDOS (VISUAL & ENXUTO) ── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Droplet className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              {t("triton.feat1_title", "Balanço Hídrico Diário")}
            </h4>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-snug">
              {t("triton.feat1_desc", "Algoritmo Yield-After-Spillage, 2 reservatórios, first-flush, Monte Carlo e volume ótimo.")}
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              {t("triton.feat2_title", "Viabilidade Econômica")}
            </h4>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-snug">
              {t("triton.feat2_desc", "VPL, TIR, Payback, LCOW e tarifas progressivas em cascata com CAPEX e OPEX.")}
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              {t("triton.feat3_title", "Ciclo de Vida (ACV)")}
            </h4>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-snug">
              {t("triton.feat3_desc", "Pegada de carbono (kg CO₂eq) dos materiais e bombeamento vs. água potável poupada.")}
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-1.5">
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              {t("triton.feat4_title", "4 Métodos Multicritério")}
            </h4>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-snug">
              {t("triton.feat4_desc", "Ranking ótimo de projeto via TOPSIS, VIKOR, SMAA-VIKOR e PROMETHEE II.")}
            </p>
          </div>
        </section>

        {/* ── 📬 FORMULÁRIO DIRETO DE SOLICITAÇÃO DE DOWNLOAD ── */}
        <section
          ref={formRef}
          id="triton-download-form"
          className="scroll-mt-24 rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-500/80 dark:border-emerald-500/50 shadow-xl p-6 sm:p-8"
        >
          <div className="max-w-3xl mx-auto space-y-5">
            <div className="text-center space-y-1.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5" />
                {t("triton.form_badge", "Acesso Gratuito • v0.1.0 Beta")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {t("triton.form_title", "Solicitar Download do Instalador")}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-medium">
                {t(
                  "triton.form_desc",
                  "Preencha seus dados abaixo para enviar o pedido de download por e-mail e acessar o repositório oficial no GitHub."
                )}
              </p>
            </div>

            <form
              onSubmit={handleUnlockAccess}
              className="space-y-4"
            >

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label htmlFor="triton-name" className="block text-xs font-extrabold mb-1 text-slate-800 dark:text-zinc-200">
                    {t("triton.field_name", "Nome *")}
                  </label>
                  <input
                    ref={nameInputRef}
                    type="text"
                    id="triton-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t("triton.placeholder_name", "Seu nome")}
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="triton-email" className="block text-xs font-extrabold mb-1 text-slate-800 dark:text-zinc-200">
                    {t("triton.field_email", "E-mail *")}
                  </label>
                  <input
                    type="email"
                    id="triton-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t("triton.placeholder_email", "seu@email.com")}
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="triton-institution" className="block text-xs font-extrabold mb-1 text-slate-800 dark:text-zinc-200">
                    {t("triton.field_institution", "Instituição / Empresa *")}
                  </label>
                  <input
                    type="text"
                    id="triton-institution"
                    name="institution"
                    required
                    value={formData.institution}
                    onChange={handleInputChange}
                    placeholder={t("triton.placeholder_institution", "Ex.: UFSC, Empresa...")}
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="triton-edition" className="block text-xs font-extrabold mb-1 text-slate-800 dark:text-zinc-200">
                    {t("triton.field_edition", "Edição Desejada *")}
                  </label>
                  <select
                    id="triton-edition"
                    name="edition"
                    value={formData.edition}
                    onChange={handleInputChange}
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Todas as Edições (Brasil, Ibérica e Internacional)">
                      {t("triton.opt_ed_all", "Todas as Edições (Brasil, Ibérica e Internacional)")}
                    </option>
                    <option value="Triton Brasil (BRL)">
                      {t("triton.opt_ed_brl", "Triton Brasil (BRL)")}
                    </option>
                    <option value="Triton Ibérica (IBE)">
                      {t("triton.opt_ed_ibe", "Triton Ibérica (IBE)")}
                    </option>
                    <option value="Triton Internacional (INT)">
                      {t("triton.opt_ed_int", "Triton Internacional (INT)")}
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="triton-purpose" className="block text-xs font-extrabold mb-1 text-slate-800 dark:text-zinc-200">
                    {t("triton.field_purpose", "Finalidade *")}
                  </label>
                  <select
                    id="triton-purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Pesquisa Acadêmica">
                      {t("triton.opt_purp_research", "Pesquisa Acadêmica")}
                    </option>
                    <option value="Projeto Profissional / Consultoria">
                      {t("triton.opt_purp_pro", "Projeto Profissional / Consultoria")}
                    </option>
                    <option value="Ensino / Disciplina Universitária">
                      {t("triton.opt_purp_teaching", "Ensino / Disciplina Universitária")}
                    </option>
                    <option value="Propor Parceria / Nova Edição Regional">
                      {t("triton.opt_purp_partner", "Propor Parceria / Nova Edição Regional")}
                    </option>
                    <option value="Outro">
                      {t("triton.opt_purp_other", "Outro")}
                    </option>
                  </select>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-zinc-400 text-center leading-relaxed">
                {t(
                  "triton.form_version_hint",
                  "Ao clicar abaixo, seu pedido de download será enviado por e-mail para nossa equipe (que encaminhará o instalador .exe e o manual .pdf da edição escolhida) e você terá acesso ao repositório oficial no GitHub."
                )}
              </p>

              <div className="pt-1 flex justify-center">
                <button
                  type="submit"
                  disabled={submitStatus === "submitting"}
                  className="w-full sm:w-auto min-w-[260px] inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-black text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>
                    {submitStatus === "submitting"
                      ? t("triton.form_submitting", "Enviando pedido...")
                      : t("triton.form_submit", "Solicitar Download por E-mail & Ver GitHub")}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* ── 📖 COMO CITAR (COMPLETO CONFORME CITATION.CFF) & COOPERAÇÃO ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Box Como Citar (7 colunas) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-600 dark:text-blue-400" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-white">
                  {t("triton.citation_title", "Como Citar o Triton")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyTextCiteToClipboard}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-zinc-200 text-[11px] font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  {copiedTextCite ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>{t("triton.copied", "Copiado!")}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{t("triton.copy_reference", "Copiar Texto")}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={copyBibToClipboard}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-blue-950/60 text-emerald-800 dark:text-blue-300 border border-emerald-200 dark:border-blue-800/60 text-[11px] font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  {copiedBib ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>{t("triton.copied", "Copiado!")}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{t("triton.copy_bibtex", "Copiar BibTeX")}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-700 dark:text-zinc-300 font-medium leading-relaxed border-l-2 border-emerald-500 dark:border-blue-500 pl-3 py-0.5">
              Vaz, I. C. M., & Ghisi, E. (2026). <em>Triton: Computational Platform for Rainwater Harvesting Simulation in Buildings (Editions: Brasil, International, and Ibérica)</em> (Version 0.1.0) [Computer software]. Universidade Federal de Santa Catarina (UFSC), Florianópolis, SC, Brazil.
            </p>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-mono text-[10px] overflow-x-auto border border-slate-200 dark:border-slate-800 leading-relaxed">
              <pre className="whitespace-pre">{bibtexCitation}</pre>
            </div>
          </div>

          {/* Box Cooperação Internacional com Minimapa (5 colunas) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-3.5">
            <div className="space-y-1.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-400">
                <Globe className="w-3.5 h-3.5" />
                {t("triton.collab_badge", "Cooperação Internacional")}
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                {t("triton.collab_title", "Quer criar a edição do Triton para o seu país?")}
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                {t(
                  "triton.collab_desc",
                  "Integre dados de precipitação, tarifas e normas locais ao núcleo triton-core em parceria com a UFSC."
                )}
              </p>
            </div>

            <TritonWorldMinimap onSelectEdition={scrollToForm} />

            <div className="pt-1 space-y-2">
              <button
                type="button"
                onClick={scrollToPartnershipForm}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{t("triton.collab_btn", "Propor parceria / Nova edição")}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/70 text-[11px]">
                <a
                  href={`mailto:${TRITON_CONFIG.authorEmail}?subject=${encodeURIComponent(
                    "Triton - Parceria para Nova Edição Regional"
                  )}&body=${encodeURIComponent(
                    "Olá Igor e Prof. Enedir,\n\nTenho interesse em colaborar na criação de uma edição regional do Triton para o meu país/região.\n\nNome: \nInstituição: \nPaís/Região: "
                  )}`}
                  className="font-mono font-bold text-slate-700 dark:text-zinc-300 hover:text-teal-700 dark:hover:text-teal-400 underline truncate"
                >
                  {TRITON_CONFIG.authorEmail}
                </a>
                <button
                  type="button"
                  onClick={copyPartnerEmail}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-slate-600 font-bold hover:bg-slate-100 cursor-pointer shrink-0"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>{t("triton.copied", "Copiado!")}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{t("triton.copy_email", "Copiar e-mail")}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}
