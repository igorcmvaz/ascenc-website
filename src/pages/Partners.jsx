import PageLayout from "../components/PageLayout";
import UniversityCard from "../components/UniversityCard";
import TeamMemberCard from "../components/TeamMemberCard";
import { useTranslation } from "react-i18next";

export default function Partners() {
  const { t } = useTranslation();

  const universities = [
    {
        "name": "Universidade Federal de Santa Catarina (UFSC)",
        "description": "Programa de Pós-Graduação em Engenharia Civil",
        "img": "./assets/logos/ufsc.png",
        "url": "https://ppgec.posgrad.ufsc.br/"
    },
    {
        "name": "Universidade de Coimbra (UC)",
        "description": "Faculdade de Ciências e Tecnologia (FCTUC)",
        "img": "./assets/logos/ftuc.png",
        "url": "https://www.uc.pt/fctuc"
    },
    {
        "name": "Universidade de São Paulo (USP)",
        "description": "Escola de Engenharia de São Carlos (EESC)",
        "img": "./assets/logos/uspsc.png",
        "url": "https://eesc.usp.br/"
    },
    {
        "name": "Universidade do Estado de Santa Catarina (UDESC)",
        "description": "Departamento de Arquitetura e Urbanismo",
        "img": "./assets/logos/udesc.png",
        "url": "https://www.udesc.br/cct/dau"
    },
    {
        "name": "Universidade Federal de Mato Grosso do Sul (UFMS)",
        "description": "Faculdade de Engenharia, Arquitetura e Urbanismo e Geografia",
        "img": "./assets/logos/UFMS.png",
        "url": "https://faeng.ufms.br/"
    },
    {
        "name": "Universidade Tecnológica Federal do Paraná (UTFPR)",
        "description": "Universidade Parceira de Pesquisa",
        "img": "./assets/logos/UTFPR.png",
        "url": "https://www.utfpr.edu.br/"
    }
];

  const collaborators = [
    {
        "name": "Eugénio Rodrigues",
        "role": "Pesquisador Colaborador",
        "image": "./assets/team/eugeniorodrigues.png",
        "orcid": "https://orcid.org/0000-0001-7023-4484",
        "researchgate": "https://www.researchgate.net/profile/Eugenio_Rodrigues"
    },
    {
        "name": "Andrea Teston",
        "role": "Pesquisadora Colaboradora",
        "image": "./assets/team/andreateston.png",
        "orcid": "https://orcid.org/0000-0001-7529-382X",
        "researchgate": "https://www.researchgate.net/profile/Andrea-Teston"
    },
    {
        "name": "Matheus Bruhns Bastos",
        "role": "Pesquisador Colaborador",
        "image": "./assets/team/matheusbbastos.png",
        "orcid": "https://orcid.org/0009-0006-7673-1338"
    },
    {
        "name": "André Simões Ballarin",
        "role": "Pesquisador Colaborador",
        "image": "./assets/team/andresballarin.png",
        "orcid": "https://orcid.org/0000-0001-6997-8662",
        "lattes": "http://lattes.cnpq.br/1215296341338514",
        "researchgate": "https://www.researchgate.net/profile/Andre-Ballarin"
    }
];

  return (
    <PageLayout title={t('ges_header.partners') || "Parcerias"}>
      <div className="space-y-16 max-w-6xl mx-auto">
        {/* Universidades / Institutions */}
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-zinc-100 flex items-center gap-3">
            <span className="w-8 h-1 bg-emerald-500 rounded-full inline-block" />
            {t('about.partner_universities')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 bg-white dark:bg-slate-100 border border-emerald-200 dark:border-slate-300 p-3 sm:p-4 rounded-3xl shadow-md">
            {universities.map((uni, index) => (
              <div key={index} className="flex flex-col justify-between items-center p-3 bg-slate-50 dark:bg-white rounded-2xl border border-slate-200 dark:border-slate-300 shadow-sm hover:shadow-md transition-shadow">
                <UniversityCard
                  name={uni.name}
                  description={uni.description}
                  img={uni.img}
                  url={uni.url}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Colaboradores / Collaborators */}
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-zinc-100 flex items-center gap-3">
            <span className="w-8 h-1 bg-teal-500 rounded-full inline-block" />
            {t('team.collaborator')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 bg-white dark:bg-slate-100 border border-emerald-200 dark:border-slate-300 p-6 sm:p-8 rounded-3xl shadow-md">
            {collaborators.map((collab, index) => (
              <TeamMemberCard
                key={index}
                name={collab.name}
                role={collab.role}
                image={collab.image}
                orcid={collab.orcid}
                researchgate={collab.researchgate}
                lattes={collab.lattes}
              />
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
