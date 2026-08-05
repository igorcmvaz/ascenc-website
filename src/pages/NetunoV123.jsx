import PageLayout from "../components/PageLayout";
import { useTranslation } from "react-i18next";
import { AlertTriangle, FileSpreadsheet, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NetunoV123() {
  const { t } = useTranslation();

  return (
    <PageLayout title="Netuno 1, 2 & 3">
      <div className="max-w-3xl mx-auto space-y-8 pb-12">
        {/* Info Box */}
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
          <div className="p-4 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 rounded-2xl border border-amber-300 dark:border-amber-800 shrink-0">
            <AlertTriangle className="w-10 h-10 animate-bounce" />
          </div>
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-xl font-black text-slate-900 dark:text-zinc-100">
              {t("netuno.legacy_title", "Versões Legadas (Excel)")}
            </h2>
            <p className="text-slate-700 dark:text-zinc-300 text-sm font-semibold leading-relaxed">
              {t("netuno.legacy_desc", "Eram versões iniciais em Excel para estudos anteriores a 2014, sendo essa versão depreciada a partir do lançamento do Netuno 4.")}
            </p>
          </div>
        </div>

        {/* Feature list / placeholder */}
        <div className="bg-white dark:bg-slate-200/90 rounded-3xl border border-slate-200 dark:border-zinc-800 p-8 shadow-sm text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
            <FileSpreadsheet className="w-8 h-8 text-emerald-800 dark:text-emerald-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-black text-slate-900">
              {t("netuno.excel_based", "Modelagem Baseada em Planilhas")}
            </h3>
            <p className="text-xs text-slate-500 font-bold max-w-md mx-auto">
              {t("netuno.legacy_warning", "Essas planilhas históricas serviram como base para os primeiros algoritmos de aproveitamento de água de chuva desenvolvidos pelo grupo.")}
            </p>
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <Link
            to="/netuno"
            className="inline-flex items-center gap-2 px-6 py-2 bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-zinc-200 rounded-lg shadow hover:shadow-md hover:bg-gray-200 dark:hover:bg-zinc-600 transition-all duration-300 font-extrabold text-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t("netuno.back", "Voltar")} - Netuno</span>
          </Link>
        </div>
      </div>
    </PageLayout>
  );
}
