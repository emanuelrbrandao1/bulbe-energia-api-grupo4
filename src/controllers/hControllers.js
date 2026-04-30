// src/controllers/hControllers.js
import { carrinho } from '../data/h.js';

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
