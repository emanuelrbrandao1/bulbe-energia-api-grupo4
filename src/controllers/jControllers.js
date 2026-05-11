// src/controllers/jControllers.js
import { limparCarrinhoNoBanco } from '../data/j.js';

// Limpar todo o carrinho [US-08]
export const limparCarrinho = (req, res) => {
  const usuarioId = req.usuario?.id ?? req.body.usuarioId;

  if (!usuarioId) {
    return res.status(401).json({ erro: 'Usuário não identificado.' });
  }

  const carrinhoVazio = limparCarrinhoNoBanco(usuarioId);

  return res.status(200).json({
    mensagem: 'Carrinho esvaziado com sucesso.',
    carrinho: carrinhoVazio,
  });
};
