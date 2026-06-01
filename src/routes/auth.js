// src/routes/auth.js
import { Router } from 'express';
import { login, register } from '../controllers/authController.js';

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

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Cadastra novo usuário e retorna token JWT
 *     description: Cria uma nova conta com nome, email e senha. Retorna token JWT válido por 24h. Não exige autenticação prévia.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Gabriel Doornik
 *               email:
 *                 type: string
 *                 example: gabriel@bulbe.com
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Conta criada com sucesso
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
 *       409:
 *         description: Email já cadastrado
 *       422:
 *         description: Campos obrigatórios ausentes
 */
router.post('/register', register);

export default router;
