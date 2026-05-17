// src/controllers/hControllers.js
import { carrinho } from '../data/h.js';
import { favoritos } from '../data/hj.js';
import { produtos } from '../data/produtos.js';

// Adicionar item ao carrinho [US-04]
export const adicionarItemCarrinho = (req, res) => {
  const { produtoId, quantidade } = req.body;

  if (!produtoId || !quantidade) {
    return res.status(400).json({ erro: 'produtoId e quantidade são obrigatórios.' });
  }

  const produto = produtos.find(p => p.id === produtoId);
  if (!produto) {
    return res.status(404).json({ erro: `Produto com ID ${produtoId} não encontrado.` });
  }

  const itemExistente = carrinho.find(item => item.produtoId === produtoId);
  if (itemExistente) {
    itemExistente.quantidade += quantidade;
  } else {
    carrinho.push({
      produtoId: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade,
    });
  }

  return res.status(201).json({
    mensagem: 'Item adicionado ao carrinho com sucesso.',
    carrinhoAtualizado: carrinho,
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

  const item = carrinho.find(i => i.produtoId === idNumerado);
  if (!item) {
    return res.status(404).json({ erro: `Item com produtoId ${idNumerado} não encontrado.` });
  }

  item.quantidade = quantidade;
  return res.status(200).json({
    mensagem: 'Item atualizado com sucesso.',
    carrinhoAtualizado: carrinho,
  });
};

// Listar carrinho [US-06]
export const listarCarrinho = (req, res) => {
  if (carrinho.length === 0) {
    return res.status(200).json({ itens: [] });
  }

  const itensFormatados = carrinho.map(item => ({
    produtoId: item.produtoId,
    nome: item.nome,
    preco: item.preco,
    quantidade: item.quantidade,
  }));

  return res.status(200).json({ itens: itensFormatados });
};

// Remover item específico do carrinho [US-07]
export const removerItemCarrinho = (req, res) => {
  const { produtoId } = req.params;
  const idNumerado = parseInt(produtoId, 10);

  const indiceItem = carrinho.findIndex(item => item.produtoId === idNumerado);

  if (indiceItem === -1) {
    return res.status(404).json({
      erro: `Item com produtoId ${idNumerado} não encontrado no carrinho.`,
    });
  }

  const itemRemovido = carrinho.splice(indiceItem, 1)[0];

  return res.status(200).json({
    mensagem: 'Item removido com sucesso do carrinho.',
    itemRemovido,
    carrinhoAtualizado: carrinho,
  });
};

// Limpar carrinho completamente [US-08]
export const limparCarrinho = (req, res) => {
  carrinho.length = 0;
  return res.status(200).json({
    mensagem: 'Carrinho limpo com sucesso.',
    carrinho: [],
  });
};

// Listar favoritos do usuário autenticado [RF-09]
export const listarFavoritos = (req, res) => {
  const itensFavoritos = favoritos.map(({ produtoId }) => {
    const produto = produtos.find(p => p.id === produtoId);
    if (!produto) return null;
    return {
      produtoId: produto.id,
      nome: produto.nome,
      imagem: produto.imagem,
      preco: produto.preco,
    };
  }).filter(Boolean);

  return res.status(200).json({ favoritos: itensFavoritos });
};
