# Guia de Deploy no GitHub Pages

Este guia mostra como publicar o projeto no GitHub Pages de forma simples e rapida.

## Requisitos

- Conta no GitHub
- Git instalado no computador
- Node.js 18 ou superior

## Passo a Passo

### 1. Baixar o projeto

Baixe o codigo fonte do Readdy como arquivo ZIP e extraia em uma pasta no seu computador.

### 2. Entrar na pasta

Abra o terminal e navegue ate a pasta do projeto:

```bash
cd raizes-do-nordeste
```

### 3. Instalar dependencias

```bash
npm install
```

Isso baixa todas as bibliotecas necessarias.

### 4. Testar localmente

```bash
npm run dev
```

Abra o navegador em http://localhost:5173 e verifique se tudo funciona.

### 5. Trocar o Router para GitHub Pages (IMPORTANTE)

O projeto usa `BrowserRouter` que funciona no Readdy. Para funcionar no GitHub Pages, troque por `HashRouter`.

Edite o arquivo `src/App.tsx`:

```tsx
// ANTES (funciona no Readdy):
import { BrowserRouter } from "react-router-dom";
// DEPOIS (funciona no GitHub Pages):
import { HashRouter } from "react-router-dom";
```

E na renderizacao:

```tsx
// ANTES:
<BrowserRouter basename={__BASE_PATH__}>
// DEPOIS:
<HashRouter>
```

### 6. Ajustar o vite.config.ts

Edite o arquivo `vite.config.ts` e mude a linha:

```js
// ANTES:
base: process.env.BASE_PATH || "/",
// DEPOIS:
base: "./",
```

### 7. Build de producao

```bash
npm run build
```

Este comando gera a pasta `dist/` com os arquivos prontos para publicacao.

### 8. Criar repositorio no GitHub

1. Acesse github.com e faca login
2. Clique no botao verde "New" ou "+"
3. Digite o nome: `raizes-do-nordeste`
4. Deixe publico (Public)
5. Nao adicione README, .gitignore ou license
6. Clique em "Create repository"

### 9. Enviar o codigo

No terminal, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "Primeira versao - Raizes do Nordeste"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/raizes-do-nordeste.git
git push -u origin main
```

Substitua `SEU-USUARIO` pelo seu nome de usuario do GitHub.

### 10. Configurar GitHub Pages

1. No repositorio, clique em "Settings"
2. No menu lateral esquerdo, clique em "Pages"
3. Em "Source" ou "Build and deployment":
   - Selecione "Deploy from a branch"
   - Branch: `main`
   - Pasta: `/ (root)`
4. Clique em "Save"

Aguarde 1 a 2 minutos. O site estara disponivel em:

```
https://SEU-USUARIO.github.io/raizes-do-nordeste/
```

### 11. Atualizar o site

Sempre que fizer mudancas no codigo:

```bash
npm run build
git add .
git commit -m "Descricao das mudancas"
git push origin main
```

O GitHub Pages atualiza automaticamente.

## Alternativa: Usar pasta dist diretamente

Se preferir, voce pode subir so a pasta `dist`:

```bash
# Gerar build
npm run build

# Entrar na pasta dist e criar git
cd dist
git init
git add .
git commit -m "Deploy"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/raizes-do-nordeste.git
git push --force origin main
```

## Solucao de Problemas

### Pagina em branco

Verifique no console do navegador (F12) se ha erros. Certifique-se de que:
1. Trocou BrowserRouter por HashRouter
2. O `base` no `vite.config.ts` esta como `"./"`
3. O build foi feito depois das alteracoes

### Rotas nao funcionam

O HashRouter deve funcionar automaticamente no GitHub Pages. URLs ficam assim:
- Inicio: `/#/`
- Carrinho: `/#/carrinho`
- Admin: `/#/admin`

### Assets nao carregam

Certifique-se de que o build foi feito com `npm run build` depois de trocar o base para `"./"`.

## Resumo dos Comandos

| Comando | Descricao |
|---------|-----------|
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de producao |
| `npm run preview` | Preview do build local |

## Links Uteis

- [GitHub Pages Docs](https://docs.github.com/pt/pages)
- [Vite Deploy Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router HashRouter](https://reactrouter.com/start/library/routing)

## Observacao sobre o Router

O codigo original usa `BrowserRouter` com `basename={__BASE_PATH__}` porque e necessario para o funcionamento dentro do ambiente Readdy. Na hora de publicar no GitHub Pages, faca as duas trocas simples descritas no passo 5 acima.