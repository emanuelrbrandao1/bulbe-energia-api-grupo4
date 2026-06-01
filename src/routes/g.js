// src/routes/g.js
/**
 * @openapi
 * /produtos/recomendacoes:
 *   get:
 *     summary: Retorna produtos recomendados após confirmação do pedido
 *     description: Busca até 4 produtos que não estão no pedido informado, para exibição na seção "Você também pode gostar" da tela de confirmação.
 *     tags:
 *       - Produtos
 *     parameters:
 *       - in: query
 *         name: pedidoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador único do pedido confirmado.
 *         example: 1
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de até 4 produtos recomendados (excluindo os já presentes no pedido).
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               maxItems: 4
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       400:
 *         description: Parâmetro pedidoId inválido (não é um inteiro).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Pedido não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
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
 *     security:
 *       - bearerAuth: []
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
/**
 * @openapi
 * /carrinho/itens/{produtoId}:
 *   patch:
 *     summary: Atualiza a quantidade de um item no carrinho
 *     description: Aumenta ou diminui a quantidade de um produto específico no carrinho. Quantidade mínima é 1.
 *     tags:
 *       - Carrinho
 *     parameters:
 *       - in: path
 *         name: produtoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador do produto no carrinho.
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantidade
 *             properties:
 *               quantidade:
 *                 type: integer
 *                 minimum: 1
 *                 description: Nova quantidade do item no carrinho.
 *                 example: 3
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Quantidade atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ItemCarrinho'
 *       404:
 *         description: Item não encontrado no carrinho.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroCarrinho'
 *       422:
 *         description: Quantidade inválida (menor que 1).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroCarrinho'
 */
import { Router } from 'express';
import { buscarProdutoPorId, atualizarQuantidadeItem, buscarRecomendacoes } from '../controllers/gControllers.js';

const router = Router();
router.get('/recomendacoes', buscarRecomendacoes);
router.get('/:id', buscarProdutoPorId);

export const gCarrinhoRouter = Router();
gCarrinhoRouter.patch('/itens/:produtoId', atualizarQuantidadeItem);

export default router;
