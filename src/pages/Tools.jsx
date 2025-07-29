import PageLayout from "../components/PageLayout";
import ToolCard from "../components/ToolCard";

export default function Tools() {
  return (
    <PageLayout title="Ferramentas">
      <ToolCard
        icon="src/assets/paimt.png"
        title="Painel de Avaliação dos Impactos de Mudanças - Termodinâmica"
        description={`O PAIM-T é uma ferramenta desenvolvida para interpretar as condições climáticas futuras em cidades brasileiras. 
        O objetivo principal é fornecer a pesquisadores, formuladores de políticas e profissionais uma ferramenta abrangente 
        para avaliar e mitigar os impactos das mudanças climáticas em diferentes cidades brasileiras, oferecendo dados precisos 
        para modelagem de conforto térmico e eficiência energética. 
        Para mais detalhes, visite o Repositório Zenodo.`}
        iframe="https://app.powerbi.com/view?r=eyJrIjoiNWI0ZTk5YjMtZjA5Ny00ZjE3LTk2ZDUtNDA1OThhNWQ3NWYxIiwidCI6ImZhNzk1MzFjLThjZTUtNGJkMy05N2VlLTI0NWU2ZWUyNjZiOCJ9"
      />

      <ToolCard
        icon="src/assets/paimp.png"
        title="Painel de Avaliação dos Impactos de Mudanças - Precipitação"
        description="O PAIM-P está atualmente em desenvolvimento e será focado na análise de precipitações. Aguarde novidades em breve."
      />

      <ToolCard
        title="Terceira Ferramenta"
        description="Em produção. Aguarde."
      />
    </PageLayout>
  );
}
