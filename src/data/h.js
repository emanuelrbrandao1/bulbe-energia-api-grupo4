// src/data/h.js
// Dados do carrinho e pedidos em memória — reiniciados a cada restart do servidor

export const pedidos = [
  {
    pedidoId: 1,
    usuarioId: 1,
    itens: [
      { produtoId: 1, nome: 'Avant Neo LED Smart 10W RGB', precoUnitario: 89.90, quantidade: 2 },
      { produtoId: 5, nome: 'Fita LED RGB 5m Bluetooth', precoUnitario: 79.90, quantidade: 1 },
    ],
    enderecoEntrega: {
      logradouro: 'Avenida Paulista',
      numero: '1000',
      complemento: 'Apto 42',
      bairro: 'Bela Vista',
      localidade: 'São Paulo',
      uf: 'SP',
      cep: '01310100',
    },
    formaEntrega: 'PAC',
    metodoPagamento: 'cartao_credito',
    valorTotal: 259.70,
    status: 'confirmado',
    dataCriacao: '2026-05-15T10:30:00.000Z',
  },
  {
    pedidoId: 2,
    usuarioId: 2,
    itens: [
      { produtoId: 9, nome: 'Echo Dot 5ª Geração', precoUnitario: 449.00, quantidade: 1 },
    ],
    enderecoEntrega: {
      logradouro: 'Rua das Flores',
      numero: '200',
      complemento: '',
      bairro: 'Centro',
      localidade: 'Curitiba',
      uf: 'PR',
      cep: '80010000',
    },
    formaEntrega: 'SEDEX',
    metodoPagamento: 'pix',
    valorTotal: 449.00,
    status: 'em_preparo',
    dataCriacao: '2026-05-16T14:00:00.000Z',
  },
];

export const carrinho = [
  {
    produtoId: 1,
    nome: 'Avant Neo LED Smart 10W RGB',
    preco: 89.90,
    quantidade: 2,
  },
  {
    produtoId: 5,
    nome: 'Fita LED RGB 5m Bluetooth',
    preco: 79.90,
    quantidade: 1,
  },
  {
    produtoId: 9,
    nome: 'Echo Dot 5ª Geração',
    preco: 449.00,
    quantidade: 1,
  },
];
