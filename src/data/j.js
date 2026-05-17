// src/data/j.js
// Estado em memória + integração com ViaCEP — usado pelas USs do João
// (US-10 favoritos, US-12 CEP, US-13 endereço de entrega).

import { produtos } from './produtos.js';

const enderecosPedidos = {};
const favoritos = {};

export const salvarEnderecoNoBanco = (usuarioId, dadosEndereco) => {
  enderecosPedidos[usuarioId] = { ...dadosEndereco, atualizadoEm: new Date() };
  return enderecosPedidos[usuarioId];
};

export const verificarProdutoExiste = (produtoId) =>
  produtos.some((p) => p.id === Number(produtoId));

export const adicionarFavoritoNoBanco = (usuarioId, produtoId) => {
  if (!favoritos[usuarioId]) favoritos[usuarioId] = [];
  const jaFavoritado = favoritos[usuarioId].includes(produtoId);
  if (jaFavoritado) return { status: 200, lista: favoritos[usuarioId] };
  favoritos[usuarioId].push(produtoId);
  return { status: 201, lista: favoritos[usuarioId] };
};

export const buscarCepNoViaCep = async (cep) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) return null;

    const data = await response.json();
    if (data.erro === 'true' || data.erro === true) return null;

    return {
      logradouro: data.logradouro,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};
