# Estrutura do Codigo

Este documento explica como o codigo esta organizado e o que cada parte faz.

## Visao Geral

O projeto e um sistema de pedidos para uma rede de lanchonetes nordestinas. Usa React com TypeScript, estilizado com Tailwind CSS.

## Pontos de Entrada

### main.tsx
Arquivo principal que inicia a aplicacao. Renderiza o componente `<App />` dentro da div `#root` do HTML.

### App.tsx
Componente raiz que envolve toda a aplicacao. Contem:
- `AuthProvider` - provedor de autenticacao
- `CartProvider` - provedor do carrinho
- `HashRouter` - roteamento que funciona em qualquer servidor (inclusive GitHub Pages)
- `AppRoutes` - componente que renderiza as paginas conforme a URL
- `LgpdBanner` - banner de cookies no rodape

### index.html
Pagina HTML base. Carrega as fontes do Google (DM Sans, Inter, Great Vibes, Cormorant Garamond) e os icones Remix Icon via CDN.

## Roteamento

O arquivo `src/router/config.tsx` define todas as rotas disponiveis:

| Rota | Pagina | Descricao |
|------|--------|-----------|
| `/` | Home | Pagina inicial com hero e selecao de unidade |
| `/login` | Login | Entrada de usuarios cadastrados |
| `/escolha-login` | EscolhaLogin | Escolha entre login ou continuar sem conta |
| `/cardapio/:unitId` | Cardapio | Cardapio da unidade selecionada |
| `/produto/:unitId/:productId` | Produto | Detalhe de um produto |
| `/carrinho` | Carrinho | Carrinho e checkout |
| `/acompanhamento/:orderId` | Acompanhamento | Acompanhamento em tempo real |
| `/pedido-confirmado/:orderId` | PedidoConfirmado | Confirmacao do pedido |
| `/perfil` | Perfil | Dados do usuario |
| `/pedidos` | Pedidos | Historico de pedidos |
| `/historia` | Historia | Historia da marca |
| `/privacidade` | Privacidade | Politica de privacidade |
| `/admin` | Admin | Painel administrativo |
| `/admin-login` | AdminLogin | Tela de senha do admin |
| `/totem` | Totem | Totem de autoatendimento |
| `*` | NotFound | Pagina nao encontrada |

## Contextos (Estado Global)

### AuthContext
Gerencia o estado de login dos usuarios. Os dados ficam salvos no `localStorage`:
- `raizes_user` - usuario logado
- `raizes_users` - lista de usuarios cadastrados

Metodos:
- `login(email, senha)` - verifica credenciais
- `register(dados)` - cria nova conta
- `logout()` - desconecta
- `updateUser(dados)` - atualiza dados do perfil

### CartContext
Gerencia o carrinho de compras. Persistido em `localStorage` como `raizes_cart`.

Metodos:
- `addItem(item)` - adiciona ao carrinho
- `removeItem(id)` - remove item
- `updateQuantity(id, qtd)` - altera quantidade
- `clearCart()` - esvazia carrinho

## Hook useOrders

Gerencia os pedidos do sistema. Dados em `localStorage` como `raizes_orders`.

Metodos:
- `createOrder(dados)` - cria novo pedido
- `updateOrder(id, dados)` - atualiza status
- `getUserOrders(userId)` - lista pedidos do usuario
- `getAllOrders()` - lista todos (para admin)

## Componentes Principais

### Logo.tsx
Logo SVG da marca com 3 opcoes de visualizacao:
- `icon-text` - icone + texto em fonte script
- `icon-only` - apenas o icone circular
- `badge` - icone em circulo com texto

O icone e desenhado com SVG: sol amarelo no topo, montes marrons no meio, folhas verdes na base.

### Navbar.tsx
Barra de navegacao fixa no topo. Mostra:
- Logo da marca
- Links: Trocar unidade, Nossa historia
- Botao Entrar ou dados do usuario logado
- Icone do carrinho com contador
- Menu hamburger no mobile

### LgpdBanner.tsx
Banner de cookies no rodape da pagina. Guarda preferencias no localStorage como `lgpd_consent`. Permite aceitar tudo, recusar ou personalizar.

## Mocks (Dados Simulados)

### units.ts
6 unidades: Recife (matriz), Salvador, Fortaleza, Sao Luis, Natal e Maceio. Cada uma tem endereco, telefone, horario, imagem e especialidades.

### products.ts
Produtos por unidade, divididos em categorias: Cafe da Manha, Salgados, Doces, Bebidas e Sazonalidade. Cada produto tem nome, descricao, preco e imagem.

### categories.ts
5 categorias do cardapio com icones Remix.

## Sistema de Fidelidade

O programa de fidelidade funciona por pontos:

| Nivel | Pontos | Desconto |
|-------|--------|----------|
| Bronze | 0-499 | 1% |
| Prata | 500-999 | 5% |
| Ouro | 1000-1999 | 10% |
| Diamante | 2000+ | 15% |

## Pagamento

Tres formas de pagamento no checkout:
- **PIX** - simulacao com codigo gerado
- **Cartao** - simulacao com 4 cenarios de teste
- **Dinheiro** - paga na retirada

## Painel Admin

Acesso em `/admin` com senha: **adm2026**

A senha e verificada em `/admin-login` e salva em `raizes_admin_auth` no localStorage. O painel mostra:
- Dashboard com KPIs (receita, pedidos, ticket medio)
- Graficos de vendas por dia e hora
- Tabela de pedidos com filtros
- Promocoes e estoque
- Relatorios e analytics
- Lista de clientes

## Cores do Tema

As cores definidas no Tailwind config:

| Nome | Codigo | Uso |
|------|--------|-----|
| terra | #C75B3A | Cor principal, botoes, destaques |
| coqueiro | #2D6A4F | Verde, botao hero, sucesso |
| areia | #F4E4C1 | Fundos claros |
| mar | #1D4E6F | Azul escuro |
| creme | #FFF9F0 | Fundo da pagina |
| grafite | #2D2D2D | Texto principal |

## Dicas para Modificar

- **Mudar a senha do admin**: edite `src/pages/admin-login/page.tsx`, constante `ADMIN_PASSWORD`
- **Adicionar produtos**: edite `src/mocks/products.ts`
- **Adicionar unidade**: edite `src/mocks/units.ts`
- **Mudar cores**: edite `tailwind.config.ts` na secao `colors`
- **Mudar fonte do hero**: edite `index.html`, a fonte "Great Vibes"
- **Remover pagina**: remova a rota de `src/router/config.tsx`

## Notas Importantes

- O sistema usa localStorage para persistencia de dados. Isso significa que os dados ficam no navegador do usuario e nao em um servidor real.
- Para um sistema em producao real, seria necessario conectar a um backend com banco de dados.
- As imagens dos produtos sao geradas via API e carregadas remotamente.
- O HashRouter foi escolhido porque funciona em qualquer hospedagem estatica (GitHub Pages, Netlify, Vercel).