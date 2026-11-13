import React, { useState } from "react";
import PageLayout from "../components/PageLayout";
import TritonSubNav from "../components/TritonSubNav";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MessageSquare,
  Mail,
  Send,
  Copy,
  Check,
  Building,
  MapPin,
  ExternalLink,
  Code2,
  FileSpreadsheet
} from "lucide-react";

export default function TritonContact() {
  const { t } = useTranslation();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    location: "",
    type: "Tarifa",
    message: "",
  });

  const authorEmail = "igorcmvaz@gmail.com";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `[Triton Beta] ${formData.type}: ${formData.location || "Geral"} - ${formData.name || "Colaborador"}`
    );
    const body = encodeURIComponent(
      `Olá, Igor e Prof. Enedir!\n\nEstou enviando uma mensagem/sugestão referente ao Triton (v0.1.0 Beta):\n\n• Nome: ${formData.name}\n• E-mail: ${formData.email}\n• Instituição / Empresa: ${formData.institution}\n• Localidade (Cidade/UF/País): ${formData.location}\n• Tipo de Contribuição: ${formData.type}\n\nDetalhes da Mensagem / Dados da Tarifa:\n${formData.message}\n\nAtenciosamente,\n${formData.name}`
    );
    window.location.href = `mailto:${authorEmail}?subject=${subject}&body=${body}`;
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(authorEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const copyDraftToClipboard = () => {
    const draft = `Para: ${authorEmail}
Assunto: [Triton Beta] ${formData.type}: ${formData.location || "Geral"} - ${formData.name || "Colaborador"}

Nome: ${formData.name}
E-mail: ${formData.email}
Instituição / Empresa: ${formData.institution}
Localidade: ${formData.location}
Tipo: ${formData.type}

Mensagem:
${formData.message}`;
    navigator.clipboard.writeText(draft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2200);
  };

  return (
    <PageLayout>
      <div className="space-y-6 max-w-5xl mx-auto pb-12">
        {/* Sub-navegação do Triton */}
        <TritonSubNav activeTab="contato" />

        {/* ── HEADER DA PÁGINA DE CONTATO ── */}
        <section className="relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 p-6 sm:p-8 border border-slate-200 dark:border-zinc-800 shadow-sm">
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 dark:bg-teal-950/70 dark:text-teal-300 border border-teal-200 dark:border-teal-800/80 text-xs font-black uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t("triton_contact.badge", "Colaboração & Suporte Técnico")}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {t("triton_contact.title", "Contato e Sugestões para o Triton")}
            </h1>
            <p className="text-slate-600 dark:text-zinc-300 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
              {t("triton_contact.subtitle", "Ajude a aprimorar o Triton Beta enviando a planilha tarifária do seu município, reportando inconsistências em simulações ou propondo parcerias de pesquisa e novas edições regionais.")}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={copyEmailToClipboard}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer"
              >
                {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? t("triton_contact.email_copied", "E-mail copiado!") : t("triton_contact.copy_email_btn", "Copiar igorcmvaz@gmail.com")}</span>
              </button>
              <a
                href="https://github.com/igorcmvaz/triton/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 font-semibold text-xs sm:text-sm border border-slate-300 dark:border-zinc-700 transition-colors"
              >
                <Code2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>{t("triton_contact.open_issue_btn", "Abrir Issue no GitHub")}</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ── FORMULÁRIO DE SUGESTÕES (7 colunas) ── */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 p-5 sm:p-7 shadow-sm space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-teal-600" />
                <span>{t("triton_contact.form_title", "Formulário de Contribuição e Contato")}</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                {t("triton_contact.form_subtitle", "Preencha os campos abaixo para gerar sua mensagem formatada para nossa equipe.")}
              </p>
            </div>

            <form onSubmit={handleSendEmail} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    {t("triton_contact.name_label", "Seu Nome *")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t("triton_contact.name_placeholder", "Seu nome completo")}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    {t("triton_contact.email_label", "Seu E-mail *")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t("triton_contact.email_placeholder", "seu.email@exemplo.com")}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    {t("triton_contact.inst_label", "Instituição / Empresa")}
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleInputChange}
                    placeholder={t("triton_contact.inst_placeholder", "Ex.: UFSC, Concessionária, etc.")}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    {t("triton_contact.location_label", "Município / UF (ou País)")}
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder={t("triton_contact.location_placeholder", "Ex.: Florianópolis / SC")}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                  {t("triton_contact.type_label", "Tipo de Contribuição *")}
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Atualização de Tarifa">{t("triton_contact.opt_tariff", "💧 Atualizar ou incluir tarifa de água/esgoto da minha cidade")}</option>
                  <option value="Série de Chuva">{t("triton_contact.opt_rain", "🌧️ Sugerir ou disponibilizar série histórica de chuva (.CSV)")}</option>
                  <option value="Reportar Erro / Bug">{t("triton_contact.opt_bug", "🐛 Reportar erro, bug ou inconsistência na versão Beta")}</option>
                  <option value="Proposta de Parceria">{t("triton_contact.opt_partner", "🤝 Propor parceria para nova edição regional (outro país)")}</option>
                  <option value="Sugestão Geral">{t("triton_contact.opt_suggestion", "💡 Sugestão geral de melhoria ou nova funcionalidade")}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                  {t("triton_contact.message_label", "Mensagem / Dados da Sugestão *")}
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t("triton_contact.message_placeholder", "Descreva sua sugestão, informe o link do decreto tarifário ou cole a tabela de faixas de água/esgoto...")}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
                />
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>{t("triton_contact.send_btn", "Enviar por E-mail")}</span>
                </button>
                <button
                  type="button"
                  onClick={copyDraftToClipboard}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-200 font-semibold text-xs border border-slate-300 dark:border-zinc-700 transition-colors cursor-pointer"
                >
                  {copiedDraft ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedDraft ? t("triton_contact.draft_copied", "Texto copiado!") : t("triton_contact.copy_draft_btn", "Copiar texto da mensagem")}</span>
                </button>
              </div>
            </form>
          </div>

          {/* ── GUIA TARIFAS & INFORMAÇÕES DE CONTATO (5 colunas) ── */}
          <div className="lg:col-span-5 space-y-4">
            {/* Como enviar a tarifa da sua cidade */}
            <div className="p-5 rounded-3xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>{t("triton_contact.how_to_send_title", "Como enviar a tarifa da sua cidade")}</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                {t("triton_contact.how_to_send_desc", "O Triton Brasil já possui 652 cidades pré-cadastradas. Se a tarifa do seu município estiver desatualizada ou ainda não constar na lista, basta nos enviar:")}
              </p>
              <ul className="text-xs text-slate-600 dark:text-zinc-300 space-y-1.5 list-disc list-inside">
                <li>{t("triton_contact.tariff_item1", "Nome da concessionária (ex.: CASAN, Sabesp, Copasa, etc.)")}</li>
                <li>{t("triton_contact.tariff_item2", "Estrutura de faixas de consumo (m³) e valor em R$/m³")}</li>
                <li>{t("triton_contact.tariff_item3", "Percentual de esgoto cobrado sobre a água")}</li>
                <li>{t("triton_contact.tariff_item4", "Taxa mínima ou custo de disponibilidade")}</li>
                <li>{t("triton_contact.tariff_item5", "Link ou PDF do decreto tarifário oficial")}</li>
              </ul>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold pt-1">
                {t("triton_contact.db_update_note", "Nossa equipe atualizará o banco de dados SQLite oficial para a próxima versão!")}
              </p>
            </div>

            {/* Equipe & Endereço Institucional */}
            <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-blue-600" />
                <span>{t("triton_contact.team_title", "Desenvolvedores & Coordenação")}</span>
              </h3>

              <div className="space-y-2 text-xs text-slate-600 dark:text-zinc-300">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">Igor Catão Martins Vaz</p>
                  <p className="text-slate-500 dark:text-zinc-400">{t("triton_contact.dev_role", "Desenvolvedor Principal • Doutorando em Engenharia Civil")}</p>
                  <a href="mailto:igorcmvaz@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                    igorcmvaz@gmail.com
                  </a>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-zinc-800">
                  <p className="font-bold text-slate-900 dark:text-white">Prof. Enedir Ghisi, Ph.D.</p>
                  <p className="text-slate-500 dark:text-zinc-400">{t("triton_contact.prof_role", "Coordenador do Grupo de Pesquisa Espaço Sustentável")}</p>
                  <a href="mailto:enedir.ghisi@ufsc.br" className="text-blue-600 dark:text-blue-400 hover:underline">
                    enedir.ghisi@ufsc.br
                  </a>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-start gap-1.5 text-slate-500 dark:text-zinc-400">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    Universidade Federal de Santa Catarina (UFSC)<br />
                    Departamento de Engenharia Civil • Campus Trindade<br />
                    Florianópolis - SC, Brasil • CEP 88040-900
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
