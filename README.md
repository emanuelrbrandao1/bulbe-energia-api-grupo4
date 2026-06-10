<div align="center">

# ⚡ Bulbe Energia API

**Backend do sistema de e-commerce mobile-first de iluminação inteligente**
Projeto desenvolvido para a disciplina de Projeto de Desenvolvimento Backend — IBMEC

![Status](https://img.shields.io/badge/status-conclu%C3%ADdo-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)
![Express](https://img.shields.io/badge/Express-5-black)
![SQLite](https://img.shields.io/badge/SQLite-better--sqlite3-blue)

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

A **Bulbe Energia API** é o backend do sistema de e-commerce mobile-first desenvolvido pelo Grupo 4. O sistema permite que usuários naveguem por produtos de iluminação inteligente (lâmpadas, luminárias, fitas LED, acessórios e assistentes virtuais), adicionem itens ao carrinho e aos favoritos, e simulem uma compra completa — desde a seleção do endereço e forma de entrega até a confirmação e o rastreamento do pedido. O backend é responsável por fornecer todos os dados e regras de negócio consumidos pelo frontend.

---

## 🏗️ Arquitetura

A API segue uma organização em camadas sobre o Express:

```
Requisição → routes → middleware (JWT) → controllers → db (SQLite) → Resposta JSON
```

- **routes/** — definem os endpoints e o JSDoc OpenAPI de cada um.
- **middleware/** — `autenticarJWT` valida o token nas rotas protegidas.
- **controllers/** — regras de negócio e acesso ao banco.
- **db/** — conexão SQLite (`conexao.js`) e `seed.js` de carga inicial.
- **config/** — configuração centralizada do JWT.

> **Convenção do projeto:** cada integrante mantém o próprio arquivo de
> controller/rota (`b`, `e`, `g`, `h`, `j`, `bulbe`), decisão intencional para
> reduzir conflitos de merge. Por isso algumas rotas correlatas vivem sob
> prefixos diferentes (ex.: entrega, pagamento e rastreamento sob `/bulbe`).

---

## 🔧 Tecnologias

| Tecnologia | Uso |
|---|---|
| **Node.js (ESM)** | Runtime |
| **Express 5** | Framework HTTP / roteamento |
| **better-sqlite3** | Banco de dados SQLite (persistência em `bulbe.db`) |
| **jsonwebtoken** | Autenticação via JWT |
| **swagger-jsdoc + swagger-ui-express** | Documentação OpenAPI 3.0 em `/api-docs` |
| **cors** | Liberação de CORS para o frontend |
| **nodemon** | Hot-reload em desenvolvimento |

---

## ⚙️ Como Executar Localmente

1. Clone o repositório
```bash
git clone https://github.com/emanuelrbrandao1/bulbe-energia-api-grupo4.git
cd bulbe-energia-api-grupo4
```
2. Instale as dependências
```bash
npm install
```
3. Popule o banco de dados
```bash
npm run seed        # equivale a: node src/db/seed.js
```
4. Inicie o servidor
```bash
npm run dev         # desenvolvimento (nodemon)
# ou
npm start           # produção
```

> ⚠️ O arquivo `bulbe.db` é gerado automaticamente e não é versionado.
>
> 📡 A API sobe em `http://localhost:3000` — acesse `/api-docs` para a documentação interativa.

---

## 📡 Endpoints da API

> Caminhos reais da API. Detalhamento completo (RFs, RNFs e códigos de status) em [`docs/requisitos.md`](./docs/requisitos.md).

| Verbo  | Path                                          | Descrição                              | JWT |
|--------|-----------------------------------------------|----------------------------------------|-----|
| POST   | /api/v1/auth/login                            | Autenticar usuário                     | —   |
| POST   | /api/v1/auth/register                         | Cadastrar novo usuário                 | —   |
| GET    | /api/v1/produtos                              | Listar todos os produtos               | —   |
| GET    | /api/v1/produtos?categoria=:cat               | Listar produtos por categoria          | —   |
| GET    | /api/v1/produtos?destaque=true                | Listar produtos em destaque            | —   |
| GET    | /api/v1/produtos?maisVendido=true             | Listar produtos mais vendidos          | —   |
| GET    | /api/v1/produtos/:id                          | Buscar produto por ID                  | —   |
| GET    | /api/v1/produtos/recomendacoes?pedidoId=:id   | Buscar produtos recomendados           | —   |
| GET    | /api/v1/carrinho                              | Visualizar carrinho                    | ✔   |
| POST   | /api/v1/carrinho/itens                        | Adicionar item ao carrinho             | ✔   |
| PATCH  | /api/v1/carrinho/itens/:produtoId             | Atualizar quantidade no carrinho       | ✔   |
| DELETE | /api/v1/carrinho/itens/:produtoId             | Remover item do carrinho               | ✔   |
| DELETE | /api/v1/carrinho                              | Limpar carrinho                        | ✔   |
| GET    | /api/v1/favoritos                             | Listar favoritos                       | ✔   |
| POST   | /api/v1/favoritos                             | Adicionar/alternar favorito (toggle)   | ✔   |
| DELETE | /api/v1/bulbe/:id                             | Remover dos favoritos                  | ✔   |
| GET    | /api/v1/enderecos/cep/:cep                    | Buscar endereço por CEP (ViaCEP)       | —   |
| POST   | /api/v1/pedidos/endereco                      | Salvar endereço de entrega             | ✔   |
| POST   | /api/v1/bulbe/entrega                         | Selecionar forma de entrega            | ✔   |
| POST   | /api/v1/bulbe/pedidos/:id/pagamento           | Processar pagamento                    | ✔   |
| POST   | /api/v1/pedidos                               | Confirmar pedido                       | ✔   |
| GET    | /api/v1/pedidos/:id                           | Buscar pedido por ID                   | ✔   |
| GET    | /api/v1/bulbe/pedidos/:pedidoId/rastreamento  | Rastrear pedido                        | ✔   |

---

## 📚 Documentação OpenAPI

A documentação OpenAPI 3.0 é gerada automaticamente a partir das anotações `@openapi` nas rotas (swagger-jsdoc) e servida em:

- **Interface interativa:** `http://localhost:3000/api-docs`
- **Spec JSON bruta:** `http://localhost:3000/api-docs.json` (útil para importar no Postman/Insomnia)

---

## 🗂️ Estrutura do Repositório

```
bulbe-energia-api-grupo4/
├── docs/
│   └── requisitos.md
├── src/
│   ├── config/         # configuração do JWT
│   ├── controllers/    # regras de negócio (1 arquivo por integrante + bulbe/produtos)
│   ├── db/             # conexao.js (SQLite) e seed.js
│   ├── middleware/     # autenticarJWT
│   ├── routes/         # endpoints + JSDoc OpenAPI
│   └── app.js          # bootstrap do Express, CORS, Swagger e montagem das rotas
├── .gitignore
├── package.json
└── README.md
```

---

## 🔄 Sprints

| Sprint | Foco | Status |
|--------|------|--------|
| Kickoff | Apresentação dos trabalhos do semestre anterior | ✅ |
| Sprint 1 | Setup do repositório + elicitação de requisitos (histórias de usuário) | ✅ |
| Sprint 2 | Desenvolvimento da API com dados em memória + documentação OpenAPI | ✅ |
| Sprint 3 | Autenticação com JWT + migração para banco de dados SQLite | ✅ |
| Sprint 4 | Integração com o frontend, correções e funcionalidades finais | ✅ |

---

## 📄 Licença

Distribuído sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.
