# Raízes do Nordeste - Projeto Multidisciplinar

## 1. Descrição do Projeto
Sistema web completo para a rede de lanchonetes "Raízes do Nordeste", com foco mobile-first e fluxo de pedidos. O site permite ao cliente selecionar uma unidade, fazer login/cadastro, navegar pelo cardápio regional, adicionar itens ao carrinho, fazer checkout com simulação de pagamento (PIX e cartão), acompanhar pedidos em tempo real e participar de programa de fidelidade com descontos progressivos.

## 2. Estrutura de Páginas
- `/` - Home (seleção de unidade/franquia)
- `/login` - Login e cadastro de usuários
- `/escolha-login` - Tela intermediária após escolher unidade (login/cadastro/continuar sem login)
- `/cardapio/:unitId` - Cardápio da unidade selecionada
- `/produto/:unitId/:productId` - Detalhe do produto
- `/carrinho` - Carrinho de compras
- `/checkout` - Checkout e pagamento
- `/acompanhamento/:orderId` - Acompanhamento de pedido
- `/perfil` - Perfil do usuário, fidelidade, consentimentos LGPD
- `/pedidos` - Histórico de pedidos com avaliação
- `/privacidade` - Política de Privacidade / LGPD
- `/historia` - Conheça nossa história
- `/admin` - Painel administrativo da matriz (pedidos por unidade)

## 3. Funcionalidades Principais
- [x] Seleção de unidade (6 franquias no Nordeste)
- [x] Login / Cadastro de usuários
- [x] Tela intermediária de escolha após selecionar unidade
- [x] Aceite LGPD com gerenciamento de preferências
- [x] Cardápio por unidade com culinária regional (35+ produtos cada)
- [x] Produtos sazonais destacados por região (diferenciados por unidade)
- [x] Carrinho flutuante com toast de adição
- [x] Checkout com simulação de pagamento (PIX, cartão)
- [x] Acompanhamento de pedido com timeline
- [x] Programa de fidelidade (Bronze 1%, Prata 5%, Ouro 10%, Diamante 15%)
- [x] Histórico de pedidos com avaliação por estrelas
- [x] Repetir pedido do histórico
- [x] Perfil com alteração de dados cadastrais
- [x] Painel administrativo simples
- [x] Responsivo: desktop, tablet, smartphone
- [x] SEO básico com meta tags
- [x] Alerta ao trocar unidade com itens no carrinho
- [x] Botão "Continuar comprando" no carrinho
- [x] Logout funcionando
- [x] Identidade visual com fonte serif (Cormorant Garamond)

## 4. Modelo de Dados (Supabase) - PENDENTE CONEXÃO

### Tabela: users
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid | PK |
| email | text | Login |
| nome | text | Nome completo |
| telefone | text | Contato |
| endereco | text | Endereço de entrega |
| pontos_fidelidade | int | Pontos acumulados |
| nivel_fidelidade | text | bronze/prata/ouro/diamante |
| consentimento_lgpd | boolean | Aceite LGPD |
| created_at | timestamp | Data cadastro |

### Tabela: pedidos
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid | PK |
| user_id | uuid | FK usuário |
| unidade_id | text | Unidade escolhida |
| itens | jsonb | Lista de produtos |
| total | decimal | Valor total |
| desconto_fidelidade | decimal | Desconto aplicado |
| status | text | pendente/preparando/pronto/entregue/cancelado |
| forma_pagamento | text | pix/cartao |
| avaliacao | int | 1-5 estrelas |
| created_at | timestamp | Data do pedido |

### Tabela: avaliacoes
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | uuid | PK |
| pedido_id | uuid | FK |
| user_id | uuid | FK |
| nota | int | 1-5 |
| comentario | text | Opcional |
| created_at | timestamp | |

## 5. Integrações
- **Supabase**: Auth, Database (users, pedidos, avaliacoes), Edge Functions — NÃO CONECTADO
- **Stripe**: Não necessário (pagamentos simulados via PIX/cartão)
- **Shopify**: Não necessário

## 6. Fases de Desenvolvimento

### Fase 1: Estrutura Base + Home + Login/Cadastro ✅
- Configuração de rotas, layout base, mock data das 6 unidades
- Página Home com seleção de unidade
- Página de Login/Cadastro
- Banner LGPD inicial
- SEO básico

### Fase 2: Cardápio + Produto + Carrinho ✅
- Cardápio por unidade com abas (Café da Manhã, Salgados, Doces, Bebidas, Sazonalidade)
- 35+ produtos por unidade com culinária regional diferenciada (4 comuns + 2 regionais por aba)
- Página de detalhe do produto
- Carrinho flutuante e toast

### Fase 3: Checkout + Acompanhamento ✅
- Checkout com simulação de pagamento (PIX/cartão)
- Modal de resultado (sucesso/falha/timeout)
- Timeline de acompanhamento de pedido

### Fase 4: Perfil + Fidelidade + Histórico ✅
- Perfil do usuário repaginado
- Programa de fidelidade com descontos progressivos
- Histórico de pedidos com avaliação por estrelas
- Repetir pedido
- Alteração de dados cadastrais

### Fase 5: LGPD + História + Admin ✅
- Página de Política de Privacidade
- Página "Conheça nossa história" com foto da Dona Francisca
- Painel administrativo simples

### Fase 6: Supabase + Responsividade Final
- Conectar Supabase (auth + database) — PENDENTE CONEXÃO
- Persistência real de usuários, pedidos, avaliações
- Ajustes finais de responsividade para tablet e smartphone ✅
