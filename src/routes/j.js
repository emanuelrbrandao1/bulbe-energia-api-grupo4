const express = require('express');
const router = express.Router();
const jControllers = require('../controllers/jControllers');

/**
 * @openapi
 * /api/v1/carrinho:
 * delete:
 * summary: [US-08] Limpar todo o carrinho
 * description: Remove todos os itens do carrinho do usuário autenticado de uma vez.
 * tags: [Carrinho]
 * security:
 * - jwt: []
 * responses:
 * 200:
 * description: Responde 200 após limpar e retorna carrinho vazio.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * mensagem: { type: string }
 * itens: { type: array, example: [] }
 */
router.delete('/carrinho', jControllers.limparCarrinho);

/**
 * @openapi
 * /api/v1/pedidos/endereco:
 * post:
 * summary: [US-13] Salvar endereço de entrega do pedido
 * description: Salva o endereço e o associa ao pedido antes do pagamento.
 * tags: [Pedidos]
 * security:
 * - jwt: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required: [cep, logradouro, numero]
 * properties:
 * cep: { type: string }
 * logradouro: { type: string }
 * numero: { type: string }
 * complemento: { type: string }
 * responses:
 * 201:
 * description: Endereço salvo com sucesso.
 * 422:
 * description: Campos obrigatórios (cep, logradouro, numero) ausentes.
 * 401:
 * description: JWT inválido ou ausente.
 */
router.post('/pedidos/endereco', jControllers.salvarEndereco);

module.exports = router;