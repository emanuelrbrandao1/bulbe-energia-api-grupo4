// src/controllers/hControllers.js
import db from '../db/conexao.js';

const getCarrinhoFormatado = (usuarioId) =>
  db.prepare(`
    SELECT c.produto_id AS produtoId,
           p.nome        AS nome,
           p.preco       AS preco,
           p.imagem      AS imagem,
           c.quantidade  AS quantidade
    FROM carrinho c
    JOIN produtos p ON p.id = c.produto_id
    WHERE c.usuario_id = ?
  `).all(usuarioId);

// Adicionar item ao carrinho [US-04]
export const adicionarItemCarrinho = (req, res) => {
  const { produtoId, quantidade } = req.body;

  if (!produtoId || !quantidade) {
    return res.status(400).json({ erro: 'produtoId e quantidade são obrigatórios.' });
  }

  const produto = db.prepare('SELECT id FROM produtos WHERE id = ?').get(produtoId);
  if (!produto) {
    return res.status(404).json({ erro: `Produto com ID ${produtoId} não encontrado.` });
  }

  const usuarioId = req.usuario.id;
  const itemExistente = db
    .prepare('SELECT id, quantidade FROM carrinho WHERE usuario_id = ? AND produto_id = ?')
    .get(usuarioId, produtoId);

  if (itemExistente) {
    db.prepare('UPDATE carrinho SET quantidade = ? WHERE id = ?')
      .run(itemExistente.quantidade + quantidade, itemExistente.id);
  } else {
    db.prepare('INSERT INTO carrinho (usuario_id, produto_id, quantidade) VALUES (?, ?, ?)')
      .run(usuarioId, produtoId, quantidade);
  }

  return res.status(201).json({
    mensagem: 'Item adicionado ao carrinho com sucesso.',
    carrinhoAtualizado: getCarrinhoFormatado(usuarioId),
  });
};

// Atualizar quantidade de item no carrinho [US-05]
export const atualizarItemCarrinho = (req, res) => {
  const { produtoId } = req.params;
  const { quantidade } = req.body;
  const idNumerado = parseInt(produtoId, 10);

  if (quantidade === undefined || quantidade <= 0) {
    return res.status(400).json({ erro: 'quantidade deve ser maior que 0.' });
  }

  const usuarioId = req.usuario.id;
  const item = db
    .prepare('SELECT id FROM carrinho WHERE usuario_id = ? AND produto_id = ?')
    .get(usuarioId, idNumerado);

  if (!item) {
    return res.status(404).json({ erro: `Item com produtoId ${idNumerado} não encontrado.` });
  }

  db.prepare('UPDATE carrinho SET quantidade = ? WHERE id = ?').run(quantidade, item.id);

  return res.status(200).json({
    mensagem: 'Item atualizado com sucesso.',
    carrinhoAtualizado: getCarrinhoFormatado(usuarioId),
  });
};

// Listar carrinho [US-06]
export const listarCarrinho = (req, res) => {
  const itens = getCarrinhoFormatado(req.usuario.id);
  return res.status(200).json({ itens });
};

// Remover item específico do carrinho [US-07]
export const removerItemCarrinho = (req, res) => {
  const { produtoId } = req.params;
  const idNumerado = parseInt(produtoId, 10);
  const usuarioId = req.usuario.id;

  const item = db.prepare(`
    SELECT c.produto_id AS produtoId, p.nome, p.preco, c.quantidade
    FROM carrinho c
    JOIN produtos p ON p.id = c.produto_id
    WHERE c.usuario_id = ? AND c.produto_id = ?
  `).get(usuarioId, idNumerado);

  if (!item) {
    return res.status(404).json({
      erro: `Item com produtoId ${idNumerado} não encontrado no carrinho.`,
    });
  }

  db.prepare('DELETE FROM carrinho WHERE usuario_id = ? AND produto_id = ?').run(usuarioId, idNumerado);

  return res.status(200).json({
    mensagem: 'Item removido com sucesso do carrinho.',
    itemRemovido: item,
    carrinhoAtualizado: getCarrinhoFormatado(usuarioId),
  });
};

// Limpar carrinho completamente [US-08]
export const limparCarrinho = (req, res) => {
  db.prepare('DELETE FROM carrinho WHERE usuario_id = ?').run(req.usuario.id);
  return res.status(200).json({
    mensagem: 'Carrinho limpo com sucesso.',
    carrinho: [],
  });
};

// Buscar pedido por ID [RF-17]
export const buscarPedidoPorId = (req, res) => {
  const idNumerado = parseInt(req.params.id, 10);

  const pedido = db
    .prepare('SELECT id, usuario_id, valor_total, status, forma_entrega, metodo_pagamento, data_criacao FROM pedidos WHERE id = ?')
    .get(idNumerado);

  if (!pedido) {
    return res.status(404).json({ erro: `Pedido ${idNumerado} não encontrado.` });
  }

  if (pedido.usuario_id !== req.usuario.id) {
    return res.status(403).json({ erro: 'Acesso negado. Este pedido não pertence ao usuário autenticado.' });
  }

  const itens = db.prepare(`
    SELECT produto_id AS produtoId, nome, preco_unitario AS precoUnitario, quantidade
    FROM pedido_itens
    WHERE pedido_id = ?
  `).all(idNumerado);

  return res.status(200).json({
    pedidoId: pedido.id,
    itens,
    formaEntrega: pedido.forma_entrega,
    metodoPagamento: pedido.metodo_pagamento,
    valorTotal: pedido.valor_total,
    status: pedido.status,
    dataCriacao: pedido.data_criacao,
  });
};

// Listar favoritos do usuário autenticado [RF-09]
export const listarFavoritos = (req, res) => {
  const itensFavoritos = db.prepare(`
    SELECT f.produto_id AS produtoId, p.nome, p.imagem, p.preco
    FROM favoritos f
    JOIN produtos p ON p.id = f.produto_id
    WHERE f.usuario_id = ?
  `).all(req.usuario.id);

  return res.status(200).json({ favoritos: itensFavoritos });
};
