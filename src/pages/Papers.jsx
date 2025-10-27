import PageLayout from "../components/PageLayout";
import PaperTable from "../components/PaperTable";
import { useTranslation } from "react-i18next";

// Termodinâmica e condicionamento térmico
const eixoTermodinamica = [
  {
    year: "2025",
    doi: "https://doi.org/10.1016/j.enbuild.2025.116566",
    title:
      "Assessing thermal comfort in naturally ventilated residential buildings under current and projected regional climates in Brazil",
    authors:
      "Taylana Piccinini Scolaro, Igor Catão Martins Vaz; Enedir Ghisi",
  },
  {
    year: "2025",
    doi: "http://dx.doi.org/10.1016/j.enbuild.2024.115059",
    title:
      "Dashboard for interpreting future climate files used in the simulation of buildings – An outdoor thermal comfort approach",
    authors:
      "Igor Catão Martins Vaz; Enedir Ghisi; Liseane Padilha Thives; Abel Silva Vieira; Ricardo Forgiarini Rupp; Aline Schaefer; Rafael Almeida Flores; Matheus Bruhns Bastos; Deivis Luis Marinoski; Arthur Santos Silva; Max Weeber; Andrea Invidiata",
  },
  {
    year: "2025",
    doi: "https://doi.org/10.46421/encacelacac.v18i1.7079",
    title:
      "Condições dos edifícios no estado de São Paulo: conforto térmico externo, clima futuro e ilha de calor urbano",
    authors:
      "Igor Catão Martins Vaz; Taylana Piccinini Scolaro; Eugénio Miguel de Sousa Rodrigues; Enedir Ghisi",
  },
  {
    year: "2024",
    doi: "https://doi.org/10.1051/e3sconf/202454601017",
    title: "Comparison of future weather files for Brazilian cities",
    authors: "Igor Catão Martins Vaz; Marina Ribeiro Viana; Enedir Ghisi",
  },
];

// Precipitação e captação de água da chuva
const eixoPrecipitacao = [
  {
    year: "2025",
    doi: "https://www.mdpi.com/3042-5743/32/1/4",
    title:
      "Rainwater Harvesting in Social Housing: An Analysis Across Twelve Cities in Brazil",
    authors:
      "Maria Clara Sampaio Rosa e Silva; Igor Catão Martins Vaz; Enedir Ghisi",
  },
];

// Aquecimento de água
const eixoAquecimento = [
  {
    year: "2025",
    doi: "https://doi.org/10.46421/encacelacac.v18i1.7083",
    title:
      "Consumo de eletricidade em chuveiros elétricos em São Paulo: O que esperar das mudanças climáticas?",
    authors:
      "Igor Catão Martins Vaz; Eugénio Miguel de Sousa Rodrigues; Enedir Ghisi",
  },
  {
    year: "2024",
    doi: "http://dx.doi.org/10.46421/entac.v20i1.5728",
    title: "Aquecimento solar de água em edificações residenciais brasileiras",
    authors:
      "Igor Catão Martins Vaz; Vanessa Costa Santos; Thalita Gorban Ferreira Giglio; Enedir Ghisi",
  },
  {
    year: "2025",
    doi: "https://doi.org/10.1590/s1678-86212025000100905",
    title:
      "Water heating in Brazilian residential buildings: a comparison between electric showers and solar heating",
    authors:
      "Igor Catão Martins Vaz; Vanessa Costa Santos; Thalita Gorban Ferreira Giglio; Enedir Ghisi",
  },
  {
    year: "2023",
    doi: "https://doi.org/10.46421/encac.v17i1.3788",
    title:
      "Benchmarking energético dos sistemas de aquecimento de água em habitações de interesse social",
    authors:
      "Igor Catão Martins Vaz; Matheus Geraldi; Renata De Vecchi; Ana Paula Melo; Roberto Lamberts; Enedir Ghisi",
  },
];

// Avaliação do Ciclo de Vida
const eixoACV = [
  {
    year: "2025",
    doi: "https://doi.org/10.1016/j.scitotenv.2025.179774",
    title:
      "Understanding the environmental impact of residential electricity consumption in Brazil: integrating top-down and bottom-up approaches with Life Cycle Assessment",
    authors: "Igor Catão Martins Vaz; Taylana Piccinini Scolaro; Enedir Ghisi",
  },
  {
    year: "2025",
    doi: "https://doi.org/10.1016/j.buildenv.2025.113085",
    title:
      "Understanding the environmental impacts of residential water consumption in Brazil: Integrating the building stock with life cycle assessment",
    authors:
      "Igor Catão Martins Vaz; Enedir Ghisi; Taylana Piccinini Scolaro; Aline Schaefer",
  },
  {
    year: "2025",
    doi: "https://doi.org/10.33422/ccgconf.v2i1.1046",
    title:
      "A Comparison of Local and Global Databases for the Environmental Impact of Residential Buildings",
    authors:
      "Igor Catão Martins Vaz; Taylana Piccinini Scolaro; Aline Schaefer; Liseane Padilha Thives; Enedir Ghisi",
  },
  {
    year: "2024",
    doi: "http://dx.doi.org/10.46421/entac.v20i1.5730",
    title: "Energia e carbono em edificações: uso da ferramenta SIDAC",
    authors: "Igor Catão Martins Vaz; Jéssica Aldrighi Bertinetti; Enedir Ghisi",
  },
];

export default function Papers() {
  const { t } = useTranslation();

  // placeholders traduzidos só nos eixos vazios
  const eixoDrenagem = [
    { year: "—", doi: "", title: t("papers.in_production", "Em produção"), authors: "—" }
  ];
  const eixoCarbonatacao = [
    { year: "—", doi: "", title: t("papers.in_production", "Em produção"), authors: "—" }
  ];

  return (
    <PageLayout title={t('papers.title')}>
      <div className="pt-10 pb-4 space-y-8">
        <PaperTable
          title={t('papers.axis_thermo', 'Termodinâmica e condicionamento térmico')}
          papers={eixoTermodinamica}
        />
        <PaperTable
          title={t('papers.axis_rainwater', 'Precipitação e captação de água da chuva')}
          papers={eixoPrecipitacao}
        />
        <PaperTable
          title={t('papers.axis_drainage', 'Drenagem urbana e impactos hidrológicos')}
          papers={eixoDrenagem}
        />
        <PaperTable
          title={t('papers.axis_hotwater', 'Aquecimento de água')}
          papers={eixoAquecimento}
        />
        <PaperTable
          title={t('papers.axis_carbonation', 'Carbonatação')}
          papers={eixoCarbonatacao}
        />
        <PaperTable
          title={t('papers.axis_lca', 'Avaliação do Ciclo de Vida')}
          papers={eixoACV}
        />
      </div>
    </PageLayout>
  );
}
