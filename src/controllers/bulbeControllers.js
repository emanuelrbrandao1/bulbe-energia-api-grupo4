import { bulbeprodutos, getProximoId, favoritos, carrinho } from '../data/bulbe.js';

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

/**
 * Remove um item específico do carrinho pelo ID do produto
 * @param {Object} req - Objeto de requisição Express
 * @param {Object} res - Objeto de resposta Express
 */
export const removerItemCarrinho = (req, res) => {
  try {
    const { produtoId } = req.params;
    const id = parseInt(produtoId, 10);

    // Valida se o ID é válido
    if (isNaN(id)) {
      return res.status(400).json({
        erro: 'ID do produto inválido. Deve ser um número.'
      });
    }

    // Procura e remove o item do carrinho
    const indice = carrinho.findIndex(item => item.id === id);

    if (indice !== -1) {
      carrinho.splice(indice, 1);
      return res.status(200).json({
        sucesso: true,
        mensagem: `Produto com ID ${id} removido do carrinho com sucesso`,
        carrinhoAtualizado: carrinho
      });
    } else {
      return res.status(404).json({
        erro: `Produto com ID ${id} não encontrado no carrinho`
      });
    }
  } catch (erro) {
    console.error('Erro ao remover item do carrinho:', erro.message);
    return res.status(500).json({
      erro: 'Erro ao remover item do carrinho'
    });
  }
};