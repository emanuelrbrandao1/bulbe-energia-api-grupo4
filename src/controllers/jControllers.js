const jData = require('../data/j');

const limparCarrinho = async (req, res) => {
    try {
        const usuarioId = req.user?.id;

        if (!usuarioId) {
            return res.status(401).json({ erro: "Usuário não autenticado." });
        }

        const carrinhoVazio = await jData.limparCarrinhoNoBanco(usuarioId);

        return res.status(200).json({
            mensagem: "Carrinho esvaziado com sucesso.",
            itens: carrinhoVazio
        });
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao processar a limpeza do carrinho." });
    }
};

const salvarEndereco = async (req, res) => {
    try {
        const { cep, logradouro, numero, complemento } = req.body;
        const usuarioId = req.user?.id;

        if (!usuarioId) {
            return res.status(401).json({ erro: "Usuário não autenticado." });
        }

        if (!cep || !logradouro || !numero) {
            return res.status(422).json({ 
                erro: "Campos obrigatórios ausentes: cep, logradouro e numero." 
            });
        }

        const enderecoSalvo = await jData.salvarEnderecoNoBanco(usuarioId, {
            cep,
            logradouro,
            numero,
            complemento
        });

        return res.status(201).json({
            mensagem: "Endereço de entrega salvo e associado ao pedido.",
            endereco: enderecoSalvo
        });
    } catch (error) {
        return res.status(500).json({ erro: "Erro ao salvar o endereço de entrega." });
    }
};

module.exports = {
    limparCarrinho,
    salvarEndereco
};