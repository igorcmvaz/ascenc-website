# ASCENC Website

Este é o site oficial do projeto **ASCENC (Avaliação de Sustentabilidade em Cidades e Edificações em Novos Climas)**, desenvolvido com o framework moderno **React + Vite + TailwindCSS**.

O site é projetado com suporte multi-idioma (i18n), layout escuro/claro integrado e uma robusta pipeline automatizada para exibição de publicações científicas com gráficos interativos.

---

## 🚀 Tecnologias principais

* ⚛ **React 19**
* ⚡ **Vite**
* 🎨 **TailwindCSS**
* 🌐 **React Router DOM** (com HashRouter para compatibilidade perfeita com GitHub Pages e redirecionamentos)
* 📖 **i18next** (Suporte à tradução dinâmica PT/EN)
* 📊 **Gráficos SVG Nativos** (Zero dependências e 100% de suporte a interatividade no React 19)

---

## 📂 Estrutura do Projeto

```text
ascenc-website/
 ├─ scripts/                 # Pipeline de processamento das publicações
 │   ├─ parse_lattes_html.py # Extrator do currículo Lattes (HTML)
 │   ├─ parse_artigos.py     # Parser de citações, DOIs e tags
 │   ├─ build_pages.py       # Gerador dinâmico do componente Papers.jsx
 │   ├─ update_papers.py     # Script unificador da pipeline
 │   ├─ artigos.txt          # Banco de dados textual dos artigos
 │   ├─ artigos-tags.txt     # Tags vinculadas por número identificador
 │   └─ enedir.html          # Export do Currículo Lattes do Prof. Enedir
 ├─ public/                  # Arquivos estáticos copiados na compilação
 │   └─ CNAME                # Configuração do domínio próprio (sustainability.ufsc.br)
 ├─ src/
 │   ├─ assets/              # Imagens e logotipos do portal e subgrupos
 │   ├─ components/          # Componentes globais (Layout, Header, Footer)
 │   ├─ pages/               # Páginas do site (Home, About, Tools, Team, Contact)
 │   │   └─ Papers.jsx       # Página de Artigos Científicos (gerada dinamicamente)
 │   ├─ i18n/                # Dicionários de localização (PT/EN)
 │   ├─ index.css            # Estilos globais e tokens Tailwind
 │   └─ main.jsx             # Roteamento e inicialização da aplicação React
 └─ UFSC-DNS-GUIDE.md        # Guia de configuração de apontamento de DNS UFSC
```

---

## 📄 Página de Artigos & Pipeline de Publicações

A página de publicações cientificas (`src/pages/Papers.jsx`) é completamente dinâmica. Para atualizar as publicações a partir do currículo Lattes:

### 1️⃣ Como atualizar as publicações:
1. Exporte a lista de artigos completos do Currículo Lattes em formato HTML.
2. Salve o arquivo com o nome `enedir.html` dentro da pasta `scripts/`.
3. Rode o comando unificado:
   ```bash
   npm run update-papers
   ```
O script irá:
* Extrair todos os artigos e trabalhos de congresso do HTML.
* Limpar citações, abreviações e encontrar os links de DOI correspondentes.
* Associar os temas corretos a partir do arquivo `artigos-tags.txt`.
* Gerar de forma automatizada o componente React [Papers.jsx](src/pages/Papers.jsx).

---

## 📊 Recursos da Página de Artigos

A página de artigos conta com recursos avançados de usabilidade:

* **Visualização Compacta/Expandida**: Por padrão, exibe apenas os artigos publicados nos últimos 5 anos. Clicando no banner *"Ver artigos anteriores (2021 e anteriores)"*, a página se expande exibindo o histórico de todos os 23 anos (de 2004 a 2026) inline.
* **Painel de Busca & Tags**: Permite pesquisar em tempo real por termos no título, autores ou nome dos temas das tags. A busca sempre vasculha **todo o histórico** de artigos.
* **Gráficos SVG Interativos**:
  * **Produção Anual**: Gráfico de barras indicando a quantidade de publicações por ano.
  * **Produção Acumulada**: Gráfico de área que ilustra o crescimento histórico das publicações.
  * *Ambos os gráficos contam com tooltips flutuantes interativos ao passar o mouse, e foram criados usando SVG nativo para evitar lentidão e conflito de pacotes no React 19.*

---

## ⚙️ Instalação e Execução Local

### 1️⃣ Instalar dependências
```bash
npm install
```

### 2️⃣ Executar servidor de desenvolvimento
```bash
npm run dev
```
Acesse no seu navegador: `http://localhost:5173/`

### 3️⃣ Executar em rede local (para testes em celulares/tablets)
```bash
npm run dev -- --host
```

---

## 📦 Compilação e Deploy no GitHub Pages

### Para compilar o projeto (gerar pasta `dist/`):
```bash
npm run build
```

### Para publicar no GitHub Pages:
```bash
npm run deploy
```
*Nota: A pipeline automática de publicação também está integrada com o GitHub Actions sempre que alterações forem enviadas à branch `main`.*

---

## 🌐 Configuração do Domínio UFSC (`sustainability.ufsc.br`)

O site está preparado para ser transferido para o domínio próprio da UFSC. Os detalhes de configuração técnica de CNAME do DNS estão descritos no arquivo [UFSC-DNS-GUIDE.md](UFSC-DNS-GUIDE.md). O arquivo [CNAME](public/CNAME) na pasta `public` garante que novas compilações não quebrem o direcionamento configurado no GitHub Pages.
