# Levantamento de Requisitos — Bulbe Energia API

**Versão:** 1.1
**Data:** 15/03/2026
**Grupo:** Grupo 4
**Integrantes:**
- Emanuel Rodrigues Brandão — @emanuelrbrandao1
- Gabriel Doornik — @GabrielDoornik
- B. Cerqueira — @bcerrqueira
- H. P. Araújo — @hparaujo2808
- João Lodif — @JoaoLodif
- Gabriel G. Fonseca — @Gabriel-G-Fonseca

---

## Requisitos Funcionais

| ID    | Descrição                                                                                        | US Vinculada | Prioridade |
|-------|--------------------------------------------------------------------------------------------------|--------------|------------|
| RF-01 | Listar produtos filtrados por categoria (lampadas, luminarias, fitas, acessorios, assistentes)   | US-01        | MUST       |
| RF-02 | Retornar dados completos de um produto a partir do seu ID                                        | US-02        | MUST       |
| RF-03 | Listar produtos marcados como destaque ou mais vendidos                                          | US-03        | MUST       |
| RF-04 | Adicionar produto ao carrinho, incrementando quantidade se já existir                            | US-04        | MUST       |
| RF-05 | Atualizar a quantidade de um item no carrinho                                                    | US-05        | MUST       |
| RF-06 | Retornar itens do carrinho com subtotal, desconto e valor final calculados                       | US-06        | MUST       |
| RF-07 | Remover item específico do carrinho sem afetar os demais                                         | US-07        | MUST       |
| RF-08 | Esvaziar completamente o carrinho do usuário                                                     | US-08        | MUST       |
| RF-09 | Retornar lista de produtos favoritos do usuário autenticado                                      | US-09        | SHOULD     |
| RF-10 | Adicionar produto à lista de favoritos do usuário                                                | US-10        | SHOULD     |
| RF-11 | Remover produto da lista de favoritos do usuário                                                 | US-11        | SHOULD     |
| RF-12 | Consultar dados de endereço via CEP (proxy para API ViaCEP)                                     | US-12        | MUST       |
| RF-13 | Salvar endereço de entrega e associar ao pedido em andamento                                     | US-13        | MUST       |
| RF-14 | Registrar forma de entrega selecionada (Padrão ou Express) com prazo e custo                    | US-14        | MUST       |
| RF-15 | Processar e validar dados de pagamento (crédito, débito e PIX)                                  | US-15        | MUST       |
| RF-16 | Registrar pedido confirmado associando itens, endereço, forma de entrega e pagamento             | US-16        | MUST       |
| RF-17 | Retornar dados completos de um pedido confirmado para exibição na tela de confirmação            | US-17        | MUST       |
| RF-18 | Autenticar usuário via email e senha, retornando token JWT                                       | US-18        | MUST       |
| RF-19 | Retornar lista de produtos recomendados baseada no pedido recém-confirmado                       | US-19        | COULD      |
| RF-20 | Retornar status de rastreamento de um pedido com histórico de etapas                             | US-20        | COULD      |

---

## Mapa de Endpoints

| Verbo  | Path                                          | RF    | Status esperado    |
|--------|-----------------------------------------------|-------|--------------------|
| GET    | /api/v1/produtos                              | RF-01 | 200                |
| GET    | /api/v1/produtos?categoria=:cat               | RF-01 | 200, 404           |
| GET    | /api/v1/produtos?destaque=true                | RF-03 | 200                |
| GET    | /api/v1/produtos?maisVendido=true             | RF-03 | 200                |
| GET    | /api/v1/produtos/:id                          | RF-02 | 200, 404           |
| GET    | /api/v1/produtos/recomendacoes?pedidoId=:id   | RF-19 | 200                |
| GET    | /api/v1/carrinho                              | RF-06 | 200                |
| POST   | /api/v1/carrinho/itens                        | RF-04 | 201, 200, 404, 422 |
| PATCH  | /api/v1/carrinho/itens/:produtoId             | RF-05 | 200, 404, 422      |
| DELETE | /api/v1/carrinho/itens/:produtoId             | RF-07 | 200, 404           |
| DELETE | /api/v1/carrinho                              | RF-08 | 200                |
| GET    | /api/v1/favoritos                             | RF-09 | 200                |
| POST   | /api/v1/favoritos                             | RF-10 | 201, 200, 404      |
| DELETE | /api/v1/favoritos/:produtoId                  | RF-11 | 200, 404           |
| GET    | /api/v1/enderecos/cep/:cep                    | RF-12 | 200, 404, 422      |
| POST   | /api/v1/pedidos/endereco                      | RF-13 | 201, 422           |
| POST   | /api/v1/pedidos/entrega                       | RF-14 | 200, 422           |
| POST   | /api/v1/pedidos/pagamento                     | RF-15 | 200, 422           |
| POST   | /api/v1/pedidos                               | RF-16 | 201, 400, 422      |
| GET    | /api/v1/pedidos/:id                           | RF-17 | 200, 403, 404      |
| GET    | /api/v1/pedidos/:id/rastreamento              | RF-20 | 200, 403, 404      |
| POST   | /api/v1/auth/login                            | RF-18 | 200, 401, 422      |
| POST   | /api/v1/auth/cadastro                         | RF-18 | 201, 409, 422      |

---

## Requisitos Não-Funcionais

| ID     | Categoria        | Descrição                                                                                          |
|--------|------------------|----------------------------------------------------------------------------------------------------|
| RNF-01 | Desempenho       | Endpoints de leitura (GET) respondem em ≤ 300ms (p95)                                             |
| RNF-02 | Segurança        | Todas as rotas (exceto GET /produtos, GET /enderecos/cep e POST /auth) exigem token JWT válido     |
| RNF-03 | Manutenibilidade | Código segue ESLint + padrão arquitetural MVC (controllers, models, routes, services)              |
| RNF-04 | Escalabilidade   | A API deve ser stateless — nenhum estado de sessão armazenado no servidor                          |
| RNF-05 | Segurança        | Senhas armazenadas com hash bcrypt (mínimo 10 rounds)                                              |
| RNF-06 | Padronização     | Todas as respostas seguem o formato JSON com campos `data`, `message` e `error`                    |
| RNF-07 | Disponibilidade  | Erros internos retornam 500 com mensagem genérica, sem expor stack trace ao cliente                |
| RNF-08 | Integração       | Consulta de CEP usa API ViaCEP como serviço externo com timeout de 5s e fallback de erro 503       |
