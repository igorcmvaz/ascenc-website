import PageLayout from "../components/PageLayout";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <PageLayout centerOnScreen>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{t('home.title')}</h1>
          <p
            className="text-gray-700 text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t('home.description') }}
          />
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src="./assets/ascenc.png"
            alt="ASCENC"
            className="max-w-lg md:max-w-xl w-full h-auto"
          />
        </div>
      </div>
    </PageLayout>
  );
}