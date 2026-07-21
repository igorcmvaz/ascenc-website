import PageLayout from "../components/PageLayout";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PAICACV() {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('paicacv.title') || t('tools.paicacv')} fullWidth>
      <div className="space-y-8">
        {/* Description section */}
        <section className="max-w-4xl">
          <p
            className="text-lg leading-relaxed text-gray-700 dark:text-zinc-300"
            dangerouslySetInnerHTML={{ __html: t('paicacv.description') }}
          />
        </section>

        {/* Calculator section */}
        <section>
          <div className="rounded-xl overflow-hidden shadow-xl dark:shadow-md dark:shadow-zinc-800 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
            <iframe
              title="PAIC-ACV Calculator"
              src="./paicacv/index.html"
              className="w-full border-none"
              allowFullScreen
              allow="fullscreen"
              style={{
                height: "calc(100vh - 220px)",
                minHeight: "800px",
              }}
            ></iframe>
          </div>

          <div className="flex justify-center mt-8">
            <Link
              to="/ascenc/tools"
              className="inline-flex items-center gap-2 px-6 py-2 bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 rounded-lg shadow hover:shadow-md hover:bg-gray-200 dark:hover:bg-zinc-700 transition-all duration-300 border border-gray-200 dark:border-zinc-700"
            >
              <ArrowLeft className="w-5 h-5" />
              {t('paicacv.back') || t('paimt.back') || "Voltar"}
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
