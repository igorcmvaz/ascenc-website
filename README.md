# ASCENC Website

Este é o site oficial do projeto **ASCENC (Avaliação de Sustentabilidade em Cidades e Edificações em Novos Climas)**, desenvolvido em **React + Vite + TailwindCSS**.

✅ **Páginas incluídas:**
- **Home** – Apresentação do projeto
- **Sobre** – Informações detalhadas sobre o ASCENC
- **Artigos** – Lista de publicações científicas
- **Ferramentas** – Acesso às ferramentas desenvolvidas
- **Equipe** – Apresentação dos membros e colaboradores
- **Contato** – Formulário para envio de dúvidas e sugestões

---

## 🚀 Tecnologias

- ⚛ **React 18**
- ⚡ **Vite**
- 🎨 **TailwindCSS**
- 🔗 **React Router DOM** (para roteamento)

---

## 📂 Estrutura de Pastas

```
src/
 ├─ assets/            # Imagens e arquivos estáticos
 ├─ components/        # Componentes reutilizáveis (Header, Footer, Cards, etc.)
 │   ├─ Footer.jsx
 │   ├─ Header.jsx
 │   ├─ PageLayout.jsx
 │   ├─ PaperTable.jsx
 │   ├─ TeamMemberCard.jsx
 │   └─ ToolCard.jsx
 ├─ pages/             # Páginas principais
 │   ├─ Home.jsx
 │   ├─ About.jsx
 │   ├─ Papers.jsx
 │   ├─ Tools.jsx
 │   ├─ Team.jsx
 │   └─ Contact.jsx
 ├─ index.css          # Estilos globais
 ├─ main.jsx           # Ponto de entrada do React
 └─ App.jsx            # (Pode ser usado como base, mas as rotas já estão no main.jsx)
```

---

## ⚙️ Instalação

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seuusuario/ascenc-website.git
cd ascenc-website
```

### 2️⃣ Instalar as dependências

```bash
npm install
```

### 3️⃣ Rodar em modo desenvolvimento

```bash
npm run dev
```

### 4️⃣ Acessar pelo navegador

```
http://localhost:5173
```

---

## 🌐 Testar em outros dispositivos

Para acessar pelo celular na mesma rede:

```bash
npm run dev -- --host
```

Será exibido algo como:

```
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
```

Use o endereço **Network** no navegador do celular.

---

## 🛠️ Adicionando Novas Páginas

1. Criar um novo arquivo em `src/pages/NovaPagina.jsx`:

```jsx
import PageLayout from "../components/PageLayout";

export default function NovaPagina() {
  return (
    <PageLayout title="Nova Página">
      <p>Conteúdo da nova página aqui!</p>
    </PageLayout>
  );
}
```

2. Adicionar no roteamento (`src/main.jsx`):

```jsx
import NovaPagina from "./pages/NovaPagina";

<Route path="/nova-pagina" element={<NovaPagina />} />
```

3. Adicionar o link no `Header.jsx`:

```jsx
{ name: "Nova Página", path: "/nova-pagina" },
```

---

## 📦 Build para Produção

```bash
npm run build
```

Os arquivos finais estarão na pasta `dist/`.

Para testar localmente:

```bash
npm run preview
```

---

## 🚀 Deploy no GitHub Pages

1. Configure o campo `homepage` no `package.json` com o endereço do seu repositório:
   `https://seu-usuario.github.io/ascenc-website`.
2. Instale as dependências e rode o comando de deploy:

```bash
npm install
npm run deploy
```

O workflow `Deploy to GitHub Pages` também publica automaticamente o conteúdo da pasta `dist/` sempre que houver push na branch `main`.
