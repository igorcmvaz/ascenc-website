import PageLayout from "../components/PageLayout";
import ToolButton from "../components/ToolButton";
import { HelpCircle } from "lucide-react";

export default function Tools() {
  const tools = [
    {
      title: "PAIM-T (Termodinâmica)",
      to: "/paimt",
      icon: "src/assets/paimt.png",
    },
    {
      title: "PAIM-P (Precipitação)",
      to: "/paimp",
      icon: "src/assets/paimp.png",
    },
    {
      title: "Terceira Ferramenta (Em desenvolvimento)",
      to: "#",
      icon: null,
      isPlaceholder: true,
    },
    {
      title: "Quarta Ferramenta (Em desenvolvimento)",
      to: "#",
      icon: null,
      isPlaceholder: true,
    },
    {
      title: "Quinta Ferramenta (Em desenvolvimento)",
      to: "#",
      icon: null,
      isPlaceholder: true,
    },
    {
      title: "Sexta Ferramenta (Em desenvolvimento)",
      to: "#",
      icon: null,
      isPlaceholder: true,
    },
  ];

  return (
    <PageLayout title="Ferramentas">
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
