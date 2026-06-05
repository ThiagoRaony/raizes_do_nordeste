# Raízes do Nordeste

Projeto desenvolvido para a disciplina de **Projeto Multidisciplinar** do curso de **Análise e Desenvolvimento de Sistemas – UNINTER**.

O sistema simula uma plataforma de pedidos online para uma rede fictícia de lanchonetes especializadas em culinária nordestina, permitindo que o usuário escolha uma unidade, navegue pelo cardápio, realize pedidos, acompanhe o status da compra e tenha acesso a recursos de fidelidade e administração.

---

## Sobre o Projeto

O objetivo deste trabalho foi aplicar, em um cenário próximo ao mercado real, conceitos de desenvolvimento Front-End, experiência do usuário, responsividade, organização de código e boas práticas de versionamento.

A proposta foi construir uma aplicação completa com foco em dispositivos móveis, simulando o fluxo de atendimento de uma rede de franquias espalhadas pelo Nordeste brasileiro.

Durante o desenvolvimento foi adotada a abordagem **Mobile First**, na qual a interface foi inicialmente planejada para smartphones e posteriormente adaptada para tablets e computadores. Essa estratégia permitiu priorizar a experiência do usuário em dispositivos móveis, garantindo uma navegação intuitiva e consistente em diferentes tamanhos de tela.

---

## Funcionalidades Implementadas

### Área do Cliente

* Seleção de unidades da rede
* Login e cadastro de usuários
* Navegação por cardápio regional
* Visualização detalhada de produtos
* Carrinho de compras
* Checkout com simulação de pagamento
* Acompanhamento de pedidos
* Histórico de pedidos
* Programa de fidelidade
* Gerenciamento de perfil
* Política de Privacidade e LGPD

### Área Administrativa

* Dashboard administrativo
* Controle e visualização de pedidos
* Indicadores de desempenho
* Relatórios simulados
* Gestão básica da operação

---

## Tecnologias Utilizadas

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Recharts
* Remix Icon

---

## Estrutura do Projeto

```text
src/
├── components/
├── context/
├── hooks/
├── mocks/
├── pages/
├── router/
├── App.tsx
└── main.tsx
```

### Organização das Pastas

**components**
Componentes reutilizáveis da interface.

**context**
Gerenciamento de estado global da aplicação.

**hooks**
Lógicas compartilhadas e reutilizáveis.

**mocks**
Base de dados simulada utilizada durante o desenvolvimento.

**pages**
Telas completas da aplicação.

**router**
Configuração das rotas do sistema.

---

## Persistência dos Dados

Por se tratar de um projeto acadêmico, os dados são armazenados localmente utilizando o **Local Storage** do navegador.

Essa abordagem permitiu demonstrar toda a lógica de funcionamento da aplicação sem a necessidade de integração com um backend ou banco de dados real.

---

## Acesso Administrativo

Para fins de avaliação e testes:

```text
Rota:
/admin

Senha:
adm2026
```

---

## Executando o Projeto Localmente

### Instalar dependências

```bash
npm install
```

### Executar ambiente de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

### Gerar build de produção

```bash
npm run build
```

---

## Publicação

O projeto está configurado para publicação automática através do **GitHub Actions**.

Sempre que alterações forem enviadas para a branch principal, o processo de build e deploy é executado automaticamente no GitHub Pages.

---

## Aprendizados Desenvolvidos

Durante a construção deste projeto foram aplicados conhecimentos relacionados a:

* Componentização de interfaces
* Gerenciamento de estado
* Roteamento de aplicações SPA
* Desenvolvimento Mobile First
* Responsividade
* Experiência do usuário (UX)
* Persistência de dados no navegador
* Versionamento com Git e GitHub
* Integração contínua com GitHub Actions
* Publicação de aplicações web

---

## Considerações Finais

O projeto foi desenvolvido com o objetivo de simular uma aplicação próxima de um cenário real de mercado, permitindo colocar em prática conhecimentos adquiridos ao longo do curso.

Além dos aspectos técnicos, a proposta também buscou valorizar elementos da cultura nordestina por meio da identidade visual, cardápio regional e ambientação da marca fictícia **Raízes do Nordeste**.

---

## Autor

**Thiago Raony Gomes de Moura Vicente da Silva**

**RU:** 4576142

**Curso:** Análise e Desenvolvimento de Sistemas

**Instituição:** Universidade UNINTER

---

Este projeto possui finalidade exclusivamente acadêmica e foi desenvolvido para fins de estudo, aprendizado e avaliação.
