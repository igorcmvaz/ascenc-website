import PageLayout from "../components/PageLayout";
import CollaboratorCard from "../components/CollaboratorCard";
import { useTranslation } from "react-i18next";
import { Users } from "lucide-react";

export default function Partners() {
  const { t } = useTranslation();

  const collaborators = [
    {
      name: "Eugénio Rodrigues",
      role: "Pesquisador Colaborador",
      image: "./assets/team/eugeniorodrigues.png",
      orcid: "https://orcid.org/0000-0001-7023-4484",
      researchgate: "https://www.researchgate.net/profile/Eugenio_Rodrigues",
      areas: ["Otimização de Edificações", "Eficiência Energética", "Mudanças Climáticas"],
      university: {
        key: "uc",
        name: "Universidade de Coimbra (UC)",
        department: "Faculdade de Ciências e Tecnologia (FCTUC)",
        img: "./assets/logos/ftuc.png",
        url: "https://www.uc.pt/fctuc"
      }
    },
    {
      name: "Andrea Teston",
      role: "Pesquisadora Colaboradora",
      image: "./assets/team/andreateston.png",
      orcid: "https://orcid.org/0000-0001-7529-382X",
      researchgate: "https://www.researchgate.net/profile/Andrea-Teston",
      areas: ["Água da Chuva", "Hidrologia", "Hidráulica"],
      university: {
        key: "udesc",
        name: "Universidade do Estado de Santa Catarina (UDESC)",
        department: "Departamento de Arquitetura e Urbanismo (DAU)",
        img: "./assets/logos/udesc.png",
        url: "https://www.udesc.br/cct/dau"
      }
    },
    {
      name: "Matheus Bruhns Bastos",
      role: "Pesquisador Colaborador",
      image: "./assets/team/matheusbbastos.png",
      orcid: "https://orcid.org/0009-0006-7673-1338",
      areas: ["Análise de Qualidade", "Programação", "Arquitetura de Software"],
      university: {
        key: "ufsc",
        name: "Universidade Federal de Santa Catarina (UFSC)",
        department: "Departamento de Engenharia de Controle e Automação",
        img: "./assets/logos/ufsc.png",
        url: "https://ppgec.posgrad.ufsc.br/"
      }
    },
    {
      name: "André Simões Ballarin",
      role: "Pesquisador Colaborador",
      image: "./assets/team/andresballarin.png",
      orcid: "https://orcid.org/0000-0001-6997-8662",
      lattes: "http://lattes.cnpq.br/1215296341338514",
      researchgate: "https://www.researchgate.net/profile/Andre-Ballarin",
      areas: ["Água", "Mudanças Climáticas", "Drenagem"],
      university: {
        key: "usp",
        name: "Universidade de São Paulo (USP)",
        department: "Escola de Engenharia de São Carlos (EESC)",
        img: "./assets/logos/uspsc.png",
        url: "https://eesc.usp.br/"
      }
    },
    {
      name: "Novo Colaborador 1",
      role: "Pesquisador Colaborador",
      areas: ["Conforto Térmico", "Eficiência Energética"],
      university: {
        key: "ufsc",
        name: "Universidade Federal de Santa Catarina (UFSC)",
        img: "./assets/logos/ufsc.png",
        url: "https://ufsc.br"
      }
    },
    {
      name: "Novo Colaborador 2",
      role: "Pesquisadora Colaboradora",
      areas: ["Avaliação do Ciclo de Vida (ACV)", "Sustentabilidade"],
      university: {
        key: "usp",
        name: "Universidade de São Paulo (USP)",
        img: "./assets/logos/uspsc.png",
        url: "https://usp.br"
      }
    },
    {
      name: "Novo Colaborador 3",
      role: "Pesquisador Colaborador",
      areas: ["Simulação Computacional", "Mudanças Climáticas"],
      university: {
        key: "udesc",
        name: "Universidade do Estado de Santa Catarina (UDESC)",
        img: "./assets/logos/udesc.png",
        url: "https://udesc.br"
      }
    },
    {
      name: "Novo Colaborador 4",
      role: "Pesquisadora Colaboradora",
      areas: ["Drenagem Urbana", "Água da Chuva"],
      university: {
        key: "uc",
        name: "Universidade de Coimbra (UC)",
        img: "./assets/logos/ftuc.png",
        url: "https://uc.pt"
      }
    },
    {
      name: "Novo Colaborador 5",
      role: "Pesquisador Colaborador",
      areas: ["Desenho Urbano", "Ilhas de Calor"],
      university: {
        key: "ufsc",
        name: "Universidade Federal de Santa Catarina (UFSC)",
        img: "./assets/logos/ufsc.png",
        url: "https://ufsc.br"
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
