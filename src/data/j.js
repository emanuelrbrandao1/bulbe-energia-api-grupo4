let carrinhos = {}; 
let enderecosPedidos = {}; 
let favoritos = {};

const produtosExistentes = [1, 2, 3, 4, 5]; 

const limparCarrinhoNoBanco = async (usuarioId) => {
    carrinhos[usuarioId] = [];
    return carrinhos[usuarioId];
};

const salvarEnderecoNoBanco = async (usuarioId, dadosEndereco) => {
    enderecosPedidos[usuarioId] = { ...dadosEndereco, atualizadoEm: new Date() };
    return enderecosPedidos[usuarioId];
};

const verificarProdutoExiste = (produtoId) => produtosExistentes.includes(Number(produtoId));

const adicionarFavoritoNoBanco = async (usuarioId, produtoId) => {
    if (!favoritos[usuarioId]) {
        favoritos[usuarioId] = [];
    }

    const jaFavoritado = favoritos[usuarioId].includes(produtoId);
    
    if (jaFavoritado) {
        return { status: 200, lista: favoritos[usuarioId] };
    }

    favoritos[usuarioId].push(produtoId);
    return { status: 201, lista: favoritos[usuarioId] };
};

module.exports = {
    limparCarrinhoNoBanco,
    salvarEnderecoNoBanco,
    verificarProdutoExiste,
    adicionarFavoritoNoBanco
};