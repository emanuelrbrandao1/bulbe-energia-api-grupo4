const express = require('express');
const router = express.Router();
const jControllers = require('../controllers/jControllers');

router.delete('/carrinho', jControllers.limparCarrinho);
router.post('/pedidos/endereco', jControllers.salvarEndereco);
router.post('/favoritos', jControllers.favoritarProduto);

/**
 * @openapi
 * /api/v1/enderecos/cep/{cep}:
 * get:
 * summary: [US-12] Consultar endereço por CEP
 * description: Busca endereço via API externa (ViaCEP) com timeout de 5s. Não exige autenticação.
 * tags: [Endereços]
 * parameters:
 * - in: path
 * name: cep
 * required: true
 * schema:
 * type: string
 * description: CEP com 8 dígitos.
 * responses:
 * 200:
 * description: Endereço encontrado.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * logradouro: { type: string }
 * bairro: { type: string }
 * localidade: { type: string }
 * uf: { type: string }
 * 404:
 * description: CEP não encontrado.
 * 422:
 * description: CEP inválido.
 * 504:
 * description: Timeout na consulta externa.
 */
router.get('/enderecos/cep/:cep', jControllers.consultarCep);

module.exports = router;