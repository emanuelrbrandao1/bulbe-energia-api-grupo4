
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
import { adicionarItemCarrinho, atualizarItemCarrinho, listarCarrinho, removerItemCarrinho, limparCarrinho, buscarPedidoPorId } from '../controllers/hControllers.js';

const router = Router();

/**
 * @openapi
 * /carrinho/itens:
 *   post:
 *     summary: Adiciona um item ao carrinho
 *     description: Adiciona um novo produto ao carrinho ou aumenta a quantidade se já existe.
 *     tags:
 *       - Carrinho
 *     security:
 *       - bearerAuth: []
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
 *                 example: 1
 *               quantidade:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Item adicionado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 carrinhoAtualizado:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ItemCarrinho'
 *       401:
 *         description: Token JWT ausente ou inválido
 */
router.post('/itens', adicionarItemCarrinho);

/**
 * @openapi
 * /carrinho/itens/{produtoId}:
 *   patch:
 *     summary: Atualiza a quantidade de um item no carrinho
 *     description: Modifica a quantidade de um produto específico do carrinho.
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
 *         description: ID único do produto no carrinho.
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
 *                 example: 5
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 carrinhoAtualizado:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ItemCarrinho'
 *       401:
 *         description: Token JWT ausente ou inválido
 *       404:
 *         description: Item não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroCarrinho'
 */
router.patch('/itens/:produtoId', atualizarItemCarrinho);

/**
 * @openapi
 * /carrinho:
 *   get:
 *     summary: Retorna todos os itens do carrinho
 *     description: Lista todos os itens atualmente no carrinho do usuário autenticado.
 *     tags:
 *       - Carrinho
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de itens do carrinho.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 itens:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ItemCarrinho'
 *       401:
 *         description: Token JWT ausente ou inválido
 */
router.get('/', listarCarrinho);

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
 *                 itemRemovido:
 *                   $ref: '#/components/schemas/ItemCarrinho'
 *                 carrinhoAtualizado:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ItemCarrinho'
 *       401:
 *         description: Token JWT ausente ou inválido
 *       404:
 *         description: Item não encontrado no carrinho.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErroCarrinho'
 */
router.delete('/itens/:produtoId', removerItemCarrinho);

/**
 * @openapi
 * /carrinho:
 *   delete:
 *     summary: Limpa o carrinho completamente
 *     description: Remove todos os itens do carrinho do usuário autenticado de uma só vez.
 *     tags:
 *       - Carrinho
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrinho limpo com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 carrinho:
 *                   type: array
 *                   items: {}
 *       401:
 *         description: Token JWT ausente ou inválido
 */
router.delete('/', limparCarrinho);

export default router;

// Router de pedidos [RF-17]
export const hPedidosRouter = Router();

/**
 * @openapi
 * /pedidos/{id}:
 *   get:
 *     summary: Busca pedido confirmado por ID
 *     description: Retorna os dados completos de um pedido confirmado. Exige que o pedido pertença ao usuário autenticado.
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido.
 *         example: 1
 *     responses:
 *       200:
 *         description: Dados completos do pedido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pedidoId:
 *                   type: integer
 *                   example: 1
 *                 itens:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       produtoId:    { type: integer }
 *                       nome:         { type: string }
 *                       precoUnitario:{ type: number }
 *                       quantidade:   { type: integer }
 *                 enderecoEntrega:
 *                   type: object
 *                   properties:
 *                     logradouro:  { type: string }
 *                     numero:      { type: string }
 *                     complemento: { type: string }
 *                     bairro:      { type: string }
 *                     localidade:  { type: string }
 *                     uf:          { type: string }
 *                     cep:         { type: string }
 *                 formaEntrega:
 *                   type: string
 *                   example: PAC
 *                 metodoPagamento:
 *                   type: string
 *                   example: cartao_credito
 *                 valorTotal:
 *                   type: number
 *                   example: 259.70
 *                 status:
 *                   type: string
 *                   example: confirmado
 *                 dataCriacao:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-05-15T10:30:00.000Z"
 *       401:
 *         description: Token JWT ausente ou inválido.
 *       403:
 *         description: Pedido não pertence ao usuário autenticado.
 *       404:
 *         description: Pedido não encontrado.
 */
hPedidosRouter.get('/:id', buscarPedidoPorId);
