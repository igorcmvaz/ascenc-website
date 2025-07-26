import PageLayout from "../components/PageLayout";

export default function Contact() {
  return (
    <PageLayout title="Entre em Contato">
      <div className="max-w-xl mx-auto bg-gray-50 shadow-md rounded-xl p-6">
        <p className="text-center mb-4 text-gray-700">
          Preencha o formulário abaixo para enviar sua dúvida ou sugestão.
        </p>

        <form
          action="https://formsubmit.co/igorcmvaz@gmail.com"
          method="POST"
          className="space-y-4"
        >
          <div>
            <label htmlFor="name" className="block font-medium mb-1">
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="institution" className="block font-medium mb-1">
              Instituição
            </label>
            <input
              type="text"
              id="institution"
              name="institution"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="message" className="block font-medium mb-1">
              Dúvida / Sugestão
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}
