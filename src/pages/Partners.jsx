import PageLayout from "../components/PageLayout";
import CollaboratorCard from "../components/CollaboratorCard";
import { useTranslation } from "react-i18next";
import { Users } from "lucide-react";

export default function Partners() {
  const { t } = useTranslation();

  const collaborators = [
    {
        "name": "Eugénio Rodrigues",
        "role": "Pesquisador Colaborador",
        "image": "./assets/team/eugeniorodrigues.png",
        "orcid": "https://orcid.org/0000-0001-7023-4484",
        "researchgate": "https://www.researchgate.net/profile/Eugenio_Rodrigues",
        "areas": [
            "Simulacao-Computacional",
            "Mudancas-Climaticas"
        ],
        "universities": [
            {
                "key": "uc",
                "name": "Universidade de Coimbra (UC)",
                "img": "./assets/logos/ftuc.png",
                "url": "https://www.uc.pt/fctuc"
            },
            {
                "key": "cura-lab",
                "name": "CURA Lab (ADAI)",
                "img": "./assets/logos/curalab.png",
                "url": "https://cura-lab.adai.pt/"
            }
        ]
    },
    {
        "name": "Andrea Teston",
        "role": "Pesquisadora Colaboradora",
        "image": "./assets/team/andreateston.png",
        "orcid": "https://orcid.org/0000-0001-7529-382X",
        "researchgate": "https://www.researchgate.net/profile/Andrea-Teston",
        "areas": [
            "Agua-Pluvial"
        ],
        "university": {
            "key": "udesc",
            "name": "Universidade do Estado de Santa Catarina (UDESC)",
            "img": "./assets/logos/udesc.png",
            "url": "https://www.udesc.br/cct/dau"
        }
    },
    {
        "name": "Matheus Bruhns Bastos",
        "role": "Pesquisador Colaborador",
        "image": "./assets/team/matheusbbastos.png",
        "orcid": "https://orcid.org/0009-0006-7673-1338",
        "areas": [
            "Simulacao-Computacional"
        ],
        "university": {
            "key": "ufsc-automacao",
            "name": "Universidade Federal de Santa Catarina (UFSC)",
            "img": "./assets/logos/ufsc.png",
            "url": "https://automacao.ufsc.br/"
        }
    },
    {
        "name": "André Simões Ballarin",
        "role": "Pesquisador Colaborador",
        "image": "./assets/team/andresballarin.png",
        "orcid": "https://orcid.org/0000-0001-6997-8662",
        "lattes": "http://lattes.cnpq.br/1215296341338514",
        "researchgate": "https://www.researchgate.net/profile/Andre-Ballarin",
        "areas": [
            "Precipitacao"
        ],
        "university": {
            "key": "usp",
            "name": "Universidade de São Paulo (USP)",
            "img": "./assets/logos/uspsc.png",
            "url": "https://eesc.usp.br/"
        }
    },
    {
        "name": "Diego Custódio",
        "role": "Pesquisador Colaborador",
        "image": "./assets/team/diegocustodio.jpg",
        "orcid": "https://orcid.org/0000-0002-9777-7128",
        "lattes": "http://lattes.cnpq.br/4330940702408383",
        "scholar": "https://scholar.google.com/citations?user=NtQbMaAAAAAJ&hl=pt-BR",
        "areas": [
            "Comportamento-Usuario",
            "Conforto-Termico",
            "Agua-Pluvial"
        ],
        "university": {
            "key": "utfpr",
            "name": "Universidade Tecnológica Federal do Paraná (UTFPR)",
            "img": "./assets/logos/UTFPR.png",
            "url": "https://www.utfpr.edu.br/"
        }
    },
    {
        "name": "Taylana Piccinini Scolaro",
        "role": "Pesquisadora Colaboradora",
        "image": "./assets/team/taylanapscolaro.png",
        "orcid": "https://orcid.org/0000-0003-4296-0686",
        "lattes": "http://lattes.cnpq.br/7183244717269690",
        "researchgate": "https://www.researchgate.net/profile/Taylana-Scolaro",
        "areas": [
            "Mudancas-Climaticas",
            "Simulacao-Computacional",
            "Telhado-Verde"
        ],
        "university": {
            "key": "utfpr",
            "name": "Universidade Tecnológica Federal do Paraná (UTFPR)",
            "img": "./assets/logos/UTFPR.png",
            "url": "https://www.utfpr.edu.br/"
        }
    },
    {
        "name": "Ricardo Forgiarini Rupp",
        "role": "Pesquisador Colaborador",
        "image": "./assets/team/ricardorupp.jpeg",
        "orcid": "https://orcid.org/0000-0002-8205-7259",
        "lattes": "http://lattes.cnpq.br/0355666000210770",
        "researchgate": "https://www.researchgate.net/profile/Ricardo-Rupp",
        "areas": [
            "Conforto-Termico",
            "Comportamento-Usuario"
        ],
        "university": {
            "key": "denmark",
            "name": "Technical University of Denmark (DTU)",
            "img": "",
            "url": "https://www.dtu.dk/"
        }
    },
    {
        "name": "Aldomar Pedrini",
        "role": "Pesquisador Colaborador",
        "image": "./assets/team/aldomarpedrini.jpg",
        "orcid": "https://orcid.org/0000-0002-6607-2176",
        "lattes": "http://lattes.cnpq.br/9012296636400514",
        "researchgate": "https://www.researchgate.net/profile/Aldomar-Pedrini-2",
        "areas": [
            "Conforto-Termico",
            "Simulacao-Computacional"
        ],
        "university": {
            "key": "ufrn",
            "name": "Universidade Federal do Rio Grande do Norte (UFRN)",
            "img": "./assets/logos/ufrn.png",
            "url": "https://ufrn.br/"
        }
    }
];

  return (
    <PageLayout title={t('ges_header.partners') || "Parcerias"}>
      <div className="space-y-4 max-w-6xl mx-auto px-2 sm:px-0">
        
        {/* Grid Compacto de 3 Colunas (Cabe em 1 Página) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {collaborators.map((collab, index) => (
            <CollaboratorCard
              key={index}
              collaborator={collab}
            />
          ))}
        </div>

      </div>
    </PageLayout>
  );
}
