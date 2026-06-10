# Levantamento de Requisitos — Bulbe Energia API

**Versão:** 2.0
**Data:** 08/06/2026 *(atualizado pós-implementação — reflete a API entregue)*
**Grupo:** Grupo 4
**Integrantes:**
- Emanuel Rodrigues Brandão — @emanuelrbrandao1
- Gabriel Doornik — @GabrielDoornik
- B. Cerqueira — @bcerrqueira
- H. P. Araújo — @hparaujo2808
- João Lodif — @JoaoLodif
- Gabriel G. Fonseca — @Gabriel-G-Fonseca

> **Nota de versão (2.0):** este documento foi sincronizado com o código final.
> As rotas de favoritos (remoção), entrega, pagamento e rastreamento foram
> implementadas sob o prefixo `/bulbe`, e o cadastro sob `/auth/register`.
> Os requisitos não-funcionais marcam o que foi efetivamente entregue.

---

## Requisitos Funcionais

| ID    | Descrição                                                                                        | US Vinculada | Prioridade | Status        |
|-------|--------------------------------------------------------------------------------------------------|--------------|------------|---------------|
| RF-01 | Listar produtos filtrados por categoria (lampadas, luminarias, fitas, acessorios, assistentes)   | US-01        | MUST       | ✅ Implementado |
| RF-02 | Retornar dados completos de um produto a partir do seu ID                                        | US-02        | MUST       | ✅ Implementado |
| RF-03 | Listar produtos marcados como destaque ou mais vendidos                                          | US-03        | MUST       | ✅ Implementado |
| RF-04 | Adicionar produto ao carrinho, incrementando quantidade se já existir                            | US-04        | MUST       | ✅ Implementado |
| RF-05 | Atualizar a quantidade de um item no carrinho                                                    | US-05        | MUST       | ✅ Implementado |
| RF-06 | Retornar itens do carrinho com nome, preço e quantidade a partir do banco                        | US-06        | MUST       | ✅ Implementado |
| RF-07 | Remover item específico do carrinho sem afetar os demais                                         | US-07        | MUST       | ✅ Implementado |
| RF-08 | Esvaziar completamente o carrinho do usuário                                                     | US-08        | MUST       | ✅ Implementado |
| RF-09 | Retornar lista de produtos favoritos do usuário autenticado                                      | US-09        | SHOULD     | ✅ Implementado |
| RF-10 | Adicionar/alternar produto na lista de favoritos do usuário (toggle)                             | US-10        | SHOULD     | ✅ Implementado |
| RF-11 | Remover produto da lista de favoritos do usuário                                                 | US-11        | SHOULD     | ✅ Implementado |
| RF-12 | Consultar dados de endereço via CEP (proxy para API ViaCEP)                                      | US-12        | MUST       | ✅ Implementado |
| RF-13 | Salvar endereço de entrega e associar ao usuário                                                 | US-13        | MUST       | ✅ Implementado |
| RF-14 | Registrar forma de entrega selecionada (Padrão ou Express) com prazo e custo                     | US-14        | MUST       | ✅ Implementado |
| RF-15 | Processar e validar dados de pagamento (crédito, débito e PIX)                                   | US-15        | MUST       | ✅ Implementado |
| RF-16 | Registrar pedido confirmado associando itens, valor total (com frete), entrega e pagamento       | US-16        | MUST       | ✅ Implementado |
| RF-17 | Retornar dados completos de um pedido confirmado para exibição na tela de confirmação            | US-17        | MUST       | ✅ Implementado |
| RF-18 | Autenticar usuário via email e senha (login) e cadastrar novo usuário, retornando token JWT      | US-18        | MUST       | ✅ Implementado |
| RF-19 | Retornar lista de produtos recomendados baseada no pedido recém-confirmado                       | US-19        | COULD      | ✅ Implementado |
| RF-20 | Retornar status de rastreamento de um pedido                                                     | US-20        | COULD      | ✅ Implementado |

---

## Mapa de Endpoints

> Caminhos reais da API entregue. Endpoints sob `/bulbe` e `/auth/register`
> seguem a organização dos controllers por integrante (convenção do projeto).

| Verbo  | Path                                            | RF    | Auth JWT | Status esperado     |
|--------|-------------------------------------------------|-------|----------|---------------------|
| GET    | /api/v1/produtos                                | RF-01 | Não      | 200                 |
| GET    | /api/v1/produtos?categoria=:cat                 | RF-01 | Não      | 200, 404            |
| GET    | /api/v1/produtos?destaque=true                  | RF-03 | Não      | 200                 |
| GET    | /api/v1/produtos?maisVendido=true               | RF-03 | Não      | 200                 |
| GET    | /api/v1/produtos/:id                            | RF-02 | Não      | 200, 404            |
| GET    | /api/v1/produtos/recomendacoes?pedidoId=:id     | RF-19 | Não      | 200                 |
| GET    | /api/v1/carrinho                                | RF-06 | Sim      | 200                 |
| POST   | /api/v1/carrinho/itens                          | RF-04 | Sim      | 201, 200, 404, 422  |
| PATCH  | /api/v1/carrinho/itens/:produtoId               | RF-05 | Sim      | 200, 404, 422       |
| DELETE | /api/v1/carrinho/itens/:produtoId               | RF-07 | Sim      | 200, 404            |
| DELETE | /api/v1/carrinho                                | RF-08 | Sim      | 200                 |
| GET    | /api/v1/favoritos                               | RF-09 | Sim      | 200                 |
| POST   | /api/v1/favoritos                               | RF-10 | Sim      | 200, 404            |
| DELETE | /api/v1/bulbe/:id                               | RF-11 | Sim      | 204, 400, 404       |
| GET    | /api/v1/enderecos/cep/:cep                      | RF-12 | Não      | 200, 404, 422, 504  |
| POST   | /api/v1/pedidos/endereco                        | RF-13 | Sim      | 201, 422            |
| POST   | /api/v1/bulbe/entrega                           | RF-14 | Sim      | 200, 422            |
| POST   | /api/v1/bulbe/pedidos/:id/pagamento             | RF-15 | Sim      | 200, 404, 422       |
| POST   | /api/v1/pedidos                                 | RF-16 | Sim      | 201, 400, 422       |
| GET    | /api/v1/pedidos/:id                             | RF-17 | Sim      | 200, 403, 404       |
| GET    | /api/v1/bulbe/pedidos/:pedidoId/rastreamento    | RF-20 | Sim      | 200, 400, 404       |
| POST   | /api/v1/auth/login                              | RF-18 | Não      | 200, 401, 422       |
| POST   | /api/v1/auth/register                           | RF-18 | Não      | 201, 409, 422       |

---

## Requisitos Não-Funcionais

> Status real na entrega. Itens marcados como ⚠️/❌ são débitos técnicos
> conhecidos, fora do escopo priorizado para esta versão acadêmica.

| ID     | Categoria        | Descrição                                                                                          | Status |
|--------|------------------|----------------------------------------------------------------------------------------------------|--------|
| RNF-01 | Desempenho       | Endpoints de leitura (GET) com resposta rápida — leituras diretas em SQLite local                  | ✅ Atendido (não medido formalmente) |
| RNF-02 | Segurança        | Rotas protegidas (exceto GET /produtos, GET /enderecos/cep e POST /auth/*) exigem token JWT válido  | ✅ Atendido |
| RNF-03 | Manutenibilidade | Arquitetura em camadas: `routes` → `controllers` → `db` (+ `middleware`, `config`)                  | ⚠️ Parcial — sem ESLint configurado; sem camadas `models`/`services` separadas |
| RNF-04 | Escalabilidade   | API stateless — nenhum estado de sessão no servidor (autenticação via JWT)                          | ✅ Atendido |
| RNF-05 | Segurança        | Senhas armazenadas com hash (ex.: bcrypt)                                                           | ❌ Não implementado — senhas em texto plano (débito técnico) |
| RNF-06 | Padronização     | Respostas em JSON                                                                                   | ⚠️ Parcial — JSON sempre, mas sem envelope único `data`/`message`/`error` padronizado |
| RNF-07 | Disponibilidade  | Erros internos retornam 500 via handler global de erros                                             | ⚠️ Parcial — handler existe, mas inclui `detalhe` com a mensagem do erro |
| RNF-08 | Integração       | Consulta de CEP usa ViaCEP como serviço externo com timeout de 5s                                  | ✅ Atendido — timeout 5s; retorna 504 em timeout e 500 em falha externa |

---

## Stack de Tecnologias (entregue)

- **Runtime:** Node.js (ESM)
- **Framework:** Express 5
- **Banco de dados:** SQLite via better-sqlite3 (arquivo local `bulbe.db`, gerado pelo seed)
- **Autenticação:** JSON Web Token (jsonwebtoken)
- **Documentação:** OpenAPI 3.0 via swagger-jsdoc + swagger-ui-express, servida em `/api-docs`
- **CORS:** habilitado (cors)
- **Dev:** nodemon
