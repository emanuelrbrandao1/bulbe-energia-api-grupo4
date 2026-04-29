// src/controllers/produtosController.js
import { produtos, CATEGORIAS_VALIDAS } from '../data/produtos.js';

// Listar produtos por categoria [US-01]
export const listarProdutos = (req, res) => {
  const { categoria } = req.query;

  if (!categoria) {
    return res.status(200).json(produtos);
  }

  if (!CATEGORIAS_VALIDAS.includes(categoria)) {
    return res.status(404).json({
      erro: `Categoria "${categoria}" não encontrada. Categorias válidas: ${CATEGORIAS_VALIDAS.join(', ')}.`,
    });
  }

  const filtrados = produtos.filter((produto) => produto.categoria === categoria);
  return res.status(200).json(filtrados);
};
