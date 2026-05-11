# Raízes do Nordeste

Sistema de pedidos online para rede de lanchonetes com culinária nordestina.

## Tecnologias

- **React 19** - Interface do usuario
- **TypeScript** - Tipagem estatica
- **Tailwind CSS** - Estilos utilitarios
- **React Router DOM** - Navegacao entre paginas
- **Recharts** - Graficos do painel admin
- **Remix Icon** - Icones via CDN
- **Google Fonts** - Tipografia (DM Sans, Inter, Great Vibes, Cormorant Garamond)
- **Vite** - Build tool e dev server

## Funcionalidades

- Escolha de unidade (6 lanchonetes no Nordeste)
- Cardapio com categorias e produtos regionais
- Carrinho de compras com persistencia local
- Sistema de login/cadastro simples (localStorage)
- Checkout com PIX, Cartao (simulacao) e Dinheiro
- Programa de fidelidade com descontos
- Acompanhamento de pedido em tempo real
- Painel administrativo com senha `adm2026`
- Dashboard com graficos de vendas e clientes
- Banner de cookies (LGPD)

## Estrutura de Pastas

```
src/
  components/        - Componentes reutilizaveis
    Logo.tsx          - Logo SVG da marca (3 opcoes de estilo)
    Navbar.tsx        - Barra de navegacao
    Toast.tsx         - Notificacoes temporarias
    LgpdBanner.tsx    - Banner de consentimento de cookies
    UnitSwitchModal.tsx - Modal de troca de unidade
  context/           - Contextos React
    AuthContext.tsx   - Autenticacao de usuarios
    CartContext.tsx   - Carrinho de compras
  hooks/             - Hooks personalizados
    useOrders.ts      - Gerenciamento de pedidos
  mocks/             - Dados simulados
    products.ts       - Produtos por unidade
    units.ts          - Dados das lanchonetes
    categories.ts     - Categorias do cardapio
  pages/             - Paginas da aplicacao
    home/             - Pagina inicial com hero e unidades
    login/            - Login de usuarios
    cardapio/         - Cardapio da unidade
    produto/          - Detalhe do produto
    carrinho/         - Carrinho e checkout
    acompanhamento/   - Acompanhamento de pedido
    pedidos/          - Historico de pedidos
    perfil/           - Perfil do usuario
    historia/         - Historia da marca
    admin/            - Painel administrativo
    admin-login/      - Tela de acesso ao admin
    totem/            - Totem de pedidos
    ...
  router/            - Configuracao de rotas
    config.tsx        - Definicao das rotas
    index.ts          - Renderizacao das rotas
  App.tsx            - Componente raiz
  main.tsx           - Ponto de entrada
  index.css          - Estilos globais e Tailwind
```

## Instalacao

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Acesse em http://localhost:5173

## Build para producao

```bash
npm run build
```

Os arquivos sao gerados na pasta `dist/`.

## Deploy no GitHub Pages

Veja o arquivo `DEPLOY.md` para instrucoes detalhadas.

## Conta de Admin

Senha para acessar o painel administrativo: **adm2026**

## Sobre o Projeto

Este projeto foi desenvolvido como trabalho acadêmico para apresentacao em faculdade.

Data: maio de 2026