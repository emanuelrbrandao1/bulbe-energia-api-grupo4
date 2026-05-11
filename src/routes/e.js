// src/routes/e.js
/**
 * @openapi
 * /carrinho/itens:
 *   post:
 *     summary: Adiciona um produto ao carrinho
 *     description: Adiciona um item novo ao carrinho ou incrementa a quantidade caso o produto já esteja presente.
 *     tags:
 *       - Carrinho
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - produtoId
 *               - quantidade
 *             properties:
 *               produtoId:
 *                 type: integer
 *                 description: ID do produto a ser adicionado.
 *                 example: 1
 *               quantidade:
 *                 type: integer
 *                 description: Quantidade a ser adicionada (deve ser > 0).
 *                 example: 2
 *     responses:
 *       201:
 *         description: Produto adicionado ao carrinho como novo item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 produtoId:
 *                   type: integer
 *                 quantidade:
 *                   type: integer
 *       200:
 *         description: Produto já existia no carrinho — quantidade incrementada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 produtoId:
 *                   type: integer
 *                 quantidade:
 *                   type: integer
 *       404:
 *         description: Produto informado não existe.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       422:
 *         description: Campos ausentes ou quantidade inválida.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
import { Router } from 'express';
import { adicionarItemCarrinho } from '../controllers/eControllers.js';

const router = Router();

router.post('/itens', adicionarItemCarrinho);

export default router;
