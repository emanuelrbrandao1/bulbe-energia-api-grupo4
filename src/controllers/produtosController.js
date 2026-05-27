// src/controllers/produtosController.js
import db from '../db/conexao.js';
const CATEGORIAS_VALIDAS = ['lampadas', 'luminarias', 'fitas', 'acessorios', 'assistentes'];

// Listar produtos com filtros opcionais [US-01 + RF-03]
// Queries suportadas: ?categoria, ?destaque=true, ?maisVendido=true
export const listarProdutos = (req, res) => {
  const { categoria, destaque, maisVendido } = req.query;

  if (categoria && !CATEGORIAS_VALIDAS.includes(categoria)) {
    return res.status(404).json({
      erro: `Categoria "${categoria}" não encontrada. Categorias válidas: ${CATEGORIAS_VALIDAS.join(', ')}.`,
    });
  }

  let query = `SELECT * FROM produtos WHERE 1=1`;
  const params = [];

  if (categoria) {
    query += ` AND categoria = ?`;
    params.push(categoria);
  }
  
  if (destaque === 'true') {
    query += ` AND destaque = 1`;
  }

  if (maisVendido === 'true') {
    query += ` AND mais_vendido = 1`;
  }

  if (destaque === 'true' || maisVendido === 'true') {
    query += ` ORDER BY avaliacao DESC`;
  }

  const resultado = db.prepare(query).all(...params);

  // Converte 0/1 do SQLite para boolean
  const produtos = resultado.map((p) => ({
    ...p,
    destaque:    p.destaque    === 1,
    maisVendido: p.mais_vendido === 1,
  }));

  return res.status(200).json(produtos);
};