import PageLayout from "../components/PageLayout";
import TeamMemberCard from "../components/TeamMemberCard";

const members = [
  {
    name: "Enedir Ghisi",
    role: "Coordenador",
    image: "/enedirghisi.png",
    orcid: "https://orcid.org/0000-0001-5918-6397",
  },
  {
    name: "Igor Catão Martins Vaz",
    role: "Pesquisador Líder",
    image: "/igorcmvaz.png",
    orcid: "https://orcid.org/0000-0003-2433-223X",
  },
  {
    name: "Taylana Piccinini Scolaro",
    role: "Pesquisador",
    image: "/taylanapscolaro.png",
    orcid: "https://orcid.org/0000-0003-4296-0686",
  },
  {
    name: "Aline Schaefer",
    role: "Pesquisador",
    image: "/alineschaefer.png",
    orcid: "https://orcid.org/0000-0001-8870-9863",
  },
  {
    name: "Liseane Padilha Thives",
    role: "Pesquisador",
    image: "/liseanepthives.jpeg",
    orcid: "https://orcid.org/0000-0002-4782-2496",
  },
  {
    name: "Andrea Teston",
    role: "Pesquisador",
    image: "/andreateston.png",
    orcid: "https://orcid.org/0000-0001-7529-382X",
  },
  {
    name: "Mirela Moreira Ribeiro",
    role: "Pesquisador",
    image: "/mirela.png",
    orcid: "http://lattes.cnpq.br/6997171456515468",
  },
  {
    name: "Eugénio Rodrigues",
    role: "Colaborador",
    image: "/eugeniorodrigues.png",
    orcid: "https://orcid.org/0000-0001-7023-4484",
  },
  {
    name: "Matheus Bruhns Bastos",
    role: "Colaborador",
    image: "/matheusbbastos.png",
    orcid: "https://orcid.org/0009-0006-7673-1338",
  },
  {
    name: "André Simões Ballarin",
    role: "Colaborador",
    image: "/andresballarin.png",
    orcid: "https://orcid.org/0000-0001-6997-8662",
  },
];

export default function Team() {
  return (
    <PageLayout title="Nossa Equipe">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {members.map((member, index) => (
          <TeamMemberCard
            key={index}
            name={member.name}
            role={member.role}
            image={member.image}
            orcid={member.orcid}
          />
        ))}
      </div>
    </PageLayout>
  );
}
