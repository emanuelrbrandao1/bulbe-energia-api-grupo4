// src/controllers/gControllers.js
import { produtos, carrinho, pedidos } from '../data/g.js';

// Buscar produto por ID [US-02]
export const buscarProdutoPorId = (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ erro: 'O parâmetro "id" deve ser um número inteiro.' });
  }

  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return res.status(404).json({ erro: `Produto com id ${id} não encontrado.` });
  }

  return res.status(200).json(produto);
};

// Buscar produtos recomendados após confirmação do pedido [US-19]
export const buscarRecomendacoes = (req, res) => {
  const pedidoId = parseInt(req.query.pedidoId, 10);

  if (isNaN(pedidoId)) {
    return res.status(400).json({ erro: 'O parâmetro "pedidoId" deve ser um número inteiro.' });
  }

  const pedido = pedidos.find((p) => p.id === pedidoId);

  if (!pedido) {
    return res.status(404).json({ erro: `Pedido com id ${pedidoId} não encontrado.` });
  }

  const recomendacoes = produtos
    .filter((p) => !pedido.produtoIds.includes(p.id))
    .slice(0, 4);

  return res.status(200).json(recomendacoes);
};

// Atualizar quantidade de item no carrinho [RF-05]
export const atualizarQuantidadeItem = (req, res) => {
  const produtoId = parseInt(req.params.produtoId, 10);
  const { quantidade } = req.body;

  if (!Number.isInteger(quantidade) || quantidade < 1) {
    return res.status(422).json({ erro: 'O campo "quantidade" deve ser um número inteiro maior que 0.' });
  }

  const item = carrinho.find((i) => i.produtoId === produtoId);

  if (!item) {
    return res.status(404).json({ erro: `Item com produtoId ${produtoId} não encontrado no carrinho.` });
  }

  item.quantidade = quantidade;
  return res.status(200).json(item);
};
