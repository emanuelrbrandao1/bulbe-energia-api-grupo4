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
 *           description: Mensagem descritiva do erro.
 *           example: Categoria "invalida" não encontrada.
 */
import { Router } from 'express';
import { listarProdutos, getProdutosDestaque } from '../controllers/produtosController.js';

const router = Router();

/**
 * @openapi
 * /produtos:
 *   get:
 *     summary: Lista produtos filtrados por categoria
 *     description: Retorna a lista de produtos do catálogo. Pode ser filtrada por categoria via query string.
 *     tags:
 *       - Produtos
 *     parameters:
 *       - in: query
 *         name: categoria
 *         required: false
 *         schema:
 *           type: string
 *           enum: [lampadas, luminarias, fitas, acessorios, assistentes]
 *         description: Categoria para filtrar os produtos. Se omitida, retorna todos.
 *         example: lampadas
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

/**
 * @openapi
 * /produtos/destaque:
 *   get:
 *     summary: Lista produtos em destaque ou mais vendidos
 *     description: Retorna produtos filtrados por destaque ou maisVendido, ordenados por avaliação.
 *     tags:
 *       - Produtos
 *     parameters:
 *       - in: query
 *         name: destaque
 *         schema:
 *           type: boolean
 *         description: Filtra produtos em destaque
 *       - in: query
 *         name: maisVendido
 *         schema:
 *           type: boolean
 *         description: Filtra produtos mais vendidos
 *     responses:
 *       200:
 *         description: Lista de produtos filtrada e ordenada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/destaque', getProdutosDestaque);
export default router;
