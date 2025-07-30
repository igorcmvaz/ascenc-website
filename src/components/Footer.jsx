import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 shadow-[0_-4px_6px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm">
        {t('footer.rights')}
      </div>
    </footer>
  );
}