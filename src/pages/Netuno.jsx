import PageLayout from "../components/PageLayout";
import { ArrowLeft, Download, FileText, FolderArchive, Settings, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Netuno() {
  const { t } = useTranslation();

  return (
    <PageLayout title="Netuno 4">
      <div className="space-y-12 max-w-4xl mx-auto">
        
        <section className="bg-white dark:bg-slate-100 p-8 rounded-3xl border border-blue-200 dark:border-slate-300 shadow-md flex flex-col md:flex-row items-center gap-8">
          <div className="p-3 bg-blue-50 rounded-2xl shadow-md border border-blue-200 shrink-0 flex items-center justify-center w-20 h-20">
            <img src="./assets/icons/netuno.ico" alt="Netuno Logo" className="w-14 h-14 object-contain" />
          </div>
          <div className="space-y-4 text-center md:text-left">
            <p
              className="text-lg leading-relaxed text-slate-900 font-bold"
              dangerouslySetInnerHTML={{ __html: t("netuno.description") }}
            />
            <p className="text-sm font-extrabold text-blue-800">
              {t("netuno.more_info")}
            </p>
          </div>
        </section>

        {/* 📥 DOWNLOADS SECTION */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-zinc-100 tracking-tight">
            Downloads
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* MANUAL DO USUÁRIO */}
            <a
              href="./netuno/Manual-Netuno-4_Junho2014.pdf"
              download
              className="group bg-white dark:bg-slate-100 p-6 rounded-2xl border border-slate-200 dark:border-slate-300 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 hover:border-blue-500 text-left"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold border border-blue-300">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-slate-900 leading-snug group-hover:text-blue-800 transition-colors">
                  {t("netuno.manual")}
                </h3>
                <p className="text-xs text-slate-700 font-bold">
                  Manual-Netuno-4_Junho2014.pdf
                </p>
              </div>
              <div className="pt-6 flex items-center gap-1.5 text-xs font-black text-blue-800">
                <span>Download</span>
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </a>

            {/* ARQUIVOS DE APOIO */}
            <a
              href="./netuno/Arquivos-de-apoio-ao-Manual-Netuno.rar"
              download
              className="group bg-white dark:bg-slate-100 p-6 rounded-2xl border border-slate-200 dark:border-slate-300 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 hover:border-cyan-500 text-left"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-900 flex items-center justify-center font-bold border border-cyan-300">
                  <FolderArchive className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-slate-900 leading-snug group-hover:text-cyan-800 transition-colors">
                  {t("netuno.support_files")}
                </h3>
                <p className="text-xs text-slate-700 font-bold">
                  Arquivos-de-apoio-ao-Manual-Netuno.rar
                </p>
              </div>
              <div className="pt-6 flex items-center gap-1.5 text-xs font-black text-cyan-800">
                <span>Download</span>
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </a>

            {/* SETUP NETUNO ZIP */}
            <a
              href="./netuno/SetupNetuno4_ptbr.zip"
              download
              className="group bg-white dark:bg-slate-100 p-6 rounded-2xl border border-slate-200 dark:border-slate-300 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 hover:border-indigo-500 text-left"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-900 flex items-center justify-center font-bold border border-indigo-300">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black text-slate-900 leading-snug group-hover:text-indigo-800 transition-colors">
                  {t("netuno.setup")}
                </h3>
                <p className="text-xs text-slate-700 font-bold">
                  SetupNetuno4_ptbr.zip
                </p>
              </div>
              <div className="pt-6 flex items-center gap-1.5 text-xs font-black text-indigo-800">
                <span>Download</span>
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </div>
            </a>
          </div>
        </section>

        {/* 🔙 BACK BUTTON */}
        <div className="flex justify-center pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-slate-100 text-slate-900 font-extrabold rounded-xl shadow-md hover:shadow-lg hover:bg-slate-50 transition-all duration-300 border border-slate-300"
          >
            <ArrowLeft className="w-5 h-5" />
            {t("netuno.back")}
          </Link>
        </div>

      </div>
    </PageLayout>
  );
}
