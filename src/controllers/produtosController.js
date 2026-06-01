// src/controllers/produtosController.js
import db from '../db/conexao.js';

const CATEGORIAS_VALIDAS = ['lampadas', 'luminarias', 'fitas', 'acessorios', 'assistentes'];

// Normaliza a linha do SQLite (snake_case + INTEGER 0/1) para o shape
// camelCase + boolean esperado pelo frontend (criarCardProduto, PRODUTO, etc).
// Exportado pra reuso em outros controllers que devolvem produtos (gControllers).
export const toCamelProduto = (p) => {
  if (!p) return p;
  return {
    id: p.id,
    nome: p.nome,
    categoria: p.categoria,
    descricao: p.descricao,
    preco: p.preco,
    desconto: p.desconto,
    imagem: p.imagem,
    imagemDetalhes: p.imagem_detalhes,
    avaliacao: p.avaliacao,
    totalAvaliacoes: p.total_avaliacoes,
    destaque: p.destaque === 1,
    maisVendido: p.mais_vendido === 1,
  };
};

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
  return res.status(200).json(resultado.map(toCamelProduto));
};
