import PageLayout from "../components/PageLayout";
import TeamMemberCard from "../components/TeamMemberCard";
import { useTranslation } from "react-i18next";

export default function Team() {
  const { t } = useTranslation();

  const getTranslatedRole = (role) => {
    if (!role) return "";
    const cleanRole = role.trim();
    const translationKey = `roles.${cleanRole}`;
    const translated = t(translationKey);
    return translated !== translationKey ? translated : cleanRole;
  };

  const professors = [
    {
        "name": "Enedir Ghisi",
        "role": "Coordenador",
        "image": "./assets/team/enedirghisi.png",
        "orcid": "https://orcid.org/0000-0001-5918-6397",
        "lattes": "http://lattes.cnpq.br/0067772895372542",
        "researchgate": "https://www.researchgate.net/profile/Enedir-Ghisi"
    },
    {
        "name": "Liseane Padilha Thives",
        "role": "Sub-Coordenadora",
        "image": "./assets/team/liseanepthives.jpeg",
        "orcid": "https://orcid.org/0000-0002-4782-2496",
        "lattes": "http://lattes.cnpq.br/3913788588121411",
        "researchgate": "https://www.researchgate.net/profile/Liseane-Thives"
    }
];

  const researchers = [
    {
        "name": "Taylana Piccinini Scolaro",
        "role": "Pesquisadora Pós-Doc",
        "image": "./assets/team/taylanapscolaro.png",
        "orcid": "https://orcid.org/0000-0003-4296-0686",
        "lattes": "http://lattes.cnpq.br/7183244717269690",
        "researchgate": "https://www.researchgate.net/profile/Taylana-Scolaro"
    },
    {
        "name": "Aline Schaefer",
        "role": "Pesquisadora Pós-Doc",
        "image": "./assets/team/alineschaefer.png",
        "orcid": "https://orcid.org/0000-0001-8870-9863",
        "lattes": "http://lattes.cnpq.br/8826147751184750",
        "researchgate": "https://www.researchgate.net/profile/Aline-Schaefer"
    },
    {
        "name": "Igor Catão Martins Vaz",
        "role": "Pesquisador Doutorando",
        "image": "./assets/team/igorcmvaz.png",
        "orcid": "https://orcid.org/0000-0003-2433-223X",
        "lattes": "http://lattes.cnpq.br/3846201039408286",
        "researchgate": "https://www.researchgate.net/profile/Igor-Vaz-3"
    },
    {
        "name": "Priscila Zampier",
        "role": "Pesquisadora Mestrado",
        "image": "./assets/team/priscila.jpeg",
        "orcid": "https://orcid.org/0009-0001-5577-2441",
        "lattes": "https://lattes.cnpq.br/2233053067068322",
        "researchgate": "https://www.researchgate.net/profile/Priscila-Zampier-2?ev=hdr_xprf"
    }
];

  const formerMembers = [
    {
        "name": "Mirela Moreira Ribeiro",
        "lattes": "http://lattes.cnpq.br/6997171456515468"
    },
    {
        "name": "Deivis Luis Marinoski",
        "lattes": "http://lattes.cnpq.br/3425265765339888"
    },
    {
        "name": "Ricardo Forgiarini Rupp",
        "lattes": "http://lattes.cnpq.br/0355666000210770"
    },
    {
        "name": "Arthur Santos Silva",
        "lattes": "http://lattes.cnpq.br/7017962493418481"
    },
    {
        "name": "Abel Silva Vieira",
        "lattes": "http://lattes.cnpq.br/6438763922605609"
    },
    {
        "name": "Mateus Vinícius Bavaresco",
        "lattes": "http://lattes.cnpq.br/1682595069602838"
    },
    {
        "name": "Andrea Invidiata",
        "lattes": "http://lattes.cnpq.br/0578767852356933"
    },
    {
        "name": "Max Weeber"
    },
    {
        "name": "Rafael Almeida Flores",
        "lattes": "http://lattes.cnpq.br/3476347525352024"
    }
];

  return (
    <PageLayout title={t('team.title')}>
      <div className="space-y-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Coluna 1: Professores (Estreita) */}
          <div className="lg:col-span-4 bg-slate-100 dark:bg-slate-100 border border-slate-300 dark:border-slate-300 p-6 sm:p-8 rounded-3xl shadow-md space-y-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 border-b border-slate-300 pb-3 mb-6">
                {t('team.professors')}
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {professors.map((member, index) => (
                  <TeamMemberCard
                    key={index}
                    name={member.name}
                    role={getTranslatedRole(member.role)}
                    image={member.image}
                    orcid={member.orcid}
                    researchgate={member.researchgate}
                    lattes={member.lattes}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Coluna 2: Pesquisadores (Larga) */}
          <div className="lg:col-span-8 bg-slate-100 dark:bg-slate-100 border border-slate-300 dark:border-slate-300 p-6 sm:p-8 rounded-3xl shadow-md space-y-8 flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 border-b border-slate-300 pb-3 mb-6">
                {t('team.researchers', 'Pesquisadores')}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {researchers.map((member, index) => (
                  <TeamMemberCard
                    key={index}
                    name={member.name}
                    role={getTranslatedRole(member.role)}
                    image={member.image}
                    orcid={member.orcid}
                    researchgate={member.researchgate}
                    lattes={member.lattes}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grupo 3: Ex-membros (Sem Imagem, com Lattes) */}
        <div className="bg-slate-100 dark:bg-slate-100 border border-slate-300 dark:border-slate-300 p-6 sm:p-8 rounded-3xl shadow-md space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 border-b border-slate-300 pb-3">
            {t('team.ex_members')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {formerMembers.map((member, index) => (
              <div key={index} className="bg-white dark:bg-white p-3.5 rounded-xl border border-slate-300 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
                <span className="font-extrabold text-slate-900 text-sm truncate">{member.name}</span>
                {member.lattes ? (
                  <a
                    href={member.lattes}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-black text-emerald-700 hover:underline flex items-center gap-1 shrink-0"
                  >
                    Lattes
                  </a>
                ) : (
                  <span className="text-xs text-slate-400 italic shrink-0">—</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}