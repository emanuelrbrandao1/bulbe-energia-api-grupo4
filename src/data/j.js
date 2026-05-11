let carrinhos = {}; 
let enderecosPedidos = {}; 

const limparCarrinhoNoBanco = async (usuarioId) => {
    carrinhos[usuarioId] = [];
    return carrinhos[usuarioId];
};

const salvarEnderecoNoBanco = async (usuarioId, dadosEndereco) => {
    enderecosPedidos[usuarioId] = {
        ...dadosEndereco,
        atualizadoEm: new Date()
    };
    return enderecosPedidos[usuarioId];
};

module.exports = {
    limparCarrinhoNoBanco,
    salvarEnderecoNoBanco
};