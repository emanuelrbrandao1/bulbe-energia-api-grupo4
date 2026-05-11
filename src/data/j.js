// src/data/j.js
// Carrinhos por usuário em memória — reiniciados a cada restart.

const carrinhos = {};

export const limparCarrinhoNoBanco = (usuarioId) => {
  carrinhos[usuarioId] = [];
  return carrinhos[usuarioId];
};
