const express = require('express');
const router = express.Router();
const jControllers = require('../controllers/jControllers');

// Rota US-08: Limpar Carrinho
router.delete('/carrinho', jControllers.limparCarrinho);

// Rota US-13: Salvar Endereço
router.post('/pedidos/endereco', jControllers.salvarEndereco);

/**
 * @openapi
 * /api/v1/favoritos:
 * post:
 * summary: [US-10] Adicionar produto aos favoritos
 * description: Adiciona um produto à lista de interesses do usuário.
 * tags: [Favoritos]
 * security:
 * - jwt: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required: [produtoId]
 * properties:
 * produtoId: { type: integer }
 * responses:
 * 201:
 * description: Responde 201 ao favoritar com sucesso.
 * 200:
 * description: Retorna 200 se o produto já estava nos favoritos (idempotente).
 * 404:
 * description: Retorna 404 se o produto não existir no sistema.
 * 401:
 * description: Não autorizado (Exige JWT).
 */
router.post('/favoritos', jControllers.favoritarProduto);

module.exports = router;