import PageLayout from "../components/PageLayout";
import ODSList from "../components/ODSList";
import UniversityCard from "../components/UniversityCard";

const odsData = [
  { id: "ODS 6", img: "/images/SDG-6.svg" },
  { id: "ODS 7", img: "/images/SDG-7.svg" },
  { id: "ODS 11", img: "/images/SDG-11.svg" },
  { id: "ODS 13", img: "/images/SDG-13.svg" },
];

export default function About() {
  return (
    <PageLayout title="Sobre o Projeto ASCENC">
      <p className="text-justify mb-4">
        O projeto ASCENC - Avaliação de Sustentabilidade em Cidades e Edificações em Novos Climas - 
        surgiu a partir da junção da tese de doutorado de Igor Catão Martins Vaz com o projeto de pesquisa 
        do professor Enedir Ghisi. O ASCENC faz parte do projeto de pesquisa 
        "Avaliação da sustentabilidade de edificações e centros urbanos", submetido ao CNPQ na chamada 
        CNPq/MCTI No 10/2023, sob coordenação de Enedir Ghisi. Como diferença, incluem-se artigos da tese 
        de Igor Catão, a qual aborda o impacto de mudanças climáticas na avaliação ambiental do ambiente construído.
      </p>

      <p className="text-justify mb-4">
        Desse modo, o projeto trabalha três principais eixos temáticos:
      </p>

      <ul className="list-disc pl-6 mb-6 text-justify">
        <li>
          <strong>Eixos de Climas Futuros:</strong> Métodos recentes para compreender o impacto das mudanças climáticas 
          nas cidades brasileiras, incluindo temperatura do ar, vento, precipitação e radiação solar.
        </li>
        <li>
          <strong>Eixo das Cidades:</strong> Como as cidades podem ser adaptadas para garantir habitabilidade 
          e resiliência climática, com foco em conforto térmico externo e políticas públicas.
        </li>
        <li>
          <strong>Eixo das Edificações:</strong> Avalia como decisões urbanísticas e climas futuros 
          impactam fluxos energéticos, hídricos e de materiais dos edifícios, com ênfase na Avaliação de Ciclo de Vida.
        </li>
      </ul>

      <h2 className="text-2xl font-bold text-center mb-6">Alinhamento com os ODS</h2>
      <ODSList ods={odsData} />

      <h2 className="text-2xl font-bold text-center mt-12 mb-6">
        Universidades com colaboração
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <UniversityCard
          name="Universidade Federal de Santa Catarina (UFSC)"
          description="Programa de Pós-Graduação em Engenharia Civil (PPGEC)"
          img="/images/ufsc.png"
        />
        <UniversityCard
          name="Universidade de Coimbra (UC)"
          description="Faculdade de Ciências e Tecnologia da Universidade de Coimbra (FCTUC)"
          img="/images/ftuc_2.png"
        />
        <UniversityCard
          name="Universidade de São Paulo (USP)"
          description="Escola de Engenharia de São Carlos (EESC)"
          img="/images/uspsc.png"
        />
      </div>
    </PageLayout>
  );
}
