const jData = require('../data/j');

const limparCarrinho = async (req, res) => {
    try {
        const usuarioId = req.user?.id || req.body.usuarioId; 

        if (!usuarioId) {
            return res.status(401).json({ erro: "Usuário não identificado." });
        }

        const carrinhoVazio = await jData.limparCarrinhoNoBanco(usuarioId);

        return res.status(200).json({
            mensagem: "Carrinho esvaziado com sucesso.",
            carrinho: carrinhoVazio
        });
    } catch (error) {
        return res.status(500).json({ erro: "Erro interno ao limpar o carrinho." });
    }
};

module.exports = {
    limparCarrinho
};