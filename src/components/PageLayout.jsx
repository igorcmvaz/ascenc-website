import Header from "./Header";
import Footer from "./Footer";

export default function PageLayout({ title, children, noPadding = false, centerOnScreen = false }) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-200 transition-colors duration-300">
      <Header />
      <main
        className={`flex-1 w-full max-w-6xl mx-auto px-3 ${noPadding ? "" : "pt-24 pb-16"} ${
          centerOnScreen ? "flex flex-col justify-center" : ""
        }`}
      >
        {title && (
          // ANTES: dark:text-gray-100
          // DEPOIS: Cor de texto correspondente
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-zinc-100">{title}</h1>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
}