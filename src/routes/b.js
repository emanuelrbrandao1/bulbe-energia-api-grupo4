import { Router } from 'express';
import { getCarrinho } from '../controllers/bControllers.js';
import { autenticarJWT } from '../middleware/auth.js';

const router = Router();

/**
 * @openapi
 * /api/v1/carrinho:
 *   get:
 *     summary: Retorna itens do carrinho com valores calculados
 *     tags:
 *       - Carrinho
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de itens e totais calculados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 itens:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       produtoId:    { type: integer }
 *                       nome:         { type: string }
 *                       imagem:       { type: string }
 *                       precoUnitario:{ type: number }
 *                       quantidade:   { type: integer }
 *                       precoTotal:   { type: number }
 *                 subtotal:      { type: number }
 *                 totalDesconto: { type: number }
 *                 valorFinal:    { type: number }
 *       401:
 *         description: Token JWT ausente ou inválido
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/', autenticarJWT, getCarrinho);

export default router;