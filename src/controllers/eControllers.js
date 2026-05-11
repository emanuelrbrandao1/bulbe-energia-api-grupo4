// src/controllers/eControllers.js
import { carrinho } from '../data/e.js';
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
