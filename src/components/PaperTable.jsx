export default function PaperTable({ title, papers }) {
  return (
    <div className="mb-12">
      <h4 className="text-xl font-semibold mt-6 mb-4 text-center">{title}</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Data</th>
              <th className="border px-3 py-2">DOI</th>
              <th className="border px-3 py-2">Título</th>
              <th className="border px-3 py-2">Autores</th>
            </tr>
          </thead>
          <tbody>
            {papers.map((paper, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="border px-3 py-2 text-center">{paper.year}</td>
                <td className="border px-3 py-2 text-blue-600 underline">
                  <a href={paper.doi} target="_blank" rel="noopener noreferrer">
                    {paper.doi.replace("http://dx.doi.org/", "").replace("https://doi.org/", "")}
                  </a>
                </td>
                <td className="border px-3 py-2">{paper.title}</td>
                <td className="border px-3 py-2">{paper.authors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
