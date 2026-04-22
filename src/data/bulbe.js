// src/data/tarefas.js
// Dados em memória — reiniciados a cada restart do servidor

export let bulbeprodutos = [
    {"id": 1, "name": "Avant Neo LED Smart 10W RGB", "preco": "29,75"},
    {"id": 2, "name": "Lâmpada LED Inteligente 15W", "preco": "45,99"},
    {"id": 3, "name": "Lâmpada LED Padrão 9W", "preco": "15,50"},
];

// Array de favoritos — retornados pelo endpoint
export let favoritos = [
    {"id": 1, "name": "Avant Neo LED Smart 10W RGB", "preco": "29,75"},
    {"id": 3, "name": "Lâmpada LED Padrão 9W", "preco": "15,50"},
];

// Array de carrinho — itens no carrinho do usuário
export let carrinho = [
    {"id": 1, "name": "Avant Neo LED Smart 10W RGB", "preco": "29,75", "quantidade": 2},
    {"id": 2, "name": "Lâmpada LED Inteligente 15W", "preco": "45,99", "quantidade": 1},
    {"id": 3, "name": "Lâmpada LED Padrão 9W", "preco": "15,50", "quantidade": 3},
];

let proximoId = 4;
export const getProximoId = () => proximoId++;
