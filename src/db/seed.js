import db from './conexao.js';

// Limpar tabelas (ordem importa por causa das FKs) 
db.exec(`
  DELETE FROM carrinho;
  DELETE FROM favoritos;
  DELETE FROM pedido_itens;
  DELETE FROM pedidos;
  DELETE FROM produtos;
  DELETE FROM usuarios;

  DELETE FROM sqlite_sequence WHERE name = 'carrinho';
  DELETE FROM sqlite_sequence WHERE name = 'favoritos';
  DELETE FROM sqlite_sequence WHERE name = 'pedido_itens';
  DELETE FROM sqlite_sequence WHERE name = 'pedidos';
  DELETE FROM sqlite_sequence WHERE name = 'produtos';
  DELETE FROM sqlite_sequence WHERE name = 'usuarios';
`);

// Usuários
const inserirUsuario = db.prepare(`
  INSERT INTO usuarios (nome, email, senha, papel)
  VALUES (@nome, @email, @senha, @papel)
`);

inserirUsuario.run({ nome: 'Bernardo Cerqueira', email: 'bernardo@bulbe.com', senha: '123456', papel: 'cliente' });
inserirUsuario.run({ nome: 'Emanuel Brandão',    email: 'emanuel@bulbe.com',  senha: '123456', papel: 'cliente' });

// Produtos 
const inserirProduto = db.prepare(`
  INSERT INTO produtos (nome, categoria, descricao, preco, desconto, imagem, imagem_detalhes, avaliacao, total_avaliacoes, destaque, mais_vendido)
  VALUES (@nome, @categoria, @descricao, @preco, @desconto, @imagem, @imagemDetalhes, @avaliacao, @totalAvaliacoes, @destaque, @maisVendido)
`);

const produtos = [
  {
    nome: 'Avant Neo LED Smart 10W RGB',
    categoria: 'lampadas',
    descricao: 'Lâmpada LED inteligente com 16 milhões de cores e controle por app.',
    preco: 89.90, desconto: 10,
    imagem: 'https://exemplo.com/produtos/avant-neo-rgb.jpg',
    imagemDetalhes: 'https://exemplo.com/produtos/avant-neo-rgb-detalhes.jpg',
    avaliacao: 4.7, totalAvaliacoes: 132, destaque: 1, maisVendido: 1,
  },
  {
    nome: 'Lâmpada LED 9W Branco Quente',
    categoria: 'lampadas',
    descricao: 'Lâmpada LED econômica 9W com luz branca quente, equivalente a 60W incandescente.',
    preco: 14.90, desconto: 0,
    imagem: 'https://exemplo.com/produtos/led-9w-quente.jpg',
    imagemDetalhes: 'https://exemplo.com/produtos/led-9w-quente-detalhes.jpg',
    avaliacao: 4.5, totalAvaliacoes: 87, destaque: 0, maisVendido: 0,
  },
  {
    nome: 'Luminária Pendente Industrial Preta',
    categoria: 'luminarias',
    descricao: 'Luminária pendente estilo industrial em metal preto fosco, ideal para sala de jantar.',
    preco: 199.00, desconto: 15,
    imagem: 'https://exemplo.com/produtos/pendente-industrial.jpg',
    imagemDetalhes: 'https://exemplo.com/produtos/pendente-industrial-detalhes.jpg',
    avaliacao: 4.8, totalAvaliacoes: 54, destaque: 1, maisVendido: 0,
  },
  {
    nome: 'Luminária de Mesa Articulada',
    categoria: 'luminarias',
    descricao: 'Luminária de mesa articulada com base pesada e ajuste flexível.',
    preco: 129.90, desconto: 0,
    imagem: 'https://exemplo.com/produtos/luminaria-mesa.jpg',
    imagemDetalhes: 'https://exemplo.com/produtos/luminaria-mesa-detalhes.jpg',
    avaliacao: 4.6, totalAvaliacoes: 41, destaque: 0, maisVendido: 0,
  },
  {
    nome: 'Fita LED RGB 5m Bluetooth',
    categoria: 'fitas',
    descricao: 'Fita LED 5 metros com 16 milhões de cores e controle via app.',
    preco: 79.90, desconto: 20,
    imagem: 'https://exemplo.com/produtos/fita-led-rgb.jpg',
    imagemDetalhes: 'https://exemplo.com/produtos/fita-led-rgb-detalhes.jpg',
    avaliacao: 4.4, totalAvaliacoes: 215, destaque: 0, maisVendido: 1,
  },
  {
    nome: 'Fita LED Branca 10m',
    categoria: 'fitas',
    descricao: 'Fita LED 10 metros luz branca fria, ideal para iluminação de móveis.',
    preco: 99.90, desconto: 0,
    imagem: 'https://exemplo.com/produtos/fita-led-branca.jpg',
    imagemDetalhes: 'https://exemplo.com/produtos/fita-led-branca-detalhes.jpg',
    avaliacao: 4.3, totalAvaliacoes: 78, destaque: 0, maisVendido: 0,
  },
  {
    nome: 'Soquete E27 Universal',
    categoria: 'acessorios',
    descricao: 'Soquete universal E27 em porcelana branca para lâmpadas comuns.',
    preco: 12.90, desconto: 0,
    imagem: 'https://exemplo.com/produtos/soquete-e27.jpg',
    imagemDetalhes: 'https://exemplo.com/produtos/soquete-e27-detalhes.jpg',
    avaliacao: 4.2, totalAvaliacoes: 33, destaque: 0, maisVendido: 0,
  },
  {
    nome: 'Sensor de Presença Bivolt',
    categoria: 'acessorios',
    descricao: 'Sensor de presença para iluminação automática, alcance 6m.',
    preco: 49.90, desconto: 5,
    imagem: 'https://exemplo.com/produtos/sensor-presenca.jpg',
    imagemDetalhes: 'https://exemplo.com/produtos/sensor-presenca-detalhes.jpg',
    avaliacao: 4.5, totalAvaliacoes: 62, destaque: 0, maisVendido: 0,
  },
  {
    nome: 'Echo Dot 5ª Geração',
    categoria: 'assistentes',
    descricao: 'Assistente virtual Alexa com som mais alto e detecção de movimento.',
    preco: 449.00, desconto: 10,
    imagem: 'https://exemplo.com/produtos/echo-dot-5.jpg',
    imagemDetalhes: 'https://exemplo.com/produtos/echo-dot-5-detalhes.jpg',
    avaliacao: 4.9, totalAvaliacoes: 421, destaque: 1, maisVendido: 1,
  },
  {
    nome: 'Google Nest Mini',
    categoria: 'assistentes',
    descricao: 'Assistente do Google com som ambiente e controle de casa inteligente.',
    preco: 349.00, desconto: 0,
    imagem: 'https://exemplo.com/produtos/nest-mini.jpg',
    imagemDetalhes: 'https://exemplo.com/produtos/nest-mini-detalhes.jpg',
    avaliacao: 4.7, totalAvaliacoes: 287, destaque: 0, maisVendido: 1,
  },
];

for (const produto of produtos) {
  inserirProduto.run(produto);
}

// Carrinho de exemplo 
const inserirCarrinho = db.prepare(`
  INSERT INTO carrinho (usuario_id, produto_id, quantidade)
  VALUES (@usuarioId, @produtoId, @quantidade)
`);

inserirCarrinho.run({ usuarioId: 1, produtoId: 1, quantidade: 2 });
inserirCarrinho.run({ usuarioId: 1, produtoId: 5, quantidade: 1 });
inserirCarrinho.run({ usuarioId: 2, produtoId: 9, quantidade: 1 });

// Favoritos de exemplo
const inserirFavorito = db.prepare(`
  INSERT INTO favoritos (usuario_id, produto_id)
  VALUES (@usuarioId, @produtoId)
`);

inserirFavorito.run({ usuarioId: 1, produtoId: 3 });
inserirFavorito.run({ usuarioId: 1, produtoId: 9 });
inserirFavorito.run({ usuarioId: 2, produtoId: 5 });

console.log('Seed concluido: banco populado.');