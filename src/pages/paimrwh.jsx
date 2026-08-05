import PageLayout from "../components/PageLayout";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function PAIMRWH() {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('paimrwh.title')}>
      <div className="space-y-12">
        <section className="grid grid-cols-1 gap-10 items-center">
          <div className="space-y-4">
            <p
              className="text-lg leading-relaxed text-gray-700 dark:text-zinc-300"
              dangerouslySetInnerHTML={{ __html: t('paimrwh.description') }}
            />
          </div>
        </section>

        <section>
          <div className="rounded-xl overflow-hidden shadow-xl dark:shadow-md dark:shadow-zinc-700 border border-gray-300 dark:border-zinc-700">
            <iframe
              title="PAIM-RWH Dashboard"
              src="https://app.powerbi.com/view?r=eyJrIjoiY2E3OGYwZGYtZTM4OC00ZmM4LThlM2ItMjJiMGU2NzZjYTgwIiwidCI6ImZhNzk1MzFjLThjZTUtNGJkMy05N2VlLTI0NWU2ZWUyNjZiOCJ9"
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
              <span>{t('paimrwh.back', 'Voltar')} - ASCENC</span>
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
