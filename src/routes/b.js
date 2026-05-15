import { Router } from 'express';
import { getCarrinho } from '../controllers/bControllers.js';
import { autenticarJWT } from '../middleware/auth.js';
import { login } from '../controllers/authController.js';

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

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Realiza login e retorna token JWT
 *     description: Autentica o usuário com email e senha e retorna um token válido por 24h.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: emanuel@bulbe.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:      { type: string }
 *                 usuarioId:  { type: integer }
 *                 nome:       { type: string }
 *                 email:      { type: string }
 *       401:
 *         description: Email ou senha inválidos
 *       422:
 *         description: Email ou senha ausentes
 *       500:
 *         description: Erro interno no servidor
 */
router.post('/login', login);

export default router;