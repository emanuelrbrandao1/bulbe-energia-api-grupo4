import db from '../db/conexao.js';

export async function getCarrinho(req, res) {
  try {
    const usuarioId = req.usuario.id;

    const itensDoUsuario = db.prepare(`
      SELECT
        c.quantidade,
        p.id        AS produtoId,
        p.nome,
        p.imagem,
        p.preco,
        p.desconto
      FROM carrinho c
      JOIN produtos p ON p.id = c.produto_id
      WHERE c.usuario_id = ?
    `).all(usuarioId);

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
      const precoUnitario = item.preco;
      const desconto = item.desconto || 0;
      const precoComDesconto = precoUnitario - desconto;
      const precoTotal = precoComDesconto * item.quantidade;

      subtotal += precoUnitario * item.quantidade;
      totalDesconto += desconto * item.quantidade;

      itensFormatados.push({
        produtoId: item.produtoId,
        nome: item.nome,
        imagem: item.imagem,
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