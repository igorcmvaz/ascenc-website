import PageLayout from "../components/PageLayout";
import ToolButton from "../components/ToolButton";
import { useTranslation } from "react-i18next";

export default function Tools() {
  const { t } = useTranslation();

  const tools = [
    {
      title: t('tools.paimt'),
      to: "/paimt",
      iconLight: "./assets/paimt.png",
      iconDark: "./assets/paimt_dark.png",
    },
    {
      title: t('tools.paimp'),
      to: "/paimp",
      iconLight: "./assets/paimp.png",
      iconDark: "./assets/paimp_dark.png",
    },
    {
      title: `${t('tools.paimdu')} ${t('tools.dev_suffix')}`,
      to: "#",
      iconLight: "./assets/paimdu.png",
      iconDark: "./assets/paimdu_dark.png",
      isPlaceholder: true,
    },
    {
      title: `${t('tools.paimaa')} ${t('tools.dev_suffix')}`,
      to: "#",
      iconLight: "./assets/paimaa.png",
      iconDark: "./assets/paimaa_dark.png",
      isPlaceholder: true,
    },
    {
      title: `${t('tools.paimacv')} ${t('tools.dev_suffix')}`,
      to: "#",
      iconLight: "./assets/paimacv.png",
      iconDark: "./assets/paimacv_dark.png",
      isPlaceholder: true,
    },
    {
      title: `${t('tools.paicacv')} ${t('tools.dev_suffix')}`,
      to: "#",
      iconLight: "./assets/paicacv.png",
      iconDark: "./assets/paicacv_dark.png",
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
            iconLight={tool.iconLight}
            iconDark={tool.iconDark}
            isPlaceholder={tool.isPlaceholder}
          />
        ))}
      </div>
    </PageLayout>
  );
}