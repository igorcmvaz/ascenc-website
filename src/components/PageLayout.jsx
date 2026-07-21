import Header from "./Header";
import Footer from "./Footer";

export default function PageLayout({ title, children, noPadding = false, centerOnScreen = false, fullWidth = false }) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-50/80 via-teal-50/40 to-slate-50 dark:from-[#121614] dark:via-[#181d1a] dark:to-[#0f1311] text-slate-900 dark:text-zinc-100 transition-colors duration-300 relative">
      <div className="absolute inset-0 bg-[radial-gradient(#059669_1.25px,transparent_1.25px)] dark:bg-[radial-gradient(#10b981_1.25px,transparent_1.25px)] [background-size:24px_24px] opacity-20 dark:opacity-20 pointer-events-none z-0" />
      <Header />
      <main
        className={`flex-1 w-full relative z-10 ${fullWidth ? "max-w-[1400px] px-6" : "max-w-6xl px-3"} mx-auto ${noPadding ? "" : "pt-24 pb-16"} ${
          centerOnScreen ? "flex flex-col justify-center" : ""
        }`}
      >
        {title && (
          <h1 className="text-3xl font-extrabold text-center mb-8 text-slate-900 dark:text-zinc-100 tracking-tight">{title}</h1>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
}