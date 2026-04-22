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

/**
 * @openapi
 * /favoritos:
 *   get:
 *     summary: Retornar favoritos do usuário autenticado
 *     description: |
 *       Retorna a lista de produtos favoritos do usuário autenticado.
 *       Requer autenticação via JWT token.
 *       **RF-09**: Retornar favoritos do usuário autenticado.
 *     operationId: listarFavoritos
 *     tags:
 *       - Favoritos
 *     responses:
 *       200:
 *         description: Lista de favoritos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                   example: true
 *                 quantidade:
 *                   type: integer
 *                   example: 2
 *                   description: Quantidade de produtos nos favoritos
 *                 dados:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tarefa'
 *               example:
 *                 sucesso: true
 *                 quantidade: 2
 *                 dados:
 *                   - id: 1
 *                     name: Avant Neo LED Smart 10W RGB
 *                     preco: "29,75"
 *                   - id: 3
 *                     name: Lâmpada LED Padrão 9W
 *                     preco: "15,50"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */

/**
 * @openapi
 * /carrinho/itens/{produtoId}:
 *   delete:
 *     summary: Remover item específico do carrinho
 *     description: |
 *       Remove um produto específico do carrinho pelo seu ID.
 *       Não afeta outros itens do carrinho.
 *       **RF-07**: Remover item específico do carrinho.
 *     operationId: removerItemCarrinho
 *     tags:
 *       - Carrinho
 *     parameters:
 *       - name: produtoId
 *         in: path
 *         required: true
 *         description: ID do produto a remover
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Item removido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                   example: true
 *                 mensagem:
 *                   type: string
 *                   example: "Produto com ID 1 removido do carrinho com sucesso"
 *                 carrinhoAtualizado:
 *                   type: array
 *                   description: Carrinho atualizado após remoção
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       preco:
 *                         type: string
 *                       quantidade:
 *                         type: integer
 *       400:
 *         description: ID do produto inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "ID do produto inválido. Deve ser um número."
 *       404:
 *         description: Produto não encontrado no carrinho
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Produto com ID 1 não encontrado no carrinho"
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */

import { Router } from 'express';
import { listarFavoritos, removerItemCarrinho } from '../controllers/bulbeControllers.js';
const router = Router();

router.get('/favoritos', listarFavoritos);
router.delete('/carrinho/itens/:produtoId', removerItemCarrinho);

export default router;