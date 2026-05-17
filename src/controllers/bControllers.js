import { carrinho } from '../data/b.js';
import { produtos } from '../data/produtos.js';

export async function getCarrinho(req, res) {
  try {
    const usuarioId = req.usuario.id;

    const itensDoUsuario = carrinho.filter(item => item.usuarioId === usuarioId);

    if (itensDoUsuario.length === 0) {
      return res.status(200).json({
        itens: [],
        subtotal: 0,
        totalDesconto: 0,
        valorFinal: 0,
      });
    }

    const itensFormatados = [];
    let subtotal = 0;
    let totalDesconto = 0;

    for (const item of itensDoUsuario) {
      const produto = produtos.find(p => p.id === item.produtoId);

      const precoUnitario = produto.preco;
      const desconto = produto.desconto || 0;
      const precoComDesconto = precoUnitario - desconto;
      const precoTotal = precoComDesconto * item.quantidade;

      subtotal += precoUnitario * item.quantidade;
      totalDesconto += desconto * item.quantidade;

      itensFormatados.push({
        produtoId: produto.id,
        nome: produto.nome,
        imagem: produto.imagem,
        precoUnitario: precoUnitario,
        quantidade: item.quantidade,
        precoTotal: precoTotal,
      });
    }

    return res.status(200).json({
      itens: itensFormatados,
      subtotal: subtotal,
      totalDesconto: totalDesconto,
      valorFinal: subtotal - totalDesconto,
    });

  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro ao buscar o carrinho.' });
  }
}
