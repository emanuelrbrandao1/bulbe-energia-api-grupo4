// src/controllers/hControllers.js
import { carrinho } from '../data/h.js';
import { favoritos } from '../data/hj.js';
import { produtos } from '../data/produtos.js';

// Remover item específico do carrinho [RF-07]
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
