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
import { removerFavoritos, selecionarEntrega } from '../controllers/bulbeControllers.js';
const router = Router();

/**
 * @swagger
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
 * @swagger
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



export default router;