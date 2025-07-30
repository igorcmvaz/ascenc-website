import PageLayout from "../components/PageLayout";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <PageLayout title={t('contact.title')}>
      <div className="max-w-xl mx-auto bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-md rounded-xl p-6">
        <p className="text-center mb-4 text-gray-700 dark:text-zinc-300">
          {t('contact.description')}
        </p>

        <form
          action="https://formsubmit.co/igorcmvaz@gmail.com"
          method="POST"
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="block font-medium mb-1 text-gray-800 dark:text-zinc-200">
              {t('contact.name')}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-2 bg-white dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-zinc-100 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400"
            />
          </div>

          <div>
            <label htmlFor="institution" className="block font-medium mb-1 text-gray-800 dark:text-zinc-200">
              {t('contact.institution')}
            </label>
            <input
              type="text"
              id="institution"
              name="institution"
              required
              className="w-full p-2 bg-white dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-zinc-100 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400"
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-medium mb-1 text-gray-800 dark:text-zinc-200">
              {t('contact.message')}
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="w-full p-2 bg-white dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-zinc-100 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 transition"
            >
              {t('contact.submit')}
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}