import PageLayout from "../components/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center md:text-left">
        {/* Texto principal */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">Bem-vindo ao Projeto ASCENC</h1>
          <p className="text-gray-700">
            <strong>ASCENC (Avaliação de Sustentabilidade em Cidades e Edificações em Novos Climas)</strong> 
            tem como objetivo pesquisar as interações entre cidades, edificações e climas futuros de modo a 
            diminuir o impacto ambiental da construção civil e adaptar o contexto urbano para garantir 
            habitabilidade e resiliência.
          </p>
        </div>

        {/* Imagem */}
        <div className="flex-1 flex justify-center">
          <img
            src="/ascenc.png"
            alt="ASCENC"
            className="max-w-xs md:max-w-md w-full h-auto"
          />
        </div>
      </div>
    </PageLayout>
  );
}
