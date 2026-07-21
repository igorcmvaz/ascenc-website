import PageLayout from "../components/PageLayout";
import ODSList from "../components/ODSList";
import UniversityCard from "../components/UniversityCard";
import { useTranslation } from "react-i18next";

// Caminhos atualizados para a pasta public
const odsData = [
  { id: "ODS 6", img: "./assets/icons/SDG-6.svg" },
  { id: "ODS 7", img: "./assets/icons/SDG-7.svg" },
  { id: "ODS 11", img: "./assets/icons/SDG-11.svg" },
  { id: "ODS 13", img: "./assets/icons/SDG-13.svg" },
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-100 dark:bg-slate-200 border border-emerald-200 dark:border-slate-300 p-6 rounded-3xl shadow-md">
          <div className="bg-white dark:bg-slate-100 p-4 rounded-2xl border border-slate-200 dark:border-slate-300 shadow-sm flex flex-col items-center justify-between">
            <UniversityCard
              name="Universidade Federal de Santa Catarina (UFSC)"
              description={t('about.ufsc_desc')}
              img="./assets/logos/ufsc.png"
              url="https://ppgec.posgrad.ufsc.br/"
            />
          </div>
          <div className="bg-white dark:bg-slate-100 p-4 rounded-2xl border border-slate-200 dark:border-slate-300 shadow-sm flex flex-col items-center justify-between">
            <UniversityCard
              name="Universidade de Coimbra (UC)"
              description={t('about.uc_desc')}
              img="./assets/logos/ftuc.png"
              url="https://www.uc.pt/fctuc"
            />
          </div>
          <div className="bg-white dark:bg-slate-100 p-4 rounded-2xl border border-slate-200 dark:border-slate-300 shadow-sm flex flex-col items-center justify-between">
            <UniversityCard
              name="Universidade de São Paulo (USP)"
              description={t('about.usp_desc')}
              img="./assets/logos/uspsc.png"
              url="https://eesc.usp.br/"
            />
          </div>
        </div>
      </PageLayout>
    </>
  );
}