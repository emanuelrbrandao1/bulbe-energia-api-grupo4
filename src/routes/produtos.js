// src/routes/produtos.js
/**
 * @openapi
 * components:
 *   schemas:
 *     Produto:
 *       type: object
 *       description: Representação completa de um produto do catálogo Bulbe Energia.
 *       required:
 *         - id
 *         - nome
 *         - categoria
 *         - preco
 *       properties:
 *         id:
 *           type: integer
 *           description: Identificador único do produto.
 *           example: 1
 *         nome:
 *           type: string
 *           description: Nome do produto.
 *           example: Avant Neo LED Smart 10W RGB
 *         categoria:
 *           type: string
 *           enum: [lampadas, luminarias, fitas, acessorios, assistentes]
 *           description: Categoria do produto.
 *           example: lampadas
 *         descricao:
 *           type: string
 *           description: Descrição detalhada do produto.
 *         preco:
 *           type: number
 *           format: float
 *           description: Preço do produto em reais.
 *           example: 89.90
 *         desconto:
 *           type: integer
 *           description: Percentual de desconto aplicado.
 *           example: 10
 *         imagem:
 *           type: string
 *           description: URL da imagem principal.
 *         imagemDetalhes:
 *           type: string
 *           description: URL da imagem em alta resolução para tela de detalhes.
 *         avaliacao:
 *           type: number
 *           format: float
 *           description: Nota média do produto (0 a 5).
 *           example: 4.7
 *         totalAvaliacoes:
 *           type: integer
 *           description: Total de avaliações recebidas.
 *           example: 132
 *     Erro:
 *       type: object
 *       required:
 *         - erro
 *       properties:
 *         erro:
 *           type: string
 *           description: Mensagem descritiva do erro.A
 *           example: Categoria "invalida" não encontrada.
 */
import { Router } from 'express';
import { listarProdutos } from '../controllers/produtosController.js';
const router = Router();

/**
 * @openapi
 * /produtos:
 *   get:
 *     summary: Lista produtos com filtros opcionais
 *     description: |
 *       Retorna a lista de produtos do catálogo. Aceita filtros combináveis via query string:
 *       - `categoria` (US-01): filtra por categoria
 *       - `destaque=true` (RF-03): só produtos em destaque
 *       - `maisVendido=true` (RF-03): só mais vendidos
 *       Quando `destaque` ou `maisVendido` é aplicado, resultado é ordenado por avaliação (desc).
 *     tags:
 *       - Produtos
 *     parameters:
 *       - in: query
 *         name: categoria
 *         required: false
 *         schema:
 *           type: string
 *           enum: [lampadas, luminarias, fitas, acessorios, assistentes]
 *         description: Categoria para filtrar os produtos.
 *         example: lampadas
 *       - in: query
 *         name: destaque
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Se true, retorna apenas produtos em destaque.
 *       - in: query
 *         name: maisVendido
 *         required: false
 *         schema:
 *           type: boolean
 *         description: Se true, retorna apenas produtos mais vendidos.
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso (pode ser vazia).
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       404:
 *         description: Categoria informada não existe.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get('/', listarProdutos);

// GET /produtos/:id e' servido por routes/g.js (gControllers.buscarProdutoPorId),
// que ja usa SQL e mapeia snake -> camel. Mantinha-se aqui uma versao duplicada e bugada
// (referenciando variavel `produtos` que nao existia) - removida em #108.

export default router;
