import { useTranslation } from "react-i18next";

export default function PaperTable({ title, papers }) {
  const { t } = useTranslation();

  return (
    <div className="mb-12">
      <h4 className="text-2xl font-bold mt-6 mb-4 text-center">{title}</h4>

      {/* Tabela para telas grandes */}
      <div className="hidden md:block overflow-x-auto max-w-full rounded-lg shadow">
        <table className="min-w-full border-collapse text-sm bg-white rounded-lg">
          <thead className="bg-gray-100 text-gray-700 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left font-semibold border-b">{t('papers.date')}</th>
              <th className="px-4 py-3 text-left font-semibold border-b">{t('papers.doi')}</th>
              <th className="px-4 py-3 text-left font-semibold border-b">{t('papers.table_title')}</th>
              <th className="px-4 py-3 text-left font-semibold border-b">{t('papers.authors')}</th>
            </tr>
          </thead>
          <tbody>
            {papers.map((paper, i) => (
              <tr
                key={i}
                className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors"
              >
                <td className="px-4 py-3 border-b text-gray-700">{paper.year}</td>
                <td className="px-4 py-3 border-b text-blue-600 underline truncate max-w-[180px]">
                  <a href={paper.doi} target="_blank" rel="noopener noreferrer">
                    {paper.doi
                      .replace("http://dx.doi.org/", "")
                      .replace("https://doi.org/", "")}
                  </a>
                </td>
                <td className="px-4 py-3 border-b whitespace-normal break-words">
                  {paper.title}
                </td>
                <td className="px-4 py-3 border-b whitespace-normal break-words">
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
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
          >
            <p className="text-sm mb-1">
              <span className="font-semibold">{t('papers.date')}:</span> {paper.year}
            </p>
            <p className="text-sm mb-1">
              <span className="font-semibold">{t('papers.doi')}:</span>{" "}
              <a
                href={paper.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-words"
              >
                {paper.doi}
              </a>
            </p>
            <p className="text-sm mb-1">
              <span className="font-semibold">{t('papers.table_title')}:</span> {paper.title}
            </p>
            <p className="text-sm">
              <span className="font-semibold">{t('papers.authors')}:</span> {paper.authors}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}