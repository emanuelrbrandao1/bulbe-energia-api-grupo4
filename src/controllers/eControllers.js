// src/controllers/eControllers.js
import db from '../db/conexao.js';

// Adicionar produto ao carrinho [US-04]
export const adicionarItemCarrinho = (req, res) => {
  const { produtoId, quantidade } = req.body;

  if (produtoId === undefined || quantidade === undefined) {
    return res.status(422).json({
      erro: 'Os campos "produtoId" e "quantidade" são obrigatórios.',
    });
  }

  if (typeof quantidade !== 'number' || quantidade <= 0) {
    return res.status(422).json({
      erro: 'O campo "quantidade" deve ser um número maior que zero.',
    });
  }

  const produto = db.prepare('SELECT id FROM produtos WHERE id = ?').get(produtoId);
  if (!produto) {
    return res.status(404).json({
      erro: `Produto com id ${produtoId} não encontrado.`,
    });
  }

  const usuarioId = req.usuario.id;
  const itemExistente = db
    .prepare('SELECT id, quantidade FROM carrinho WHERE usuario_id = ? AND produto_id = ?')
    .get(usuarioId, produtoId);

  if (itemExistente) {
    const novaQuantidade = itemExistente.quantidade + quantidade;
    db.prepare('UPDATE carrinho SET quantidade = ? WHERE id = ?')
      .run(novaQuantidade, itemExistente.id);
    return res.status(200).json({ produtoId, quantidade: novaQuantidade });
  }

  db.prepare(
    'INSERT INTO carrinho (usuario_id, produto_id, quantidade) VALUES (?, ?, ?)',
  ).run(usuarioId, produtoId, quantidade);
  return res.status(201).json({ produtoId, quantidade });
};

// Confirmar e registrar pedido [US-16]
export const confirmarPedido = (req, res) => {
  const { enderecoEntrega, formaEntrega, metodoPagamento } = req.body;

  if (!enderecoEntrega || !formaEntrega || !metodoPagamento) {
    return res.status(422).json({
      erro: 'Os campos "enderecoEntrega", "formaEntrega" e "metodoPagamento" são obrigatórios.',
    });
  }

  const usuarioId = req.usuario.id;

  // Itens do carrinho do usuário, com nome e preço vindos da tabela produtos.
  const itens = db
    .prepare(`
      SELECT c.produto_id AS produtoId,
             p.nome        AS nome,
             p.preco       AS precoUnitario,
             c.quantidade  AS quantidade
      FROM carrinho c
      JOIN produtos p ON p.id = c.produto_id
      WHERE c.usuario_id = ?
    `)
    .all(usuarioId);

  if (itens.length === 0) {
    return res.status(400).json({
      erro: 'Carrinho vazio. Adicione itens antes de confirmar o pedido.',
    });
  }

  const valorTotal = Number(
    itens
      .reduce((total, item) => total + item.precoUnitario * item.quantidade, 0)
      .toFixed(2),
  );

  const dataCriacao = new Date().toISOString();

  // Transação: cria o pedido, seus itens e esvazia o carrinho de forma atômica.
  const registrarPedido = db.transaction(() => {
    const info = db
      .prepare(`
        INSERT INTO pedidos
          (usuario_id, valor_total, status, forma_entrega, metodo_pagamento, data_criacao)
        VALUES
          (@usuarioId, @valorTotal, 'confirmado', @formaEntrega, @metodoPagamento, @dataCriacao)
      `)
      .run({ usuarioId, valorTotal, formaEntrega, metodoPagamento, dataCriacao });

    const pedidoId = info.lastInsertRowid;

    const inserirItem = db.prepare(`
      INSERT INTO pedido_itens (pedido_id, produto_id, nome, quantidade, preco_unitario)
      VALUES (?, ?, ?, ?, ?)
    `);
    for (const item of itens) {
      inserirItem.run(pedidoId, item.produtoId, item.nome, item.quantidade, item.precoUnitario);
    }

    db.prepare('DELETE FROM carrinho WHERE usuario_id = ?').run(usuarioId);

    return pedidoId;
  });

  const pedidoId = registrarPedido();

  return res.status(201).json({
    pedidoId,
    itens,
    enderecoEntrega,
    formaEntrega,
    metodoPagamento,
    valorTotal,
    status: 'confirmado',
    dataCriacao,
  });
};
