import PageLayout from "../components/PageLayout";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function NetunoV5() {
  const { t } = useTranslation();

  return (
    <PageLayout title="Netuno 5">
      <div className="max-w-2xl mx-auto text-center space-y-8 pb-16 pt-12">
        <div className="inline-flex p-3 bg-blue-50 dark:bg-slate-100 rounded-3xl border border-blue-200 dark:border-slate-300 shadow-md shrink-0 items-center justify-center w-24 h-24 mx-auto animate-pulse">
          <img src="./assets/logos/netuno5.png" alt="Netuno 5 Logo" className="w-16 h-16 object-contain" />
        </div>

        <div className="space-y-4">
          <span className="text-xs font-black tracking-widest uppercase px-3 py-1 bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800 rounded-full">
            {t("netuno.status_dev", "Em desenvolvimento")}
          </span>
          <p className="text-slate-600 dark:text-zinc-400 text-sm font-semibold max-w-md mx-auto leading-relaxed pt-2">
            {t("netuno.dev_desc", "A próxima geração do software Netuno está sendo projetada com novos modelos de simulação climática, interface moderna e ferramentas de análise de ciclo de vida integradas.")}
          </p>
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
