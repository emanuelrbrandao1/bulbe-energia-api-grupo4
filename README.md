<div align="center">

# ⚡ Bulbe Energia API

**Backend do sistema de e-commerce mobile-first de iluminação inteligente**
Projeto desenvolvido para a disciplina de Projeto de Desenvolvimento Backend — IBMEC

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![License](https://img.shields.io/badge/license-MIT-blue)

</div>

---

## 👥 Equipe

| Nome Completo | GitHub |
|---|---|
| Emanuel Rodrigues Brandão | [@emanuelrbrandao1](https://github.com/emanuelrbrandao1) |
| Gabriel Doornik | [@GabrielDoornik](https://github.com/GabrielDoornik) |
| B. Cerqueira | [@bcerrqueira](https://github.com/bcerrqueira) |
| H. P. Araújo | [@hparaujo2808](https://github.com/hparaujo2808) |
| João Lodif | [@JoaoLodif](https://github.com/JoaoLodif) |
| Gabriel G. Fonseca | [@Gabriel-G-Fonseca](https://github.com/Gabriel-G-Fonseca) |

---

## 📋 Sobre o Projeto

A **Bulbe Energia API** é o backend do sistema de e-commerce mobile-first desenvolvido pelo Grupo 4. O sistema permite que usuários naveguem por produtos de iluminação inteligente (lâmpadas, luminárias, fitas LED, acessórios e assistentes virtuais), adicionem itens ao carrinho e aos favoritos, e simulem uma compra completa — desde a seleção do endereço e forma de entrega até a confirmação do pedido. O backend é responsável por fornecer todos os dados e regras de negócio consumidos pelo frontend.

---

## 🏗️ Arquitetura

> *A ser preenchido na Sprint 2 após definição da arquitetura MVC.*

---

## 🔧 Tecnologias

> *A ser preenchido na Sprint 2.*

---

## ⚙️ Como Executar Localmente

> 1. Clone o repositório
```bash
   git clone https://github.com/emanuelrbrandao1/bulbe-energia-api-grupo4.git
```
2. Instale as dependências
```bash
   npm install
```
3. Popule o banco de dados
```bash
   node src/db/seed.js
```
4. Inicie o servidor
```bash
   npm run dev
```

> ⚠️ O arquivo `bulbe.db` é gerado automaticamente e não é versionado.
> 
> 📡 Acesse `/api-docs` para ver os endpoints disponíveis.

---

## 📡 Endpoints da API (esboço inicial)

> Consulte o arquivo completo em [`docs/requisitos.md`](./docs/requisitos.md).

| Verbo  | Path                                        | Descrição                              |
|--------|---------------------------------------------|----------------------------------------|
| GET    | /api/v1/produtos                            | Listar todos os produtos               |
| GET    | /api/v1/produtos?categoria=:cat             | Listar produtos por categoria          |
| GET    | /api/v1/produtos/:id                        | Buscar produto por ID                  |
| GET    | /api/v1/produtos?destaque=true              | Listar produtos em destaque            |
| GET    | /api/v1/produtos/recomendacoes              | Buscar produtos recomendados           |
| GET    | /api/v1/carrinho                            | Visualizar carrinho                    |
| POST   | /api/v1/carrinho/itens                      | Adicionar item ao carrinho             |
| PATCH  | /api/v1/carrinho/itens/:produtoId           | Atualizar quantidade no carrinho       |
| DELETE | /api/v1/carrinho/itens/:produtoId           | Remover item do carrinho               |
| DELETE | /api/v1/carrinho                            | Limpar carrinho                        |
| GET    | /api/v1/favoritos                           | Listar favoritos                       |
| POST   | /api/v1/favoritos                           | Adicionar aos favoritos                |
| DELETE | /api/v1/favoritos/:produtoId                | Remover dos favoritos                  |
| GET    | /api/v1/enderecos/cep/:cep                  | Buscar endereço por CEP                |
| POST   | /api/v1/pedidos/endereco                    | Salvar endereço de entrega             |
| POST   | /api/v1/pedidos/entrega                     | Selecionar forma de entrega            |
| POST   | /api/v1/pedidos/pagamento                   | Processar pagamento                    |
| POST   | /api/v1/pedidos                             | Confirmar pedido                       |
| GET    | /api/v1/pedidos/:id                         | Buscar pedido por ID                   |
| GET    | /api/v1/pedidos/:id/rastreamento            | Rastrear pedido                        |
| POST   | /api/v1/auth/login                          | Autenticar usuário                     |
| POST   | /api/v1/auth/cadastro                       | Cadastrar novo usuário                 |

---

## 📚 Documentação OpenAPI

> Arquivo em [`docs/openapi.yaml`](./docs/openapi.yaml) — a ser preenchido progressivamente.

---

## 🗂️ Estrutura do Repositório

```
bulbe-energia-api-grupo4/
├── docs/
│   ├── requisitos.md
│   └── openapi.yaml
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── services/
├── tests/
├── .gitignore
├── package.json
└── README.md
```

---

## 🔄 Sprints

| Sprint | Foco | Status |
|--------|------|--------|
| Kickoff | Apresentação dos trabalhos do semestre anterior 
| Sprint 1 | Setup + Elicitação de Requisitos 


---



## 📄 Licença

Distribuído sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
