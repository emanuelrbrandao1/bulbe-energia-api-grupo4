// src/routes/h.js
/**
 * @openapi
 * components:
 *   schemas:
 *     ItemCarrinho:
 *       type: object
 *       description: Representação de um item no carrinho de compras.
 *       required:
 *         - produtoId
 *         - nome
 *         - preco
 *         - quantidade
 *       properties:
 *         produtoId:
 *           type: integer
 *           description: ID único do produto no carrinho.
 *           example: 1
 *         nome:
 *           type: string
 *           description: Nome do produto.
 *           example: Avant Neo LED Smart 10W RGB
 *         preco:
 *           type: number
 *           format: float
 *           description: Preço unitário do produto.
 *           example: 89.90
 *         quantidade:
 *           type: integer
 *           description: Quantidade do produto no carrinho.
 *           example: 2
 *     ErroCarrinho:
 *       type: object
 *       required:
 *         - erro
 *       properties:
 *         erro:
 *           type: string
 *           description: Mensagem descritiva do erro.
 *           example: Item com produtoId 999 não encontrado no carrinho.
 */
import { Router } from 'express';
import { autenticarJWT } from '../middleware/auth.js';
import { removerItemCarrinho } from '../controllers/hControllers.js';

const router = Router();

/**
 * @openapi
 * /carrinho/itens/{produtoId}:
 *   delete:
 *     summary: Remove um item específico do carrinho
 *     description: Remove um produto específico do carrinho de compras pelo seu ID. Se o item não existir, retorna 404.
 *     tags:
 *       - Carrinho
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: produtoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único do produto a ser removido do carrinho.
 *         example: 1
 *     responses:
 *       200:
 *         description: Item removido com sucesso do carrinho.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Item removido com sucesso do carrinho.
 *                 itemRemovido:
 *                   $ref: '#/components/schemas/ItemCarrinho'
 *                 carrinhoAtualizado:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ItemCarrinho'
 *       404:
 *         description: Item não encontrado no carrinho.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroCarrinho'
 */
router.delete('/itens/:produtoId', autenticarJWT, removerItemCarrinho);

export default router;
