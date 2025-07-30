import PageLayout from "../components/PageLayout";
import ToolButton from "../components/ToolButton";
import { useTranslation } from "react-i18next";

export default function Tools() {
  const { t } = useTranslation();

  const tools = [
    {
      title: t('tools.paimt'),
      to: "/paimt",
      icon: "./assets/paimt.png",
    },
    {
      title: t('tools.paimp'),
      to: "/paimp",
      icon: "./assets/paimp.png",
    },
    {
      title: `${t('tools.paimdu')} ${t('tools.dev_suffix')}`,
      to: "#",
      icon: "./assets/paimdu.png",
      isPlaceholder: true,
    },
    {
      title: `${t('tools.paimaa')} ${t('tools.dev_suffix')}`,
      to: "#",
      icon: "./assets/paimaa.png",
      isPlaceholder: true,
    },
    {
      title: `${t('tools.paimacv')} ${t('tools.dev_suffix')}`,
      to: "#",
      icon: "./assets/paimacv.png",
      isPlaceholder: true,
    },
    {
      title: `${t('tools.paicacv')} ${t('tools.dev_suffix')}`,
      to: "#",
      icon: "./assets/paicacv.png",
      isPlaceholder: true,
    },
  ];

  return (
    <PageLayout title={t('tools.title')}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {tools.map((tool, index) => (
          <ToolButton
            key={index}
            title={tool.title}
            to={tool.to}
            icon={tool.icon}
            isPlaceholder={tool.isPlaceholder}
          />
        ))}
      </div>
    </PageLayout>
  );
}