import Header from "./Header";
import Footer from "./Footer";

export default function PageLayout({ title, children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header fixo */}
      <Header />

      {/* Conteúdo principal */}
      <main className="flex-1 pt-24 pb-16 max-w-6xl mx-auto px-4">
        {title && (
          <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>
        )}
        {children}
      </main>

      {/* Footer fixo no final */}
      <Footer />
    </div>
  );
}
