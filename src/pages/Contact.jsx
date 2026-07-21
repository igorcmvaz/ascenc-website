import PageLayout from "../components/PageLayout";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <PageLayout title={t("contact.title")}>
      <div className="max-w-xl mx-auto bg-white dark:bg-slate-100 border border-emerald-200 dark:border-slate-300 shadow-md rounded-2xl p-6 sm:p-8">
        <p className="text-center mb-6 text-slate-800 font-bold">
          {t("contact.description")}
        </p>

        <form
          action="https://formsubmit.co/igorcmvaz@gmail.com"
          method="POST"
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="name"
              className="block font-extrabold mb-1.5 text-slate-900"
            >
              {t("contact.name")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-2.5 bg-slate-50 dark:bg-white border border-slate-300 text-slate-900 font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label
              htmlFor="institution"
              className="block font-extrabold mb-1.5 text-slate-900"
            >
              {t("contact.institution")}
            </label>
            <input
              type="text"
              id="institution"
              name="institution"
              required
              className="w-full p-2.5 bg-slate-50 dark:bg-white border border-slate-300 text-slate-900 font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block font-extrabold mb-1.5 text-slate-900"
            >
              {t("contact.message")}
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="w-full p-2.5 bg-slate-50 dark:bg-white border border-slate-300 text-slate-900 font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            ></textarea>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-black px-8 py-3 rounded-xl shadow-md transition"
            >
              {t("contact.submit")}
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}
