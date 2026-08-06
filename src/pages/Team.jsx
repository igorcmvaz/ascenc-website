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
        "name": "Aline Schaefer",
        "role": "Pesquisadora Pós-Doc",
        "image": "./assets/team/alineschaefer.png",
        "orcid": "https://orcid.org/0000-0001-8870-9863",
        "lattes": "http://lattes.cnpq.br/8826147751184750",
        "researchgate": "https://www.researchgate.net/profile/Aline-Schaefer"
    },
    {
        "name": "Rafael Almeida Flores",
        "role": "Pesquisador Pós-Doc",
        "image": "./assets/team/rafaelflores.jpeg",
        "orcid": "https://orcid.org/0000-0002-9374-1865",
        "lattes": "https://lattes.cnpq.br/3476347525352024",
        "researchgate": "https://www.researchgate.net/profile/Rafael-Flores-21?ev=prf_overview"
    },
    {
        "name": "Igor Catão Martins Vaz",
        "role": "Doutorando",
        "image": "./assets/team/igorcmvaz.png",
        "orcid": "https://orcid.org/0000-0003-2433-223X",
        "lattes": "http://lattes.cnpq.br/3846201039408286",
        "researchgate": "https://www.researchgate.net/profile/Igor-Vaz-3"
    },
    {
        "name": "Hedelvan Emerson Fardin",
        "role": "Doutorando",
        "image": "./assets/team/hedelvan.jpg",
        "orcid": "https://orcid.org/0000-0001-5838-6733",
        "lattes": "http://lattes.cnpq.br/1136405611229993",
        "researchgate": "https://www.researchgate.net/profile/Hedelvan-Fardin?ev=hdr_xprf"
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
        "role": "Mestrando",
        "image": "./assets/team/matheusmartins.JPG",
        "orcid": "https://orcid.org/0009-0007-5434-8693",
        "lattes": "https://lattes.cnpq.br/8801886077639414",
        "researchgate": "https://www.researchgate.net/profile/Matheus-Martins-57"
    },
    {
        "name": "Rita Carolina Aimi",
        "role": "Mestranda"
    },
    {
        "name": "Vitória Vicente Coltri",
        "role": "Mestranda",
        "image": "./assets/team/vitoriacoltri.jpeg",
        "orcid": "https://orcid.org/0009-0001-5724-9208",
        "lattes": "http://lattes.cnpq.br/8663301891731042",
        "researchgate": "https://www.researchgate.net/profile/Vitoria-Coltri?ev=hdr_xprf"
    }
];

  const formerMembers = [
    {
        "name": "Andrea Teston",
        "category": "Pós-Doutorado"
    },
    {
        "name": "Celimar Azambuja Teixeira",
        "lattes": "http://lattes.cnpq.br/6702681725561460",
        "category": "Pós-Doutorado"
    },
    {
        "name": "Cláudia Donald Pereira",
        "category": "Pós-Doutorado"
    },
    {
        "name": "Ricardo Forgiarini Rupp",
        "lattes": "http://lattes.cnpq.br/0355666000210770",
        "category": "Pós-Doutorado"
    },
    {
        "name": "Taylana Piccinini Scolaro",
        "lattes": "http://lattes.cnpq.br/7183244717269690",
        "category": "Pós-Doutorado"
    },
    {
        "name": "Ana Kelly Marinoski Ribeiro",
        "category": "Doutorado"
    },
    {
        "name": "Andrea Invidiata",
        "lattes": "http://lattes.cnpq.br/0578767852356933",
        "category": "Doutorado"
    },
    {
        "name": "Andreza Kalbusch",
        "category": "Doutorado"
    },
    {
        "name": "Arthur Santos Silva",
        "lattes": "http://lattes.cnpq.br/7017962493418481",
        "category": "Doutorado"
    },
    {
        "name": "Bruna Faitão Balvedi",
        "category": "Doutorado"
    },
    {
        "name": "Bruna Just Meller",
        "category": "Doutorado"
    },
    {
        "name": "Deivis Luis Marinoski",
        "lattes": "http://lattes.cnpq.br/3425265765339888",
        "category": "Doutorado"
    },
    {
        "name": "Diego Antônio Custódio",
        "category": "Doutorado"
    },
    {
        "name": "Igor Schnaider de Souza",
        "category": "Doutorado"
    },
    {
        "name": "Isabel Kroeff Braz",
        "category": "Doutorado"
    },
    {
        "name": "Lucas Niehuns Antunes",
        "category": "Doutorado"
    },
    {
        "name": "Luiz Solon Souza Barreto",
        "category": "Doutorado"
    },
    {
        "name": "Marina Ribeiro Viana",
        "category": "Doutorado"
    },
    {
        "name": "Mateus Vinícius Bavaresco",
        "lattes": "http://lattes.cnpq.br/1682595069602838",
        "category": "Doutorado"
    },
    {
        "name": "Matheus Soares Geraldi",
        "category": "Doutorado"
    },
    {
        "name": "Talita Flores Dias",
        "category": "Doutorado"
    },
    {
        "name": "Thayane Lodete Bilésimo",
        "category": "Doutorado"
    },
    {
        "name": "Tânia Mara Sebben Oneda",
        "category": "Doutorado"
    },
    {
        "name": "Ulisses Munarim",
        "category": "Doutorado"
    },
    {
        "name": "Abel Silva Vieira",
        "lattes": "http://lattes.cnpq.br/6438763922605609",
        "category": "Mestrado"
    },
    {
        "name": "Aline Eloize Borgert",
        "category": "Mestrado"
    },
    {
        "name": "Andrigo Demetrio da Silva",
        "category": "Mestrado"
    },
    {
        "name": "Ariadne Marques de Mendonça",
        "category": "Mestrado"
    },
    {
        "name": "Augusto Martins Marques",
        "category": "Mestrado"
    },
    {
        "name": "Cláudia Morishita",
        "category": "Mestrado"
    },
    {
        "name": "Douglas Ancelmo Freitas",
        "category": "Mestrado"
    },
    {
        "name": "Eduardo Pierozan",
        "category": "Mestrado"
    },
    {
        "name": "Eldenir Guedes Teodoro",
        "category": "Mestrado"
    },
    {
        "name": "Epaminondas de Souza Lage",
        "category": "Mestrado"
    },
    {
        "name": "Fabrícia de Oliveira Grando",
        "category": "Mestrado"
    },
    {
        "name": "Greici Ramos",
        "category": "Mestrado"
    },
    {
        "name": "Gustavo Coutinho Rosa",
        "category": "Mestrado"
    },
    {
        "name": "Joana Anny Mafalda de Oliveira",
        "category": "Mestrado"
    },
    {
        "name": "José Francisco Campos Moreira",
        "category": "Mestrado"
    },
    {
        "name": "Julia Beatriz Saugo Milani",
        "category": "Mestrado"
    },
    {
        "name": "Juliana May Sangoi",
        "category": "Mestrado"
    },
    {
        "name": "Jéssica Kuntz Maykot",
        "category": "Mestrado"
    },
    {
        "name": "Kácia Henderson Barbosa",
        "category": "Mestrado"
    },
    {
        "name": "Laiane Susan S. Almeida",
        "category": "Mestrado"
    },
    {
        "name": "Lais de Bortoli Klein",
        "category": "Mestrado"
    },
    {
        "name": "Laura Michelle Leite Ribeiro",
        "category": "Mestrado"
    },
    {
        "name": "Leticia Dalpaz de Azevedo",
        "category": "Mestrado"
    },
    {
        "name": "Luís Fernando Kidinho Araújo dos Santos",
        "category": "Mestrado"
    },
    {
        "name": "Marcelo Dalmédico Ioris",
        "category": "Mestrado"
    },
    {
        "name": "Marina Vasconcelos Santana",
        "category": "Mestrado"
    },
    {
        "name": "Marlon Eduardo Rodrigues",
        "category": "Mestrado"
    },
    {
        "name": "Mauricio Dias da Conceição Neto",
        "category": "Mestrado"
    },
    {
        "name": "Max Weeber",
        "category": "Mestrado"
    },
    {
        "name": "Roberta Jacoby Cureau",
        "category": "Mestrado"
    },
    {
        "name": "Rodrigo Novais Istchuk",
        "category": "Mestrado"
    },
    {
        "name": "Tiago Arent Longo",
        "category": "Mestrado"
    },
    {
        "name": "Tiago Diehl de Souza",
        "category": "Mestrado"
    },
    {
        "name": "Vinicius Luis Rocha",
        "category": "Mestrado"
    },
    {
        "name": "Wagner Isidoro Simioni",
        "category": "Mestrado"
    },
    {
        "name": "Acácio Gomes Corrêa Silvestre",
        "category": "Graduação"
    },
    {
        "name": "Alef Pereira",
        "category": "Graduação"
    },
    {
        "name": "Alexandre Maestri",
        "category": "Graduação"
    },
    {
        "name": "Amanda Geraldo Andrighi",
        "category": "Graduação"
    },
    {
        "name": "Ana Gabriela S A Cardoso",
        "category": "Graduação"
    },
    {
        "name": "Ana Júlia Deffaci Deresz",
        "category": "Graduação"
    },
    {
        "name": "Ana Júlia Heisler de Oliveira",
        "category": "Graduação"
    },
    {
        "name": "Andreza Montibeller",
        "category": "Graduação"
    },
    {
        "name": "André Castellani Lopes",
        "category": "Graduação"
    },
    {
        "name": "André Neis Botelho",
        "category": "Graduação"
    },
    {
        "name": "Anna Luiza Schiefler Wallner",
        "category": "Graduação"
    },
    {
        "name": "Anthony Midori Fugi",
        "category": "Graduação"
    },
    {
        "name": "Beatriz Bayestorff Muller",
        "category": "Graduação"
    },
    {
        "name": "Bernardo Farias Asmus",
        "category": "Graduação"
    },
    {
        "name": "Bruno Ariosa de Souza",
        "category": "Graduação"
    },
    {
        "name": "Caio Morelli Figueroba",
        "category": "Graduação"
    },
    {
        "name": "Caio Wolf Klein",
        "category": "Graduação"
    },
    {
        "name": "Candi Citadini de Oliveira",
        "category": "Graduação"
    },
    {
        "name": "Carolina Cannella Peña",
        "category": "Graduação"
    },
    {
        "name": "Cecília Soares Faco",
        "category": "Graduação"
    },
    {
        "name": "Daniel Fabricio Ferreira",
        "category": "Graduação"
    },
    {
        "name": "Dario Menegasso Pires",
        "category": "Graduação"
    },
    {
        "name": "Davi da Fonseca Tavares",
        "category": "Graduação"
    },
    {
        "name": "David Junior Gonçalves da Silva",
        "category": "Graduação"
    },
    {
        "name": "Diego Bressan",
        "category": "Graduação"
    },
    {
        "name": "Douglas Gherardt Brecht",
        "category": "Graduação"
    },
    {
        "name": "Douglas Leandro Meincheim",
        "category": "Graduação"
    },
    {
        "name": "Douglas Vigarani Scalco",
        "category": "Graduação"
    },
    {
        "name": "Débora Casasola",
        "category": "Graduação"
    },
    {
        "name": "Eduardo Bald",
        "category": "Graduação"
    },
    {
        "name": "Eduardo Leite Souza",
        "category": "Graduação"
    },
    {
        "name": "Eric Serafim Franco",
        "category": "Graduação"
    },
    {
        "name": "Felipe Cidade Soares",
        "category": "Graduação"
    },
    {
        "name": "Felipe Martini",
        "category": "Graduação"
    },
    {
        "name": "Felipe Scotti Alves Tonin Simoni",
        "category": "Graduação"
    },
    {
        "name": "Fernanda Anselmo",
        "category": "Graduação"
    },
    {
        "name": "Gabriel Balparda Fasola",
        "category": "Graduação"
    },
    {
        "name": "Gabriel de Abreu Burgos Gonçalves",
        "category": "Graduação"
    },
    {
        "name": "Gabriel Marcon Coelho",
        "category": "Graduação"
    },
    {
        "name": "Gabriel Silveira da Silva",
        "category": "Graduação"
    },
    {
        "name": "Gabriel Testoni Schmidt",
        "category": "Graduação"
    },
    {
        "name": "Gabriela Hammes",
        "category": "Graduação"
    },
    {
        "name": "Gianfranco Longo",
        "category": "Graduação"
    },
    {
        "name": "Giovanna Kiehn Bertuzzi",
        "category": "Graduação"
    },
    {
        "name": "Gladson Hoffmann da Silva",
        "category": "Graduação"
    },
    {
        "name": "Graziella Mendez Cardoso Bridi",
        "category": "Graduação"
    },
    {
        "name": "Guilherme Gonçalves",
        "category": "Graduação"
    },
    {
        "name": "Gustavo Husadel Poyer",
        "category": "Graduação"
    },
    {
        "name": "Helen Berwanger",
        "category": "Graduação"
    },
    {
        "name": "Higino Ilson da Silva",
        "category": "Graduação"
    },
    {
        "name": "Isabela Warmling Bezerra",
        "category": "Graduação"
    },
    {
        "name": "Isabelle Melo de Souza",
        "category": "Graduação"
    },
    {
        "name": "Isabelle Yasmin Trombetta",
        "category": "Graduação"
    },
    {
        "name": "Isis Soares Pereira do Nascimento",
        "category": "Graduação"
    },
    {
        "name": "Jacqueline Alves Ramos",
        "category": "Graduação"
    },
    {
        "name": "Jailson Osni Godinho",
        "category": "Graduação"
    },
    {
        "name": "Jean Francesco Arsego",
        "category": "Graduação"
    },
    {
        "name": "João Lorenço Novaes Pessoa",
        "category": "Graduação"
    },
    {
        "name": "João Vítor Eccel",
        "category": "Graduação"
    },
    {
        "name": "Julia Rataichesck Fiates",
        "category": "Graduação"
    },
    {
        "name": "Julia Teresa Bruch",
        "category": "Graduação"
    },
    {
        "name": "Juliana Dutra Miranda",
        "category": "Graduação"
    },
    {
        "name": "Karla Albino Cardoso",
        "category": "Graduação"
    },
    {
        "name": "Leonardo Barbosa Pacheco",
        "category": "Graduação"
    },
    {
        "name": "Leonardo Mazzaferro",
        "category": "Graduação"
    },
    {
        "name": "Leticia Silveira Moy",
        "category": "Graduação"
    },
    {
        "name": "Lucas Born Passoni",
        "category": "Graduação"
    },
    {
        "name": "Lucas Carvalho Delowski",
        "category": "Graduação"
    },
    {
        "name": "Lúcio Costa Proença",
        "category": "Graduação"
    },
    {
        "name": "Marcel Vechi",
        "category": "Graduação"
    },
    {
        "name": "Marcela Nettuzzi Faorlin",
        "category": "Graduação"
    },
    {
        "name": "Marcelo Marcel Cordova",
        "category": "Graduação"
    },
    {
        "name": "Maria Amália Marcon",
        "category": "Graduação"
    },
    {
        "name": "Maria Clara Sampaio Rosa e Silva",
        "category": "Graduação"
    },
    {
        "name": "Maria Paula Silveira",
        "category": "Graduação"
    },
    {
        "name": "Mariana Minati de Pinho",
        "category": "Graduação"
    },
    {
        "name": "Marta Elisa Vettori Dalsenter",
        "category": "Graduação"
    },
    {
        "name": "Matheus de Cezaro Menegatti",
        "category": "Graduação"
    },
    {
        "name": "Matheus Rosado Vill",
        "category": "Graduação"
    },
    {
        "name": "Maurício Martini",
        "category": "Graduação"
    },
    {
        "name": "Mirela Moreira Ribeiro",
        "lattes": "http://lattes.cnpq.br/6997171456515468",
        "category": "Graduação"
    },
    {
        "name": "Natália Castro de Oliveira",
        "category": "Graduação"
    },
    {
        "name": "Natália Mattos da Silva",
        "category": "Graduação"
    },
    {
        "name": "Natália Sens Fedrigo",
        "category": "Graduação"
    },
    {
        "name": "Osman Jose Reyes Alberto",
        "category": "Graduação"
    },
    {
        "name": "Pauline Cristiane Kammers",
        "category": "Graduação"
    },
    {
        "name": "Paulo Jorge Ramos",
        "category": "Graduação"
    },
    {
        "name": "Paulo Lucas",
        "category": "Graduação"
    },
    {
        "name": "Pedro Augusto Pinho Assi",
        "category": "Graduação"
    },
    {
        "name": "Pedro Schondermark",
        "category": "Graduação"
    },
    {
        "name": "Priscila Mei Minku",
        "category": "Graduação"
    },
    {
        "name": "Rachel Sarreta",
        "category": "Graduação"
    },
    {
        "name": "Rafael C de Oliveira",
        "category": "Graduação"
    },
    {
        "name": "Ramon Felipe Wasch Paes",
        "category": "Graduação"
    },
    {
        "name": "Renato B C Coelho",
        "category": "Graduação"
    },
    {
        "name": "Ricardo Danilo Rosa",
        "category": "Graduação"
    },
    {
        "name": "Ricardo Massignani",
        "category": "Graduação"
    },
    {
        "name": "Richard Williann Schmidt",
        "category": "Graduação"
    },
    {
        "name": "Roberto Holanda Campelo",
        "category": "Graduação"
    },
    {
        "name": "Sulayre Mengotti Oliveira",
        "category": "Graduação"
    },
    {
        "name": "Thaiane Cristina Stahnke Manorov",
        "category": "Graduação"
    },
    {
        "name": "Thiago Belotto",
        "category": "Graduação"
    },
    {
        "name": "Thiago Filippon Xavier",
        "category": "Graduação"
    },
    {
        "name": "Tiago Tamanini Junior",
        "category": "Graduação"
    },
    {
        "name": "Uther Zanin Baldissera",
        "category": "Graduação"
    },
    {
        "name": "Victor Corrêa Canto",
        "category": "Graduação"
    },
    {
        "name": "Vinicius Bubniak",
        "category": "Graduação"
    },
    {
        "name": "Vinicius Marcos Figueiredo",
        "category": "Graduação"
    },
    {
        "name": "Viviane Ciupka",
        "category": "Graduação"
    },
    {
        "name": "Vlademir Senger",
        "category": "Graduação"
    },
    {
        "name": "Yuri Triska",
        "category": "Graduação"
    },
    {
        "name": "Ícaro Rocha de Matos",
        "category": "Graduação"
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
          <div className="p-4 pt-2 border-t border-slate-200 dark:border-slate-300 space-y-4">
            {/* Pós-Doutorado */}
            {formerMembers.some(m => m.category === "Pós-Doutorado") && (
              <div>
                <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">Pós-Doutores</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {formerMembers.filter(m => m.category === "Pós-Doutorado").map((member, index) => (
                    <div key={index} className="bg-white dark:bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-300 flex items-center justify-between gap-1.5 shadow-2xs hover:border-emerald-400 transition-colors">
                      <span className="font-bold text-slate-900 text-[11px] truncate" title={member.name}>{member.name}</span>
                      {member.lattes ? (
                        <a href={member.lattes} target="_blank" rel="noopener noreferrer" className="shrink-0" title="Lattes">
                          <img src="./assets/icons/lattes.png" alt="Lattes" className="w-4 h-4 hover:scale-110 transition-transform" />
                        </a>
                      ) : <span className="text-[9px] text-slate-400 italic shrink-0">—</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Doutorado */}
            {formerMembers.some(m => m.category === "Doutorado") && (
              <div>
                <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2 mt-2">Doutores</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {formerMembers.filter(m => m.category === "Doutorado").map((member, index) => (
                    <div key={index} className="bg-white dark:bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-300 flex items-center justify-between gap-1.5 shadow-2xs hover:border-emerald-400 transition-colors">
                      <span className="font-bold text-slate-900 text-[11px] truncate" title={member.name}>{member.name}</span>
                      {member.lattes ? (
                        <a href={member.lattes} target="_blank" rel="noopener noreferrer" className="shrink-0" title="Lattes">
                          <img src="./assets/icons/lattes.png" alt="Lattes" className="w-4 h-4 hover:scale-110 transition-transform" />
                        </a>
                      ) : <span className="text-[9px] text-slate-400 italic shrink-0">—</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mestrado */}
            {formerMembers.some(m => m.category === "Mestrado") && (
              <div>
                <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2 mt-2">Mestres</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {formerMembers.filter(m => m.category === "Mestrado").map((member, index) => (
                    <div key={index} className="bg-white dark:bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-300 flex items-center justify-between gap-1.5 shadow-2xs hover:border-emerald-400 transition-colors">
                      <span className="font-bold text-slate-900 text-[11px] truncate" title={member.name}>{member.name}</span>
                      {member.lattes ? (
                        <a href={member.lattes} target="_blank" rel="noopener noreferrer" className="shrink-0" title="Lattes">
                          <img src="./assets/icons/lattes.png" alt="Lattes" className="w-4 h-4 hover:scale-110 transition-transform" />
                        </a>
                      ) : <span className="text-[9px] text-slate-400 italic shrink-0">—</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Graduação e Iniciação Científica */}
            {formerMembers.some(m => m.category === "Graduação") && (
              <div>
                <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2 mt-2">Graduação e Iniciação Científica (TCC / PIBIC)</h3>
                <div className="bg-white dark:bg-slate-100 p-3 rounded-lg border border-slate-300 shadow-2xs">
                  <div className="text-slate-700 dark:text-slate-800 text-[11px] leading-relaxed">
                    {formerMembers.filter(m => m.category === "Graduação").map((member, index, arr) => (
                      <span key={index}>
                        <span className="font-bold text-slate-900">{member.name}</span>
                        {member.lattes && (
                          <a href={member.lattes} target="_blank" rel="noopener noreferrer" className="inline-block align-middle ml-1" title="Lattes">
                            <img src="./assets/icons/lattes.png" alt="Lattes" className="w-3 h-3 hover:scale-110 transition-transform" />
                          </a>
                        )}
                        {index < arr.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </details>
      </div>
    </PageLayout>
  );
}