# Projeto Multidiciplinar Raízes do Nordeste – Trilha Front-End

Este projeto foi desenvolvido como parte integrante do curso de **Análise e Desenvolvimento de Sistemas da Universidade Uninter**. Trata-se de uma plataforma de pedidos online voltada para uma rede de lanchonetes especializada em culinária nordestina, unindo tecnologia moderna com a identidade cultural da região.

O objetivo central foi criar uma experiência *mobile-first* fluida, onde o usuário consegue navegar entre unidades, escolher produtos regionais e simular todo o processo de compra, desde o carrinho até o acompanhamento do pedido em tempo real.

## 🛠 Tecnologia e Escolhas Técnicas

A estrutura foi montada para ser leve e eficiente, utilizando o que há de mais atual no ecossistema JavaScript:

* **React 19 & TypeScript:** Base do projeto para garantir uma interface reativa e um código seguro com tipagem estática.

* **Vite:** Utilizado como ferramenta de build para um desenvolvimento ágil.

* **Tailwind CSS:** Toda a estilização foi feita com classes utilitárias, permitindo um design responsivo e personalizado (Cores: Terra, Coqueiro, Areia e Mar).

* **React Router (HashRouter):** Escolhido para garantir que o roteamento funcione perfeitamente em qualquer serviço de hospedagem estática, como o GitHub Pages.

* **Recharts:** Implementado no painel administrativo para visualização de métricas e gráficos de vendas.

## 🚀 O que o sistema oferece

O sistema simula um ambiente real de e-commerce gastronômico com as seguintes funcionalidades:

1. **Seleção de Unidades:** O usuário escolhe entre seis franquias (Recife, Salvador, Fortaleza, São Luís, Natal e Maceió), cada uma com especialidades específicas.

2. **Cardápio Inteligente:** Divisão por categorias (Café da Manhã, Salgados, Doces, Bebidas e Sazonalidade) com mais de 35 produtos por unidade.

3. **Fidelidade Progressiva:** Sistema de pontos que categoriza o cliente (Bronze, Prata, Ouro e Diamante), liberando descontos automáticos de 1% a 15%.

4. **Checkout Completo:** Simulação de pagamentos via PIX, Cartão e Dinheiro, com fluxos de sucesso ou falha para testes de interface.

5. **Acompanhamento em Tempo Real:** Uma timeline que mostra desde o preparo até a saída para entrega/retirada.

6. **Painel Administrativo:** Área restrita para gestão, com métricas de KPI (faturamento, ticket médio) e histórico geral de pedidos.

7. **Conformidade LGPD:** Banner de gerenciamento de cookies e página de políticas de privacidade integradas.

## 📂 Organização do Projeto

O código está organizado de forma modular para facilitar a manutenção:

* `src/components`: Elementos visuais reutilizáveis (Logo SVG, Navbar, Modais).
* `src/context`: Gerenciamento de estado global (Autenticação e Carrinho).
* `src/hooks`: Lógica extraída, como o gerenciamento de pedidos (`useOrders`).
* `src/mocks`: Base de dados simulada para produtos, unidades e categorias.
* `src/pages`: As visualizações completas da aplicação (Home, Cardápio, Admin, etc).

## 🔑 Acesso ao Painel Admin

Para fins de avaliação e testes da área administrativa:

* **URL:** `/admin`
* **Senha de acesso:** `adm2026`

> **Nota Técnica:** Por se tratar de um protótipo acadêmico, o projeto utiliza o `localStorage` do navegador para persistir dados de usuários, carrinhos e pedidos. Isso dispensa, neste momento, a necessidade de um banco de dados externo para a execução da interface.

## 💻 Instruções para Execução

1. Instale as dependências:
```bash
npm install

```


2. Inicie o servidor de desenvolvimento:
```bash
npm run dev

```


3. Para gerar a versão de produção:
```bash
npm run build

```



---

**Aluno Desenvolvedor:** Thiago Raony Gomes de Moura Vicente da Silva

**RU:** 4576142

**Curso:** Análise e Desenvolvimento de Sistemas – Universidade Uninter
