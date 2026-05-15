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
        if (!cep || !logradouro || !numero) return res.status(422).json({ erro: "Campos obrigatórios ausentes" });
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
        if (!jData.verificarProdutoExiste(produtoId)) return res.status(404).json({ erro: "Produto não encontrado" });
        const resultado = await jData.adicionarFavoritoNoBanco(usuarioId, produtoId);
        return res.status(resultado.status).json({ mensagem: "Favoritos atualizados", favoritos: resultado.lista });
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao favoritar" });
    }
};

const consultarCep = async (req, res) => {
    try {
        const { cep } = req.params;

        const cepLimpo = cep.replace(/\D/g, '');
        if (cepLimpo.length !== 8) {
            return res.status(422).json({ erro: "CEP inválido. Deve conter 8 dígitos." });
        }

        const endereco = await jData.buscarCepNoViaCep(cepLimpo);

        if (!endereco) {
            return res.status(404).json({ erro: "CEP não encontrado." });
        }

        return res.status(200).json(endereco);
    } catch (error) {
        if (error.name === 'AbortError') return res.status(504).json({ erro: "Tempo de busca excedido (timeout 5s)." });
        return res.status(500).json({ erro: "Erro ao consultar CEP." });
    }
};

module.exports = {
    limparCarrinho,
    salvarEndereco,
    favoritarProduto,
    consultarCep
};