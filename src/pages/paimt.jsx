import PageLayout from "../components/PageLayout";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PAIMT() {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('paimt.title')}>
      <div className="space-y-12 text-gray-900">
        <section className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-4 space-y-4">
            <p
              className="text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: t('paimt.description') }}
            />
          </div>

          <div className="flex justify-center md:justify-end">
            <a
              href="https://zenodo.org/records/12571153"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center p-6 border border-gray-200 w-40"
            >
              <img
                src="./assets/zenodo.png"
                alt="Zenodo"
                className="w-14 h-14 object-contain mb-3 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 flex items-center gap-1 text-center">
                {t('paimt.button')} <ExternalLink className="w-4 h-4" />
              </span>
            </a>
          </div>
        </section>

        <section>
          <div className="rounded-xl overflow-hidden shadow-xl border border-gray-300">
            <iframe
              title="PAIM-T Dashboard"
              src="https://app.powerbi.com/view?r=eyJrIjoiNWI0ZTk5YjMtZjA5Ny00ZjE3LTk2ZDUtNDA1OThhNWQ3NWYxIiwidCI6ImZhNzk1MzFjLThjZTUtNGJkMy05N2VlLTI0NWU2ZWUyNjZiOCJ9"
              style={{
                width: "100%",
                height: "600px",
                border: "none",
              }}
            ></iframe>
          </div>

          <div className="flex justify-center mt-12">
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 px-6 py-2 bg-gray-100 text-gray-800 rounded-lg shadow hover:shadow-md hover:bg-gray-200 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              {t('paimt.back')}
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}