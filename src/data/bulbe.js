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
export const formasPagamento = [
    {
        tipo: "pix",
        precisaCartao: false
    },
    {
        tipo: "credito",
        precisaCartao: true
    },
    {
        tipo: "debito",
        precisaCartao: true
    }
];
export const pagamentos = [];

export const rastreamentos = [
    {
        pedidoId: 1,
        status: "em_transito",
        historicoStatus: [
            {
                data: "2026-05-12 10:00",
                descricao: "Pedido confirmado"
            },
            {
                data: "2026-05-12 12:00",
                descricao: "Pedido em separação"
            },
            {
                data: "2026-05-12 14:00",
                descricao: "Pedido em trânsito"
            }
        ]
    }
];

let proximoId = 2;
export const getProximoId = () => proximoId++;
