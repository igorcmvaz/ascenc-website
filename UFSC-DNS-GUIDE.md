# Guia de Configuração de Domínio Próprio (sustainability.ufsc.br)

Este guia orienta sobre como configurar o domínio próprio `sustainability.ufsc.br` no site hospedado pelo GitHub Pages, garantindo que nenhum link citado em artigos (como `igorcmvaz.github.io/ascenc-website/`) seja quebrado.

---

## 1. Como Funciona o Redirecionamento

O GitHub Pages gerencia de forma transparente a transição do domínio antigo para o novo:
* **Redirecionamento Automático (HTTP 301)**: Qualquer acesso a `https://igorcmvaz.github.io/ascenc-website/` será automaticamente redirecionado de forma permanente para `https://sustainability.ufsc.br/`.
* **Preservação de Rotas (`#`)**: Como o site utiliza o `HashRouter` do React, o navegador preserva todo o caminho após a hashtag (ex: `#/paimaa`). O redirecionamento manterá a rota, levando o usuário diretamente à página correta.

---

## 2. Passo a Passo da Configuração

### Passo A: Configuração de DNS (Com o TI da UFSC)
Solicite ao departamento de TI da UFSC a criação de um apontamento do tipo **CNAME** para o subdomínio:

* **Nome do Host (Subdomínio)**: `sustainability` (ou completo: `sustainability.ufsc.br`)
* **Tipo de Registro**: `CNAME`
* **Destino/Valor (Value/Target)**: `igorcmvaz.github.io`
* **TTL**: Padrão (ex: 3600 ou 14400)

---

### Passo B: Configuração no Repositório GitHub
Uma vez que o apontamento CNAME tenha sido criado no DNS da UFSC:

1. Acesse a página do repositório no GitHub.
2. Clique na aba **Settings** (Configurações).
3. Na barra lateral esquerda, clique em **Pages**.
4. Sob a seção **Custom domain**, digite o endereço completo:
   `sustainability.ufsc.br`
5. Clique em **Save**.
6. Aguarde a verificação do DNS e a geração automática do certificado SSL (Let's Encrypt).
7. Assim que o SSL estiver ativo, marque a caixa **Enforce HTTPS** para garantir conexões seguras.

---

## 3. Configuração de Cuidado Contínuo (Vite CNAME)

Para evitar que novas publicações do site (`npm run deploy`) apaguem as configurações de domínio próprio no GitHub Pages, o arquivo `CNAME` deve estar presente no código-fonte.

Nós já preparamos o arquivo em:
`public/CNAME`

Caso precise recriá-lo no futuro, certifique-se de que ele contenha apenas uma linha com o domínio:
```text
sustainability.ufsc.br
```

Desta forma, o Vite copiará este arquivo para a pasta `dist/` a cada build de publicação, mantendo o domínio ativado permanentemente.
