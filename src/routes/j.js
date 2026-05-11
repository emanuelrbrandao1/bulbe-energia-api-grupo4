// src/routes/j.js
import { Router } from 'express';
import { limparCarrinho } from '../controllers/jControllers.js';

const router = Router();

/**
 * @openapi
 * /carrinho:
 *   delete:
 *     summary: Limpar todo o carrinho
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
 *                   example: []
 *       401:
 *         description: Não autorizado (token JWT ausente ou inválido).
 */
router.delete('/', limparCarrinho);

export default router;
