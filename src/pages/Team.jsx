import PageLayout from "../components/PageLayout";
import TeamMemberCard from "../components/TeamMemberCard";
import { useTranslation } from "react-i18next";
import { ChevronDown, Users } from "lucide-react";

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
        "role": "Pesquisadora",
        "image": "./assets/team/liseanepthives.jpeg",
        "orcid": "https://orcid.org/0000-0002-4782-2496",
        "lattes": "http://lattes.cnpq.br/3913788588121411",
        "researchgate": "https://www.researchgate.net/profile/Liseane-Thives"
    }
];

  const researchers = [
    {
        "name": "Igor Catão Martins Vaz",
        "role": "Doutorando",
        "image": "./assets/team/igorcmvaz.png",
        "orcid": "https://orcid.org/0000-0003-2433-223X",
        "lattes": "http://lattes.cnpq.br/3846201039408286",
        "researchgate": "https://www.researchgate.net/profile/Igor-Vaz-3"
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
        "name": "Joelia Silva Cavalcante",
        "role": "Doutoranda",
        "email": "joeliacavalcante@gmail.com"
    },
    {
        "name": "Dilson Machado Cunha",
        "role": "Doutorando"
    },
    {
        "name": "Marco Aurelio Vieira Boufleur",
        "role": "Doutorando"
    },
    {
        "name": "Priscila Zampier",
        "role": "Mestranda",
        "image": "./assets/team/priscila.jpeg",
        "orcid": "https://orcid.org/0009-0001-5577-2441",
        "lattes": "https://lattes.cnpq.br/2233053067068322",
        "researchgate": "https://www.researchgate.net/profile/Priscila-Zampier-2?ev=hdr_xprf"
    },
    {
        "name": "Amanda Costa Ramos",
        "role": "Mestranda",
        "email": "amanda.costa.arqeurb@gmail.com"
    },
    {
        "name": "Laryssa Bitencourt Anselmo",
        "role": "Mestranda"
    },
    {
        "name": "João Pedro Gemelli Reali",
        "role": "Mestrando"
    },
    {
        "name": "Matheus Do Nascimento Martins",
        "role": "Mestrando"
    },
    {
        "name": "Rita Carolina Aimi",
        "role": "Mestranda"
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
      <div className="space-y-5 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Coluna 1: Professores (Estreita - 3 Colunas de 12) */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-200 border border-slate-300 dark:border-slate-300 p-4 sm:p-5 rounded-2xl shadow-md flex flex-col justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-300 pb-2 mb-4">
                {t('team.professors')}
              </h2>
              <div className="grid grid-cols-1 gap-3">
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

          {/* Coluna 2: Pesquisadores (Larga - 9 Colunas de 12 em 3 Colunas Internas) */}
          <div className="lg:col-span-9 bg-white dark:bg-slate-200 border border-slate-300 dark:border-slate-300 p-4 sm:p-5 rounded-2xl shadow-md flex flex-col justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 border-b border-slate-300 pb-2 mb-4">
                {t('team.researchers', 'Pesquisadores')}
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {researchers.map((member, index) => (
                  <TeamMemberCard
                    key={index}
                    name={member.name}
                    role={getTranslatedRole(member.role)}
                    image={member.image}
                    orcid={member.orcid}
                    researchgate={member.researchgate}
                    lattes={member.lattes}
                    email={member.email}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grupo 3: Ex-membros (Caixa Sanfona / Acordeão Colapsável) */}
        <details className="group bg-white dark:bg-slate-200 border border-slate-300 dark:border-slate-300 rounded-2xl shadow-sm overflow-hidden">
          <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none font-extrabold text-slate-900 hover:bg-slate-100/60 dark:hover:bg-slate-100 transition-colors list-none">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <Users className="w-4.5 h-4.5 text-emerald-700 shrink-0" />
              <span>{t('team.ex_members')}</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-300 text-slate-700 font-bold border border-slate-300">
                {formerMembers.length}
              </span>
            </div>
            <ChevronDown className="w-4.5 h-4.5 text-slate-500 transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <div className="p-3.5 pt-2 border-t border-slate-200 dark:border-slate-300">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {formerMembers.map((member, index) => (
                <div key={index} className="bg-white dark:bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-300 flex items-center justify-between gap-1.5 shadow-2xs hover:border-emerald-400 transition-colors">
                  <span className="font-bold text-slate-900 text-[11px] truncate" title={member.name}>{member.name}</span>
                  {member.lattes ? (
                    <a
                      href={member.lattes}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0"
                      title="Lattes"
                    >
                      <img
                        src="./assets/icons/lattes.png"
                        alt="Lattes"
                        className="w-4 h-4 hover:scale-110 transition-transform"
                      />
                    </a>
                  ) : (
                    <span className="text-[9px] text-slate-400 italic shrink-0">—</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </details>
      </div>
    </PageLayout>
  );
}