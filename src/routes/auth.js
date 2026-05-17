// src/routes/auth.js
import { Router } from 'express';
import { login } from '../controllers/authController.js';

const router = Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Realiza login e retorna token JWT [US-18]
 *     description: Autentica o usuário com email e senha. Retorna um token válido por 24h. Não exige autenticação prévia.
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
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 usuarioId:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Email ou senha inválidos
 *       422:
 *         description: Email ou senha ausentes
 */
router.post('/login', login);

export default router;
