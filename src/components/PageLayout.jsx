import Header from "./Header";
import Footer from "./Footer";

export default function PageLayout({ title, children, noPadding = false, centerOnScreen = false }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main
        className={`flex-1 max-w-6xl mx-auto px-4 ${noPadding ? "" : "pt-24 pb-16"} ${
          centerOnScreen ? "flex flex-col justify-center" : ""
        }`}
      >
        {title && (
          <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
}
