// src/controllers/eControllers.js
import { carrinho } from '../data/e.js';
import { carrinho as carrinhoPrincipal, pedidos } from '../data/h.js';
import { produtos } from '../data/produtos.js';

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

  const produto = produtos.find((p) => p.id === produtoId);
  if (!produto) {
    return res.status(404).json({
      erro: `Produto com id ${produtoId} não encontrado.`,
    });
  }

  const itemExistente = carrinho.find((i) => i.produtoId === produtoId);
  if (itemExistente) {
    itemExistente.quantidade += quantidade;
    return res.status(200).json(itemExistente);
  }

  const novoItem = { produtoId, quantidade };
  carrinho.push(novoItem);
  return res.status(201).json(novoItem);
};

// Confirmar e registrar pedido [US-16]
export const confirmarPedido = (req, res) => {
  const { enderecoEntrega, formaEntrega, metodoPagamento } = req.body;

  if (!enderecoEntrega || !formaEntrega || !metodoPagamento) {
    return res.status(422).json({
      erro: 'Os campos "enderecoEntrega", "formaEntrega" e "metodoPagamento" são obrigatórios.',
    });
  }

  if (carrinhoPrincipal.length === 0) {
    return res.status(400).json({
      erro: 'Carrinho vazio. Adicione itens antes de confirmar o pedido.',
    });
  }

  const itens = carrinhoPrincipal.map((item) => ({
    produtoId: item.produtoId,
    nome: item.nome,
    precoUnitario: item.preco,
    quantidade: item.quantidade,
  }));

  const valorTotal = itens.reduce(
    (total, item) => total + item.precoUnitario * item.quantidade,
    0,
  );

  const proximoId = pedidos.length === 0
    ? 1
    : Math.max(...pedidos.map((p) => p.pedidoId)) + 1;

  const novoPedido = {
    pedidoId: proximoId,
    usuarioId: req.usuario.id,
    itens,
    enderecoEntrega,
    formaEntrega,
    metodoPagamento,
    valorTotal: Number(valorTotal.toFixed(2)),
    status: 'confirmado',
    dataCriacao: new Date().toISOString(),
  };

  pedidos.push(novoPedido);
  carrinhoPrincipal.length = 0;

  const { usuarioId, ...resposta } = novoPedido;
  return res.status(201).json(resposta);
};
