import PageLayout from "../components/PageLayout";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PAIMT() {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('paimt.title')}>
      <div className="space-y-12">
        <section className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-4 space-y-4">
            <p
              className="text-lg leading-relaxed text-gray-700 dark:text-zinc-300"
              dangerouslySetInnerHTML={{ __html: t('paimt.description') }}
            />
          </div>

          <div className="flex justify-center md:justify-end">
            <a
              href="https://zenodo.org/records/12571153"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white dark:bg-slate-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center p-5 border border-slate-200 dark:border-slate-300 w-44"
            >
              <img
                src="./assets/logos/zenodo.png"
                alt="Zenodo"
                className="w-14 h-14 object-contain mb-3 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5 text-center">
                {t('paimt.button')} <ExternalLink className="w-4 h-4 text-emerald-800" />
              </span>
            </a>
          </div>
        </section>

        <section>
          <div className="rounded-xl overflow-hidden shadow-xl dark:shadow-md dark:shadow-zinc-700 border border-gray-300 dark:border-zinc-700">
            <iframe
              title="PAIM-T Dashboard"
              src="https://app.powerbi.com/view?r=eyJrIjoiYmUxOTE3ZDItMjk4MC00MzVmLWE3MTMtOTMyMGE3NzExZDdkIiwidCI6ImZhNzk1MzFjLThjZTUtNGJkMy05N2VlLTI0NWU2ZWUyNjZiOCJ9&pageName=ReportSection"
              style={{
                width: "100%",
                height: "600px",
                border: "none",
              }}
            ></iframe>
          </div>

          <div className="flex justify-center mt-12">
            <Link
              to="/ascenc/tools"
              className="inline-flex items-center gap-2 px-6 py-2 bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-zinc-200 rounded-lg shadow hover:shadow-md hover:bg-gray-200 dark:hover:bg-zinc-600 transition-all duration-300 font-extrabold text-sm"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{t('paimt.back', 'Voltar')} - ASCENC</span>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}