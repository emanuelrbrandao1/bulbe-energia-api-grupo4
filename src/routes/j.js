const express = require('express');
const router = express.Router();
const jControllers = require('../controllers/jControllers');

/**
 * @openapi
 * /api/v1/carrinho:
 * delete:
 * summary: Limpar todo o carrinho
 * description: Remove todos os itens do carrinho do usuário autenticado de uma só vez.
 * tags: [Carrinho]
 * security:
 * - jwt: []
 * responses:
 * 200:
 * description: Carrinho limpo com sucesso.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * mensagem:
 * type: string
 * carrinho:
 * type: array
 * items: {}
 * example: []
 * 401:
 * description: Não autorizado (Token JWT ausente ou inválido).
 */
router.delete('/carrinho', jControllers.limparCarrinho);

module.exports = router;