// src/routes/j.js
import { Router } from 'express';
import {
  salvarEndereco,
  favoritarProduto,
  consultarCep,
} from '../controllers/jControllers.js';

// Router padrão (protegido por JWT no app.js — montado em /api/v1)
const router = Router();

/**
 * @openapi
 * /favoritos:
 *   post:
 *     summary: Adiciona produto aos favoritos do usuário [US-10]
 *     description: Idempotente — se o produto já está nos favoritos, retorna 200 sem duplicar.
 *     tags:
 *       - Favoritos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - produtoId
 *             properties:
 *               produtoId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Produto adicionado aos favoritos.
 *       200:
 *         description: Produto já estava nos favoritos (idempotente).
 *       401:
 *         description: Token ausente ou inválido.
 *       404:
 *         description: Produto não existe no catálogo.
 */
router.post('/favoritos', favoritarProduto);

/**
 * @openapi
 * /pedidos/endereco:
 *   post:
 *     summary: Salva endereço de entrega do pedido [US-13]
 *     description: Persiste o endereço de entrega associado ao usuário autenticado.
 *     tags:
 *       - Pedidos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cep
 *               - logradouro
 *               - numero
 *             properties:
 *               cep:
 *                 type: string
 *                 example: "01310100"
 *               logradouro:
 *                 type: string
 *                 example: Avenida Paulista
 *               numero:
 *                 type: string
 *                 example: "1000"
 *               complemento:
 *                 type: string
 *                 example: Apto 42
 *     responses:
 *       201:
 *         description: Endereço salvo com sucesso.
 *       401:
 *         description: Token ausente ou inválido.
 *       422:
 *         description: Campos obrigatórios ausentes.
 */
router.post('/pedidos/endereco', salvarEndereco);

export default router;

// Router público (sem JWT — montado em /api/v1 no app.js)
export const jPublicRouter = Router();

/**
 * @openapi
 * /enderecos/cep/{cep}:
 *   get:
 *     summary: Consulta endereço por CEP [US-12]
 *     description: Busca o endereço via ViaCEP com timeout de 5s. Endpoint público (sem JWT).
 *     tags:
 *       - Endereços
 *     parameters:
 *       - in: path
 *         name: cep
 *         required: true
 *         schema:
 *           type: string
 *         description: CEP com 8 dígitos.
 *         example: "01310100"
 *     responses:
 *       200:
 *         description: Endereço encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 logradouro:
 *                   type: string
 *                 bairro:
 *                   type: string
 *                 localidade:
 *                   type: string
 *                 uf:
 *                   type: string
 *       404:
 *         description: CEP não encontrado.
 *       422:
 *         description: CEP inválido (precisa de 8 dígitos).
 *       504:
 *         description: Timeout na consulta externa (5s).
 */
jPublicRouter.get('/enderecos/cep/:cep', consultarCep);
