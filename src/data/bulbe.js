// src/data/tarefas.js
// Dados em memória — reiniciados a cada restart do servidor

export let bulbeprodutos = [
    {"id": 1, "name": "Avant Neo LED Smart 10W RGB", "preco": "29,75"},
    
];
export const tiposEntrega = {
    padrao: {
        prazoEstimado: "6-9 dias",
        custoEntrega: 10
    },
    express: {
        prazoEstimado: "3-5 dias",
        custoEntrega: 25
    }
};

let proximoId = 2;
export const getProximoId = () => proximoId++;
