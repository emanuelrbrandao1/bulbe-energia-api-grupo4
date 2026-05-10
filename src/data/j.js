let carrinhos = {};

const limparCarrinhoNoBanco = async (usuarioId) => {
    carrinhos[usuarioId] = [];
    
    return carrinhos[usuarioId];
};

module.exports = {
    limparCarrinhoNoBanco
};