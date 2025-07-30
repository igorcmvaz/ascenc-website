import PageLayout from "../components/PageLayout";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PAIMP() {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('paimp.title')}>
      <div className="space-y-12 text-gray-900">
        {/* Grid com texto e botão Zenodo */}
        <section className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
          {/* Texto - 4/5 */}
          <div className="md:col-span-4 space-y-4">
            <p
              className="text-lg leading-relaxed"
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
              className="group bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center p-6 border border-gray-200 w-40"
            >
              <img
                src="./assets/zenodo.png" // Caminho da imagem corrigido
                alt="Zenodo"
                className="w-14 h-14 object-contain mb-3 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 flex items-center gap-1 text-center">
                {t('paimp.button')} <ExternalLink className="w-4 h-4" />
              </span>
            </a>
          </div>
        </section>

        {/* Painel Power BI */}
        <section>         
          <div className="rounded-xl overflow-hidden shadow-xl border border-gray-300">
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
              className="inline-flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-800 rounded-lg shadow hover:shadow-md hover:bg-gray-200 transition-all duration-300"
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