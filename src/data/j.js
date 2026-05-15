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
    if (!favoritos[usuarioId]) favoritos[usuarioId] = [];
    const jaFavoritado = favoritos[usuarioId].includes(produtoId);
    if (jaFavoritado) return { status: 200, lista: favoritos[usuarioId] };
    favoritos[usuarioId].push(produtoId);
    return { status: 201, lista: favoritos[usuarioId] };
};

const buscarCepNoViaCep = async (cep) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { 
            signal: controller.signal 
        });
        clearTimeout(timeoutId);

        if (!response.ok) return null;

        const data = await response.json();
        if (data.erro === "true") return null;

        return {
            logradouro: data.logradouro,
            bairro: data.bairro,
            localidade: data.localidade,
            uf: data.uf
        };
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
};

module.exports = {
    limparCarrinhoNoBanco,
    salvarEnderecoNoBanco,
    verificarProdutoExiste,
    adicionarFavoritoNoBanco,
    buscarCepNoViaCep
};