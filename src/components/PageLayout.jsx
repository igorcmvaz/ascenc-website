export default function PageLayout({ title, children }) {
  return (
    <div className="pt-24 pb-16 max-w-6xl mx-auto px-4">
      {title && <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>}
      {children}
    </div>
  );
}
