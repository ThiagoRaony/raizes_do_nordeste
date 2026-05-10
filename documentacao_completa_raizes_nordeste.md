# README.md

```md
# Raízes do Nordeste

Sistema Front-end desenvolvido para o Projeto Multidisciplinar da do Curso de Analise e Desenvolvimento de Sistemas.

O projeto representa uma solução digital para a rede fictícia de lanchonetes nordestinas “Raízes do Nordeste”, contemplando:

- aplicativo mobile;
- experiência web responsiva;
- fluxo de pedidos;
- programa de fidelidade;
- integração com pagamentos externos;
- multicanalidade;
- conformidade com LGPD.

---

# Objetivo

Desenvolver uma interface moderna e escalável capaz de atender múltiplas unidades da franquia, considerando diferenças regionais de cardápio, fidelização, experiência do usuário e integração entre canais.

---

# Tecnologias Utilizadas

- React
- TypeScript
- Vite
- TailwindCSS
- Context API
- React Router

---

# Funcionalidades

## Cliente

- Cadastro e autenticação
- Seleção de unidade
- Cardápio dinâmico
- Carrinho
- Checkout
- Acompanhamento de pedidos
- Programa de fidelidade
- Histórico de pedidos
- Gestão de perfil
- Consentimento LGPD

## Administrativo

- Dashboard
- Gestão de pedidos
- Controle de promoções
- Relatórios

## Totem

- Autoatendimento
- Fluxo simplificado
- Confirmação de retirada

---

# Estrutura do Projeto

src/
 ├── components/
 ├── context/
 ├── hooks/
 ├── mocks/
 ├── pages/
 ├── router/
 └── i18n/

---

# Responsividade

O sistema foi desenvolvido seguindo abordagem mobile-first, garantindo adaptação para:

- smartphones;
- tablets;
- desktops;
- totens de autoatendimento.

---

# LGPD

A aplicação possui:

- banner de consentimento;
- gestão de privacidade;
- política de uso de dados;
- consentimento explícito;
- gerenciamento de preferências.

---

# Execução do Projeto

## Instalação

```bash
npm install
```

## Execução local

```bash
npm run dev
```

## Build

```bash
npm run build
```

---

# Considerações

O projeto foi desenvolvido com foco em experiência do usuário, clareza de navegação, organização arquitetural e simulação de um cenário real de mercado.
```

---

# docs/REQUISITOS.md

```md
# Requisitos do Sistema

# Requisitos Funcionais

| Código | Descrição |
|---|---|
| RF01 | O sistema deve permitir cadastro de usuários |
| RF02 | O sistema deve permitir autenticação |
| RF03 | O sistema deve exibir cardápio por unidade |
| RF04 | O cliente deve adicionar itens ao carrinho |
| RF05 | O sistema deve permitir edição do carrinho |
| RF06 | O sistema deve calcular subtotal e total |
| RF07 | O sistema deve permitir acompanhamento do pedido |
| RF08 | O sistema deve exibir status do pagamento |
| RF09 | O sistema deve integrar gateway externo |
| RF10 | O sistema deve possuir programa de fidelidade |
| RF11 | O sistema deve exibir promoções |
| RF12 | O sistema deve permitir troca de unidade |
| RF13 | O sistema deve possuir área administrativa |
| RF14 | O sistema deve permitir gerenciamento de perfil |
| RF15 | O sistema deve solicitar consentimento LGPD |

---

# Requisitos Não Funcionais

| Código | Descrição |
|---|---|
| RNF01 | O sistema deve seguir abordagem mobile-first |
| RNF02 | O sistema deve ser responsivo |
| RNF03 | O sistema deve possuir carregamento otimizado |
| RNF04 | O sistema deve possuir acessibilidade |
| RNF05 | O sistema deve ser escalável |
| RNF06 | O sistema deve possuir feedback visual |
| RNF07 | O sistema deve apresentar mensagens de erro |
| RNF08 | O sistema deve possuir navegação intuitiva |
| RNF09 | O sistema deve respeitar a LGPD |
| RNF10 | O sistema deve possuir arquitetura modular |
```

---

# docs/ARQUITETURA.md

```md
# Arquitetura Front-end

# Visão Geral

A aplicação foi estruturada utilizando arquitetura baseada em componentes reutilizáveis.

A solução foi organizada para facilitar:

- manutenção;
- escalabilidade;
- reaproveitamento de código;
- separação de responsabilidades.

---

# Estrutura Arquitetural

## Components

Responsável pelos componentes reutilizáveis da interface.

Exemplos:

- Navbar
- Toast
- Banner LGPD
- Modais

---

## Context

Gerenciamento global de estados.

### AuthContext

Responsável por:

- autenticação;
- sessão;
- gerenciamento de usuário.

### CartContext

Responsável por:

- itens do carrinho;
- quantidade;
- subtotal;
- atualização de pedidos.

---

## Hooks

Centraliza regras reutilizáveis.

Exemplo:

- gerenciamento de pedidos;
- estados da aplicação.

---

## Router

Gerencia navegação da aplicação.

---

## Pages

Separação das telas por contexto funcional.

---

# Estratégia de Navegação

A navegação foi projetada priorizando:

- experiência mobile;
- simplicidade;
- rapidez;
- clareza visual.

---

# Integração com Pagamento

O sistema não processa pagamentos diretamente.

A aplicação:

1. envia solicitação;
2. aguarda retorno do gateway;
3. atualiza status;
4. confirma pedido.

---

# Escalabilidade

A estrutura foi organizada para permitir:

- múltiplas unidades;
- expansão de funcionalidades;
- novos módulos;
- novos canais.
```

---

# docs/JORNADA_USUARIO.md

```md
# Jornada do Usuário

# Fluxo Principal

1. Usuário acessa aplicação
2. Seleciona unidade
3. Realiza login ou cadastro
4. Navega pelo cardápio
5. Visualiza detalhes do produto
6. Adiciona item ao carrinho
7. Finaliza pedido
8. Escolhe forma de pagamento
9. Sistema envia solicitação ao gateway
10. Pagamento aprovado
11. Pedido confirmado
12. Usuário acompanha status
13. Pedido retirado

---

# Pontos de Decisão

## Escolha de Unidade

O cardápio é alterado dinamicamente conforme a unidade.

## Disponibilidade

Produtos podem variar por região.

## Pagamento

O usuário recebe confirmação ou erro.

## Fidelidade

Pontos são adicionados após conclusão do pedido.

---

# Objetivos da Jornada

- reduzir atrito;
- simplificar checkout;
- melhorar experiência;
- aumentar fidelização;
- manter clareza do fluxo.
```

---

# docs/LGPD.md

```md
# LGPD e Privacidade

# Objetivo

Garantir transparência no tratamento de dados dos usuários.

---

# Funcionalidades Implementadas

- banner de consentimento;
- gerenciamento de preferências;
- política de privacidade;
- autorização de marketing;
- controle de cookies.

---

# Consentimento

O usuário deve aceitar explicitamente:

- política de privacidade;
- termos de uso;
- uso de dados para personalização.

---

# Transparência

A aplicação informa:

- quais dados são coletados;
- finalidade do uso;
- tempo de armazenamento;
- possibilidade de exclusão.

---

# Segurança

A arquitetura foi projetada considerando:

- minimização de dados;
- proteção de sessão;
- controle de acesso;
- separação de responsabilidades.
```

---

# docs/TESTES.md

```md
# Plano de Testes

# Objetivo

Validar comportamento, usabilidade, responsividade e confiabilidade da interface.

---

# Cenários de Teste

| ID | Cenário | Resultado Esperado |
|---|---|---|
| CT01 | Login válido | Usuário autenticado |
| CT02 | Senha inválida | Exibição de mensagem de erro |
| CT03 | Carrinho vazio | Bloqueio de checkout |
| CT04 | Produto indisponível | Aviso visual |
| CT05 | Pagamento aprovado | Pedido confirmado |
| CT06 | Pagamento recusado | Mensagem de falha |
| CT07 | Consentimento LGPD não aceito | Impedimento de continuidade |
| CT08 | Responsividade mobile | Layout adaptado |
| CT09 | Troca de unidade | Atualização de cardápio |
| CT10 | Acompanhamento de pedido | Status atualizado |

---

# Testes de Responsividade

Validação em:

- mobile;
- tablet;
- desktop;
- totem.

---

# Testes de Usabilidade

Foram avaliados:

- clareza da navegação;
- acessibilidade;
- feedback visual;
- facilidade de checkout.

---

# Testes LGPD

Verificação de:

- consentimento;
- transparência;
- controle de privacidade.
```

---

# docs/DECISOES_TECNICAS.md

```md
# Decisões Técnicas

# React

React foi utilizado devido:

- componentização;
- reaproveitamento;
- escalabilidade;
- organização estrutural.

---

# TypeScript

TypeScript foi adotado para:

- tipagem;
- redução de erros;
- previsibilidade.

---

# TailwindCSS

TailwindCSS foi escolhido pela:

- velocidade de prototipação;
- responsividade;
- padronização visual.

---

# Context API

Utilizada para gerenciamento global sem necessidade de bibliotecas externas adicionais.

---

# Mobile-first

A estratégia mobile-first foi adotada considerando:

- predominância de dispositivos móveis;
- rapidez de navegação;
- experiência simplificada.

---

# Mock Data

Dados mockados foram utilizados para:

- simular APIs;
- validar fluxos;
- reduzir complexidade do escopo acadêmico.
```

---

# docs/TOTEM.md

```md
# Fluxo do Totem

# Objetivo

Permitir autoatendimento rápido em loja física.

---

# Fluxo

1. Cliente inicia atendimento
2. Seleciona produtos
3. Visualiza carrinho
4. Escolhe pagamento
5. Confirma pedido
6. Recebe senha de retirada

---

# Características

- interface simplificada;
- botões ampliados;
- navegação rápida;
- foco em acessibilidade;
- fluxo reduzido.

---

# Benefícios

- redução de filas;
- aumento de produtividade;
- melhoria operacional.
```

---

# docs/CONCLUSAO.md

```md
# Conclusão

O projeto foi desenvolvido considerando um cenário real de mercado, buscando integrar experiência do usuário, responsividade, escalabilidade e organização arquitetural.

A solução contempla:

- múltiplos canais;
- fidelização;
- integração externa de pagamentos;
- LGPD;
- experiência mobile-first.

A estrutura do sistema foi organizada visando facilitar evolução futura, manutenção e expansão da plataforma.

O desenvolvimento permitiu aplicar conceitos relacionados a:

- UX/UI;
- arquitetura front-end;
- componentização;
- responsividade;
- engenharia de software.

Além dos aspectos técnicos, o projeto buscou representar uma solução coerente com necessidades reais de operação e crescimento de uma franquia alimentícia.
```

---

# docs/REFERENCIAS.md

```md
# Referências

- React Documentation
- Vite Documentation
- TailwindCSS Documentation
- TypeScript Documentation
- LGPD — Lei Geral de Proteção de Dados
- Material Design Guidelines
- Nielsen Norman Group
- MDN Web Docs
```

