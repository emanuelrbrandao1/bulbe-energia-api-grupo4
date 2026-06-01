// src/controllers/gControllers.js
import db from '../db/conexao.js';
import { toCamelProduto } from './produtosController.js';

// Buscar produto por ID [US-02]
export const buscarProdutoPorId = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ erro: 'O parâmetro "id" deve ser um número inteiro.' });
  }

  const produto = db.prepare('SELECT * FROM produtos WHERE id = ?').get(id);

  if (!produto) {
    return res.status(404).json({ erro: `Produto com id ${id} não encontrado.` });
  }

  return res.status(200).json(toCamelProduto(produto));
};

// Buscar produtos recomendados após confirmação do pedido [US-19]
export const buscarRecomendacoes = (req, res) => {
  const pedidoId = parseInt(req.query.pedidoId, 10);

  if (isNaN(pedidoId)) {
    return res.status(400).json({ erro: 'O parâmetro "pedidoId" deve ser um número inteiro.' });
  }

  const pedido = db.prepare('SELECT id FROM pedidos WHERE id = ?').get(pedidoId);

  if (!pedido) {
    return res.status(404).json({ erro: `Pedido com id ${pedidoId} não encontrado.` });
  }

  const recomendacoes = db.prepare(`
    SELECT * FROM produtos
    WHERE id NOT IN (SELECT produto_id FROM pedido_itens WHERE pedido_id = ?)
    LIMIT 4
  `).all(pedidoId);

  return res.status(200).json(recomendacoes.map(toCamelProduto));
};

// Atualizar quantidade de item no carrinho [RF-05]
export const atualizarQuantidadeItem = (req, res) => {
  const produtoId = parseInt(req.params.produtoId, 10);
  const { quantidade } = req.body;

  if (!Number.isInteger(quantidade) || quantidade < 1) {
    return res.status(422).json({ erro: 'O campo "quantidade" deve ser um número inteiro maior que 0.' });
  }

  const usuarioId = req.usuario.id;
  const item = db
    .prepare('SELECT id FROM carrinho WHERE usuario_id = ? AND produto_id = ?')
    .get(usuarioId, produtoId);

  if (!item) {
    return res.status(404).json({ erro: `Item com produtoId ${produtoId} não encontrado no carrinho.` });
  }

  db.prepare('UPDATE carrinho SET quantidade = ? WHERE id = ?').run(quantidade, item.id);

  const itemAtualizado = db.prepare(`
    SELECT c.produto_id AS produtoId, p.nome, p.preco, c.quantidade
    FROM carrinho c
    JOIN produtos p ON p.id = c.produto_id
    WHERE c.id = ?
  `).get(item.id);

  return res.status(200).json(itemAtualizado);
};
