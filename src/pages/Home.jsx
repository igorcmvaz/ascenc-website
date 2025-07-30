import PageLayout from "../components/PageLayout";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  return (
    <PageLayout centerOnScreen>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-zinc-100">{t('home.title')}</h1>
          <p
            className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t('home.description') }}
          />
        </div>

        <div className="flex-1 flex justify-center">
          {/* Imagem para o modo claro (padrão) */}
          <img
            src="./assets/ascenc.png" 
            alt="ASCENC"
            className="max-w-lg md:max-w-xl w-full h-auto dark:hidden" // Esconde no dark mode
          />
          {/* Imagem para o modo escuro */}
          <img
            src="./assets/ascenc_dark.png" // Sua nova imagem para o dark mode
            alt="ASCENC"
            className="max-w-lg md:max-w-xl w-full h-auto hidden dark:block" // Aparece apenas no dark mode
          />
        </div>
      </div>
    </PageLayout>
  );
}