// src/routes/hj.js
/**
 * @openapi
 * components:
 *   schemas:
 *     ItemFavorito:
 *       type: object
 *       description: Produto presente na lista de favoritos do usuário.
 *       properties:
 *         produtoId:
 *           type: integer
 *           example: 1
 *         nome:
 *           type: string
 *           example: Avant Neo LED Smart 10W RGB
 *         imagem:
 *           type: string
 *           example: https://exemplo.com/produtos/avant-neo-rgb.jpg
 *         preco:
 *           type: number
 *           format: float
 *           example: 89.90
 */
import { Router } from 'express';
import { autenticarJWT } from '../middleware/auth.js';
import { listarFavoritos } from '../controllers/hControllers.js';

const router = Router();

/**
 * @openapi
 * /favoritos:
 *   get:
 *     summary: Lista os favoritos do usuário autenticado
 *     description: Retorna a lista de produtos favoritados pelo usuário, com imagem, nome e preço. Retorna lista vazia caso não haja favoritos.
 *     tags:
 *       - Favoritos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de favoritos retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 favoritos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ItemFavorito'
 *       401:
 *         description: Token JWT ausente ou inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: Token JWT ausente ou inválido.
 */
router.get('/', autenticarJWT, listarFavoritos);

export default router;
