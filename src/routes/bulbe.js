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

import { Router } from 'express';
import { listarFavoritos } from '../controllers/bulbeControllers.js';
const router = Router();

router.get('/favoritos', listarFavoritos);

export default router;