import PageLayout from "../components/PageLayout";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PAIMP() {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('paimp.title')}>
      <div className="space-y-12">
        {/* Grid com texto e botão Zenodo */}
        <section className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
          {/* Texto - 4/5 */}
          <div className="md:col-span-4 space-y-4">
            <p
              className="text-lg leading-relaxed text-gray-700 dark:text-zinc-300"
              dangerouslySetInnerHTML={{ __html: t('paimp.description') }}
            >
            </p>
          </div>

          {/* Botão Zenodo - 1/5 */}
          <div className="flex justify-center md:justify-end">
            <a
              href="https://zenodo.org/records/15066263"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gray-100 dark:bg-zinc-800 rounded-xl shadow-md hover:shadow-2xl dark:hover:shadow-zinc-700 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center p-6 border border-gray-200 dark:border-zinc-700 w-40"
            >
              <img
                src="./assets/zenodo.png"
                alt="Zenodo"
                className="w-14 h-14 object-contain mb-3 transition-transform duration-300 group-hover:scale-110 dark:hidden"
              />
              <img
                src="./assets/zenodo_dark.png"
                alt="Zenodo"
                className="w-14 h-14 object-contain mb-3 transition-transform duration-300 group-hover:scale-110 hidden dark:block"
              />
              <span className="text-sm font-semibold text-gray-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white flex items-center gap-1 text-center">
                {t('paimp.button')} <ExternalLink className="w-4 h-4" />
              </span>
            </a>
          </div>
        </section>

        {/* Painel Power BI */}
        <section>         
          <div className="rounded-xl overflow-hidden shadow-xl dark:shadow-md dark:shadow-zinc-700 border border-gray-300 dark:border-zinc-700">
            <iframe
              title="PAIM-P Dashboard"
              src="https://app.powerbi.com/view?r=eyJrIjoiMWYxNjc5ZDgtZDcxOS00ZWZjLTg0ODgtMzc2NDhhZjIyNjczIiwidCI6ImZhNzk1MzFjLThjZTUtNGJkMy05N2VlLTI0NWU2ZWUyNjZiOCJ9&pageName=6ae702bbd34915220df6"
              style={{
                width: "100%",
                height: "600px",
                border: "none",
              }}
            ></iframe>
          </div>

          {/* Botão Voltar */}
          <div className="flex justify-center mt-12">
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 px-6 py-2 bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-zinc-200 rounded-lg shadow hover:shadow-md hover:bg-gray-200 dark:hover:bg-zinc-600 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              {t('paimp.back')}
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}