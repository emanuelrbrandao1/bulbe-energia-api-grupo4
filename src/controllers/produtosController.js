// src/controllers/produtosController.js
import { produtos, CATEGORIAS_VALIDAS } from '../data/produtos.js';

// Listar produtos com filtros opcionais [US-01 + RF-03]
// Queries suportadas: ?categoria, ?destaque=true, ?maisVendido=true
export const listarProdutos = (req, res) => {
  const { categoria, destaque, maisVendido } = req.query;

  if (categoria && !CATEGORIAS_VALIDAS.includes(categoria)) {
    return res.status(404).json({
      erro: `Categoria "${categoria}" não encontrada. Categorias válidas: ${CATEGORIAS_VALIDAS.join(', ')}.`,
    });
  }

  let resultado = [...produtos];

  if (categoria) {
    resultado = resultado.filter((p) => p.categoria === categoria);
  }
  if (destaque === 'true') {
    resultado = resultado.filter((p) => p.destaque === true);
  }
  if (maisVendido === 'true') {
    resultado = resultado.filter((p) => p.maisVendido === true);
  }

  if (destaque === 'true' || maisVendido === 'true') {
    resultado.sort((a, b) => b.avaliacao - a.avaliacao);
  }

  return res.status(200).json(resultado);
};