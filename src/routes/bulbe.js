// src/routes/bulbe.js
/**
 * @openapi
 * components:
 *   schemas:
 *     Tarefa:
 *       type: object
 *       description: Representação completa de items do website.
 *       required:
 *         - id
 *         - name
 *         - preco
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único gerado pelo servidor.
 *           example: 1
 *         name:
 *           type: string
 *           description: Nome do preduto.
 *           minLength: 2
 *           maxLength: 100
 *           example: Avant Neo LED Smart 10W RGB
 *         preco:
 *           type: float
 *           description: Preço do produto.
 *           example: R$29,75
 *     BulbeInput:
 *       type: object
 *       description: Adicionar para o carrinho e depois pagar.
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do preduto.
 *           minLength: 2
 *           maxLength: 100
 *           example: Avant Neo LED Smart 10W RGB
 *     Erro:
 *       type: object
 *       description: Formato padrão de resposta para erros da API.
 *       required:
 *         - erro
 *       properties:
 *         erro:
 *           type: string
 *           description: Mensagem descritiva do erro ocorrido.
 *           example: Campo obrigatório "name" faltando.
 */
import { Router } from 'express';
import { processarPagamento, removerFavoritos, selecionarEntrega, rastrearPedido } from '../controllers/bulbeControllers.js';
const router = Router();

/**
 * @openapi
 * /api/v1/favoritos/{id}:
 *   delete:
 *     summary: Remove um item da lista de favoritos
 *     description: Remove um produto dos favoritos pelo seu ID.
 *     tags:
 *       - Favoritos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto a ser removido
 *         example: 3
 *     responses:
 *       204:
 *         description: Produto removido com sucesso (sem conteúdo)
 *       400:
 *         description: O ID informado não é um número
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "O id deve ser um número"
 *       404:
 *         description: Produto não encontrado nos favoritos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "O produto com id 3 não está nos favoritos"
 */
router.delete('/:id', removerFavoritos );

/**
 * @openapi
 * /entrega:
 *   post:
 *     summary: Seleciona o tipo de entrega
 *     description: Retorna o prazo estimado e o custo da entrega escolhida.
 *     tags:
 *       - Entrega
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 example: "express"
 *                 description: Tipo de entrega (padrao ou express)
 *     responses:
 *       200:
 *         description: Entrega selecionada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tipo:
 *                   type: string
 *                 prazoEstimado:
 *                   type: string
 *                 custoEntrega:
 *                   type: number
 *       422:
 *         description: Tipo de entrega inválido
 */
router.post('/', selecionarEntrega);
/**
 * @openapi
 * /pedidos/{id}/pagamento:
 *   post:
 *     summary: Processa o pagamento de um pedido
 *     description: Permite escolher a forma de pagamento entre pix, crédito ou débito.
 *     tags:
 *       - Pagamentos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pedido
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               metodo:
 *                 type: string
 *                 example: "credito"
 *                 description: Forma de pagamento (pix, credito ou debito)
 *               nome_titular:
 *                 type: string
 *                 example: "Gabriel"
 *               num_cartao:
 *                 type: string
 *                 example: "1111222233334444"
 *               validade:
 *                 type: string
 *                 example: "12/30"
 *               cod_seguranca:
 *                 type: string
 *                 example: "123"
 *     responses:
 *       200:
 *         description: Pagamento processado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 pagamento:
 *                   type: object
 *                   properties:
 *                     idPedido:
 *                       type: integer
 *                     metodo:
 *                       type: string
 *                     status:
 *                       type: string
 *
 *       400:
 *         description: ID do pedido inválido
 *
 *       422:
 *         description: Método de pagamento inválido ou dados do cartão ausentes
 */
router.post('/pedidos/:id/pagamento', processarPagamento );

/**
 * @openapi
 * /rastreamento/{pedidoId}:
 *   get:
 *     summary: Consulta o rastreamento de um pedido
 *     description: Retorna o status atual e o histórico de rastreamento do pedido.
 *     tags:
 *       - Rastreamento
 *     parameters:
 *       - in: path
 *         name: pedidoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do pedido
 *         example: 1
 *     responses:
 *       200:
 *         description: Rastreamento encontrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pedidoId:
 *                   type: integer
 *                   example: 1
 *                 status:
 *                   type: string
 *                   example: em_transito
 *                 historicoStatus:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       data:
 *                         type: string
 *                         example: "2026-05-12 14:00"
 *                       descricao:
 *                         type: string
 *                         example: "Pedido saiu para entrega"
 *
 *       400:
 *         description: O id deve ser um número
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "O id deve ser um número"
 *
 *       404:
 *         description: Pedido não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Pedido não encontrado"
 */
router.get('/pedidos/:pedidoId/rastreamento', rastrearPedido );


export default router;