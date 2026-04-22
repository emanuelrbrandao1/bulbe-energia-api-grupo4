import { bulbeprodutos, getProximoId, favoritos } from '../data/bulbe.js';

/**
 * Retorna a lista de favoritos do usuário autenticado
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
export const listarFavoritos = (req, res) => {
  try {
    return res.status(200).json({
      sucesso: true,
      quantidade: favoritos.length,
      dados: favoritos
    });
  } catch (erro) {
    console.error('Erro ao listar favoritos:', erro.message);
    return res.status(500).json({
      erro: 'Erro ao listar favoritos'
    });
  }
};