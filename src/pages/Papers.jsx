import PageLayout from "../components/PageLayout";
import PaperTable from "../components/PaperTable";
import { useTranslation } from "react-i18next";

const eixoCidades = [
  {
    year: "2025",
    doi: "http://dx.doi.org/10.1016/j.enbuild.2024.115059",
    title:
      "Dashboard for interpreting future climate files used in the simulation of buildings – An outdoor thermal comfort approach",
    authors:
      "Igor Catão Martins Vaz; Enedir Ghisi; Liseane Padilha Thives; Abel Silva Vieira; Ricardo Forgiarini Rupp; Aline Schaefer; Rafael Almeida Flores; Matheus Bruhns Bastos; Deivis Luis Marinoski; Arthur Santos Silva; Max Weeber; Andrea Invidiata.",
  },
];

const eixoEdificacoes = [
  {
    year: "2025",
    doi: "https://doi.org/10.1016/j.scitotenv.2025.179774",
    title:
      "Understanding the environmental impact of residential electricity consumption in Brazil: integrating top-down and bottom-up approaches with Life Cycle Assessment",
    authors:
      "Igor Catão Martins Vaz; Taylana Piccinini Scolaro; Enedir Ghisi",
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
    year: "2024",
    doi: "http://dx.doi.org/10.46421/entac.v20i1.5730",
    title: "Energia e carbono em edificações: uso da ferramenta SIDAC",
    authors:
      "Igor Catão Martins Vaz; Jéssica Aldrighi Bertinetti; Enedir Ghisi",
  },
  {
    year: "2024",
    doi: "http://dx.doi.org/10.46421/entac.v20i1.5728",
    title: "Aquecimento solar de água em edificações residenciais brasileiras",
    authors:
      "Igor Catão Martins Vaz; Vanessa Costa Santos; Thalita Gorban Ferreira Giglio; Enedir Ghisi",
  },
];

export default function Papers() {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('papers.title')} noPadding>
      {/* Padding customizado apenas para essa página */}
      <div className="pt-10 pb-4 space-y-8">
        <PaperTable title={t('papers.cities_axis')} papers={eixoCidades} />
        <PaperTable title={t('papers.buildings_axis')} papers={eixoEdificacoes} />
      </div>
    </PageLayout>
  );
}