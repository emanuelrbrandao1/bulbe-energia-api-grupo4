// src/routes/g.js
/**
 * @openapi
 * /produtos/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     description: Retorna todos os dados de um produto específico pelo seu identificador único.
 *     tags:
 *       - Produtos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador único do produto.
 *         example: 1
 *     responses:
 *       200:
 *         description: Produto encontrado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Produto não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
import { Router } from 'express';
import { buscarProdutoPorId } from '../controllers/gControllers.js';

const router = Router();

router.get('/:id', buscarProdutoPorId);

export default router;
