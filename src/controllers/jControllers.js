const jData = require('../data/j');

const limparCarrinho = async (req, res) => {
    try {
        const usuarioId = req.user?.id;
        if (!usuarioId) return res.status(401).json({ erro: "Não autorizado" });
        const carrinhoVazio = await jData.limparCarrinhoNoBanco(usuarioId);
        return res.status(200).json({ mensagem: "Carrinho limpo", itens: carrinhoVazio });
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao limpar carrinho" });
    }
};

const salvarEndereco = async (req, res) => {
    try {
        const { cep, logradouro, numero } = req.body;
        const usuarioId = req.user?.id;
        if (!usuarioId) return res.status(401).json({ erro: "Não autorizado" });
        if (!cep || !logradouro || !numero) {
            return res.status(422).json({ erro: "Campos obrigatórios ausentes" });
        }
        const endereco = await jData.salvarEnderecoNoBanco(usuarioId, req.body);
        return res.status(201).json({ mensagem: "Endereço salvo", endereco });
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao salvar endereço" });
    }
};

const favoritarProduto = async (req, res) => {
    try {
        const { produtoId } = req.body;
        const usuarioId = req.user?.id;

        if (!usuarioId) return res.status(401).json({ erro: "Exige JWT" });

        if (!jData.verificarProdutoExiste(produtoId)) {
            return res.status(404).json({ erro: "Produto não encontrado" });
        }

        const resultado = await jData.adicionarFavoritoNoBanco(usuarioId, produtoId);

        const mensagem = resultado.status === 201 ? "Produto favoritado" : "Produto já está nos favoritos";
        
        return res.status(resultado.status).json({
            mensagem,
            favoritos: resultado.lista
        });

    } catch (error) {
        return res.status(500).json({ erro: "Erro ao favoritar produto" });
    }
};

module.exports = {
    limparCarrinho,
    salvarEndereco,
    favoritarProduto
};