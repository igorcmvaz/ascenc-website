import { useTranslation } from "react-i18next";

export default function PaperTable({ title, papers }) {
  const { t } = useTranslation();

  return (
    <div className="mb-12">
      <h4 className="text-2xl font-bold mt-6 mb-4 text-center text-gray-900 dark:text-zinc-100">{title}</h4>

      {/* Tabela para telas grandes */}
      <div className="hidden md:block overflow-x-auto max-w-full rounded-lg shadow dark:shadow-md dark:shadow-zinc-700">
        <table className="min-w-full border-collapse text-sm bg-white dark:bg-zinc-800 rounded-lg">
          <thead className="bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left font-semibold border-b border-gray-200 dark:border-zinc-700">{t('papers.date')}</th>
              <th className="px-4 py-3 text-left font-semibold border-b border-gray-200 dark:border-zinc-700">{t('papers.doi')}</th>
              <th className="px-4 py-3 text-left font-semibold border-b border-gray-200 dark:border-zinc-700">{t('papers.table_title')}</th>
              <th className="px-4 py-3 text-left font-semibold border-b border-gray-200 dark:border-zinc-700">{t('papers.authors')}</th>
            </tr>
          </thead>
          <tbody>
            {papers.map((paper, i) => (
              <tr
                key={i}
                className="odd:bg-white even:bg-gray-50 dark:odd:bg-zinc-800 dark:even:bg-zinc-900/50 hover:bg-gray-100 dark:hover:bg-zinc-700 transition-colors"
              >
                <td className="px-4 py-3 border-b border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-300">{paper.year}</td>
                <td className="px-4 py-3 border-b border-gray-200 dark:border-zinc-700 text-slate-600 dark:text-slate-400 underline truncate max-w-[180px]">
                  <a href={paper.doi} target="_blank" rel="noopener noreferrer">
                    {paper.doi
                      .replace("http://dx.doi.org/", "")
                      .replace("https://doi.org/", "")}
                  </a>
                </td>
                <td className="px-4 py-3 border-b border-gray-200 dark:border-zinc-700 whitespace-normal break-words text-gray-800 dark:text-zinc-200">
                  {paper.title}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 dark:border-zinc-700 whitespace-normal break-words text-gray-800 dark:text-zinc-200">
                  {paper.authors}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards para telas menores */}
      <div className="block md:hidden space-y-4">
        {papers.map((paper, i) => (
          <div
            key={i}
            className="border border-gray-200 dark:border-zinc-700 rounded-lg p-4 shadow-sm bg-white dark:bg-zinc-800"
          >
            <p className="text-sm mb-1 text-gray-800 dark:text-zinc-200">
              <span className="font-semibold">{t('papers.date')}:</span> {paper.year}
            </p>
            <p className="text-sm mb-1">
              <span className="font-semibold text-gray-800 dark:text-zinc-200">{t('papers.doi')}:</span>{" "}
              <a
                href={paper.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-400 underline break-words"
              >
                {paper.doi}
              </a>
            </p>
            <p className="text-sm mb-1 text-gray-800 dark:text-zinc-200">
              <span className="font-semibold">{t('papers.table_title')}:</span> {paper.title}
            </p>
            <p className="text-sm text-gray-800 dark:text-zinc-200">
              <span className="font-semibold">{t('papers.authors')}:</span> {paper.authors}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}