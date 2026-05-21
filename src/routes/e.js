// src/routes/e.js
/**
 * @openapi
 * /carrinho/itens:
 *   post:
 *     summary: Adiciona um produto ao carrinho
 *     description: Adiciona um item novo ao carrinho ou incrementa a quantidade caso o produto já esteja presente.
 *     tags:
 *       - Carrinho
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - produtoId
 *               - quantidade
 *             properties:
 *               produtoId:
 *                 type: integer
 *                 description: ID do produto a ser adicionado.
 *                 example: 1
 *               quantidade:
 *                 type: integer
 *                 description: Quantidade a ser adicionada (deve ser > 0).
 *                 example: 2
 *     responses:
 *       201:
 *         description: Produto adicionado ao carrinho como novo item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 produtoId:
 *                   type: integer
 *                 quantidade:
 *                   type: integer
 *       200:
 *         description: Produto já existia no carrinho — quantidade incrementada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 produtoId:
 *                   type: integer
 *                 quantidade:
 *                   type: integer
 *       404:
 *         description: Produto informado não existe.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       422:
 *         description: Campos ausentes ou quantidade inválida.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
import { Router } from 'express';
import { adicionarItemCarrinho, confirmarPedido } from '../controllers/eControllers.js';

const router = Router();

router.post('/itens', adicionarItemCarrinho);

export default router;

// Router de pedidos [US-16]
export const ePedidosRouter = Router();

/**
 * @openapi
 * /pedidos:
 *   post:
 *     summary: Confirma e registra um novo pedido [US-16]
 *     description: |
 *       Cria um pedido a partir do carrinho atual. Esvazia o carrinho após confirmação.
 *       Observação: usa o carrinho gerenciado por routes/h.js (POST /carrinho/itens, etc).
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
 *               - enderecoEntrega
 *               - formaEntrega
 *               - metodoPagamento
 *             properties:
 *               enderecoEntrega:
 *                 type: object
 *                 properties:
 *                   logradouro:  { type: string, example: Avenida Paulista }
 *                   numero:      { type: string, example: "1000" }
 *                   complemento: { type: string, example: "Apto 42" }
 *                   bairro:      { type: string, example: Bela Vista }
 *                   localidade:  { type: string, example: São Paulo }
 *                   uf:          { type: string, example: SP }
 *                   cep:         { type: string, example: "01310100" }
 *               formaEntrega:
 *                 type: string
 *                 example: PAC
 *               metodoPagamento:
 *                 type: string
 *                 example: cartao_credito
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso. Carrinho esvaziado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pedidoId:        { type: integer, example: 3 }
 *                 itens:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       produtoId:     { type: integer }
 *                       nome:          { type: string }
 *                       precoUnitario: { type: number }
 *                       quantidade:    { type: integer }
 *                 enderecoEntrega: { type: object }
 *                 formaEntrega:    { type: string, example: PAC }
 *                 metodoPagamento: { type: string, example: cartao_credito }
 *                 valorTotal:      { type: number, example: 259.70 }
 *                 status:          { type: string, example: confirmado }
 *                 dataCriacao:     { type: string, format: date-time }
 *       400:
 *         description: Carrinho vazio.
 *       401:
 *         description: Token JWT ausente ou inválido.
 *       422:
 *         description: Campos obrigatórios ausentes no body.
 */
ePedidosRouter.post('/', confirmarPedido);
