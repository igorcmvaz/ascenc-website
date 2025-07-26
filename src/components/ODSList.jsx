export default function ODSList({ ods }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
      {ods.map((o) => (
        <div key={o.id} className="text-center">
          <h5 className="text-lg font-bold mb-3">{o.id}</h5>
          <img
            src={o.img}
            alt={o.id}
            className="w-32 h-auto md:w-40 md:h-auto" // 🔹 aumentei o tamanho
          />
        </div>
      ))}
    </div>
  );
}
