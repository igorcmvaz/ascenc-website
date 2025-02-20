import pandas as pd
import os

# Diretório atual (onde está o script)
current_dir = os.path.dirname(os.path.abspath(__file__))

# Caminhos dos arquivos
excel_file = os.path.join(current_dir, "pesquisadores.xlsx")  # Excel na mesma pasta
html_file = os.path.join(current_dir, "..", "team.html")  # Salvar HTML uma pasta acima
image_folder = "images/"  # Pasta das imagens (relativa ao HTML gerado)
orcid_icon = "images/orcid.png"  # Ícone do ORCID

# Verificar se o arquivo Excel existe
if not os.path.exists(excel_file):
    print(f"Erro: O arquivo '{excel_file}' não foi encontrado.")
    exit(1)

# Ler os dados do Excel mantendo a ordem original
df = pd.read_excel(excel_file, dtype=str)  # Lendo como string para evitar erros

# Ajustar nome da coluna "Pesquisador" para "Nome"
df.rename(columns={"Pesquisador": "Nome"}, inplace=True)

# Normalizar nomes das funções para evitar problemas de espaços extras e maiúsculas
df["Tipo"] = df["Tipo"].str.strip().str.title()

# Criar estrutura base do HTML mantendo o header e footer fornecidos
html = """
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>ASCENC - Nossa Equipe</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        html, body {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .content {
            flex: 1;
        }
        footer {
            margin-top: auto;
        }
        .profile-card {
            background-color: #f0f0f0;
            border-radius: 15px;
            padding: 15px;
            text-align: center;
            margin-bottom: 10px;
        }
        .profile-img {
            width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 50%;
        }
        .profile-role {
            font-size: 1em;
            color: black;
            font-weight: normal;
            margin: 3px 0;
        }
        .orcid-icon {
            width: 37px; /* Mantido 50% maior */
            margin-top: 3px;
        }
        .custom-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr); /* FORÇA 5 COLUNAS SEMPRE */
            gap: 10px;
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" style="height: 70px;">
        <div class="container">
            <a class="navbar-brand" href="#">
                <img src="images/ASCENC_lateral.png" alt="ASCENC Logo" height="50">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="about.html">Sobre</a></li>
                    <li class="nav-item"><a class="nav-link" href="papers.html">Artigos</a></li>
                    <li class="nav-item"><a class="nav-link" href="tools.html">Ferramentas</a></li>
                    <li class="nav-item"><a class="nav-link" href="team.html">Equipe</a></li>
                    <li class="nav-item"><a class="nav-link" href="contact.html">Contato</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container mt-5 content">
        <h1 class="text-center mb-4">Nossa Equipe</h1> <!-- Adicionado espaço abaixo -->
        <div class="custom-grid"> <!-- AGORA FORÇA 5 COLUNAS -->
"""

# Gerar os blocos de perfil na ordem do Excel
for _, row in df.iterrows():
    html += f"""
            <div class="profile-card">
                <img src="{image_folder}{row['Imagem']}" alt="{row['Nome']}" class="profile-img">
                <h5>{row['Nome']}</h5>
                <p class="profile-role">{row['Tipo']}</p>
                <a href="{row['ORCID']}" target="_blank">
                    <img src="{orcid_icon}" alt="ORCID" class="orcid-icon">
                </a>
            </div>
    """

# Fechar HTML
html += """
        </div>
    </div>

    <footer class="bg-dark text-light text-center py-3" style="height: 60px;">
        <p>&copy; 2025 ASCENC. Igor Catão Martins Vaz. Todos os direitos reservados.</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
"""

# Salvar o HTML uma pasta acima
with open(html_file, "w", encoding="utf-8") as f:
    f.write(html)

print(f"✅ Arquivo '{html_file}' atualizado com sucesso!")
