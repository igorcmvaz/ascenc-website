import PageLayout from "../components/PageLayout";
import ODSList from "../components/ODSList";
import UniversityCard from "../components/UniversityCard";
import { useTranslation } from "react-i18next";

// Caminhos atualizados para a pasta public
const odsData = [
  { id: "ODS 6", img: "./assets/SDG-6.svg" },
  { id: "ODS 7", img: "./assets/SDG-7.svg" },
  { id: "ODS 11", img: "./assets/SDG-11.svg" },
  { id: "ODS 13", img: "./assets/SDG-13.svg" },
];

export default function About() {
  const { t } = useTranslation();
  const axes = [1, 2, 3, 4, 5, 6];
  
  return (
    <>
      <PageLayout title={t('about.title')}>
        <p className="text-justify mb-4">{t('about.p1')}</p>
        <p className="text-justify mb-4">{t('about.p2')}</p>

        <ul className="list-disc pl-6 mb-6 text-justify space-y-2">
          {axes.map((i) => (
            <li key={i}>
              <strong>{t(`about.axis${i}_title`)}</strong> {t(`about.axis${i}_desc`)}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold text-center mb-6">{t('about.ods_alignment')}</h2>
        <ODSList ods={odsData} />

        <h2 className="text-2xl font-bold text-center mt-12 mb-6">
          {t('about.partner_universities')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <UniversityCard
            name="Universidade Federal de Santa Catarina (UFSC)"
            description={t('about.ufsc_desc')}
            img="./assets/ufsc.png" // Caminho corrigido
          />
          <UniversityCard
            name="Universidade de Coimbra (UC)"
            description={t('about.uc_desc')}
            img="./assets/ftuc_2.png" // Caminho corrigido
          />
          <UniversityCard
            name="Universidade de São Paulo (USP)"
            description={t('about.usp_desc')}
            img="./assets/uspsc.png" // Caminho corrigido
          />
        </div>
      </PageLayout>
    </>
  );
}